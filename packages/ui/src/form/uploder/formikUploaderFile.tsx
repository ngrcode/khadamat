import React, { useState, useEffect } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import { FieldProps } from 'formik';
import { UploadFile } from 'antd/es/upload/interface';
import { t } from '@repo/i18n';

interface FormikUploaderFileProps extends FieldProps {
  label: string;
  acceptedFileTypes?: string; 
  classNameLabel?: string;
}

const FormikUploaderFile: React.FC<FormikUploaderFileProps> = ({
  field,
  form: { setFieldValue, setFieldTouched, errors, touched },
  label,
  acceptedFileTypes = 'video/*',  
  classNameLabel = '',
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (field.value) {
      const fileUrl = URL.createObjectURL(field.value);
      setFileList([
        {
          uid: '-1',
          name: field.value.name || 'video',
          status: 'done',
          url: fileUrl,  
        },
      ]);
    }
  }, [field.value]);

  const handleChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList);
    const file = fileList[0]?.originFileObj;
    setFieldValue(field.name, file || null);  // Update the form value with the selected file
  };

  const handleBlur = () => {
    setFieldTouched(field.name, true);  // Mark the field as touched for validation
  };

  return (
    <div className="flex flex-col justify-center items-start mt-2" style={{ width: '100%' }}>
      <label className={classNameLabel}>{label}</label>
      <Upload
        accept={acceptedFileTypes}
        maxCount={1}
        fileList={fileList}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-full"
        beforeUpload={() => false}  
        onRemove={() => setFieldValue(field.name, null)} 
      >
        <Button className="w-full" icon={<UploadOutlined />}>
       {`${t('choice')} ${t('file')}`}
        </Button>
      </Upload>
      {touched[field.name] && errors[field.name] ? (
        <div style={{ color: 'red' }}>{errors[field?.name]}</div>
      ) : null}
    </div>
  );
};

export default FormikUploaderFile;
