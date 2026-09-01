import { TabsType } from '../../types'
import { Tabs } from 'antd'
import React from 'react'
import "./style.css"


const ClubTab = ({ items, activeKey, onChange }: TabsType) => {
    return <div className='w-full mx-auto '>
        <Tabs items={items} defaultActiveKey={activeKey || '0'} onChange={onChange} />
    </div>
}

export default ClubTab

