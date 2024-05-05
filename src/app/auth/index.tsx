import React, { useState } from 'react'
import {
  Box,
  Button,
  ButtonText,
  Center,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { Link } from 'expo-router'
import Gradient from '../../assets/Icons/Gradient'
import Logo from '../../assets/Icons/Logo'

export default function Home() {
  return (
    <Box flex={1} backgroundColor="$white">
      <Box
        position="absolute"
        $base-h={500}
        $base-w={500}
        $lg-h={500}
        $lg-w={500}
      >
        <Gradient />
      </Box>

      <Box
        height="60%"
        $base-my="$16"
        $base-mx="$5"
        $base-height="80%"
        $lg-my="$24"
        $lg-mx="$5"
        justifyContent="space-between"
      >

        <Box justifyContent="center" alignItems="center">
          <Logo />
        </Box>

        <VStack space="md">
          <Link href="/auth/login" asChild>
            <Button>
              <ButtonText fontSize="$sm" fontWeight="$medium">
                登录
              </ButtonText>
            </Button>
          </Link>

          <Link href="/auth/register" asChild>
            <Button>
              <ButtonText fontSize="$sm" fontWeight="$medium">
                注册
              </ButtonText>
            </Button>
          </Link>

          <Center>
            <Text>
              <Link href="/auth/token-login">
                Token Login
              </Link>
            </Text>
          </Center>

          <Center>
            <Text>
              当前在线人数
            </Text>
          </Center>
        </VStack>

      </Box>
    </Box>
  )
}
