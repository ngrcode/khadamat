'use client'

import { createContext } from 'react'

import type { AppContextType } from '@/type/appContext'
import { loginContextType } from '@/type/loginContext/loginContext'
import { sidebarToggleType } from '@/type/sidebarToggle/sidebarToggle'

export const AppContext = createContext<AppContextType>({} as AppContextType)
export const LoginContext = createContext<loginContextType>({} as loginContextType)
export const SidebarToggleContext = createContext<sidebarToggleType>({} as sidebarToggleType)

