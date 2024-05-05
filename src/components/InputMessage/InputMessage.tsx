import React from 'react'
import type {
  IButtonProps,
} from '@gluestack-ui/themed'
import {
  Box,
  Button,
  ButtonIcon,
  HStack,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { Laugh, Mic, Plus, Send } from 'lucide-react-native'
import type { ButtonProps } from 'react-native'
import CameraButton from './actions/Camera'
import { InputMessageType } from './context'
import InputStr from './InputStr'
import InputAudio from './InputAudio'
import { useImagePicker } from './hooks/useImagePicker'

interface InputMessageProps {
  isVoice?: boolean
  onSubmit?: (content: string) => boolean | void
}

export default function InputMessage(props: InputMessageProps) {
  const [isVoice, setIsVoice] = React.useState(props.isVoice ?? false)
  const [visible, setVisible] = React.useState(false)
  const [content, setContent] = React.useState('')
  const { image, pickImage } = useImagePicker()

  return (
    <Box bg="#fff">
      <VStack>
        <HStack space="sm" $base-my="$3" $base-mx="$5" alignItems="center">

          <InputIconButton
            icon={Mic}
            onPress={() => setIsVoice(!isVoice)}
          />

          {isVoice
            ? <InputAudio flex={1} />
            : (
              <InputStr
                defaultValue={content}
                onChangeText={text => setContent(text)}
                onSubmitEditing={() => {
                  const isNotClear = props.onSubmit?.(content)
                  if (!isNotClear)
                    setContent('')
                }}
              />
              )}

          <InputIconButton
            icon={Plus}
            onPress={() => setVisible(!visible)}
          />

        </HStack>
        {visible && (
          <Box>
            <HStack space="md" $base-px="$5">
              <Button onPress={() => {
                pickImage()
              }}
              >
                <Text>照片</Text>
              </Button>
              <Button onPress={() => {}}>
                <Text>拍摄</Text>
              </Button>
              <Button onPress={() => {}}>
                <Text>文件</Text>
              </Button>
              {/* <CameraButton /> */}
            </HStack>
          </Box>
        )}
      </VStack>
    </Box>
  )
}

export function InputIconButton(props: { icon: any } & Omit<ButtonProps, 'title'>) {
  return (
    <Button
      {...props}
      variant="outline"
      borderRadius="$full"
      size="md"
    >
      <ButtonIcon as={props.icon} />
    </Button>
  )
}
// 选项卡
// 选项卡.功能
