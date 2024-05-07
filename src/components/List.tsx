import { Box, HStack, Heading, Icon, SectionList, Text, VStack } from '@gluestack-ui/themed'
import type { ReactNode } from 'react'
import type { SectionBase } from 'react-native'
import { TouchableNativeFeedback } from 'react-native'
import { Bell, ChevronRight } from 'lucide-react-native'

export interface ListItem {
  id: number | string
  arrow?: boolean | ReactNode
  content?: ReactNode
  clickable?: boolean
  description?: ReactNode
  disabled?: boolean
  extra?: ReactNode
  prefix?: ReactNode
  title?: ReactNode
  onPress?: (item: any) => void
}

export interface ListData {
  title?: ReactNode
  data: ListItem[]
}

export interface ListProps {
  data: ReadonlyArray<ListData>
  onPress?: (item: any) => void
}

export default function List(props: ListProps) {
  return (
    <Box>
      <SectionList
        sections={props.data}
        keyExtractor={item => (item as ListItem).id.toString()}

        renderItem={({ item }) => {
          const { arrow, onPress, clickable } = item as ListItem
          return (
            <ListItem
              {...item as ListItem}
              arrow={arrow === false ? false : arrow ?? onPress !== undefined}
              clickable={clickable === false ? false : clickable ?? onPress !== undefined}
              onPress={() => {
                props.onPress?.(item)
                onPress?.(item)
              }}
            />
          )
        }}
        renderSectionHeader={({ section }) => {
          const { title } = section as ListData
          return title !== undefined ? <Text>{title}</Text> : null
        }}
      />
    </Box>
  )
}

export function ListItem(props: ListItem) {
  const { prefix, extra, title, description, arrow, onPress, content, clickable } = props

  const Item = (
    <Box backgroundColor="#fff">
      <HStack $base-mx="$5" $base-my="$3" space="md" alignItems="center">
        {prefix}
        <VStack flex={1}>
          {content && <Text>{content}</Text>}
          {title && <Text size="md">{title}</Text>}
          {description && <Text size="xs">{description}</Text>}
        </VStack>
        {extra || (arrow !== false && <Icon as={ChevronRight} />)}
      </HStack>
    </Box>
  )

  return (
    <Box backgroundColor="#fff">
      { clickable !== false
        ? (
          <TouchableNativeFeedback
            onPress={() => onPress?.(props)}
            background={TouchableNativeFeedback.Ripple('#0000000a', true)}
          >
            {Item}
          </TouchableNativeFeedback>
          )
        : Item}
    </Box>
  )
}
