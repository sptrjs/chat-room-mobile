import React from 'react'
import {
  AddIcon,
  Box,
  Button,
  Center,
  Divider,
  GlobeIcon,
  HStack,
  Icon,
  Menu,
  MenuItem,
  MenuItemLabel,
  Pressable,
  SettingsIcon,
  Spinner,
  Text,
  VStack,
} from '@gluestack-ui/themed'

import { Bell, MessageCirclePlus } from 'lucide-react-native'
import { Stack, router } from 'expo-router'
import Avatar from '@/src/components/Avatar'
import FriendList, { FriendItem } from '@/src/components/FriendList'
import ExitWarning from '@/src/components/warnings/ExitWarning'
import IconButton from '@/src/components/IconButton'
import { useShinyChat } from '@/src/hooks/shinyChat'

export default function Home() {
  const [showAlertDialog, setShowAlertDialog] = React.useState(false)
  const {
    friendList,
    profile,
    partner,
    enterChatRoom,
    logout,
  } = useShinyChat()

  return (
    <Box flex={1}>
      <Stack.Screen options={{
        title: 'Shiny Chat' + `${partner.chatStatus}`,
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
              <AvatarAction
                avatar={profile?.avatar}
                onClickItem={(key: string) => {
                  if (key === 'exit')
                    setShowAlertDialog(true)
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
        {partner.chatStatus === 3 && (
          <FriendItem
            avatar={partner.profile?.avatar}
            nickname="Match User"
            gender={partner.profile?.gender}
            age={partner.profile?.age}
            location={partner.profile?.location}
            isMatch
            onPress={() => {
              enterChatRoom(0)
            }}
            badge={partner?.unreadMessageCount === 0 ? undefined : partner?.unreadMessageCount}
          />
        )}

        <FriendList
          data={friendList.list}
          onPressItem={(item) => {
            enterChatRoom(item.roomId)
          }}
        />
      </VStack>

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

interface Item {
  key: string
  name: string
  icon: any
  onPress: () => void
}

function AvatarAction(props: { avatar?: string, onClickItem?: (key: string) => void }) {
  const data: Item[] = [
    {
      key: 'update-detail',
      name: '修改资料',
      icon: GlobeIcon,
      onPress: () => router.push('/update-detail'),
    },
    {
      key: 'update-match',
      name: '匹配设置',
      icon: SettingsIcon,
      onPress: () => router.push('/update-match'),
    },
    {
      key: 'bind-email',
      name: '绑定邮箱',
      icon: SettingsIcon,
      onPress: () => router.push('/bind-email'),
    },
    {
      key: 'exit',
      name: '退出账号',
      icon: AddIcon,
      onPress: () => props.onClickItem?.('exit'),
    },
  ]

  return (
    <Menu
      placement="bottom right"
      trigger={({ ...triggerProps }) => {
        return (
          <Pressable {...triggerProps}>
            <Avatar avatar={props.avatar} />
          </Pressable>
        )
      }}
    >
      {data.map(item => (
        <MenuItem
          key={item.key}
          textValue={item.name}
          onPress={item.onPress}
        >
          <Icon as={item.icon} size="sm" mr="$2" />
          <MenuItemLabel size="sm">{item.name}</MenuItemLabel>
        </MenuItem>
      ))}
    </Menu>
  )
}
