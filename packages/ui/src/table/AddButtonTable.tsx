import { Button } from 'antd';

// AddButton component
 export const AddButtonTable: React.FC<{ onClick: () => void ,title:string}> = ({ onClick,title }) => (
  <Button size="large" className='w-1/3' type="primary" onClick={onClick}>
    {title}
  </Button>
);
