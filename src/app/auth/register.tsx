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

export default function Register() {
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
          <FormControlHelper>
            <FormControlHelperText>
              What would you like people to call you?
            </FormControlHelperText>
          </FormControlHelper>
        </FormControl>

        <FormControl minWidth="$80">
          <FormControlLabel>
            <FormControlLabelText>密码</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField />
          </Input>
          <FormControlHelper>
            <FormControlHelperText>
              What would you like people to call you?
            </FormControlHelperText>
          </FormControlHelper>
        </FormControl>

        <FormControl>
          <Link href="/" asChild>
            <Button bg="$darkBlue600">
              <ButtonText fontSize="$sm" fontWeight="$medium">
                注册
              </ButtonText>
            </Button>
          </Link>
        </FormControl>

        <Center>
          <Text>
            已有账号
          </Text>
          <Link href="/auth/login">
            click login
          </Link>
        </Center>
      </VStack>
    </Box>
  )
}
