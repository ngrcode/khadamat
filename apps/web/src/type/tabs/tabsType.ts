import { TabsProps } from 'antd'

export interface TabsType { items: TabsProps['items'], activeKey: string, onChange: (key: string) => void }
