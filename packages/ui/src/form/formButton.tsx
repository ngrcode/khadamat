import { LoadingOutlined } from '@ant-design/icons';
import { Button, ButtonProps } from 'antd';
import { Form as AntdForm } from 'antd';
import React from 'react';
import { cn } from '@repo/utils/cn';
import { t } from '@repo/i18n';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useTheme } from '@repo/theme';

interface CustomButtonProps extends ButtonProps {
  label: string;
  className?: string;
  classNameLabel?: string;
  loading?: boolean | undefined;
  iconPositionShow?: boolean | undefined;
  iconPosition?: 'start' | 'end';
  animated?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  loading = false,
  block = true,
  iconPositionShow = false,
  iconPosition = 'start',
  icon,
  className,
  classNameLabel,
  type = "primary",
  style,
  styles,
  animated = true,
  ...props
}) => {
  // Detect if dark mode
    const { theme:isDarkModethem } = useTheme();
  
  const isDarkMode = isDarkModethem === 'dark'

  // Animation variants
  const buttonVariants: Variants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  // Render button content
  const renderButtonContent = () => (
    <>
      {iconPositionShow && iconPosition === 'start' && !loading && (
        <span className="mr-1 sm:mr-2">
          {icon}
          </span>
      )}
      {loading && <LoadingOutlined className="mr-1 sm:mr-2" spin />}
      <span className={cn(
        'text-sm sm:text-base font-semibold',
        // Use text-white from config
        classNameLabel
      )}>
        {loading ? t('pleaseWait') : label}
      </span>
      {iconPositionShow && iconPosition === 'end' && !loading && (
        <span className="ml-1 sm:ml-2">{icon}</span>
      )}
    </>
  );

  // Base button style
  const baseStyle = {
    height: '40px',
    fontSize: '14px',
    fontWeight: 600,
    borderRadius: '8px',
    border: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    ...style
  };

  return (
    <AntdForm.Item>
      {animated ? (
        <motion.div
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
          className="w-full"
        >
          <Button
            type={type}
            htmlType="submit"
            disabled={loading}
            block={block}
            variant="filled"
            className={cn(
              'relative overflow-hidden',
              'transition-all duration-300',
              'hover:shadow-xl',
              loading && 'opacity-90',
              // Use gradients from config - automatically apply text-white
              isDarkMode ? 'bg-gradient-theme-dark' : 'bg-gradient-main',
              // Use hover gradient from config
              'hover:hover-gradient-main',
              'border-0',
              // Ensure text is white
              'text-text-white',
              // Add hover effect
              'hover:scale-[1.02] active:scale-[0.98]',
              className
            )}
            style={baseStyle}
            {...props}
          >
            {/* Ripple effect background */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Button content */}
            <div className="relative  z-10 flex items-center justify-center">
              {renderButtonContent()}
            </div>

          </Button>
        </motion.div>
      ) : (
        <Button
          type={type}
          htmlType="submit"
          disabled={loading}
          block={block}
          variant="filled"
          className={cn(
            'transition-all duration-300',
            'hover:shadow-xl',
            loading && 'opacity-90',
            // Use gradients from config
            isDarkMode ? 'bg-gradient-theme-dark' : 'bg-gradient-main',
            // Use hover gradient from config
            'hover:hover-gradient-main',
            // Ensure text is white
            'text-text-white',
            className
          )}
          style={baseStyle}
          {...props}
        >
          {renderButtonContent()}
        </Button>
      )}
    </AntdForm.Item>
  );
};

export default CustomButton;
