import React, { useEffect, useRef } from 'react';

const PieChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && chartRef.current) {
      // Dynamic import to avoid SSR issues
      import('highcharts').then((Highcharts) => {
        Highcharts.chart(chartRef.current!, {
          chart: {
            type: 'pie',
            backgroundColor: 'transparent',
            zooming: {
              type: 'xy'
            },
            panning: {
              enabled: true,
              type: 'xy'
            },
            panKey: 'shift'
          },
          title: {
            text: ''
          },
          credits: {
            enabled: false,
          },
          tooltip: {
            valueSuffix: '%'
          },
          subtitle: {
            text: ''
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: [{
                enabled: true,
                distance: 20
              }, {
                enabled: true,
                distance: -40,
                format: '{point.percentage:.1f}%',
                style: {
                  fontSize: '1.2em',
                  textOutline: 'none',
                  opacity: 0.7
                },
                filter: {
                  operator: '>',
                  property: 'percentage',
                  value: 10
                }
              }]
            }
          },
          series: [{
            type: 'pie' as const,
            name: 'Percentage',
            colorByPoint: true,
            data: [
              {
                name: 'Water',
                y: 55.02
              },
              {
                name: 'Fat',
                sliced: true,
                selected: true,
                y: 26.71
              },
              {
                name: 'Carbohydrates',
                y: 1.09
              },
              {
                name: 'Protein',
                y: 15.5
              },
              {
                name: 'Ash',
                y: 1.68
              }
            ]
          }]
        });
      });
    }
  }, []);

  return (
    <div ref={chartRef} style={{ height: '300px', width: '100%' }} />
  );
};

export default PieChart;
