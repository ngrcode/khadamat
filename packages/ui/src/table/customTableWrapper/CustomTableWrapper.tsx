import React from 'react';
import { Row, Col } from 'antd';

interface CustomTableWrapperProps {
  addButton?: React.ReactNode;
  searchForm?: React.ReactNode;
  table: React.ReactNode;
  modalDelete?: React.ReactNode;
  modalActive?: React.ReactNode;
  modalActivData?: React.ReactNode;
  deleteProps?: {
    deleteFN: React.ReactNode;
    urlDelete: string;
    titleDelete: string;
    getDeleteId: (record: any) => string;
  };
  activeProps?: {
    onActive: boolean;
    activeFN: React.ReactNode;
    urlActive: string;
    titleActive: string;
  };
}

const CustomTableWrapper: React.FC<CustomTableWrapperProps> = ({
  addButton,
  searchForm,
  table,
  modalDelete,
  modalActive,
  modalActivData,
}) => {
  return (
    <>
      {addButton || searchForm && <Row justify='center' align='middle' className='my-4'>
        <Col span={12}>{addButton}</Col>
        <Col span={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {searchForm}
        </Col>
      </Row>}
      {table}
      {modalDelete}
      {modalActive}
      {modalActivData}
    </>
  );
};

export default CustomTableWrapper;
