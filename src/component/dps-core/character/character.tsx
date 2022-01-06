import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Input, Modal, notification, Select } from 'antd';
import { CoreHelper } from 'jx3-dps-core';
import { getJDCCharacter } from '@core/selector';
import { makeCharacterStuff } from '@core/util';
import {
  replaceJDCCharacterAttributes,
  resetJDCCharacterAttributes,
  setJDCCharacterAttributes,
} from '@core/action';
import cache from '@core/cache';

export const Character = () => {
  const dispatch = useDispatch();
  const characterValues = useSelector(getJDCCharacter);

  const characterStuffValues = useMemo(
    () => makeCharacterStuff(characterValues),
    [characterValues]
  );

  const onChangeCharacterAttribute = event => {
    const characterTarget = event.target.getAttribute('data-at');
    dispatch(setJDCCharacterAttributes({ target: characterTarget, value: event.target.value }));
  };

  const onChangeCharacterJiasu = jiaSuValue => {
    dispatch(setJDCCharacterAttributes({ target: 'JiaSu', value: jiaSuValue }));
  };

  const onResetCharacter = () => {
    Modal.confirm({
      title: '清空角色属性',
      content: '确定清空角色属性吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        dispatch(resetJDCCharacterAttributes());
      },
    });
  };

  const onImportCharacter = () => {
    const token = cache.hasLastCore();
    if (!token) {
      notification.error({
        message: '导入失败',
        description: '没有历史记录',
      });
      return;
    }
    const core = cache.getLastCore();
    dispatch(replaceJDCCharacterAttributes(core));
  };

  return (
    <>
      <div className='calculator-title'>角色属性</div>
      {characterStuffValues.map(attr => {
        const { title, suffix, target } = attr;

        if (title !== '加速') {
          return (
            <div key={target} className='calculator-item'>
              <div className='calculator-item-title'>{title}</div>
              <Input
                suffix={suffix}
                value={characterValues[target]}
                data-at={target}
                onChange={onChangeCharacterAttribute}
              />
            </div>
          );
        }
        return (
          <div key={target} className='calculator-item'>
            <div className='calculator-item-title'>{title}</div>
            <Select
              value={characterValues[target]}
              data-at={target}
              onChange={onChangeCharacterJiasu}
              style={{ width: '100%' }}
            >
              <Select.Option value={CoreHelper.JiaSuList.YiDuanJiaSu}>一段加速</Select.Option>
              <Select.Option value={CoreHelper.JiaSuList.ErDuanJiaSu}>二段加速</Select.Option>
            </Select>
          </div>
        );
      })}

      <div className='calculator-bar'>
        <Button type='primary' onClick={onImportCharacter}>
          导入角色属性
        </Button>
        <Button onClick={onResetCharacter}>清空角色属性</Button>
      </div>

      <div className='calculator-tips'>
        如果您输入的角色属性是已经吃过小吃、桌子等增益之后的面板了，请勿在高级选项中再次勾选，否则计算出来的结果会高很多
      </div>
    </>
  );
};
