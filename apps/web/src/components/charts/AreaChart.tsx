import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ExampleProps {
  data: Array<any>; 
  xKey: string; 
  yKeys: Array<{ key: string; color: string }>;
}

const Chart: React.FC<ExampleProps> = ({ data, xKey, yKeys }) => {
  return (
    <div className="flex justify-center items-center">
      <ResponsiveContainer height={400} className="md:w-1/2 w-full !text-sm">
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          {yKeys?.map((yKey) => (
            <Line
              key={yKey.key}
              type="monotone"
              dataKey={yKey.key}
              stroke={yKey.color}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
