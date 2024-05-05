import React, { Profiler } from 'react'
import { type MessageItem, getMessageListV2 } from '../apis'
import type { MESSAGE_CHAT_DATA } from '../interface'

function toArray<T>(val: T | T[]): T[] {
  return Array.isArray(val) ? val : [val]
}

export function getIsSelf(item: MessageItem, id: number) {
  return item.memberId === id
}

export function useMessages(token: string | null, roomIds: number | number[]) {
  const [messages, setMessages] = React.useState<Record<number, MessageItem[]>>({})

  async function updateAllMessage() {
    if (!token)
      return

    const newMessage: Record<number, MessageItem[]> = {}
    toArray(roomIds).forEach(async (roomId) => {
      newMessage[roomId] = await getMessageList(roomId)
    })

    setMessages(newMessage)
  }

  async function getMessageList(roomId: number) {
    if (token) {
      const res = await getMessageListV2({ roomId, token })
      if (res.code === 0)
        return res.data.list.reverse().map(item => ({ ...item, operate: roomId === 0 ? 2 : 14 }))
    }
    return []
  }

  async function updateMessage(roomId: number) {
    if (token) {
      const message = await getMessageList(roomId)
      setMessages((prevMessage) => {
        return { ...prevMessage, [roomId]: message }
      })
    }
  }

  React.useEffect(() => {
    console.log('更新 messages [token, roomIds]')

    updateAllMessage()

    return () => {
      console.log('清除 messages [token, roomIds]')
      setMessages({})
    }
  }, [token, roomIds])

  return {
    messages,
    updateMessage,
    addMessage(roomId: number, data: MESSAGE_CHAT_DATA) {
      setMessages((prevMessages) => {
        return {
          ...prevMessages,
          [roomId]: [{ ...data, roomId } as MessageItem].concat(prevMessages[roomId] ?? []),
        }
      })
    },
  }
}
