import numeral from 'numeral';
import Skill from 'jx3-dps-core/build/packages/core/skill';
import { CoreHelper } from 'jx3-dps-core';
import { ProfitCore } from 'jx3-dps-core/build/packages/profit/profit';
import { CalculatorResult } from 'jx3-dps-core/build/calculator/calculator';

export const getInitUserAttributes = () => {
  return process.env.NODE_ENV === 'production'
    ? {
        JiChuGongJi: 0,
        WuQiShangHai: 2000,
        HuiXin: 0,
        HuiXiao: 0,
        PoFang: 0,
        PoZhao: 0,
        JiaSu: CoreHelper.JiaSuList.YiDuanJiaSu,
        WuShuang: 0,
        YuanQi: 0,
      }
    : {
        JiChuGongJi: 14399,
        WuQiShangHai: 2000,
        HuiXin: 18.69,
        HuiXiao: 175.77,
        PoFang: 40.44,
        PoZhao: 5298,
        WuShuang: 47.49,
        YuanQi: 2904,
        JiaSu: CoreHelper.JiaSuList.YiDuanJiaSu,
      };
};

export const getThemeColor = () => [145, 134, 29].join(', ');
export const getBackgroundColor = () => `rgba(${getThemeColor()})`;

const S_CLASS_DPS_COE = 1.03;
export const getSClassDps = (dps: number) => numeral(dps * S_CLASS_DPS_COE).format('0,000');

export const renderDpsChartsTitle = (data: CalculatorResult) =>
  `总输出：${numeral(data.total).format('0,000')} 战斗时间：${data.seconds}秒 DPS：${numeral(
    data.dps
  ).format('0,000')} `;

export const renderTooltipFormatter = (params: any, skills: Skill[]) => {
  var targetParams = params[0];
  const currentSkill =
    skills.find(item => item.skillTitle === targetParams.axisValue) || ({} as Skill);
  return (
    `技能：${currentSkill.skillTitle}` +
    '<br/>' +
    `次数：${currentSkill.skillTimes} 次` +
    '<br/>' +
    `平均单次输出：${numeral((currentSkill.subTotal ?? 0) / currentSkill.skillTimes).format(
      '0,000'
    )}` +
    '<br/>' +
    `小计：${currentSkill.subTotal}` +
    '<br/>' +
    `技能占比：${numeral((currentSkill.percent ?? 0) * 100).format('0.00')} %`
  );
};

export const renderSeriesLabelFormatter = (params: any, skills: Skill[]) => {
  var targetParams = params;
  const currentSkill = skills.find(item => item.skillTitle === targetParams.name) ?? ({} as Skill);
  return `${numeral((currentSkill.percent ?? 0) * 100).format('0.00')} %`;
};

export const makeDpsRowChartsData = (skills: Skill[]) => {
  const chartsData = [];
  const yAxisData = [];

  for (let index = 0; index < skills.length; index++) {
    const currentSkill = skills[index];
    yAxisData.push(currentSkill.skillTitle);
    chartsData.push(currentSkill.subTotal);
  }
  return {
    chartsData,
    yAxisData,
  };
};

export const makeProfitDom = () => {
  const reactPointDom = document.createElement('div');
  reactPointDom.style.height = '500px';
  reactPointDom.style.width = '800px';
  return reactPointDom;
};

export const sortProfitListByPoint = (profit1: ProfitCore, profit2: ProfitCore) =>
  profit2.pointProfit - profit1.pointProfit;

export const sortProfitListByStone = (profit1: ProfitCore, profit2: ProfitCore) =>
  (profit2.profitWithStone.get(8) || 0) - (profit1.profitWithStone.get(8) || 0);

export const sortProfitListByStoneLevel = (profit: ProfitCore, level: number) =>
  numeral(profit.profitWithStone.get(level) || 0 * 100).format('0.00');

export const renderProfitPointTitle = () => '单点收益百分比 %';

export const renderProfitPointXAxis = (profit: ProfitCore) => profit.title.replace('收益', '');

export const renderProfitStoneXAxis = (profit: ProfitCore) => profit.title.replace('收益', '');

export const renderProfitPointSeries = (profit: ProfitCore) =>
  numeral(profit.pointProfit * 100).format('0.00');

export const getProfitStoneLabelOptions = () => ({
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
});
