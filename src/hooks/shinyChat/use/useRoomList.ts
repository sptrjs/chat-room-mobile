import React from 'react'

export function useRoomList() {
  const [list, setList] = React.useState()

  return {
    list,
    setList,
  }
}
