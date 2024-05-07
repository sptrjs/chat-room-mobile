import React from 'react'
import { Box } from '@gluestack-ui/themed'
import { Stack, router } from 'expo-router'
import List from '@/src/components/List'

export default function Home() {
  const data = [
    {
      title: '',
      data: [
        {
          id: '1',
          content: '修改资料',
          onPress() { },
        },
        {
          id: '2',
          content: '绑定邮箱',
          onPress() { },
        },
      ],
    },
    {
      title: '',
      data: [
        {
          id: '3',
          content: '设置',
          onPress() {
            router.push('/settrings')
          },
        },
      ],
    },
  ]

  return (
    <Box flex={1}>
      <List data={data} />
    </Box>
  )
}
