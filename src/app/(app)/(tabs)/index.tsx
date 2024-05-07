import React from 'react'
import {
  Box,
  Button,
  Center,
  HStack,
  Spinner,
  Text,
  VStack,
} from '@gluestack-ui/themed'

import { Bell, MessageCirclePlus } from 'lucide-react-native'
import { Stack } from 'expo-router'
import IconButton from '@/src/components/IconButton'
import { useShinyChat } from '@/src/hooks/shinyChat'
import List from '@/src/components/List'
import Avatar from '@/src/components/Avatar'

export default function Home() {
  const {
    friendList,
    partner,
    enterChatRoom,
  } = useShinyChat()
  const data = React.useMemo(() => friendList.list.map(item => ({
    id: item.roomId,
    title: item.member2.nickname ?? '未设置昵称',
    description: item.member2.lastActiveTime,
    prefix: <Avatar avatar={item.member2.avatar} size={48} />,
    clickable: true,
  })), [friendList.list])

  return (
    <Box flex={1}>
      <Stack.Screen options={{
        headerRight: () => {
          return (
            <HStack space="md" alignItems="center">
              {partner.chatStatus === 1 && (
                <IconButton
                  icon={MessageCirclePlus}
                  onPress={() => {
                    partner.startLookPartner()
                  }}
                />
              )}
              <IconButton
                icon={Bell}
                onPress={() => {

                }}
              />
            </HStack>
          )
        },
        headerShadowVisible: false,
      }}
      />

      {partner.chatStatus === 2 && (
        <Center $base-py="$2">
          <HStack space="sm">
            <Spinner />
            <Text size="md">正在努力匹配中...</Text>
          </HStack>
          <Button onPress={() => {
            partner.stopLookPartner()
          }}
          >
            <Text>取消</Text>
          </Button>
        </Center>
      )}

      <VStack flex={1}>
        <List
          data={[{ data }]}
          onPress={(item) => {
            enterChatRoom(item.id)
          }}
        />
      </VStack>

    </Box>
  )
}
