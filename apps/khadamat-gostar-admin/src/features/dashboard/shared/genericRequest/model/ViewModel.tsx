'use client';

import { message } from 'antd';
import type { FormikHelpers } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';

import {
  getPortalServiceByKey,
  type PortalServiceKey,
} from '@/features/dashboard/services';

import type { GenericRequestFormValues } from '../types';

const initialValues: GenericRequestFormValues = {
  personnelCode: '',
  subject: '',
  description: '',
  phoneNumber: '',
};

const validationSchema = Yup.object({
  personnelCode: Yup.string().required('کد پرسنلی الزامی است.'),
  subject: Yup.string().required('موضوع درخواست الزامی است.'),
  description: Yup.string()
    .min(10, 'توضیحات باید حداقل ۱۰ کاراکتر باشد.')
    .required('توضیحات درخواست الزامی است.'),
  phoneNumber: Yup.string(),
});

export const useGenericRequestViewModel = ({
  serviceKey,
  onClose,
}: {
  serviceKey: PortalServiceKey;
  onClose: () => void;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const service = getPortalServiceByKey(serviceKey);

  const modalTitle = useMemo(
    () => `فرم ${service?.label ?? 'درخواست'}`,
    [service?.label],
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (
    values: GenericRequestFormValues,
    helpers: FormikHelpers<GenericRequestFormValues>,
  ) => {
    console.log('portal service request', {
      service: service?.key,
      ...values,
    });
    helpers.setSubmitting(false);
    message.success('درخواست ثبت شد.');
    onClose();
  };

  return {
    service,
    isMounted,
    modalTitle,
    initialValues,
    validationSchema,
    handleSubmit,
  };
};
