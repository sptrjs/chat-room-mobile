import React from 'react'
import type { MyProfile } from '../apis'
import { getMyProfile } from '../apis'

export function useMyProfile(token: string | null) {
  const [profile, setProfile] = React.useState<MyProfile | null>(null)

  const updateMyProfile = (): Promise<number> => {
    return new Promise((resolve, reject) => {
      if (!token)
        return

      getMyProfile({ token }).then((res) => {
        if (res.code === 0) {
          setProfile(res.data)
          resolve(res.data.chatStatus)
        }
        else {
          reject(res.msg)
        }
      })
    })
  }

  React.useEffect(() => {
    console.log('更新 my profile [token]')

    updateMyProfile()

    return () => {
      console.log('清除 my profile [token]')

      setProfile(null)
    }
  }, [token])

  return {
    profile,
    updateMyProfile,
  }
}
