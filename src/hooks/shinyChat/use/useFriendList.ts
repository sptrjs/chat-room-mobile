import React from 'react'
import { type FriendItem, getMyFriendList } from '../apis'

export function useFriendList(token: string | null) {
  const [list, setList] = React.useState<Array<FriendItem>>([])

  const unreadMessageCount = React.useMemo(() => {
    return list.reduce((p, c) => p + c.unreadMessageCount, 0)
  }, [list])

  const updateList = () => {
    if (!token)
      return

    getMyFriendList({ token }).then((res) => {
      if (res.code === 0)
        setList(res.data.records)
    })
  }

  React.useEffect(() => {
    console.log('更新 friends [token]')
    updateList()

    return () => {
      console.log('清空 friends [token]')

      setList([])
    }
  }, [token])

  return {
    list,
    updateList,
    unreadMessageCount,
    setUnreadMessageCount: (roomId: number, count: number, isIncrement: boolean) => {
      setList(list => list.map((item) => {
        if (item.roomId === roomId)
          item.unreadMessageCount = isIncrement ? count + item.unreadMessageCount : count
        return item
      }))
    },
  }
}
