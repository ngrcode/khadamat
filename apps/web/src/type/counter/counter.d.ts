import React from 'react'
export interface counterDataType {
    start: number,
    end: number,
    duration: number,
    delay: number,
    separator: string,
    decimal: string,
    icon: React.JSX.Element,
    title: string,
}