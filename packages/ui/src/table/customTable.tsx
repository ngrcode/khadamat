import { Button, Col, Empty, Modal, Row, Space, Table, Typography } from 'antd';
import React, { useState } from 'react';

import { t } from '@repo/i18n';

import CustomButton from '../form/formButton';

import SearchForm from './searchForm';
import { useCustomTableViewModel } from './useCustomTableViewModel';
import ClubLoading from '../loading';

interface CustomTableProps<T> {
  columns: any;
  addFN?: any;
  editFN?: any;
  deleteFN?: any;
  dataSource: T[];
  rowKey: string;
  total: number;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  // onAdd?: () => void;
  onSearch?: (search: string) => void;
  isLoading?: boolean;
  isError?: boolean;
  refetch?: () => void;
  editModal?: boolean;
  addModal?: boolean;
  deleteModal?: boolean;
  hasPagination?: boolean;
}

const CustomTable = <T,>({
  columns,
  dataSource,
  rowKey,
  total,
  onEdit,
  onDelete,
  // onAdd,
  onSearch,
  isLoading,
  isError,
  refetch,
  addFN,
  editFN,
  deleteFN,
  editModal = false,
  addModal = false,
  deleteModal = false,
  hasPagination = true,
}: CustomTableProps<T>) => {
  const { pagination, handleTableChange } = useCustomTableViewModel(total);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleDelete, setModalVisibleDelete] = useState(false);
  const [modalVisibleEdit, setModalVisibleEdit] = useState(false);

  if (isLoading) {
    return <div><ClubLoading /></div>;
  }

  if (isError) {
    return (
      <div>
        {t('errorLoadingData')} <Button onClick={refetch}>
          {t('retry')}
        </Button>
      </div>
    );
  }

  if (!dataSource.length) {
    return (
      <div>
        <Empty description={<Typography.Text>{t('noData')}</Typography.Text>} />
      </div>
    );
  }

  const actionColumn = (onEdit || onDelete) && {
    title: t('action'),
    key: 'action',
    render: (_, record: { [key: string]: any }) => (
      <Space size="middle">
        {onEdit && (
          <Button
            onClick={() => {
              onEdit(record.id);
              setModalVisibleEdit(!modalVisibleEdit);
            }}
            type="link"
          >
            {t('edit')}
          </Button>
        )}
        {onDelete && (
          <Button
            onClick={() => {
              return (
                onDelete(record.id), setModalVisibleDelete(!modalVisibleDelete)
              );
            }}
            type="link"
            danger
          >
            {t('delete')}
          </Button>
        )}
      </Space>
    ),
  };

  // const handleCancel = (v) => {


  // };
  const onSubmit = async (values) => {

  };

  return (
    <>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col>
          <Button type="primary" onClick={() => setModalVisible(!modalVisible)}>
            {t('add')}
          </Button>
        </Col>
        <Col>
          <SearchForm onSearch={onSearch} />
        </Col>
      </Row>
      <Table
        columns={actionColumn ? [...columns, actionColumn] : columns}
        dataSource={dataSource}
        rowKey={rowKey}
        pagination={hasPagination ? {
          current: pagination?.current,
          pageSize: pagination?.pageSize,
          total,
        } : false}
        onChange={handleTableChange}
        scroll={{ x: 900 }}
      />
      {editModal && modalVisibleEdit && (
        <Modal
          title={t('edit')}
          onOk={onSubmit}
          visible={modalVisibleEdit}
          onCancel={() => setModalVisibleEdit(!modalVisibleEdit)}
          footer={[
            // eslint-disable-next-line react/jsx-key
            <div className="relative ">
              <div className="absolute -bottom-6 left-0 w-1/3">
                <CustomButton
                  type="primary"
                  shape="round"
                  key="block"
                  size="large"
                  onClick={() => setModalVisibleEdit(!modalVisibleEdit)}
                  label={t('cancel')}
                />
                ,
              </div>
            </div>,
          ]}
        >
          {editFN}
        </Modal>
      )}
      {deleteModal && modalVisibleDelete && (
        <Modal
          title={t('delete')}
          onOk={onSubmit}
          visible={modalVisibleDelete}
          onCancel={() => setModalVisibleDelete(!modalVisibleDelete)}
          footer={[
            // eslint-disable-next-line react/jsx-key
            <div className="relative ">
              <div className="absolute -bottom-6 left-0 w-1/3">
                <CustomButton
                  type="primary"
                  shape="round"
                  key="block"
                  size="large"
                  onClick={() => setModalVisibleDelete(!modalVisibleDelete)}
                  label={t('no')}
                />
                ,
              </div>
            </div>,
          ]}
        >
          {deleteFN}
        </Modal>
      )}
      {addModal && modalVisible && (
        <Modal
          title={t('add')}
          onOk={onSubmit}
          visible={modalVisible}
          onCancel={() => setModalVisible(!modalVisible)}
          footer={[
            // eslint-disable-next-line react/jsx-key
            <div className="relative ">
              <div className="absolute -bottom-6 left-0 w-1/3">
                <CustomButton
                  type="primary"
                  shape="round"
                  key="block"
                  size="large"
                  onClick={() => setModalVisible(!modalVisible)}
                  label={t('cancel')}
                />
                ,
              </div>
            </div>,
          ]}
        >
          {addFN}
        </Modal>
      )}
    </>
  );
};

export default CustomTable;
