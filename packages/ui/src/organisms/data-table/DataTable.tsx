'use client';

import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';

export type DataTableProps<RecordType extends object> = Omit<TableProps<RecordType>, 'columns' | 'dataSource'> & {
  columns: ColumnsType<RecordType>;
  data: readonly RecordType[];
};

export function DataTable<RecordType extends object>({ data, columns, ...props }: DataTableProps<RecordType>) {
  return <Table<RecordType> columns={columns} dataSource={data} {...props} />;
}
