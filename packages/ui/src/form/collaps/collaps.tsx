'use client'
import { useEffect, useState } from 'react';
import FormikWrapper from '../../formik/formikWrapper';
import { t } from '@repo/i18n';
import { Typography } from 'antd';
import { FormikProps } from 'formik';
import CustomButton from '../formButton';
import {
  SearchOutlined,
  ClearOutlined,
  DownOutlined,
  UpOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { cn } from '@repo/utils/cn';
import { useTheme } from '@repo/theme';
import { motion, AnimatePresence } from 'framer-motion';

interface CollapsProps {
  initialValues: any;
  validationSchema: any;
  enableReinitialize?: boolean;
  onSubmit: any;
  children?: React.ReactNode;
  checkIfModified?: (values: any) => void;
  header?: string;
  handel?: any;
  submitLabel?: string;
  clearLabel?: string;
  handleDownload?: any;
  handleDownloadshow?: boolean;
  showHeaderIcon?: boolean;
  collapsible?: boolean;
  defaultOpen?: boolean;
}

const Collaps: React.FC<CollapsProps> = ({
  initialValues,
  validationSchema,
  onSubmit,
  children,
  header,
  enableReinitialize = false,
  handleDownload,
  handleDownloadshow = false,
  checkIfModified,
  handel,
  submitLabel = t('searchPlaceholder'),
  clearLabel = t('clear'),
  showHeaderIcon = true,
  collapsible = true,
  defaultOpen = false,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeKey, setActiveKey] = useState<string | string[]>(
    defaultOpen ? ['1'] : []
  );
  const [isExpanded, setIsExpanded] = useState(defaultOpen);

  const handleReset = (formikProps: FormikProps<any>) => {
    formikProps.resetForm();
    if (handel) {
      handel();
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };


  const headerVariants = {
    collapsed: { rotate: 0 },
    expanded: { rotate: 180 }
  };

  const contentVariants = {
    collapsed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    expanded: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.05
      }
    }
  };

  const buttonVariants = {

    tap: {
      scale: 0.98,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full"
    >
      <div className={cn(
        'rounded-2xl overflow-hidden',
        'shadow-xl',
        'border',
        'transition-all duration-300',
        isDark
          ? 'bg-gray-800/50 border-gray-700/50 backdrop-blur-sm'
          : 'bg-white border-gray-200/50 backdrop-blur-sm',
        'hover:shadow-2xl hover:border-blue-300/30'
      )}>
        {/* Header */}
        <motion.div
          whileHover={{ backgroundColor: isDark ? 'rgba(55, 65, 81, 0.3)' : 'rgba(243, 244, 246, 0.5)' }}
          className={cn(
            'px-6 py-4',
            'cursor-pointer',
            'flex items-center justify-between',
            'transition-all duration-300',
            isDark ? 'bg-gray-800/30' : 'bg-gray-50/50'
          )}
          onClick={() => collapsible && setActiveKey(activeKey.length ? [] : ['1'])}
        >
          <div className="flex items-center  gap-3">
            {showHeaderIcon && (
              <motion.div
                animate={{
                  rotate: isExpanded ? 0 : 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 0.5 }}
                className={cn(
                  'p-2 rounded-lg',
                  'bg-gradient-to-br from-blue-500 to-indigo-500',
                  'shadow-lg'
                )}
              >
                <SettingOutlined className="text-white text-sm" />
              </motion.div>
            )}

            <div>
              <Typography.Title
                level={4}
                className={cn(
                  'm-0 font-bold',
                  'bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent',
                  'dark:from-blue-400 dark:to-indigo-400'
                )}
              >
                {header || t('filterSection')}
              </Typography.Title>
              <Typography.Text
                className={cn(
                  'text-xs mt-1',
                  isDark ? 'text-gray-400' : 'text-gray-500'
                )}
              >
                {t('filterDescription')}
              </Typography.Text>
            </div>
            {handleDownloadshow &&

              <div className="flex items-center">

                <CustomButton
                  type="primary"

                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload();
                  }}
                  label={`${t('download')} ${t('excel')}`}
                  icon={<SearchOutlined />}
                  className={cn(
                    'min-w-32 px-8 py-2.5',
                    'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700',
                    'text-white font-semibold rounded-xl',
                    'transition-all duration-300',
                    'shadow-lg hover:shadow-xl',
                    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg')}

                />

              </div>
            }
          </div>

          {collapsible && (

            <motion.div
              variants={headerVariants}
              animate={activeKey.length ? "expanded" : "collapsed"}
              className={cn(
                'p-2 rounded-full',
                'transition-colors duration-200',
                isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              )}
            >


              {activeKey.length ? (
                <UpOutlined className={cn(
                  'text-sm',
                  isDark ? 'text-gray-300' : 'text-gray-600'
                )} />
              ) : (
                <DownOutlined className={cn(
                  'text-sm',
                  isDark ? 'text-gray-300' : 'text-gray-600'
                )} />
              )}

            </motion.div>

          )}

        </motion.div>

        {/* Content */}
        <AnimatePresence>
          {(activeKey.length || !collapsible) && (
            <motion.div
              key="content"
              variants={contentVariants}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              className="overflow-hidden"
            >
              <div className="px-6 py-4">
                <FormikWrapper
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={async (values, actions) => {

                    actions.setSubmitting(true);
                    try {

                      await onSubmit(values, actions);
                    } finally {

                      actions.setSubmitting(false);
                    }
                  }}
                  enableReinitialize={enableReinitialize}
                >
                  {(formikProps: FormikProps<any>) => {
                    useEffect(() => {
                      if (checkIfModified) {
                        checkIfModified(formikProps.values);
                      }
                    }, [formikProps.values, checkIfModified]);

                    return (
                      <div className="space-y-6">
                        {/* Children with animations */}
                        <motion.div
                          variants={containerVariants}
                          className={cn(
                            'p-4 sm:p-5 rounded-xl',
                            'backdrop-blur-sm',
                            isDark
                              ? 'bg-gray-900/30 border border-gray-700/50'
                              : 'bg-gradient-to-br from-blue-50/50 to-indigo-50/50 border border-blue-100/50'
                          )}
                        >
                          {children}
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                          variants={containerVariants}
                          className="flex flex-col sm:flex-row justify-center gap-3 pt-6 border-t border-gray-200/50 dark:border-gray-700/50"
                        >
                          <motion.div
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                          >
                            <CustomButton
                              type="primary"
                              size="large"
                              onClick={() => formikProps.handleSubmit()}
                              label={submitLabel}
                              icon={<SearchOutlined />}
                              className={cn(
                                'min-w-32 px-8 py-2.5',
                                'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700',
                                'text-white font-semibold rounded-xl',
                                'transition-all duration-300',
                                'shadow-lg hover:shadow-xl',
                                'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg'
                              )}
                              disabled={formikProps.isSubmitting || !formikProps.dirty}
                              loading={formikProps.isSubmitting}
                            />
                          </motion.div>

                          <motion.div
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                          >
                            <CustomButton
                              type="default"
                              size="large"
                              onClick={() => handleReset(formikProps)}
                              label={clearLabel}
                              iconPositionShow
                              icon={<ClearOutlined color='red' />}
                              className={cn(
                                'min-w-32',
                                'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800',
                                '!text-white font-semibold rounded-xl',
                                'transition-all duration-300',
                                'disabled:opacity-50 disabled:cursor-not-allowed'
                              )}
                              disabled={formikProps.isSubmitting || !formikProps.dirty}
                            />
                          </motion.div>

                        </motion.div>


                      </div>
                    );
                  }}
                </FormikWrapper>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Collaps;