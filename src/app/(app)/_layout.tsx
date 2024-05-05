import { Redirect, Stack } from 'expo-router'
import { Text } from '@gluestack-ui/themed'
import { useShinyChat } from '@/src/hooks/shinyChat'

export default function AppLayout() {
  const { token, isLoading } = useShinyChat()

  if (isLoading)
    return <Text>Loading...</Text>

  if (!token)
    return <Redirect href="/auth/" />

  return (
    <Stack />
  )
}
