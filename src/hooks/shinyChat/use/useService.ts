import React from 'react'
import WebsocketHeartbeat from 'websocket-heartbeat-js'
import { WS_URL } from '../context'
import { createOnMessage } from '../utils/onMessage'
import { usePartner } from './usePartner'
import { useFriendList } from './useFriendList'
import { useMessages } from './useMessages'
import { useMyProfile } from './useMyProfile'
import type { MESSAGE_DATA, SendMessage } from '@/src/hooks/shinyChat/interface'
import { MessageOperateEnum, MessageTypeEnum } from '@/src/hooks/shinyChat/interface'

export function generate(opts: SendMessage) {
  const msg: SendMessage = {
    type: MessageTypeEnum.REQUEST,
    ...opts,
  }

  if (msg.token) {
    msg.memberToken = msg.token
    delete msg.token
  }

  if (msg.roomId === 0)
    delete msg.roomId
  else if (msg.roomId)
    msg.roomId = msg.roomId.toString()

  return JSON.stringify(msg)
}

export function useService(token: string | null) {
  const { profile, updateMyProfile } = useMyProfile(token)
  const wsRef = React.useRef<WebsocketHeartbeat | null>(null)
  const partner = usePartner(token, (...args: Parameters<typeof generate>) => wsRef.current?.send(generate(...args)))
  const friendList = useFriendList(token)
  const roomIds = React.useMemo(() => friendList.list.map(item => item.roomId).concat(partner.profile ? [0] : []), [friendList.list.length, partner.profile])
  const { messages, addMessage, updateMessage } = useMessages(token, roomIds)

  React.useEffect(() => {
    updateMyProfile().then((val) => {
      partner.setChatStatus(val)
    })
  }, [partner.chatStatus])

  React.useEffect(() => {
    if (!token)
      return

    if (wsRef.current === null) {
      const ws = new WebsocketHeartbeat({
        url: WS_URL,
        pingTimeout: 5000,
        pongTimeout: 4500,
        pingMsg: () => generate({ token, operate: MessageOperateEnum.HEARTBEAT }),
      })

      ws.onopen = () => {
        ws.send(generate({ token, operate: MessageOperateEnum.LOGIN }))
      }

      ws.onmessage = createOnMessage({
        ack: operate => ws.send(generate({ operate, type: MessageTypeEnum.ACK })),
        onMessage(roomId, msg) {
          addMessage(roomId, msg)
          if (roomId === 0)
            partner.setUnreadMessageCount(partner.unreadMessageCount + 1)
          else
            friendList.setUnreadMessageCount(msg.roomId!, 1, true)
        },
        onTyping() {
          partner.setTyping(true)
        },
        onChangeChatStatus(newChatStatus) {
          partner.setChatStatus(newChatStatus)
        },
      })

      wsRef.current = ws
    }

    return () => {
      wsRef.current?.close()
      wsRef.current = null
    }
  }, [token])

  return {
    profile,
    updateMyProfile,
    partner,
    messages,
    updateMessage,
    friendList,
    send: (content: string, roomId: number = 0) => {
      if (!token)
        return

      wsRef.current?.send(generate({
        token,
        operate: roomId !== 0 ? MessageOperateEnum.SELF_PRIVATE_MESSAGE : MessageOperateEnum.SELF_MESSAGE,
        content,
        roomId,
      }))
    },
  }
}
