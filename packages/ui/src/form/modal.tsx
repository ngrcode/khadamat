import { Modal } from 'antd';
import React, { ReactNode } from 'react';

interface CustomModalPropsType {
  title: string;
  isModalOpen: boolean;
  footer: boolean |null;
  onOk?: () => void;
  onCancel?: () => void;
  children?: ReactNode;
}

const CustomModal: React.FC<CustomModalPropsType> = ({
  title,
  isModalOpen,
  onOk,
  onCancel,
  children,
  footer=true
}) => {
  const handleOk = () => {
    if (onOk) {
      onOk();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <Modal
      title={title}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={footer}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
