import FontAwesome from '@expo/vector-icons/FontAwesome'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { config } from '@gluestack-ui/config'
import { Slot } from 'expo-router'

import { ShinyChatProvider } from '../hooks/shinyChat'
import { useColorScheme } from '@/src/components/useColorScheme'

export {
  // 捕获布局组件引发的任何错误。
  ErrorBoundary,
} from 'expo-router'

// export const unstable_settings = {
//   // 确保在 `/modal` 上重新加载时保留Back按钮。
//   initialRouteName: "gluestack",
// };

// 防止闪屏在资源加载完成之前自动隐藏。
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    // eslint-disable-next-line ts/no-require-imports
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  })

  // const [styleLoaded, setStyleLoaded] = useState(false)
  // EXPO路由器使用错误边界来捕获导航树中的错误。
  useEffect(() => {
    if (error)
      throw error
  }, [error])

  useEffect(() => {
    if (loaded)
      SplashScreen.hideAsync()
  }, [loaded])

  // useLayoutEffect(() => {
  //   setStyleLoaded(true);
  // }, [styleLoaded]);

  // if (!loaded || !styleLoaded) {
  //   return null;
  // }

  return <RootLayoutNav />
}

function RootLayoutNav() {
  const colorScheme = useColorScheme()

  return (
    <GluestackUIProvider config={config}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <ShinyChatProvider>
          <Slot />
        </ShinyChatProvider>
      </ThemeProvider>
    </GluestackUIProvider>
  )
}
