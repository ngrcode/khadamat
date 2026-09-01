import { Button, Space } from 'antd';
import { FC } from 'react';

interface ActionButtonsProps {
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  id: number;
}

const ActionButtons: FC<ActionButtonsProps> = ({ onEdit, onDelete, id }) => (
  <Space size="middle">
    {onEdit && (
      <Button onClick={() => onEdit(id)} type="link">
        Edit
      </Button>
    )}
    {onDelete && (
      <Button onClick={() => onDelete(id)} type="link" danger>
        Delete
      </Button>
    )}
  </Space>
);

export default ActionButtons;
