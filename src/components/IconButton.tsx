import {
  Box,
  Center,
  Icon,
  Pressable,
} from '@gluestack-ui/themed'
import React from 'react'
import type { PressableProps } from 'react-native'
import { StyleSheet, TouchableNativeFeedback, View } from 'react-native'

export interface IconButtonProps {
  icon: any
}

export default function IconButton(props: IconButtonProps & PressableProps) {
  return (
    <Pressable {...props} width={32} height={32}>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('#0000000a', true, 16)}
      >
        <Center flex={1}>
          <Icon size="sm" as={props.icon} />
        </Center>
      </TouchableNativeFeedback>
    </Pressable>
  )
}
