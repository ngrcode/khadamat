'use client'

import { SetStateAction, useState } from 'react'

import { handleLocalStorage } from '@/utils/localStorage'

const enumsStorages = handleLocalStorage({
  key: 'user',
  type: 'getLocalStorage',
})
export const useAppContextValue = () => {
  let parsedUser = ''

  if (typeof window !== 'undefined') {
    parsedUser = enumsStorages
  }

  const [user, setUser] = useState(parsedUser)

  const handleUser = (props: SetStateAction<string>) => {
    handleLocalStorage({
      key: 'user',
      type: 'setLocalStorage',
      item: JSON.stringify(props),
    })
    setUser(props)
  }
  return { user, handleUser }
}
