'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Modal } from 'antd';
import { KeyOutlined, LoginOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { Field } from 'formik';
import { t } from '@/configs/language';
import FormInput from '@/components/form/formInput';
import { CustomButton, FormikWrapper } from '@/components';
import { useChangePasswordViewModel } from '../model/ViewModel';
import { cn } from '@/lib/talwindeMergeCn';
import { motion, AnimatePresence } from 'framer-motion';

interface ChangePasswordProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ isOpen, onClose }) => {
  const [isModalVisible, setIsModalVisible] = useState(isOpen);
  const { initialValues, validationSchema, onSubmit, isLoading } = useChangePasswordViewModel(onClose);

  useEffect(() => {

    setIsModalVisible(isOpen);
  }, [isOpen]);



  const handleSubmit = useCallback(async (values: any) => {
    if (isLoading) return; // مهم: جلوگیری از submit همزمان
    await onSubmit(values);
  }, [onSubmit, isLoading]);

  // Variants for animations
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 200
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.3
      }
    }
  };

  const contentVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.08,
        type: "spring",
        stiffness: 120,
        damping: 10
      }
    })
  };

  const imageVariants = {
    hidden: { scale: 0.95, opacity: 0, x: 20 },
    visible: {
      scale: 1,
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.2
      }
    }
  };

  return (
    <Modal
      open={isModalVisible}
      footer={null}
      closeIcon={null} // حذف دکمه close
      width="100vw"
      maskClosable={false} // غیرفعال کردن بستن با کلیک روی پس‌زمینه
      keyboard={false} // غیرفعال کردن بستن با کلید Escape
      styles={{
        body: {
          padding: 0,
          height: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        content: {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: 0,
          border: 'none',
        },
        mask: {
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
        },
      }}
    >
      <AnimatePresence mode="wait">
        {isModalVisible && (
          <motion.div
            key="modal-content"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              'w-full max-w-5xl mx-4',
              'relative'
            )}
          >
            {/* Frosted Glass Card */}
            <motion.div
              variants={contentVariants}
              className={cn(
                'relative rounded-3xl overflow-hidden',
                'bg-white/90 backdrop-blur-xl',
                'shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)]',
                'border border-white/40'
              )}
            >
              <div className="flex flex-col lg:flex-row min-h-[400px]">
                {/* Left Side - Form */}
                <div className={cn('w-full lg:w-1/2 p-4 md:p-12')}>
                  <motion.div
                    className="flex flex-col h-full justify-center"
                    variants={contentVariants}
                  >
                    {/* Header */}
                    <motion.div
                      className="text-center"
                      custom={0}
                      variants={itemVariants}
                    >
                      <div className="mb-6">

                        <h1 className={cn(
                          'text-3xl md:text-4xl font-bold mb-3',
                          'bg-gradient-to-r from-gray-800 to-gray-900',
                          'bg-clip-text text-transparent'
                        )}>
                          {t('changePassword')}
                        </h1>
                      </div>
                      <p className={cn(
                        'text-gray-600 text-sm md:text-base leading-relaxed',
                        'max-w-md mx-auto'
                      )}>
                        {t('changePasswordDescription')}
                      </p>
                    </motion.div>

                    {/* Form */}
                    <FormikWrapper
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ errors, touched }) => (
                        <motion.div
                          variants={contentVariants}
                          className="space-y-5"
                        >
                          {/* Old Password */}
                          <motion.div
                            custom={1}
                            variants={itemVariants}
                          >
                            <label className={cn(
                              'block text-sm font-medium mb-2',
                              'text-gray-700'
                            )}>
                              رمز عبور فعلی
                            </label>
                            <motion.div whileHover={{ scale: 1.005 }} whileTap={{ scale: 0.995 }}>
                              <Field
                                name="oldPass"
                                type="password"
                                showLabel={false}
                                showPasswordToggle={true}
                                component={FormInput}

                                className={cn(
                                  'h-12 rounded-xl',
                                  'bg-white/80 border-gray-200',
                                  'text-gray-800 placeholder-gray-400',
                                  'focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/10',
                                  'transition-all duration-200',
                                  'shadow-sm',
                                )}
                                placeholder="رمز عبور فعلی را وارد کنید"
                              />
                            </motion.div>

                          </motion.div>

                          {/* New Password */}
                          <motion.div
                            custom={2}
                            variants={itemVariants}
                          >
                            <label className={cn(
                              'block text-sm font-medium mb-2',
                              'text-gray-700'
                            )}>
                              رمز عبور جدید
                            </label>
                            <motion.div whileHover={{ scale: 1.005 }} whileTap={{ scale: 0.995 }}>
                              <Field
                                name="newPass"
                                type="password"
                                showLabel={false}
                                showPasswordToggle={true}
                                component={FormInput}
                                prefix={<KeyOutlined className={cn(
                                  errors.newPass && touched.newPass ? 'text-red-500' : 'text-gray-400'
                                )} />}
                                className={cn(
                                  'h-12 rounded-xl',
                                  'bg-white/80 border-gray-200',
                                  'text-gray-800 placeholder-gray-400',
                                  'focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/10',
                                  'transition-all duration-200',
                                  'shadow-sm',
                                  errors.newPass && touched.newPass && 'border-red-300 focus:border-red-500 focus:ring-red-500/10'
                                )}
                                placeholder="رمز عبور جدید را وارد کنید"
                              />
                            </motion.div>

                          </motion.div>

                          {/* Confirm New Password */}
                          <motion.div
                            custom={3}
                            variants={itemVariants}
                          >
                            <label className={cn(
                              'block text-sm font-medium mb-2',
                              'text-gray-700'
                            )}>
                              تأیید رمز عبور جدید
                            </label>
                            <motion.div whileHover={{ scale: 1.005 }} whileTap={{ scale: 0.995 }}>
                              <Field
                                name="confirmNewPass"
                                type="password"
                                showLabel={false}
                                showPasswordToggle={true}
                                component={FormInput}
                                prefix={<KeyOutlined className={cn(
                                  errors.confirmNewPass && touched.confirmNewPass ? 'text-red-500' : 'text-gray-400'
                                )} />}
                                className={cn(
                                  'h-12 rounded-xl',
                                  'bg-white/80 border-gray-200',
                                  'text-gray-800 placeholder-gray-400',
                                  'focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/10',
                                  'transition-all duration-200',
                                  'shadow-sm',
                                  errors.confirmNewPass && touched.confirmNewPass && 'border-red-300 focus:border-red-500 focus:ring-red-500/10'
                                )}
                                placeholder="رمز عبور جدید را مجدداً وارد کنید"
                              />
                            </motion.div>

                          </motion.div>

                          {/* Submit Button */}
                          <motion.div
                            custom={4}
                            variants={itemVariants}
                            className="pt-6"
                          >
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <CustomButton
                                label={t('changePassword')}
                                loading={isLoading}
                                type="primary"
                                shape="round"
                                size="large"
                                block
                                className={cn(
                                  'h-12 text-base font-semibold rounded-xl',
                                  'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700',
                                  'text-white',
                                  'shadow-lg hover:shadow-indigo-500/25',
                                  'transition-all duration-300',
                                  'border border-indigo-500/20'
                                )}
                                icon={<LoginOutlined className="mr-2" />}
                                htmlType="submit"
                                disabled={isLoading}
                              />
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      )}
                    </FormikWrapper>

                    {/* Password Requirements */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="mt-8 pt-6 border-t border-gray-200/50"
                    >
                      <p className={cn(
                        'text-xs text-gray-500 text-center leading-relaxed',
                        'flex flex-col gap-1'
                      )}>
                        <span className="font-medium text-gray-600">نکات امنیتی رمز عبور:</span>
                        <span>• حداقل ۸ کاراکتر شامل حروف بزرگ و کوچک، عدد و نماد</span>
                        <span>• از رمز عبور قبلی استفاده نکنید</span>
                        <span>• به صورت دوره‌ای رمز عبور خود را تغییر دهید</span>
                      </p>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Right Side - Image */}
                <motion.div
                  variants={imageVariants}
                  className={cn(
                    'hidden lg:block w-1/2',
                    'relative overflow-hidden'
                  )}
                >
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />

                  {/* Decorative Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 25px 25px, rgba(99, 102, 241, 0.2) 2%, transparent 2%),
                                      radial-gradient(circle at 75px 75px, rgba(139, 92, 246, 0.2) 2%, transparent 2%)`,
                      backgroundSize: '100px 100px',
                    }} />
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute inset-0">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-3 h-3 rounded-full bg-white/40 backdrop-blur-sm"
                        animate={{
                          y: [0, -20, 0],
                          x: [0, Math.sin(i) * 10, 0],
                        }}
                        transition={{
                          duration: 3 + i,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.3
                        }}
                        style={{
                          top: `${20 + i * 10}%`,
                          left: `${10 + i * 12}%`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Image Container */}
                  <div className="relative h-full w-full">
                    <motion.div
                      animate={{ y: [0, -15, 0] }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="relative h-full w-full flex items-center justify-center p-8"
                    >
                      <div className="relative w-full h-full max-w-md">
                        <Image
                          src="/change-password.png"
                          alt="Security Illustration"
                          fill
                          className="object-contain"
                          priority
                          sizes="50vw"
                        />
                      </div>
                    </motion.div>

                    {/* Overlay Content */}
                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
                      <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="space-y-4 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/40"
                      >
                        <h3 className={cn(
                          'text-xl font-bold',
                          'bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent'
                        )}>
                          محافظت از حساب کاربری
                        </h3>
                        <div className="space-y-3">
                          {[
                            { text: 'رمز عبور قوی امنیت شما را تضمین می‌کند', icon: '🔒' },
                            { text: 'به‌روزرسانی دوره‌ای رمز عبور ضروری است', icon: '🔄' },
                            { text: 'از رمز عبور منحصر به فرد استفاده کنید', icon: '⭐' },
                          ].map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.7 + index * 0.1 }}
                              className="flex items-center gap-3"
                            >
                              <span className="text-lg">{item.icon}</span>
                              <span className="text-gray-700 text-sm flex-1">{item.text}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>



          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS Animation for Glass Effect */}
      <style jsx global>{`
        .change-password-modal .ant-modal-content {
          background: transparent !important;
          box-shadow: none !important;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .float-animation {
          animation: float 6s ease-in-out infinite;
        }
        
        /* Scrollbar Styling */
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.3);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.5);
        }
      `}</style>
    </Modal>
  );
};

export default ChangePassword;