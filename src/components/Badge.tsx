import { BadgeText, Badge as ThemedBadge } from '@gluestack-ui/themed'

export default function Badge() {
  return (
    <ThemedBadge
      h={22}
      w={22}
      bg="$red600"
      borderRadius="$full"
      mb={-14}
      mr={-14}
      zIndex={1}
      variant="solid"
      alignSelf="flex-end"
    >
      <BadgeText color="$white">2</BadgeText>
    </ThemedBadge>
  )
}
