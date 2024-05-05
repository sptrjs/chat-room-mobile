import {
  Badge,
  BadgeText,
  Box,
  FlatList,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import type { FlatListProps, TouchableWithoutFeedbackProps } from 'react-native'
import React from 'react'
import { TouchableNativeFeedback } from 'react-native'
import moment from 'moment'
import Avatar from './Avatar'
import { BoyIcon, GrilsIcon } from './Icon'
import type { FriendItem } from '@/src/hooks/shinyChat/apis'

moment.updateLocale('zh-cn', {
  relativeTime: {
    future: '%s后',
    past: '%s前',
    s: '几秒',
    ss: '%d 秒',
    m: '1 分钟',
    mm: '%d 分钟',
    h: '1 小时',
    hh: '%d 小时',
    d: '1 天',
    dd: '%d 天',
    w: '1 周',
    ww: '%d 周',
    M: '1 个月',
    MM: '%d 个月',
    y: '1 年',
    yy: '%d 年',
  },
})
interface FriendListProps extends Omit<FlatListProps<unknown>, 'renderItem'> {
  onPressItem?: (item: FriendItem) => void
  data: FriendItem[]
}

export default function FriendList(props: FriendListProps) {
  const [refreshing, setRefreshing] = React.useState(false)
  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  return (
    <FlatList
      {...props}
      refreshing={refreshing}
      onRefresh={onRefresh}
      renderItem={({ item }) => {
        const { unreadMessageCount, member2 } = item as FriendItem
        return (
          <FriendItem
            avatar={member2.avatar}
            nickname={member2.nickname}
            time={moment(member2.lastActiveTime).from(new Date())}
            desc={member2.lastActiveTime}
            onPress={() => {
              props.onPressItem?.(item as FriendItem)
            }}
            badge={unreadMessageCount === 0 ? 4 : unreadMessageCount}
          />
        )
      }}
    />
  )
}

interface FriendItemProps {
  avatar?: string
  nickname?: string
  badge?: number
  isMatch?: boolean
  desc?: string
  age?: number
  gender?: number
  location?: string
  time?: string
}

export function FriendItem(props: FriendItemProps & TouchableWithoutFeedbackProps) {
  return (
    <Box backgroundColor="#fff">
      <TouchableNativeFeedback onPress={props.onPress} background={TouchableNativeFeedback.Ripple('#0000000a', true, 240)}>
        <Box>
          <HStack space="md" $base-mx="$5" $base-my="$3" alignItems="center">
            <Avatar avatar={props.avatar} size={42} />

            <VStack space="xs" flex={1}>
              <HStack justifyContent="space-between">
                <HStack space="xs">
                  <Heading size="xs" bold={true}>{props.nickname ?? 'empty nickname'}</Heading>
                  {props.isMatch && <InfoBadge value="Match" />}
                </HStack>
                <Text fontSize={12}>{props.time}</Text>
              </HStack>

              <HStack justifyContent="space-between" alignItems="center">
                <HStack alignItems="center" space="xs">
                  {props.gender && <GenderIcon gender={props.gender} />}
                  {props.age && <InfoBadge value={props.age} />}
                  {props.location && <InfoBadge value={props.location} />}
                  <Text size="sm">{props.desc }</Text>
                </HStack>
                <Text size="sm">
                  {props.badge && (
                    <Badge
                      h={22}
                      w={22}
                      bg="$red600"
                      borderRadius="$full"
                      mb={-14}
                      mr={-14}
                      zIndex={1}
                      variant="solid"
                      alignSelf="flex-end"
                    >
                      <BadgeText color="$white">{props.badge}</BadgeText>
                    </Badge>
                  )}
                </Text>
              </HStack>

            </VStack>
          </HStack>
        </Box>
      </TouchableNativeFeedback>
    </Box>
  )
}

export function GenderIcon({ gender }: { gender: number }) {
  return <Icon as={gender === 0 ? GrilsIcon : BoyIcon} size="xs" color={gender === 0 ? '$red400' : '$indigo400'} />
}

export function InfoBadge({ value }: { value: number | string }) {
  return (
    <Badge size="sm" variant="solid">
      <BadgeText>{value}</BadgeText>
    </Badge>
  )
}
