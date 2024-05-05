import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Button,
  ButtonGroup,
  ButtonText,
  CloseIcon,
  Heading,
  Icon,
  Text,
} from '@gluestack-ui/themed'
import type { InterfaceAlertDialogProps } from '@gluestack-ui/alert-dialog/src/types'

export interface ExitWarningProps extends InterfaceAlertDialogProps {
  onOk?: () => void
  onCancel?: () => void
}

export default function ExitWarning(props: ExitWarningProps) {
  return (
    <AlertDialog {...props} size="md">
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading size="lg">退出当前帐户</Heading>
          <AlertDialogCloseButton>
            <Icon as={CloseIcon} />
          </AlertDialogCloseButton>
        </AlertDialogHeader>
        <AlertDialogBody>
          <Text size="sm">
            您确定要退出当前帐户吗?
          </Text>
          <Text>
            未绑定邮箱账户将不能在登录
          </Text>
        </AlertDialogBody>
        <AlertDialogFooter>
          <ButtonGroup space="lg">
            <Button
              variant="outline"
              action="secondary"
              onPress={props?.onCancel}
            >
              <ButtonText>取消</ButtonText>
            </Button>
            <Button
              bg="$error600"
              action="negative"
              onPress={props?.onOk}
            >
              <ButtonText>确认</ButtonText>
            </Button>
          </ButtonGroup>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
