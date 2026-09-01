'use client';

import React from 'react';
import { Field } from 'formik';
import { t } from '@repo/i18n';
import CustomButton from '../../form/formButton';
import FormInput from '../../form/formInput';
import SelectFormik from '../../form/select/selectFormik';
import { FilterOutlined } from '@ant-design/icons';
import { Col, Row, Button, Drawer, Grid } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '@repo/i18n/react';

const { useBreakpoint } = Grid;



const FilterInput = ({ filter ,formik }: { filter: Array<{ label: string; name: string }> , formik:any }) => {

      const [mount , setMount]=useState(false)
      const { language } = useLanguage();

    useEffect(()=>{
      setMount(true)
    },[])

  const [open, setOpen] = useState(false);
  const screens = useBreakpoint();

  const yearDropDown = useMemo(() => [
    { value: '1403', label: '1403' },
    { value: '1404', label: '1404' },
    { value: '1405', label: '1405' },
    { value: '1406', label: '1406' },
    { value: '1407', label: '1407' },
    { value: '0', label: t('all') },
  ], [language]);

  const monthDropDown = useMemo(() => [
    { value: '01', label: t('monthFarvardin') },
    { value: '02', label: t('monthOrdibehesht') },
    { value: '03', label: t('monthKhordad') },
    { value: '04', label: t('monthTir') },
    { value: '05', label: t('monthMordad') },
    { value: '06', label: t('monthShahrivar') },
    { value: '07', label: t('monthMehr') },
    { value: '08', label: t('monthAban') },
    { value: '09', label: t('monthAzar') },
    { value: '10', label: t('monthDey') },
    { value: '11', label: t('monthBahman') },
    { value: '12', label: t('monthEsfand') },
  ], [language]);

  const renderFields = () => (
    <>
      {filter?.map((data) => (
        <Col
          key={data.name}
          xs={{ span: 12 }}
          sm={{ span: 12 }}
          md={{ span: 3 }}
          className="!text-base"
        >
          <Field
            label={data.label}
            name={data.name}
            component={FormInput}
            prefix={<FilterOutlined className="text-blue-400" />}
            className="!text-base"
          />
        </Col>
      ))}

      <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 3 }}>
        <Field
          name="year"
          component={SelectFormik}
          options={yearDropDown}
          placeholder={t('select')}
          title={t('selectYear')}
        />
      </Col>

      <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 3 }}>
        <Field
          name="month"
          component={SelectFormik}
          options={monthDropDown}
          placeholder={t('select')}
          title={t('selectMonth')}
        />
      </Col>

      <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 3 }}>
        <CustomButton
        htmlType='submit'
          type="primary"
          size="large"
          label={t('searchPlaceholder')}
          className="!mt-10"
          onClick={()=>formik.submitForm()}
        />
      </Col>
    </>
  );

  if(!mount) return null;

  return (
    <>
      {screens.md ? (
        <Row className="flex gap-8 justify-center mt-10 !text-base">{renderFields()}</Row>
      ) : (
        <>
          <Button
            type="primary"
            icon={<FilterOutlined />}
            onClick={() => setOpen(true)}
            className="flex items-center mx-auto my-10"
          >
            {t('showFilters')}
          </Button>

          <Drawer
            title={t('filters')}
            placement="bottom"
            open={open}
            onClose={() => setOpen(false)}
            height="70%"
          >
            <Row gutter={[16, 16]}>{renderFields()}</Row>
          </Drawer>
        </>
      )}
    </>
  );
};

export default FilterInput;
