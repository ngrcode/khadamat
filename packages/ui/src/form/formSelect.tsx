import React from 'react'
import { Select, Form as AntdForm } from 'antd'
import { SelectType } from '../types'

const FormSelect: React.FC<SelectType> = ({ mode, style, placeholder, defaultValue, onChange, optionRender, options }: SelectType) => (
    <AntdForm.Item>
        <Select
            mode={mode}
            style={style}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={onChange}
            options={options}
            optionRender={optionRender}
        />
    </AntdForm.Item>
)

export default FormSelect


