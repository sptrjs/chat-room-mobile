import { Box, Button, ButtonText, Center, Heading, Text } from '@gluestack-ui/themed'
import { useLocalSearchParams } from 'expo-router'
import Avatar from '@/src/components/Avatar'
import { useFriend } from '@/src/hooks/shinyChat'

export default function Detail() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { friend } = useFriend(Number.parseInt(id))

  if (!friend)
    return <Text>未找到</Text>

  return (
    <Box>
      <Center>
        <Avatar size={120} avatar={friend.member2.avatar} />
        <Heading>
          {friend.member2.nickname ?? '未设置昵称'}
        </Heading>
      </Center>
      <Button>
        <ButtonText>
          ButtonText
        </ButtonText>
      </Button>
    </Box>
  )
}
