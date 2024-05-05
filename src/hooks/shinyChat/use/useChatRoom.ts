import React from 'react'
import type { MessageItem } from '../apis'
import { isFriendItem } from '../utils'
import { useShinyChat } from './useShinyChat'

export function useChatRoom(roomId: number) {
  const { friendList, messages, updateMessage, partner, send } = useShinyChat()
  const friend = React.useMemo(() => roomId === 0 ? partner.profile : friendList.list.find(item => item.roomId === roomId), [])
  const [message, setMessage] = React.useState<MessageItem[]>([])

  React.useEffect(() => {
    console.log('更新 chat room "message[roomId]" [messages]')
    setMessage(messages[roomId])

    return () => {
      console.log('清除 chat room 副作用 [messages]')
    }
  }, [messages])

  return {
    friend,
    message,
    updateMessage: () => updateMessage(roomId),
    getAvatar: () => {
      if (!friend)
        return ''
      if (isFriendItem(friend))
        return friend.member2.avatar
      return friend.avatar
    },
    send: (content: string) => send(content, roomId),
  }
}
