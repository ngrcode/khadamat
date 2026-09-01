import React, { useEffect, useRef } from 'react';

const StackedBar = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && chartRef.current) {
      // Dynamic import to avoid SSR issues
      import('highcharts').then((Highcharts) => {
        Highcharts.chart(chartRef.current!, {
          chart: {
            type: 'bar',
            backgroundColor: 'transparent'
          },
          title: {
            text: ''
          },
           credits:{
                enabled:false
          },
          xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Total fruit consumption'
            }
          },
          legend: {
            reversed: true
          },
          plotOptions: {
            series: {
              stacking: 'normal'
            }
          },
          series: [{
            type: 'bar' as const,
            name: 'John',
            data: [5, 3, 4, 7, 2],
            color: '#4CAF50'
          }, {
            type: 'bar' as const,
            name: 'Jane',
            data: [2, 2, 3, 2, 1],
            color: '#2196F3'
          }, {
            type: 'bar' as const,
            name: 'Joe',
            data: [3, 4, 4, 2, 5],
            color: '#FF9800'
          }]
        });
      });
    }
  }, []);

  return (
    <div ref={chartRef} style={{ height: '300px', width: '100%' }} />
  );
};

export default StackedBar;
