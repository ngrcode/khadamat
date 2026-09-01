'use client'

import type { JSX } from 'react'
import { AppContext, LoginContext, SidebarToggleContext } from '@/contexts/app'
import { useAppContextValue } from '@/contexts/app/appContextValue'
import { useLoginContext } from '@/contexts/app/appLoginValue'
import { useSidebarToggle } from '@/contexts/app/sidebarToggle'
import { useShowMainMenu } from '@/contexts/app/showMainMenu'
export const AppContextProvider = ({ children }): JSX.Element => {
  const { user } = useAppContextValue()
  const { isLogedIn, handleLogin } = useLoginContext()
  const { expanded, handleExpand } = useSidebarToggle()
  const {show ,handleShow}=useShowMainMenu()
  return <AppContext.Provider value={user}>
    <LoginContext.Provider value={{ isLogedIn, handleLogin }}>
      <SidebarToggleContext.Provider value={{ expanded, handleExpand }} >
        
        {children}
     </SidebarToggleContext.Provider>
    </LoginContext.Provider>
  </AppContext.Provider>
}


