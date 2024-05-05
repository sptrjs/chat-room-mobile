import {
  Box,
} from '@gluestack-ui/themed'
import { Image } from 'expo-image'

export default function Avatar({ avatar, size }: { avatar?: string, size?: number }) {
  const defaultSize = size ?? 32

  return (
    <Box position="relative">
      <Box w={defaultSize} h={defaultSize} borderRadius={defaultSize} overflow="hidden">
        <Image
          style={{
            width: '100%',
            height: '100%',
          }}
          alt="avatar"
          source={avatar?.startsWith('http') ? avatar : `https:${avatar}`}
        />
      </Box>

    </Box>
  )
}
