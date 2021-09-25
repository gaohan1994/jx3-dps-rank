import BaseDpsItem from '../../../component/base-dps-item';
import { GameClass } from '../../../core/config';
import numeral from 'numeral';
import './index.css';
import { useEffect, useLayoutEffect, useState } from 'react';
import * as echarts from 'echarts';
import ProfitPage from '../calculator/profit';
import Jx3DpsCore from 'jx3-dps-core';

type Props = {
  data: any;
  gameClass: GameClass;
  icons?: any;
  controller?: any;
  version: any;
}

function DetailPage(props: Props) {
  const { data, gameClass, icons = {}, controller, version } = props;

  const [mycharts, setMycharts] = useState({} as echarts.ECharts);

  const skills: any[] = data && data.skills || [];
  skills.sort((a, b) => a.subTotal - b.subTotal);

  useLayoutEffect(() => {
    const chartsDom = document.getElementById("echarts-main");

    const myCharts = echarts.init(chartsDom as any);
    myCharts.resize();
    setMycharts(myCharts);
  }, [data]);

  useEffect(() => {
    if (mycharts && mycharts.setOption && skills.length > 0) {

      let chartsData = []
      let yAxisData = [];

      let yAxisRichIcons: any = {};

      for (let index = 0; index < skills.length; index++) {
        const currentSkill = skills[index];
        yAxisData.push(currentSkill.skillTitle);
        chartsData.push(currentSkill.subTotal);

        yAxisRichIcons[currentSkill.skillTitle] = {
          backgroundColor: {
            image: icons[currentSkill.skillName] || gameClass.icon
          }
        };
      }

      const option = {
        title: {
          textStyle: {
            color: '#ffffff'
          },
          left: 'center',
          subtext: `总输出：${numeral(data.totalExpectation).format('0,000')} 战斗时间：${data.seconds}秒 DPS：${numeral(data.dps).format('0,000')} `
        },
        yAxis: {
          type: 'category',
          data: yAxisData
        },
        xAxis: {
          type: 'value',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (params: any) {
            var targetParams = params[0];
            const currentSkill = skills.find((item) => item.skillTitle === targetParams.axisValue);
            return `技能：${currentSkill.skillTitle}` + '<br/>'
              + `次数：${currentSkill.skillTimes} 次` + '<br/>'
              + `平均单次输出：${numeral(currentSkill.subTotal / currentSkill.skillTimes).format('0,000')}` + '<br/>'
              + `小计：${currentSkill.subTotal}` + '<br/>'
              + `技能占比：${numeral(currentSkill.percent * 100).format('0.00')} %`
          }
        },
        series: [{
          data: chartsData,
          type: 'bar',
          itemStyle: {
            color: '#FFCE34'
          },
          label: {
            show: true,
            position: 'right',
            color: '#ffffff',
            formatter: function (params: any) {
              var targetParams = params;
              const currentSkill = skills.find((item) => item.skillTitle === targetParams.name)
              return `${numeral(currentSkill.percent * 100).format('0.00')} %`;
            }
          }
        }]
      };
      mycharts.setOption(option);
    }
  }, [mycharts, skills]);

  const SClass = numeral(data.dps * 1.03).format('0,000');

  return (
    <div className='detail-page'>
      {data && (
        <BaseDpsItem
          index='DPS'
          icon={gameClass.icon}
          name={`${gameClass.professionName} - ${gameClass.className}`}
          value={data.dps}
          color={gameClass.color.join(', ')}
          extra={(
            <>
              {version !== Jx3DpsCore.YiJinJing.YiJinJingVersion.Immortal && (
                <span className='s-class'>
                  S：{SClass}
                </span>
              )}
              <div className='profit-box'>
                {ProfitPage({ controller })}
              </div>
            </>
          )}
        />
      )}

      <div id='echarts-main' style={{ width: '100%', height: '100%' }} />
    </div>
  );
}

export default DetailPage;