import React from 'react';
import { Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import icon from '../assets/sl_yjj.png';

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

export const calculatorIcon = icon;
