import React from 'react'
import type { useService } from './use/useService'

export const WS_URL = 'wss://chat-ws.xueliang.org/socketjs'

export type IShinyChat = ReturnType<typeof useService> & {
  token: string | null
  isLoading: boolean
  onlineCount: number
  login: (email: string, password: string) => void
  register: () => void
  logout: () => void
  tokenLogin: (token: string) => Promise<string>
  enterChatRoom: (roomId: number) => void
}

export function useShinyChat(): IShinyChat {
  const value = React.useContext(ShinyChatContext)
  if (!value)
    throw new Error('useSessionToken must be wrapped in a <SessionTokenProvider />')

  return value
}

export const ShinyChatContext = React.createContext<IShinyChat | null>(null)
