import { CommonModalForm, Field, FormikUploader, FormInput, t } from '@/components';
import { useEditViewModel } from '../model/ViewModel';
import { Col, Row } from 'antd';
import PersianDatePickerFormik from '@/components/form/datePicker/persianDatePickerFormik';
import dynamic from 'next/dynamic';
import SelectFormik from '@/components/form/select/selectFormik';

const TexeEditorCKFormik = dynamic(() => import('@/components/form/textEditorck/textEditor'), {
  ssr: false,
});
interface EditProps {
  record: any;          // رکوردی که قرار است ویرایش شود
  onClose: () => void;  // تابع بستن مودال
  onSuccess?: () => void; // تابع پس از ویرایش موفق (رفرش جدول)
}

export const Edit: React.FC<EditProps> = ({ record, onClose, onSuccess }) => {

  const { initialValues, validationSchema, onSubmit } = useEditViewModel({
    dataEdit: record,
    handleData: onClose,
    onSuccess,
  });

  return (
    <>
      {
        initialValues?.Body &&
         <CommonModalForm
          title={`${t('edit')}`}
          visible={!!record}
          onCancel={onClose}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize={true}
          buttonLabel={t('edit')}
          widthModal="full"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={12}>
              <Field label={t('title')} name='Title' component={FormInput} />

            </Col>
            <Col xs={24} sm={24} md={24} lg={24}>
              <Field
                name="Body"
                component={TexeEditorCKFormik}
                placeholder={t('placeholderRichTextEditor')}
                variant="outlined"
                wrapperClassName="h-96"
              />
            </Col>

            <Col xs={24} sm={24} md={12} lg={12}>
              <Field
                name="StartedAtString"
                component={PersianDatePickerFormik}
                label={t('publishDate')}
                placeholder={t('chooseDate')}
                onChange={() => { }}
                className="w-full"
              />
            </Col>

            <Col xs={24} sm={24} md={12} lg={12}>
              <Field
                name="FinishedAtString"
                component={PersianDatePickerFormik}
                label={t('publishDate')}
                placeholder={t('chooseDate')}
                onChange={() => { }}
                className="w-full"
              />
            </Col>


            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Field
                name="IsPublished"
                component={SelectFormik}
                options={[
                  { value: true, label: 'فعال' },
                  { value: false, label: 'غیر فعال' },
                ]
                }
                placeholder={t('status')}
                variant="outlined"
                title={t('status')}
                width="100%"
              />
            </Col>


            <Col xs={24} sm={24} md={12} lg={12}>
              <Field
                label={`${t('image')} ${t('choice')}`}
                name='File'
                component={FormikUploader}
                multiple={false}
              />
            </Col>

          </Row>
        </CommonModalForm>}
    </>
  );
};