import React from 'react';
import { Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import sl_yjj from '../assets/sl_yjj.png';

/**
 * 人物属性值
 * @param UserAttributeKeys
 */
export const UserAttributeKeys = [
  {
    value: 'YuanQi',
    title: '元气',
  },
  {
    value: 'JiChuGongJi',
    title: '基础攻击',
  },
  {
    value: 'HuiXin',
    title: '会心',
    suffix: '%',
  },
  {
    value: 'HuiXiao',
    title: '会效',
    suffix: '%',
  },
  {
    value: 'PoFang',
    title: '破防',
    suffix: '%',
  },
  {
    value: 'PoZhao',
    title: '破招',
  },
  {
    value: 'WuShuang',
    title: '无双',
    suffix: '%',
  },
  {
    value: 'JiaSu',
    title: '加速',
    suffix: (
      <Tooltip title='目前暂未实现加速计算 后续开放'>
        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
      </Tooltip>
    ),
    nullToken: true,
  },
  {
    value: 'WuQiShangHai',
    title: '武器伤害',
    suffix: (
      <Tooltip title='输入武器伤害计算更加准确'>
        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
      </Tooltip>
    ),
    nullToken: true,
  },
];

/**
 * 游戏职业详情
 *
 * @export
 * @interface GameProfession
 */
export interface GameClass {
  /**
   * 职业名称
   *
   * @type {string}
   * @memberof GameClass
   */
  profession: any;
  /**
   * 职业名称中文
   *
   * @type {string}
   * @memberof GameClass
   */
  professionName: string;
  /**
   * 职业心法
   *
   * @type {string}
   * @memberof GameClass
   */
  class: any;
  /**
   * 职业心法中文
   *
   * @type {string}
   * @memberof GameClass
   */
  className: string;
  /**
   * 职业颜色
   *
   * @type {string}
   * @memberof GameClass
   */
  color: number[];
  /**
   * 职业图标
   *
   * @type {string}
   * @memberof GameClass
   */
  icon: string;

  /**
   * 职业流派 (保留字段)
   *
   * @type {string}
   * @memberof GameClass
   */
  genre?: string;
}

/**
 * 少林派
 *
 * @param ShaoLin
 */
const YiJinJing: GameClass = {
  profession: 'ShaoLin',
  professionName: '少林',
  class: 'YiJinJing',
  className: '易筋经',
  color: [145, 134, 29],
  icon: sl_yjj,
};

const ShaoLin = {
  YiJinJing: YiJinJing,
};
/**
 * 返回所有游戏职业
 *
 * @param GameProfessions
 */
const GameProfessions: { [name: string]: any } = {
  ShaoLin: ShaoLin,
};

/**
 * 获取游戏门派数据
 *
 * @param {GameProfessionNames} profession
 * @return {*} 返回门派
 */
function getGameProfession(profession: any) {
  return GameProfessions[profession];
}

/**
 * 获取游戏心法
 *
 * @param {GameProfessionNames} profession
 * @param {GameClassesNames} className
 * @return {*}
 */
function getGameClass(profession: any, className: any) {
  return GameProfessions[profession][className];
}

export { GameProfessions, getGameProfession, getGameClass };
