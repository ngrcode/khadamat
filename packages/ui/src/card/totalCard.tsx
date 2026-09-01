import { ArrowUpOutlined } from '@ant-design/icons';

import { Card } from "antd";

interface TotalCardProps {
  icon: React.ReactNode;
  value: string;
  title: string;
  percentage: string;
}

const TotalCard = ({ icon, value, title, percentage }: TotalCardProps) => {
  return (
    <>
      <Card className="shadow-sm border-0 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              {icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-sm text-gray-600">{title}</p>
            </div>
          </div>
          <div className="flex items-center text-green-600">
            <ArrowUpOutlined className="text-xs mr-1" />
            <span className="text-sm font-medium">{percentage}</span>
          </div>
        </div>
      </Card>
    </>
  );
};

export default TotalCard;