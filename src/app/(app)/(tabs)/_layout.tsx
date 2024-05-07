import React from 'react'
import { Tabs } from 'expo-router'
import { MessageCircleMore, Settings, UsersRound } from 'lucide-react-native'

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '消息',
          tabBarIcon: ({ color }) => <MessageCircleMore size={20} color={color} />,
        }}
      />

      <Tabs.Screen
        name="friends"
        options={{
          title: '通讯录',
          tabBarIcon: ({ color }) => <UsersRound size={20} color={color} />,
        }}
      />

      <Tabs.Screen
        name="my"
        options={{
          title: '我的',
          tabBarIcon: ({ color }) => <Settings size={20} color={color} />,
        }}
      />
    </Tabs>
  )
}
