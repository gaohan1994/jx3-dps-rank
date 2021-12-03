import { YiJinJing, Profit } from 'jx3-dps-core';
import React, { useState } from 'react';
import { deepClone } from 'smar-util';
import { Modal, Tabs } from 'antd';
import * as echarts from 'echarts';
import numeral from 'numeral';

type Props = {
  controller: YiJinJing;
};

function ProfitPage(props: Props) {
  const { controller } = props;

  const [visible, setVisible] = useState(false);

  const colcalutorProfit = async () => {
    setVisible(true);

    onPointProfit();
  };

  const onTabClick = (key: string) => {
    if (key === '1') {
      onPointProfit();
    } else {
      onStoneProfit();
    }
  };

  const onPointProfit = async () => {
    /**
     * 元气 core
     */
    const profit = new Profit({
      options: controller.options,
      gainList: controller.support.gainList,
    });

    /**
     * 收益结果
     * @param profitResult
     */
    const profitResult = await profit.calculatroProfit();

    const reactPointDom = document.createElement('div');
    reactPointDom.style.height = '500px';
    reactPointDom.style.width = '800px';
    const pcharts = echarts.init(reactPointDom);

    const pointData = deepClone(profitResult);
    // 单点收益从大到小排序
    pointData.sort((item1, item2) => item2.pointProfit - item1.pointProfit);

    const pointOptions = {
      title: {
        textStyle: {
          color: '#ffffff',
        },
        left: 'left',
        subtext: '单点收益百分比 %',
      },
      xAxis: {
        type: 'category',
        data: pointData.map(item => {
          return item.title.replace('收益', '');
        }),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: pointData.map(item => numeral(item.pointProfit * 100).format('0.00')),
          type: 'bar',
          label: {
            show: true,
            color: '#ffffff',
          },
        },
      ],
    };
    pcharts.setOption(pointOptions);
    document.getElementById('echarts-point-profit')?.replaceChildren(reactPointDom);
  };

  const onStoneProfit = async () => {
    /**
     * 元气 core
     */
    const profit = new Profit({
      options: controller.options,
      gainList: controller.support.gainList,
    });

    const labelOption = {
      show: true,
      position: 'insideBottom',
      color: '#ffffff',
      distance: 15,
      align: 'left',
      verticalAlign: 'middle',
      rotate: 90,
      formatter: '{c}  {name|{a}}',
      fontSize: 16,
      rich: {
        name: {},
      },
    };

    /**
     * 收益结果
     * @param profitResult
     */
    const profitResult = await profit.calculatroProfit();

    const stoneData = profitResult;
    stoneData.sort((item1, item2) => {
      return (item2.profitWithStone.get(8) || 0) - (item1.profitWithStone.get(8) || 0);
    });
    const reactStoneDom = document.createElement('div');
    reactStoneDom.style.height = '500px';
    reactStoneDom.style.width = '800px';
    const scharts = echarts.init(reactStoneDom);

    const data6 = stoneData.map(item =>
      numeral(item.profitWithStone.get(6) || 0 * 100).format('0.00')
    );
    const data7 = stoneData.map(item =>
      numeral(item.profitWithStone.get(7) || 0 * 100).format('0.00')
    );
    const data8 = stoneData.map(item =>
      numeral(item.profitWithStone.get(8) || 0 * 100).format('0.00')
    );

    const schartsOptions = {
      title: {
        textStyle: {
          color: '#ffffff',
        },
        left: 'left',
        subtext: '单孔收益百分比 %',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      // 石头等级
      legend: {
        data: ['六级', '七级', '八级'],
      },
      xAxis: {
        type: 'category',
        data: stoneData.map(item => {
          return item.title.replace('收益', '');
        }),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '八级',
          type: 'bar',
          emphasis: {
            focus: 'series',
          },
          data: data8,
          label: labelOption,
        },
        {
          name: '七级',
          type: 'bar',
          emphasis: {
            focus: 'series',
          },
          data: data7,
          label: labelOption,
        },
        {
          name: '六级',
          type: 'bar',
          emphasis: {
            focus: 'series',
          },
          data: data6,
          label: labelOption,
        },
      ],
    };
    scharts.setOption(schartsOptions);
    document.getElementById('echarts-stone-profit')?.replaceChildren(reactStoneDom);
  };

  return (
    <div>
      <span onClick={colcalutorProfit}>属性收益</span>

      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        closeIcon={null}
        okText='确定'
        width={'900px'}
        cancelText='取消'
        wrapClassName='echarts-wrap'
        centered={true}
      >
        <Tabs tabPosition='left' onTabClick={onTabClick}>
          <Tabs.TabPane tab='单点收益' key='1'>
            <div id='echarts-point-profit' />
          </Tabs.TabPane>
          <Tabs.TabPane tab='单孔收益' key='2'>
            <div id='echarts-stone-profit' />
          </Tabs.TabPane>
        </Tabs>
      </Modal>
    </div>
  );
}
export default ProfitPage;
