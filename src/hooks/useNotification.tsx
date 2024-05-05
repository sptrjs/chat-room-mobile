import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'
import * as Device from 'expo-device'
import React from 'react'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

export function useNotification() {
  React.useEffect(() => {
    registerForPushNotificationsAsync()
  }, [])

  function notification(content: Notifications.NotificationContentInput) {
    Notifications.scheduleNotificationAsync({
      content: {
        ...content,

        sound: 'notice.wav',
      },
      trigger: null,
    })
  }

  return { notification }
}

async function registerForPushNotificationsAsync() {
  let token

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    })
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      console.error('推流通知获取推流令牌失败！')
      return
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (await Notifications.getExpoPushTokenAsync({ projectId: 'your-project-id' })).data
  }
  else {
    console.error('必须使用物理设备发送推送通知')
  }

  return token
}
