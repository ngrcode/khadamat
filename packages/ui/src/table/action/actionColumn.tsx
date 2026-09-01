import type { ReactNode } from "react";
import { t } from '@repo/i18n';
import { CheckOutlined, CopyOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import type { ButtonProps } from "antd";

export interface ActionColumnAction<T> {
  key: string;
  title: string;
  icon: ReactNode;
  onClick: (record: T) => void;
  className?: string;
  danger?: boolean;
  disabled?: boolean | ((record: T) => boolean);
  type?: ButtonProps['type'];
}

interface ActionColumnProps<T> {
  record: T;
  onEdit?: (record: T) => void;
  onDelete?: (record: T) => void;
  onActive?: (record: T) => void;
  onDetail?: (record: T) => void;
  onDetailData?: (record: T) => void;
  onCopy?: (record: T) => void;
  activeProps?: any;
  customActions?: ActionColumnAction<T>[];
}

export const ActionColumn = <T,>({
  record,
  onEdit,
  onDelete,
  onActive,
  activeProps,
  onDetail,
  onDetailData,
  onCopy,
  customActions = [],
}: ActionColumnProps<T>) => {
  return (
    <Space size="middle" className="flex justify-end w-full">
      {customActions.map((action) => {
        const disabled =
          typeof action.disabled === 'function'
            ? action.disabled(record)
            : action.disabled;

        return (
          <Tooltip key={action.key} title={action.title} placement="top">
            <Button
              onClick={() => action.onClick(record)}
              icon={action.icon}
              type={action.type ?? 'link'}
              danger={action.danger}
              disabled={disabled}
              className={
                action.className ??
                'text-primary-500 hover:text-primary-600 hover:scale-110 transition-all duration-300'
              }
            />
          </Tooltip>
        );
      })}

      {/* Active/Inactive Button */}
      {onActive && activeProps && (
        <Tooltip
          title={
            record[activeProps.changeActive]
              ? t(activeProps?.titleNotActive)
              : t(activeProps?.titleActive)
          }
          placement="top"
        >
          <Button
            onClick={() => onActive(record)}
            icon={<CheckOutlined />}
            className={`
              min-w-[120px] rounded-full transition-all duration-300 border-0 font-medium shadow-md hover:shadow-lg
              ${record[activeProps.changeActive]
                ? 'bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white'
                : 'bg-gradient-gold hover:bg-gradient-gold-hover text-white shadow-glow-gold'
              }
            `}
          >
            {record[activeProps?.changeActive]
              ? t(activeProps?.titleNotActive)
              : t(activeProps?.titleActive)}
          </Button>
        </Tooltip>
      )}

      {/* Detail Button */}
      {onDetail && (
        <Tooltip title={t('viewDetails')} placement="top">
          <Button
            onClick={() => onDetail(record)}
            icon={<CopyOutlined />}
            type="link"
            className="text-primary-500 hover:text-primary-600 hover:scale-110 transition-all duration-300"
          />
        </Tooltip>
      )}

      {/* Detail Data Button */}
      {onDetailData && (
        <Tooltip title={t('viewData')} placement="top">
          <Button
            onClick={() => onDetailData(record)}
            icon={<EyeOutlined />}
            type="link"
            className="text-blue-500 hover:text-blue-600 hover:scale-110 transition-all duration-300"
          />
        </Tooltip>
      )}

      {/* Edit Button */}
      {onCopy && (
        <Tooltip title={t('copy')} placement="top">
          <Button
            onClick={() => onCopy(record)}
            icon={<EyeOutlined />}
            type="link"
            className="text-blue-500 hover:text-blue-600 hover:scale-110 transition-all duration-300"
          />
        </Tooltip>
      )}

      {/* Edit Button */}
      {onEdit && (
        <Tooltip title={t('edit')} placement="top">
          <Button
            onClick={() => onEdit(record)}
            icon={<EditOutlined />}
            type="link"
            className="text-gold hover:text-gold/80 hover:scale-110 transition-all duration-300"
          />
        </Tooltip>
      )}

      {/* Delete Button */}
      {onDelete && (
        <Tooltip title={t('delete')} placement="top">
          <Button
            onClick={() => onDelete(record)}
            icon={<DeleteOutlined />}
            type="link"
            danger
            className="hover:scale-110 transition-all duration-300 hover:text-red-600"
          />
        </Tooltip>
      )}
    </Space>
  );
};
