import React from 'react'
import { Box } from '@gluestack-ui/themed'
import { Stack, router } from 'expo-router'
import List from '@/src/components/List'
import ExitWarning from '@/src/components/warnings/ExitWarning'
import { useShinyChat } from '@/src/hooks/shinyChat'

export default function Home() {
  const [showAlertDialog, setShowAlertDialog] = React.useState(false)
  const { logout } = useShinyChat()

  const data = [
    {
      title: '',
      data: [
        {
          id: '3',
          content: '退出账户',
          onPress() {
            setShowAlertDialog(true)
          },
        },
      ],
    },
  ]

  return (
    <Box flex={1}>
      <Stack.Screen options={{
        title: '设置',
      }}
      />

      <List data={data} />

      <ExitWarning
        isOpen={showAlertDialog}
        onClose={() => {
          setShowAlertDialog(false)
        }}
        onOk={() => {
          setShowAlertDialog(false)
          logout()
          router.push('/auth/')
        }}
        onCancel={() => {
          setShowAlertDialog(false)
        }}
      />
    </Box>
  )
}
