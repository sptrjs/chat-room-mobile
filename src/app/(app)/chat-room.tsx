import React from 'react'
import {
  Badge,
  BadgeText,
  Box,
  HStack,
  Heading,
  Icon,
  Text,
  ThreeDotsIcon,
  VStack,
} from '@gluestack-ui/themed'
import { Stack, useLocalSearchParams } from 'expo-router'
import InputMessage from '@/src/components/InputMessage'
import MessageList from '@/src/components/MessageList'
import { useChatRoom } from '@/src/hooks/shinyChat'
import Avatar from '@/src/components/Avatar'

function Extra() {
  return (
    <>
      <Icon as={ThreeDotsIcon} />
    </>
  )
}

export default function ChatRoom() {
  const { roomId } = useLocalSearchParams<Record<string, string>>()
  const { getAvatar, message, send } = useChatRoom(Number.parseInt(roomId))

  return (
    <Box flex={1}>
      <Stack.Screen options={{
        headerRight: () => <Extra />,
        headerTitleAlign: 'center',
        headerTitle() {
          return (
            <HStack space="sm" alignItems="center">
              <Avatar size={24} avatar={getAvatar()} />
              <VStack>
                <Heading size="sm">
                  nickname
                </Heading>
                <HStack>
                  <Text size="sm">
                    {roomId}
                  </Text>
                </HStack>
              </VStack>
            </HStack>
          )
        },
      }}
      />
      <MessageList data={message} inverted />
      <InputMessage onSubmit={(content) => {
        send(content)
      }}
      />
    </Box>
  )
}
