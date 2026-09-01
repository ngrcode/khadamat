import { UploadOutlined } from '@ant-design/icons';
import { Button, Space, Upload, message, UploadFile } from 'antd';
import React, { useState, useEffect } from 'react';
import { FieldProps } from 'formik';
import { useUiConfig } from '../../providers/UiConfigProvider';



const FormikUploaderPdf: React.FC<FieldProps> = ({ field, form }) => {
  const { setFieldValue, setFieldTouched, errors, touched } = form;
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { useSubmitFormData } = useUiConfig();
  const submitHook = useSubmitFormData?.();
  const submitFormData = submitHook?.submitFormData ?? (async () => undefined);
  const sendData = submitHook?.sendData ?? false;
  const infoData = submitHook?.infoData ?? false;
  // Initialize fileList if field.value contains an existing file URL
  useEffect(() => {
    if (field.value && typeof field.value === 'string') {
      setFileList([
        {
          uid: '-1',
          name: 'current-file',
          status: 'done',
          url: field.value,
        },
      ]);
    }
  }, [field.value]);

  // Generate a preview URL if the file is an image or document
  useEffect(() => {
    if (field.value) {
      
      if (field.value instanceof File) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewUrl(e.target?.result as string);
        };
        reader.readAsDataURL(field.value);
      } else if (typeof field.value === 'string') {
        setPreviewUrl(field.value);
      }
    } else {
      setPreviewUrl(null);
    }
  }, [field.value]);
useEffect(() => {
  if (sendData) {
    const uploadedFileUrl = infoData?.fileName;
    setFieldValue(field.name, uploadedFileUrl);
    setPreviewUrl(uploadedFileUrl);
    message.success('File uploaded successfully');
  }
}, [sendData, infoData]);

const handleChange = async ({ fileList }: { fileList: UploadFile[] }) => {
  setFileList(fileList);
  const fileListData = fileList[0]?.originFileObj || null; // Access the actual File object

  if (fileListData) {
    const reader = new FileReader();

    reader.onload = async (e) => {
      const Info = {
        file: fileListData,
      };

      try {
         await submitFormData(Info, {
          baseUrl: process.env.BASE_URL,
          endpoint: 'v1/files/upload',
          queryKey: 'v1/files/upload',
        });
       
      } catch (error) {
     
        setFieldValue(field.name, null);
      }
    };

    reader.readAsDataURL(fileListData);
  }
};

  const handleBlur = () => {
    setFieldTouched(field.name, true);
  };

  return (
    <div className='flex flex-col items-center w-full sm:w-3/4 md:w-1/2 mx-auto space-y-4'>
      <Space direction='vertical' className='w-full' size='large'>
        <Upload
          listType='text'
          maxCount={1}
          fileList={fileList}
          onChange={handleChange}
          onBlur={handleBlur}
          beforeUpload={() => false} // Prevent automatic upload by Ant Design
          accept='.pdf' // Restrict to PDF files
          className='w-full flex flex-col items-center min-h-32 max-h-48 h-auto'
        >
          <Button
            icon={<UploadOutlined />}
            className='w-full h-12 bg-blue-500 hover:bg-blue-600 text-white flex justify-center items-center'
            aria-label='Upload file'
          >
            بارگذاری فایل
          </Button>
        </Upload>

        {previewUrl && (
          <div className='text-center mt-2'>
            <a href={previewUrl} target='_blank' rel='noopener noreferrer'>
              Preview Uploaded File
            </a>
          </div>
        )}

        {touched[field.name] && errors[field.name] ? (
          <div className='text-red-500 flex justify-center items-center'>
            {errors[field.name]}
          </div>
        ) : null}
      </Space>
    </div>
  );
};

export default FormikUploaderPdf;
