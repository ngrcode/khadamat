import { CSSProperties } from 'react'

export interface alertType {
    message: string,
    type: "success" | "info" | "warning" | "error" | undefined,
    showIcon: boolean,
    closAble: boolean,
    style: CSSProperties | undefined,
}