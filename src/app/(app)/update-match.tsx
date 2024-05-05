import { Box, Card, HStack, Heading, ScrollView, Text } from '@gluestack-ui/themed'
import React from 'react'
import { useShinyChat } from '@/src/hooks/shinyChat'
import type { MatchDetail } from '@/src/hooks/shinyChat/apis'
import { getMatchDetail } from '@/src/hooks/shinyChat/apis'

export default function UpdateMatch() {
  const [form, setForm] = React.useState<MatchDetail>()
  const { token } = useShinyChat()

  React.useEffect(() => {
    if (!token)
      return
    getMatchDetail?.({ token }).then((res) => {
      if (res.code === 0)
        setForm(res.data)
    })
  }, [])

  return (
    <Box>
      <Card size="md" variant="elevated" m="$3">

        <ScrollView>
          <ListItem label="gender" value={form?.gender} />
          <ListItem label="minAge" value={form?.minAge} />
          <ListItem label="maxAge" value={form?.maxAge} />
          <ListItem label="minMole" value={form?.minMole} />
        </ScrollView>
      </Card>

    </Box>
  )
}

function ListItem({ label, value }: { label: string, value: any }) {
  return (
    <HStack justifyContent="space-between" bg="$white" py="$2">
      <Text>
        {label}
      </Text>
      <Text>
        {value}
      </Text>
    </HStack>
  )
}
