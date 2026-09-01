'use client'
import { useState } from 'react'

export const useShowMainMenu = () => {
    const [show, setShow] = useState(false)

    const handleShow = (props: boolean) => {
        setShow(props)
    }
    return { show, handleShow }
}