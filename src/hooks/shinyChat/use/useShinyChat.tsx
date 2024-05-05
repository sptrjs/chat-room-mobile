import React from 'react'
import { type IShinyChat, ShinyChatContext } from '../context'

export function useShinyChat(): IShinyChat {
  const value = React.useContext(ShinyChatContext)
  if (!value)
    throw new Error('useSessionToken must be wrapped in a <SessionTokenProvider />')

  return value
}
