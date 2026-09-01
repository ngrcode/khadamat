import { Upload } from 'antd';
import { UploadOutlined, FileOutlined, CloseOutlined } from '@ant-design/icons';
import { FaFilePdf } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { FieldProps } from 'formik';
import { t } from '@repo/i18n';

const FormikUploader: React.FC<FieldProps> = ({ field, form }) => {
  const { setFieldValue, setFieldTouched, errors, touched } = form;

  const [fileList, setFileList] = useState<any[]>([]);
  const [fileName, setFileName] = useState<string>('');

  useEffect(() => {
    if (field.value && typeof field.value === 'string') {
      const name = field.value.split('/').pop() || 'file';
      setFileName(name);
      setFileList([
        {
          uid: '-1',
          name: name,
          status: 'done',
          url: `${process.env.BASE_IMG}${field.value}`,
        },
      ]);
    } else if (field.value instanceof File) {
      setFileName(field.value.name);
      setFileList([
        {
          uid: '-1',
          name: field.value.name,
          status: 'done',
          originFileObj: field.value,
        },
      ]);
    } else {
      setFileName('');
      setFileList([]);
    }
  }, [field.value]);

  const handleChange = ({ fileList }: { fileList: any[] }) => {
    setFileList(fileList);
    setFieldTouched(field.name, true);
    const file = fileList[0]?.originFileObj || null;
    setFieldValue(field.name, file);
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('');
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFileList([]);
    setFileName('');
    setFieldValue(field.name, null);
  };

  const isError = touched[field.name] && errors[field.name];
  const hasFile = fileList.length > 0 || fileName;

  return (
    <div className="w-full" data-field-name={field.name}>
      <Upload
        maxCount={1}
        showUploadList={false}
        fileList={fileList}
        onChange={handleChange}
        beforeUpload={() => false}
        className="custom-upload w-full"
      >
        <div
          className={`
            group
            w-full
            h-[280px]
            rounded-3xl
            border-2
            border-dashed
            app-upload-dropzone
            cursor-pointer
            flex
            flex-col
            items-center
            justify-center
            transition-all
            duration-300
            ${isError
              ? 'border-red-500 bg-red-50/80 hover:border-red-600 ring-2 ring-red-200'
              : hasFile
                ? 'border-success bg-success/5 hover:border-success'
                : 'border-primary-200 hover:border-primary-500 hover:shadow-glow-gold'
            }
          `}
        >
          {hasFile ? (
            // Show uploaded file state
            <div className="w-full h-full flex flex-col items-center justify-center p-6 relative">
              <div className="absolute top-4 right-4">
                <button
                  onClick={handleRemove}
                  className="
                    w-8 h-8 rounded-full
                    bg-red-500 hover:bg-red-600
                    text-white
                    flex items-center justify-center
                    transition-all duration-300
                    hover:scale-110
                  "
                >
                  <CloseOutlined className="text-sm" />
                </button>
              </div>

              <div className="w-20 h-20 rounded-full bg-success/10 border-2 border-success flex items-center justify-center mb-4">
                <FaFilePdf className="text-4xl text-red-500" />
              </div>

              <h3 className="app-upload-dropzone__title font-semibold text-lg text-center">
                {fileName || t('selectedFile')}
              </h3>

              <p className="text-success text-sm mt-2 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-success inline-block animate-pulse" />
                {t('fileSelectedSuccess')}
              </p>

              <div className="mt-4 px-5 py-2 rounded-full bg-primary-100 text-primary-600 text-sm font-medium hover:bg-primary-200 transition-colors">
                <UploadOutlined className="ml-2" />
                {t('changeFile')}
              </div>
            </div>
          ) : (
            // Show default empty state
            <>
              <div className="w-20 h-20 rounded-full bg-primary-50 border border-primary-200 flex items-center justify-center mb-5 group-hover:bg-primary-100 transition-colors">
                <FaFilePdf className="text-4xl text-red-500" />
              </div>

              <h3 className="app-upload-dropzone__title font-semibold text-lg">
                {t('uploadPdfFile')}
              </h3>

              <p className="app-upload-dropzone__muted text-sm mt-2 text-center px-4">
                {t('clickOrDragFile')}
              </p>

              <div className="mt-5 px-6 py-2.5 rounded-full bg-gradient-gold hover:bg-gradient-gold-hover text-white text-sm font-medium transition-all duration-300 shadow-glow-gold hover:shadow-xl">
                <UploadOutlined className="ml-2" />
                {t('selectFile')}
              </div>

              <p className="app-upload-dropzone__muted text-xs mt-3">
                {t('pdfAllowedFormats')}
              </p>
            </>
          )}
        </div>
      </Upload>

      {isError && (
        <div className="mt-3 text-sm text-red-600 font-medium flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block animate-pulse" />
          {errors[field.name] as string}
        </div>
      )}
    </div>
  );
};

export default FormikUploader;
