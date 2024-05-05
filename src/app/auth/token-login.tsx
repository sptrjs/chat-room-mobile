import {
  Box,
  Button,
  ButtonText,
  FormControl,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  Text,
  Toast,
  VStack,
  useToast,
} from '@gluestack-ui/themed'
import { router } from 'expo-router'
import React from 'react'
import { useShinyChat } from '@/src/hooks/shinyChat'

export default function Login() {
  const { tokenLogin } = useShinyChat()
  const [token, setToken] = React.useState('')
  const toast = useToast()

  return (
    <Box flex={1} backgroundColor="$white" justifyContent="center" alignItems="center" $base-flexDirection="column" $md-flexDirection="row">
      <VStack space="md">
        <FormControl minWidth="$80">
          <Input>
            <InputField placeholder="请输入您的账号Token!" defaultValue={token} onChangeText={text => setToken(text)} />
          </Input>
        </FormControl>

        <FormControl>
          <Button onPress={() => {
            tokenLogin(token).then(() => {
              router.replace('/')
            }).catch((err) => {
              toast.show({
                placement: 'top',
                render: () => {
                  return (
                    <Toast>
                      <Text>{ err}</Text>
                    </Toast>
                  )
                },
              })
            })
          }}
          >
            <ButtonText fontSize="$sm" fontWeight="$medium">
              Login
            </ButtonText>
          </Button>
        </FormControl>
      </VStack>

    </Box>
  )
}
