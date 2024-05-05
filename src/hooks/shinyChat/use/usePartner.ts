import React from 'react'
import { type Profile, getPartnerDetail } from '../apis'
import type { SendMessage } from '../interface'
import { MessageOperateEnum } from '../interface'

function useTyping(ms: number = 1000) {
  const [typing, setTyping] = React.useState<boolean>(false)
  React.useEffect(() => {
    if (!typing)
      return

    const typingTimeout = setTimeout(() => {
      setTyping(false)
    }, ms)

    return () => {
      clearTimeout(typingTimeout)
    }
  }, [typing])

  return { typing, setTyping }
}

export function usePartner(token: string | null, sendCallback?: (opts: SendMessage) => void) {
  const [profile, setProfile] = React.useState<Profile | null>(null)
  const [unreadMessageCount, setUnreadMessageCount] = React.useState(0)
  const { typing, setTyping } = useTyping()
  const [chatStatus, setChatStatus] = React.useState(0)

  const updatePartnerDetail = async () => {
    if (!token)
      return
    getPartnerDetail({ token }).then((res) => {
      if (res.code === 0)
        setProfile(res.data)
    })
  }

  React.useEffect(() => {
    console.log('更新匹配信息 [chatStatus]')

    updatePartnerDetail()

    return () => {
      console.log('清除匹配信息 [chatStatus]')
      setProfile(null)
    }
  }, [chatStatus])

  React.useEffect(() => {
    console.log('更新匹配状态 [token]')
    return () => {
      console.log('清空匹配状态 [token]')
      setUnreadMessageCount(0)
      setChatStatus(0)
    }
  }, [token])

  let closeMatchCallback: (() => void) | null = null

  return {
    profile,
    unreadMessageCount,
    setUnreadMessageCount,
    chatStatus,
    setChatStatus,
    typing,
    setTyping,
    startLookPartner() {
      if (chatStatus !== 1)
        return

      const time = setInterval(() => {
        if (!token) {
          clearInterval(time)
          return
        }

        sendCallback?.({ token, operate: MessageOperateEnum.APPLY_MATCH })
      }, 5000)

      closeMatchCallback = () => {
        clearInterval(time)
        closeMatchCallback = null
      }
    },
    stopLookPartner() {
      if (closeMatchCallback)
        closeMatchCallback()

      if (!token)
        return

      sendCallback?.({ token, operate: MessageOperateEnum.EXIT })
    },
    feedTyping: () => {
      if (!token)
        return
      sendCallback?.({ token, operate: MessageOperateEnum.TYPING })
    },
  }
}
