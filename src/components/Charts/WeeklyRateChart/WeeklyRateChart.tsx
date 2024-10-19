import { useEffect } from 'react';
import { endOfWeek, format, startOfWeek } from 'date-fns';
import { LineChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
  TooltipComponent,
]);

export const WeeklyRateChart = ({ data }: { data: number[] }) => {
  useEffect(() => {
    const chartDom = document.getElementById('weeklyChart');
    const myChart = echarts.init(chartDom);

    const option = {
      series: [
        {
          areaStyle: {},
          data: data,
          type: 'line',
        },
      ],
      tooltip: {
        formatter: (params: any) => {
          const weekNumber = params[0].dataIndex + 1;
          const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
          startDate.setDate(startDate.getDate() + (weekNumber - 1) * 7);
          const endDate = endOfWeek(startDate, { weekStartsOn: 1 });
          const formattedStartDate = format(startDate, 'MMMM do, yyyy');
          const formattedEndDate = format(endDate, 'MMMM do, yyyy');

          return `Week ${weekNumber} (${formattedStartDate} - ${formattedEndDate}): rate: ${params[0].value}`;
        },
        trigger: 'axis',
      },
      xAxis: {
        boundaryGap: false,
        data: Array(54)
          .fill(0)
          .map((el, index) => index + 1),
        name: 'Week',
        type: 'category',
      },
      yAxis: {
        name: 'rate',
        type: 'value',
      },
    };

    option && myChart.setOption(option);
  }, [data]);

  return <div id='weeklyChart' style={{ height: '600px', width: '600px' }} />;
};
