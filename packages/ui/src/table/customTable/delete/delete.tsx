// components/delete/index.tsx

'use client';

import React, { useState } from 'react';
import { Modal, Typography, Space, Button, Divider } from 'antd';
import {
        ExclamationCircleOutlined,
        DeleteOutlined,
        CloseOutlined,
        InfoCircleOutlined
} from '@ant-design/icons';
import { t } from '@repo/i18n';

const { Text, Paragraph, Title } = Typography;

interface DeleteModalProps {
        record: any;
        onClose: () => void;
        onConfirm: () => Promise<void> | void;
        loading?: boolean;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
        record,
        onClose,
        onConfirm,
        loading: externalLoading = false,
}) => {
        const [internalLoading, setInternalLoading] = useState(false);
        const loading = externalLoading || internalLoading;

        const handleConfirm = async () => {
                setInternalLoading(true);
                try {
                        await onConfirm();
                } finally {
                        setInternalLoading(false);
                }
        };

        // Extract important fields to display
        const getRecordDisplayName = () => {
                // Adjust these fields based on your data structure
                return record?.terminalId || record?.name || record?.title || record?.id || t('record');
        };

        const getRecordDetails = () => {
                const details: Array<{ label: string; value: React.ReactNode }> = [];
               
                return details;
        };

        const recordDetails = getRecordDetails();

        return (
                <Modal
                        open={true}
                        onCancel={onClose}
                        footer={null}
                        centered
                        width={520}
                        closable={!loading}
                        maskClosable={!loading}
                        className="delete-modal"
                >
                        <div className="flex flex-col items-center py-6">
                                {/* Icon */}
                                <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-4">
                                        <DeleteOutlined className="text-red-500 text-4xl" />
                                </div>

                                {/* Title */}
                                <Title level={4} className="text-center mb-2">
                                        {t('confirmDelete')}
                                </Title>

                                {/* Description */}
                                <Paragraph className="report-muted text-center mb-6 max-w-sm">
                                        {t('deleteConfirmationMessage')}
                                </Paragraph>

                                {/* Record Info */}
                                <div className="rounded-lg p-4 w-full mb-6 border border-[var(--app-card-border)] bg-[var(--app-surface-alt)]">
                                        <div className="flex items-center gap-2 mb-3">
                                                <InfoCircleOutlined className="text-blue-500" />
                                                <Text strong>
                                                        {t('recordInformation')}
                                                </Text>
                                        </div>

                                        <div className="flex items-center gap-2 justify-center rounded-md border border-[var(--app-card-border)] bg-[var(--app-card-bg)] p-3 mb-3">
                                                <ExclamationCircleOutlined className="text-amber-500 text-lg" />
                                                <Text strong className="text-base">
                                                        {getRecordDisplayName()}
                                                </Text>
                                        </div>

                                        {recordDetails.length > 0 && (
                                                <>
                                                        <Divider className="my-2" />
                                                        <div className="space-y-1">
                                                                {recordDetails.map((detail, index) => (
                                                                        <div key={index} className="flex justify-between text-sm">
                                                                                <Text type="secondary">{detail.label}:</Text>
                                                                                <Text>{detail.value}</Text>
                                                                        </div>
                                                                ))}
                                                        </div>
                                                </>
                                        )}
                                </div>

                                {/* Warning */}
                                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 w-full mb-6">
                                        <div className="flex items-start gap-2">
                                                <ExclamationCircleOutlined className="text-amber-500 mt-0.5" />
                                                <Text type="secondary" className="text-sm">
                                                        {t('deleteWarning')}
                                                </Text>
                                        </div>
                                </div>

                                {/* Actions */}
                                <Space size="middle" className="w-full">
                                        <Button
                                                onClick={onClose}
                                                disabled={loading}
                                                className="flex-1 h-10"
                                                size="large"
                                                icon={<CloseOutlined />}
                                        >
                                                {t('cancel')}
                                        </Button>
                                        <Button
                                                type="primary"
                                                danger
                                                onClick={handleConfirm}
                                                loading={loading}
                                                className="flex-1 h-10"
                                                size="large"
                                                icon={<DeleteOutlined />}
                                        >
                                                {t('delete')}
                                        </Button>
                                </Space>
                        </div>
                </Modal>
        );
};

export default DeleteModal;
