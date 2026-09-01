'use client';

import React from 'react';
import { Modal } from 'antd';
import DetailShow from '../detailModal/detailShow'; // adjust path to your project

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface DetailModalProps {
        /** The data record to display — pass `false` / `null` to hide */
        data: any;
        /** Called when the modal should close */
        onClose: () => void;
        /** Modal title (optional) */
        title?: string;
        /** 'full' = 90 vw/vh, 'half' = 50 % width (default: 'full') */
        size?: 'full' | 'half';
        /** Extra props forwarded to <DetailShow> */
        detailProps?: Partial<React.ComponentProps<typeof DetailShow>>;
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

const DetailModal: React.FC<DetailModalProps> = ({
        data,
        onClose,
        title,
        size = 'full',
        detailProps,
}) => {
        const isFull = size === 'full';

        return (
                <Modal
                        centered
                        keyboard={false}
                        open={!!data}
                        onCancel={onClose}
                        footer={null}
                        title={title}
                        width={isFull ? '90vw' : '50%'}
                        bodyStyle={{
                                height: isFull ? '90vh' : 'auto',
                                padding: 0,
                                overflow: 'auto',
                        }}
                        style={{ top: 0, left: 0, padding: 0 }}
                        destroyOnClose
                >
                        {data && <DetailShow data={data} {...detailProps} />}
                </Modal>
        );
};

export default DetailModal;
