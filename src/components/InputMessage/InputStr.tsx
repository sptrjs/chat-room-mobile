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
import type { TextInputProps } from 'react-native'

export interface InputStrProps {
}

export default function InputStr(props: InputStrProps & TextInputProps) {
  return (
    <Input variant="rounded" flex={1}>
      <InputField {...props} returnKeyType="send" />
      <InputSlot px="$3">
        <InputIcon
          as={Laugh}
          color="$darkBlue500"
        />
      </InputSlot>
    </Input>
  )
}
