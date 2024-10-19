import { useEffect } from 'react';
import { BarChart, MapChart } from 'echarts/charts';
import {
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
  TitleComponent,
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
} from 'echarts/components';
import { GeoComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  MapChart,
  GeoComponent,
  CanvasRenderer,
]);

type EChartsOption = echarts.ComposeOption<
  TitleComponentOption | TooltipComponentOption | GridComponentOption | LegendComponentOption
>;

type SavingChartProps = {
  crossOutSavings: number[];
  rouletteSavings: number[];
  totalSavings: number[];
};

export const SavingChart: React.FC<SavingChartProps> = ({
  crossOutSavings,
  rouletteSavings,
  totalSavings,
}) => {
  useEffect(() => {
    const chartDom = document.getElementById('savingChart');
    const myChart = echarts.init(chartDom!);

    const option: EChartsOption = {
      grid: {
        bottom: '3%',
        containLabel: true,
        left: '3%',
        right: '4%',
      },
      legend: {
        data: ['ruletka', 'wykreślanka', 'razem'],
      },
      series: [
        {
          data: rouletteSavings,
          name: 'ruletka',
          type: 'bar',
        },
        {
          data: crossOutSavings,
          name: 'wykreślanka',
          type: 'bar',
        },
        {
          data: totalSavings,
          name: 'razem',
          type: 'bar',
        },
      ],
      title: {
        text: 'Oszczędności',
      },
      tooltip: {
        axisPointer: {
          type: 'shadow',
        },
        trigger: 'axis',
      },
      xAxis: {
        boundaryGap: [0, 0.01],
        type: 'value',
      },
      yAxis: {
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
    };

    option && myChart.setOption(option);
  }, [rouletteSavings, crossOutSavings, totalSavings]);

  return <div id='savingChart' style={{ height: '600px', width: '600px' }} />;
};
