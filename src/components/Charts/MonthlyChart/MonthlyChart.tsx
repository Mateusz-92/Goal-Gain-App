import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { BarChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([GridComponent, BarChart, CanvasRenderer]);

export const MonthlyChart = ({ data }: { data: number[] }) => {
  useEffect(() => {
    const chartDom = document.getElementById('monthlyChart');
    const myChart = echarts.init(chartDom);

    const option = {
      grid: {
        bottom: '3%',
        containLabel: true,
        left: '3%',
        right: '4%',
      },
      series: [
        {
          barWidth: '75%',
          data: data,
          type: 'bar',
        },
      ],

      xAxis: {
        data: [
          'styczeń',
          'luty',
          'marzec',
          'kwiecień',
          'maj',
          'czerwiec',
          'lipiec',
          'sierpień',
          'wrzesień',
          'październik',
          'listopad',
          'grudzień',
        ],
        type: 'category',
      },
      yAxis: {
        type: 'value',
      },
    };

    option && myChart.setOption(option);
    const handleResize = () => {
      myChart.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      myChart.dispose();
    };
  }, [data]);

  return (
    <Box height={{ base: '300px', md: '600px' }} width='100%'>
      <div
        id='monthlyChart'
        style={{
          height: '100%',
          width: '100%',
        }}
      />
    </Box>
  );
};
