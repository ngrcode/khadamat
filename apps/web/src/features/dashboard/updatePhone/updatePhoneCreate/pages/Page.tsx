'use client';

import { Field, FormikUploader, t } from '@/components';
import { CommonForm } from '@/components/form/modalForm/CommonFormProps';
import { useAddViewModel } from '../model/ViewModel';
import { useGetUpdatePhone } from '../../organisms/useGetAllRole';
import useDownloadExcelGetValues from '@/hook/useDownloadExcel';

import {
  Button,
  Card,
  Col,
  Row,
  Tag,
  Typography,
} from 'antd';

import {
  FileExcelOutlined,
  LoadingOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

const UpdatePhoneCreate = () => {
  const { initialValues, validationSchema, onSubmit } =
    useAddViewModel();

  const { dataUPDATEPHONE } = useGetUpdatePhone();

  const {
    handleDownloadExcelGetValues,
    isLoadingExcelGetValues,
  } = useDownloadExcelGetValues();

  const info = dataUPDATEPHONE?.info;

  const handleExportExcel = () => {
    handleDownloadExcelGetValues(
      'api/1/Employee/ExportExcelAllEmployee',
      {},
    );
  };

  return (
    <CommonForm
      title='بروز رسانی شماره تلفن'
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
      buttonLabel='بروز رسانی شماره تلفن'
    >
      <Row gutter={[16, 16]}>
        {info && (
          <Col span={24}>
            <Card size="small">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <Text strong>{info.title}</Text>

                  <Tag color="success">
                    {info.persianLastupdateDate}
                  </Tag>

                  <Tag color="blue">
                    {info.serviceType}
                  </Tag>
                </div>

                <Button
                  type="primary"
                  size="middle"
                  onClick={handleExportExcel}
                  loading={isLoadingExcelGetValues}
                  icon={
                    isLoadingExcelGetValues ? (
                      <LoadingOutlined />
                    ) : (
                      <FileExcelOutlined />
                    )
                  }
                >
                  دانلود نمونه فایل تمپلیت
                </Button>
              </div>
            </Card>
          </Col>
        )}

        <Col span={24}>
          <Card size="small">
            <div className="mb-3">
              <Text type="secondary">
                فایل اکسل جدید را با فرمت .xlsx بارگذاری
                کنید.
              </Text>
            </div>

            <Field
              label={t('attachment')}
              name="file"
              component={FormikUploader}
            />
          </Card>
        </Col>
      </Row>
    </CommonForm>
  );
};

export default UpdatePhoneCreate;
