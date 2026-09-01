'use client'
import { Modal } from 'antd'
import React, { ReactNode } from 'react'

const CustomModal = ({ title, open, children, onOk, onCancel, customButton, onClose }: CustomModalType) => {
    return (
        <Modal
            onClose={onClose}
            open={open}
            title={title}
            onOk={onOk}
            onCancel={onCancel}
            footer={(_, { OkBtn, CancelBtn }) => (
                <>
                    {customButton}
                    {onCancel !== undefined && <CancelBtn />}
                    {onOk !== undefined && <OkBtn />}
                </>
            )}
        >
            {children}
        </Modal>
    )
}

export default CustomModal


export interface CustomModalType { title: string, open: boolean, children?: ReactNode, onOk?: () => void, onCancel?: () => void, customButton?: ReactNode, onClose?: () => void }