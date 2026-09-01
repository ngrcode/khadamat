
import React, { useEffect, useRef } from 'react';

const RadialBarChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && chartRef.current) {
      // Dynamic import to avoid SSR issues
      import('highcharts').then((Highcharts) => {
        // Import the variable pie module
        import('highcharts/modules/variable-pie').then(() => {
          Highcharts.chart(chartRef.current!, {
            colors: ['#FFD700', '#C0C0C0', '#CD7F32'],
            chart: {
              type: 'column',
              inverted: true,
              polar: true
            },
            title: {
              text: 'Winter Olympic medals per existing country (TOP 5)'
            },
            credits: {
              enabled: false,
            },
            subtitle: {
              text: 'Source: ' +
                '<a href="https://en.wikipedia.org/wiki/All-time_Olympic_Games_medal_table"' +
                'target="_blank">Wikipedia</a>'
            },
            tooltip: {
              outside: true
            },
            pane: {
              size: '85%',
              innerSize: '20%',
              endAngle: 270
            },
            xAxis: {
              tickInterval: 1,
              labels: {
                align: 'right',
                allowOverlap: true,
                step: 1,
                y: 3,
                style: {
                  fontSize: '13px'
                }
              },
              lineWidth: 0,
              gridLineWidth: 0,
              categories: [
                'Norway <span class="f16"><span id="flag" class="flag no">' +
                '</span></span>',
                'United States <span class="f16"><span id="flag" class="flag us">' +
                '</span></span>',
                'Germany <span class="f16"><span id="flag" class="flag de">' +
                '</span></span>',
                'Austria <span class="f16"><span id="flag" class="flag at">' +
                '</span></span>',
                'Canada <span class="f16"><span id="flag" class="flag ca">' +
                '</span></span>'
              ]
            },
            yAxis: {
              lineWidth: 0,
              tickInterval: 25,
              reversedStacks: false,
              endOnTick: true,
              showLastLabel: true,
              gridLineWidth: 0
            },
            plotOptions: {
              column: {
                stacking: 'normal',
                borderWidth: 0,
                pointPadding: 0,
                groupPadding: 0.15,
                borderRadius: {
                  radius: '50%',
                  where: 'all'
                }
              }
            },
            series: [{
              type: 'column' as const,
              name: 'Gold medals',
              data: [148, 113, 104, 71, 77]
            }, {
              type: 'column' as const,
              name: 'Silver medals',
              data: [113, 122, 98, 88, 72]
            }, {
              type: 'column' as const,
              name: 'Bronze medals',
              data: [124, 95, 65, 91, 76]
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

export default RadialBarChart;
