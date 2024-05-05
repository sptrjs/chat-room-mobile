import { Box, HStack, Heading, StatusBar, Text } from '@gluestack-ui/themed'

export interface ModalRendererProps {
  children?: React.ReactElement | React.ReactElement[]
  extra?: React.ReactElement
  header?: React.ReactElement
  footer?: React.ReactElement
}

export default function Screen(props: ModalRendererProps) {
  return (
    <Box flex={1} backgroundColor="#FAFAFA" padding={0}>
      <Box height={104} backgroundColor="#fff" flexDirection="column-reverse">
        <HStack
          height={70}
          $base-mx="$5"
          justifyContent="space-between"
          alignItems="center"
          bg="#414141"
        >
          <HStack space="md" alignItems="center" bg="#f3f3f3">
            {props.header}
          </HStack>
          <HStack space="md" alignItems="center" bg="#f3f3f3">
            {props.extra}
          </HStack>
        </HStack>
      </Box>
      <Box flex={1}>
        {props.children}
      </Box>
      {props.footer}
    </Box>
  )
}
