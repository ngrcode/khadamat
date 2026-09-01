import React, { useEffect, useRef } from 'react';

const DonutChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && chartRef.current) {
      // Dynamic import to avoid SSR issues
      import('highcharts').then((Highcharts) => {
        Highcharts.chart(chartRef.current!, {
          chart: {
            type: 'pie',
            backgroundColor: 'transparent',
            custom: {},
            events: {
              render() {
                const chart = this,
                  series = chart.series[0];
                let customLabel = chart.options.chart.custom.label;

                if (!customLabel) {
                  customLabel = chart.options.chart.custom.label =
                    chart.renderer.label(
                      'Total<br/>' +
                      '<strong>2 877 820</strong>'
                    )
                      .css({
                        color:
                          'var(--highcharts-neutral-color-100, #000)',
                        textAnchor: 'middle'
                      })
                      .add();
                }

                const x = series.center[0] + chart.plotLeft,
                  y = series.center[1] + chart.plotTop -
                    (customLabel.attr('height') / 2);

                customLabel.attr({
                  x,
                  y
                });
                // Set font size based on chart diameter
                customLabel.css({
                  fontSize: `${series.center[2] / 12}px`
                });
              }
            }
          },
          accessibility: {
            point: {
              valueSuffix: '%'
            }
          },
          title: {
            text: ''
          },
          credits: {
            enabled: false,
          },
          subtitle: {
            text: ''
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.0f}%</b>'
          },
          legend: {
            enabled: false
          },
          plotOptions: {
            series: {
              allowPointSelect: true,
              cursor: 'pointer',
              borderRadius: 8,
              dataLabels: [{
                enabled: true,
                distance: 20,
                format: '{point.name}'
              }, {
                enabled: true,
                distance: -15,
                format: '{point.percentage:.0f}%',
                style: {
                  fontSize: '0.9em'
                }
              }],
              showInLegend: true
            }
          },
          series: [{
            type: 'pie' as const,
            name: 'Registrations',
            colorByPoint: true,
            innerSize: '75%',
            data: [{
              name: 'EV',
              y: 23.9
            }, {
              name: 'Hybrids',
              y: 12.6
            }, {
              name: 'Diesel',
              y: 37.0
            }, {
              name: 'Petrol',
              y: 26.4
            }]
          }]
        });
      });
    }
  }, []);

  return (
    <div ref={chartRef} style={{ height: '300px', width: '100%' }} />
  );
};

export default DonutChart;
