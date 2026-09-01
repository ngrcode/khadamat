import { AlertType } from '../types'
import { Alert } from 'antd'
import React from 'react'

export const ClubAlert: React.FC<AlertType> = ({ message, type, showIcon, closAble, style }: AlertType) =>
    <Alert style={style} message={message} type={type} showIcon={showIcon} closable={closAble} />


