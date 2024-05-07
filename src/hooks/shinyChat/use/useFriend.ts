import React from 'react'
import { useShinyChat } from '../context'
import type { FriendItem } from '../apis'

export function useFriend(id: number) {
  const { friendList } = useShinyChat()
  const friend = React.useMemo(() => friendList.list.find(item => item.id === id), [id])

  return {
    friend,
  }
}
