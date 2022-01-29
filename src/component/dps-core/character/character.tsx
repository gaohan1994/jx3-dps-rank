import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Select } from 'antd';
import { CoreHelper } from 'jx3-dps-core';
import { getJDCCharacter } from '@core/selector';
import { makeCharacterStuff } from '@core/util';
import { setJDCCharacterAttributes } from '@core/action';

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
    </>
  );
};
