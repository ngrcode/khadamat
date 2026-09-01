
import React, { useEffect, useRef } from 'react';

const VariableRadiusPie = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && chartRef.current) {
      // Dynamic import to avoid SSR issues
      import('highcharts').then((Highcharts) => {
        // Import the variable pie module
        import('highcharts/modules/variable-pie').then(() => {
          Highcharts.chart(chartRef.current!, {
            chart: {
              type: 'variablepie',
              backgroundColor: 'transparent'
            },
            title: {
              text: ''
            },
            credits: {
              enabled: false,
            },
            tooltip: {
              headerFormat: '',
              pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> ' +
                '{point.name}</b><br/>' +
                'Area (square km): <b>{point.y}</b><br/>' +
                'Population density (people per square km): <b>{point.z}</b><br/>'
            },
            series: [{
              type: 'variablepie',
              minPointSize: 10,
              innerSize: '20%',
              zMin: 0,
              name: 'countries',
              borderRadius: 5,
              dataLabels: {
                enabled: true,
                format: '{point.name}: {point.y:,.0f}',
                style: {
                  fontSize: '12px',
                  fontWeight: 'bold',
                  textOutline: 'none'
                }
              },
              data: [{
                name: 'Spain',
                y: 505992,
                z: 95
              }, {
                name: 'France',
                y: 551695,
                z: 118
              }, {
                name: 'Poland',
                y: 312679,
                z: 131
              }, {
                name: 'Czech Republic',
                y: 78865,
                z: 136
              }, {
                name: 'Italy',
                y: 301336,
                z: 198
              }, {
                name: 'Switzerland',
                y: 41284,
                z: 224
              }, {
                name: 'Germany',
                y: 357114,
                z: 238
              }],
              colors: [
                '#4caefe',
                '#3dc3e8',
                '#2dd9db',
                '#1feeaf',
                '#0ff3a0',
                '#00e887',
                '#23e274'
              ]
            }]
          });
        });
      });
    }
  }, []);

  return (
    <div ref={chartRef} style={{ height: '250px', width: '100%' }} />
  );
};

export default VariableRadiusPie;
