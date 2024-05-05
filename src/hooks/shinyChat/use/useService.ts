import React from 'react'
import WebsocketHeartbeat from 'websocket-heartbeat-js'
import { WS_URL } from '../context'
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

      ws.onmessage = (data) => {
        const msg: MESSAGE_DATA = JSON.parse(data.data)

        if (msg.type === MessageTypeEnum.RESPONSE)
          return

        const operate = msg.operate
        ws.send(generate({ operate, type: MessageTypeEnum.ACK }))

        if (msg.type === MessageTypeEnum.NOTIFY) {
          if (msg.chatStatus !== partner.chatStatus)
            partner.setChatStatus(msg.chatStatus)

          if (msg.system) {
            switch (msg.operate) {
              case MessageOperateEnum.ENTER_SUCCESS:
              case MessageOperateEnum.EXIT_SUCCESS:
                // 检测 chatStatus 状态, 不需要处理 匹配和离开消息
                break
              case MessageOperateEnum.STATE:
                // 连接成功后会检测一次
                // shinyChat.onState?.(msg)
                break
              default:
            }
          }
          else {
            switch (operate) {
              case MessageOperateEnum.OTHER_MESSAGE:
              case MessageOperateEnum.SELF_MESSAGE:
                addMessage(0, msg)
                partner.setUnreadMessageCount(partner.unreadMessageCount + 1)
                break
              case MessageOperateEnum.SELF_PRIVATE_MESSAGE:
              case MessageOperateEnum.OTHER_PRIVATE_MESSAGE:
                addMessage(msg.roomId!, msg)
                friendList.setUnreadMessageCount(msg.roomId!, 1, true)
                break
              // case MessageOperateEnum.FEEDBACK_MESSAGE:
              //   // FEEDBACK_MESSAGE
              //   break
              case MessageOperateEnum.TYPING:
                partner.setTyping(true)
                break
            }
          }
        }
      }

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
