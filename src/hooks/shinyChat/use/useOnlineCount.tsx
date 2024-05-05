import React from 'react'
import { getOnlineCount } from '../apis'

export function useOnlineCount() {
  const [onlineCount, setOnlineCount] = React.useState<number>(0)

  React.useEffect(() => {
    // 定时获取 online
    const onlineTimeout = setTimeout(() => {
      getOnlineCount().then((res) => {
        if (res.code === 0)
          setOnlineCount(res.data)
      })
    }, 5000)

    return () => {
      clearTimeout(onlineTimeout)
      setOnlineCount(0)
    }
  }, [])

  return {
    onlineCount,
  }
}
