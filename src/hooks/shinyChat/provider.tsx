import React from 'react'
import * as Updates from 'expo-updates'
import { router } from 'expo-router'
import { useStorageState } from '../useStorageState'
import { useOnlineCount } from './use/useOnlineCount'
import { ShinyChatContext } from './context'
import { useService } from './use/useService'
import { getMyProfile, login } from './apis'

async function onFetchUpdateAsync() {
  try {
    const update = await Updates.checkForUpdateAsync()

    if (update.isAvailable) {
      await Updates.fetchUpdateAsync()
      await Updates.reloadAsync()
    }
  }
  catch (error) {
    // You can also add an alert() to see the error message in case of an error when fetching updates.
    // console.error(`Error fetching latest Expo update: ${error}`)
  }
}

export function ShinyChatProvider(props: React.PropsWithChildren) {
  // const appCurrentState = React.useRef(AppState.currentState)
  // const isAppStateActive = React.useMemo(() => appCurrentState.current === 'active', [appCurrentState])
  const [[isLoading, token], setToken] = useStorageState('token')
  const service = useService(token)
  const { onlineCount } = useOnlineCount()

  React.useEffect(() => {
    onFetchUpdateAsync()
    return () => {}
  }, [])

  return (
    <ShinyChatContext.Provider
      value={{
        token,
        isLoading,
        ...service,
        onlineCount,
        login: (email: string, password: string) => {
          return new Promise((resolve, reject) => {
            login({ email, password }).then((res) => {
              if (res.code === 0) {
                setToken(res.data.token)
                resolve(res.data.token)
              }
              else {
                reject(res.msg)
              }
            })
          })
        },
        register: () => {},
        logout: () => {
          setToken(null)
        },
        tokenLogin: (token) => {
          return new Promise((resolve, reject) => {
            getMyProfile({ token }).then((res) => {
              if (res.code === 0) {
                setToken(token)
                resolve(token)
              }
              else {
                reject(res.msg)
              }
            })
          })
        },
        enterChatRoom: (roomId: number) => {
          router.push({ pathname: '/chat-room', params: { roomId } })
        },
      }}
    >
      {props.children}
    </ShinyChatContext.Provider>
  )
}
