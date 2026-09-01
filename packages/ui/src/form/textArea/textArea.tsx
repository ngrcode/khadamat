import { Input } from 'antd';
import React from 'react';

const { TextArea } = Input;

interface CustomTextAreaProps {
  maxLength?: number;
  disabledResize?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  style?: React.CSSProperties;
  className?: string;
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  maxLength = 250, // Default max length
  disabledResize = true, // Default to disabling resize
  placeholder = 'متن راوارد نمائید',
  value,
  onChange,
  style = { height: 120 }, // Default height
  className,
}) => {
  return (
    <TextArea
      showCount
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      style={{ ...style, resize: disabledResize ? 'none' : 'both' }} // Disable or enable resize
    />
  );
};

export default CustomTextArea;
