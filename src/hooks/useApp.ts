import React from 'react'
import { AppState } from 'react-native'

export function useApp() {
  const appState = React.useRef(AppState.currentState)
  const [appStateVisible, setAppStateVisible] = React.useState(appState.current)
  const isActive = React.useMemo(() => appState.current === 'active', [appState])

  React.useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/)
        && nextAppState === 'active'
      ) {
        // 应用从后台转到前台
        console.log('App has come to the foreground!')
      }

      appState.current = nextAppState
      setAppStateVisible(appState.current)
    })

    return () => {
      subscription.remove()
    }
  }, [])

  return {
    appStateVisible,
    isActive,
  }
}
