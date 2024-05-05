import {
  Box,
  HStack,
  Icon,
  Text,
} from '@gluestack-ui/themed'
import { AudioLines } from 'lucide-react-native'
import { Audio } from 'expo-av'
import React from 'react'
import { AudioIcon } from './Icon'

export default function MessageItemAudio(props: { uri: string, color?: string, reverse?: boolean }) {
  const [sound, setSound] = React.useState<Audio.Sound>()
  const [durationMillis, setDurationMillis] = React.useState<number>()

  React.useEffect(() => {
    Audio.Sound.createAsync({ uri: props.uri }).then((res) => {
      setSound(res.sound)
      if (res.status.isLoaded)
        res.status.durationMillis && setDurationMillis(Math.ceil(res.status.durationMillis / 1000))
    }).catch((error) => {
      console.log('失败', error)
    })
  }, [])

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  if (!sound)
    return <Text>载入失败</Text>

  return (
    <HStack
      {...props}
      justifyContent="space-between"
      flexDirection={props.reverse ? 'row-reverse' : 'row'}
      px="$2"
      py="$2"
      w={100}
      alignItems="center"
    >
      <Icon as={AudioIcon} color={props.color} />
      <Text color={props.color}>
        {durationMillis}
        "
      </Text>
    </HStack>
  )
}
