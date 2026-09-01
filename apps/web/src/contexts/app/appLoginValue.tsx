import { useState } from 'react'

export const useLoginContext = () => {
    const [isLogedIn, setLogedIn] = useState(false)

    const handleLogin = (props: boolean) => {
        setLogedIn(props)
    }
    return { isLogedIn, handleLogin }
}