import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Jx3DpsCore from 'jx3-dps-core';
import { deepClone } from 'smar-util';
import { Modal, Tabs } from 'antd';
import * as echarts from 'echarts';
import { getJdcCore, getJdcResult, getJdcSupport } from '../../core/selector';
import {
  getProfitStoneLabelOptions,
  makeProfitDom,
  renderProfitPointSeries,
  renderProfitPointTitle,
  renderProfitPointXAxis,
  renderProfitStoneXAxis,
  sortProfitListByPoint,
  sortProfitListByStone,
  sortProfitListByStoneLevel,
} from '../../utils/utils';

const PROFIT_POINT_TAB = 'PROFIT_POINT_TAB';
const PROFIT_STONE_TAB = 'PROFIT_STONE_TAB';

const ProfitPage = () => {
  const jdcResult = useSelector(getJdcResult);
  const [visible, setVisible] = useState(false);

  const showModal = useCallback(() => setVisible(true), []);
  const hideModal = useCallback(() => setVisible(false), []);

  const [tab, setTab] = useState(PROFIT_POINT_TAB);
  const changeTab = useCallback(tabKey => setTab(tabKey), []);

  const profit = useMemo(() => jdcResult.profit, [jdcResult]);

  useEffect(() => {
    if (!visible) {
      return;
    }
    if (tab === PROFIT_POINT_TAB) {
      showPointProfit();
    }
    if (tab === PROFIT_STONE_TAB) {
      showStoneProfit();
    }
  }, [visible, tab]);

  const showPointProfit = useCallback(() => {
    const reactPointDom = makeProfitDom();
    const pcharts = echarts.init(reactPointDom);
    const pointData = profit;
    pointData.sort(sortProfitListByPoint);

    const pointOptions = {
      title: {
        textStyle: {
          color: '#ffffff',
        },
        left: 'left',
        subtext: renderProfitPointTitle(),
      },
      xAxis: {
        type: 'category',
        data: pointData.map(renderProfitPointXAxis),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: pointData.map(renderProfitPointSeries),
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
  }, [profit]);

  const showStoneProfit = useCallback(() => {
    const reactPointDom = makeProfitDom();
    const pcharts = echarts.init(reactPointDom);
    const pointData = profit;
    pointData.sort(sortProfitListByStone);

    const data6 = pointData.map(profit => sortProfitListByStoneLevel(profit, 6));
    const data7 = pointData.map(profit => sortProfitListByStoneLevel(profit, 7));
    const data8 = pointData.map(profit => sortProfitListByStoneLevel(profit, 8));

    const labelOption = getProfitStoneLabelOptions();
    const schartsOptions = {
      title: {
        textStyle: {
          color: '#ffffff',
        },
        left: 'left',
        subtext: '????????????????????? %',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      // ????????????
      legend: {
        data: ['??????', '??????', '??????'],
      },
      xAxis: {
        type: 'category',
        data: pointData.map(renderProfitStoneXAxis),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '??????',
          type: 'bar',
          emphasis: {
            focus: 'series',
          },
          data: data8,
          label: labelOption,
        },
        {
          name: '??????',
          type: 'bar',
          emphasis: {
            focus: 'series',
          },
          data: data7,
          label: labelOption,
        },
        {
          name: '??????',
          type: 'bar',
          emphasis: {
            focus: 'series',
          },
          data: data6,
          label: labelOption,
        },
      ],
    };
    pcharts.setOption(schartsOptions);
    document.getElementById('echarts-stone-profit')?.replaceChildren(reactPointDom);
  }, [profit]);

  return (
    <div>
      <span onClick={showModal}>????????????</span>
      <Modal
        visible={visible}
        onCancel={hideModal}
        closeIcon={null}
        okText='??????'
        width={'900px'}
        cancelText='??????'
        wrapClassName='echarts-wrap'
        centered={true}
      >
        <Tabs tabPosition='left' onTabClick={changeTab}>
          <Tabs.TabPane tab='????????????' key={PROFIT_POINT_TAB}>
            <div id='echarts-point-profit' />
          </Tabs.TabPane>
          <Tabs.TabPane tab='????????????' key={PROFIT_STONE_TAB}>
            <div id='echarts-stone-profit' />
          </Tabs.TabPane>
        </Tabs>
      </Modal>
    </div>
  );
};
export default ProfitPage;
