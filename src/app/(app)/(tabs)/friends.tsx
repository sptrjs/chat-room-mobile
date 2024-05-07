import React from 'react'
import { Box } from '@gluestack-ui/themed'
import { router } from 'expo-router'
import { useShinyChat } from '@/src/hooks/shinyChat'
import List from '@/src/components/List'
import Avatar from '@/src/components/Avatar'

export default function Home() {
  const { friendList } = useShinyChat()
  const data = React.useMemo(() => friendList.list.map(item => ({
    id: item.id,
    title: item.member2.nickname ?? '未设置昵称',
    description: item.member2.lastActiveTime,
    prefix: <Avatar avatar={item.member2.avatar} size={48} />,
    clickable: true,
  })), [friendList.list])

  return (
    <Box flex={1}>
      <List
        data={[{ data }]}
        onPress={item => router.push({ pathname: '/detail', params: { id: item.id } })}
      />
    </Box>
  )
}
