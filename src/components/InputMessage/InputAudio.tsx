import {
  Center,
  Pressable,
  Text,
} from '@gluestack-ui/themed'

import { Laugh, Mic, Plus, Send } from 'lucide-react-native'
import type { PressableProps } from 'react-native'
import React from 'react'
import { useAudio } from './hooks/useAudio'

export default function InputAudio(props: PressableProps) {
  const { startRecording, stopRecording } = useAudio()

  return (
    <Pressable {...props}>
      <Center>
        <Text>
          按住 说话
        </Text>
      </Center>
    </Pressable>
  )
}
