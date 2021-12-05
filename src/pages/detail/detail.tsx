import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { init } from 'echarts';
import icon from '@assets/sl_yjj.png';
import { getJdcResult, getSkills } from '@core/selector';
import BaseDpsItem from '@component/dps-item/base-dps-item';
import { CoreHelper } from 'jx3-dps-core';
import {
  getSClassDps,
  makeDpsRowChartsData,
  renderDpsChartsTitle,
  renderSeriesLabelFormatter,
  renderTooltipFormatter,
} from '@utils/utils';
import './index.css';
import ProfitPage from '../profit/profit';

type Props = {
  version: any;
};

const DetailPage = (props: Props) => {
  const { version } = props;
  const [mycharts, setMycharts] = useState({} as any);

  const data = useSelector(getJdcResult);
  const skills = useSelector(getSkills);
  skills.sort((a, b) => (a.subTotal ?? 0) - (b.subTotal ?? 0));

  const sClassDps = useMemo(() => getSClassDps(data.dps), [data]);

  useEffect(() => {
    const chartsDom = document.getElementById('echarts-main');
    const myCharts = init(chartsDom as any);
    myCharts.resize();
    setMycharts(myCharts);
  }, []);

  useEffect(() => {
    if (!mycharts.setOption) {
      return;
    }

    const { chartsData, yAxisData } = makeDpsRowChartsData(skills);
    const option = {
      title: {
        textStyle: {
          color: '#ffffff',
        },
        left: 'center',
        subtext: renderDpsChartsTitle(data),
      },
      yAxis: {
        type: 'category',
        data: yAxisData,
      },
      xAxis: {
        type: 'value',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: (params: any) => renderTooltipFormatter(params, skills),
      },
      series: [
        {
          data: chartsData,
          type: 'bar',
          itemStyle: {
            color: '#FFCE34',
          },
          label: {
            show: true,
            position: 'right',
            color: '#ffffff',
            formatter: (params: any) => renderSeriesLabelFormatter(params, skills),
          },
        },
      ],
    };
    mycharts.setOption(option);
  }, [mycharts, skills]);
  return (
    <div className='detail-page'>
      {data && (
        <BaseDpsItem
          index='DPS'
          icon={icon}
          name='少林-易筋经'
          value={`${data.dps}`}
          extra={
            <>
              {version !== CoreHelper.CalculatorVersion.Immortal && (
                <span className='s-class'>S：{sClassDps}</span>
              )}
              <div className='profit-box'>
                <ProfitPage />
              </div>
            </>
          }
        />
      )}

      <div id='echarts-main' style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default DetailPage;
