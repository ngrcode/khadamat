import { t } from '@/configs/language';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ExampleProps {
  data: Array<any>;
  xKey: string;
  yKeys: Array<{ key: string; color: string }>;
}

const MultiChart: React.FC<ExampleProps> = ({ data, xKey, yKeys }) => {
  const customTooltipFormatter = (value: any, name: string) => {
    const formattedNumber = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    switch (name) {
      case 'totalAmount':
        return [`${formattedNumber} تومان`, 'مقدار کل'];
      case 'transactionCount':
        return [`${formattedNumber} تراکنش`, 'تعداد تراکنش‌ها'];
      default:
        return [value, name];
    }
  };


  const customLabelFormatter = (label: any) => {
    return `تاریخ: ${label}`;
  };

  return (
    <div className="flex flex-col items-center gap-8 my-5">
      {yKeys.map((yKey) => (
        <div key={yKey.key} className="w-full md:w-1/2 text-sm">
          <header className="text-2xl text-center"> {t(String(yKey.key))}</header>
          <ResponsiveContainer height={300} className="!text-sm">
            <LineChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 30,
                bottom: 0,
              }}
              width={500}
              height={300}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xKey} />
              <YAxis
                tickMargin={yKey.key === 'totalAmount' ? 40 : 20}
                tick={{
                  textAnchor: 'middle',
                  position: 'insideLeft',
                }}
                  tickFormatter={(value: number) =>
                    value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
              />
              <Tooltip
                formatter={customTooltipFormatter}
                labelFormatter={customLabelFormatter}
              />
              <Line
                type="monotone"
                dataKey={yKey.key}
                stroke={yKey.color}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
};

export default MultiChart;
