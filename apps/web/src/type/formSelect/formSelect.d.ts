import React from 'react'
export interface selectType {
    mode: "multiple" | "tags" | undefined, style: React.CSSProperties, placeholder: string, defaultValue: selectOptionsType,
    onChange: () => void, optionRender: () => React.ReactNode, options: selectOptionsType[]
}

export interface selectOptionsType {
    label: string,
    value: string,
}