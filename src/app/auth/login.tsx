import {
  Box,
  Button,
  ButtonText,
  Center,
  FormControl,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { Link } from 'expo-router'

export default function Login() {
  return (
    <Box flex={1} backgroundColor="$white" justifyContent="center" alignItems="center">
      <VStack space="md">
        <FormControl minWidth="$80">
          <FormControlLabel>
            <FormControlLabelText>账号</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField />
          </Input>
        </FormControl>

        <FormControl minWidth="$80">
          <FormControlLabel>
            <FormControlLabelText>密码</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField />
          </Input>
        </FormControl>

        <FormControl>
          <Link href="/" asChild>
            <Button bg="$darkBlue600">
              <ButtonText fontSize="$sm" fontWeight="$medium">
                登录
              </ButtonText>
            </Button>
          </Link>
        </FormControl>
      </VStack>

      <Center>
        <Text>
          没有账号
        </Text>
        <Link href="/auth/register">
          点击注册
        </Link>
      </Center>
    </Box>
  )
}
