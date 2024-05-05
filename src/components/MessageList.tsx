import {
  Box,
  Button,
  Center,
  FlatList,
  Icon,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { Image } from 'expo-image'
import type { FlatListProps, TextProps } from 'react-native'
import React, { Children } from 'react'
import { AudioLines } from 'lucide-react-native'
import * as VideoThumbnails from 'expo-video-thumbnails'

import { MessageOperateEnum } from '../hooks/shinyChat/interface'
import { getIsSelf } from '../hooks/shinyChat/use/useMessages'
import { useShinyChat } from '../hooks/shinyChat'
import { AudioIcon } from './Icon'
import MessageItemAudio from './MessageItemAudio'
import type { MessageItem } from '@/src/hooks/shinyChat/apis'

interface MessageListProps extends Omit<FlatListProps<unknown>, 'renderItem'> {
  data: MessageItem[]
}

// const imgTemplate = '@@img@${url}@@'
function parseContent(content: string) {
  let type: MessageType = 'string'
  let data = content

  const itemMatchResult = content.match(/@@(.*?)@(((https:|http:|ftp:|rtsp:|mms:)?\/\/)[^\s@]+)@@/)

  if (itemMatchResult) {
    type = itemMatchResult[1] as MessageType
    data = itemMatchResult[2]
  }
  // ...

  return {
    type,
    data,
  }
}

export default function MessageList(props: MessageListProps) {
  const { profile } = useShinyChat()
  return (
    <FlatList
      {...props}
      initialNumToRender={12}
      renderItem={({ item }) => {
        const { system, content } = item as MessageItem
        const isSelf = getIsSelf(item as MessageItem, profile!.id)

        if (system) {
          return (
            <Center
              $base-my="$2"
              px="$1"
              py="$1"
              alignSelf="center"
            >
              <Text size="sm">
                {content}
              </Text>
            </Center>
          )
        }

        if (!content)
          return <></>

        const { type, data } = parseContent(content)

        // text image mp3 video
        return (
          <Box
            backgroundColor={isSelf ? '$violet600' : '$indigo600'}
            alignSelf={isSelf ? 'flex-end' : 'flex-start'}
            maxWidth="80%"
            $base-mx="$5"
            $base-my="$3"
            borderRadius="$lg"
            borderTopLeftRadius={!isSelf ? 0 : '$lg'}
            borderTopRightRadius={isSelf ? 0 : '$lg'}
            overflow="hidden"
          >
            <MessageItem
              type={type}
              value={data}
              isMy={isSelf}
              color="$textLight50"
            >
            </MessageItem>
          </Box>
        )
      }}
      keyExtractor={item => (item as MessageItem).id.toString()}
    />
  )
}

type MessageType = 'string' | 'audio' | 'video' | 'img'

interface MessageItemProps {
  type: MessageType
  value: any
  color?: string
  isMy?: boolean
  time?: number
}
function MessageItem(props: MessageItemProps & TextProps = { type: 'string', value: '' }) {
  const { type, value } = props
  const [width, setWidth] = React.useState(100)
  const [height, setHeight] = React.useState(100)
  if (type === 'img') {
    return (
      <Image
        alt="img"
        source={value}
        contentFit="cover"
        style={{
          width,
          height,
          maxHeight: 220,
          maxWidth: '40%',
          backgroundColor: '#0553',
          objectFit: 'cover',
        }}
        onLoad={(e) => {
          setWidth(e.source.width)
          setHeight(e.source.height)
        }}
      />
    )
  }

  if (type === 'audio') {
    return (
      <MessageItemAudio reverse={props.isMy} uri={value} color={props.color} />
    )
  }

  if (type === 'video')
    return <VThumbnails url={value} />

  return (
    <Text
      px="$3"
      py="$2"
      color={props.color}
    >
      {value}
    </Text>
  )
}

function VThumbnails({ url }: { url: string }) {
  const [image, setImage] = React.useState<string>()

  const blurhash
  = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['

  React.useEffect(() => {
    VideoThumbnails.getThumbnailAsync(
      url,
      {
        time: 5000,
      },
    ).then(({ uri }) => {
      setImage(uri)
    })
  }, [url])

  return (
    <Image
      alt="video"
      source={image}
      placeholder={blurhash}
      contentFit="cover"
      transition={1000}
      style={{
        width: 200,
        height: 140,
      }}
    />
  )
}
