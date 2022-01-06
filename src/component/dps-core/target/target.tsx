import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from 'antd';
import { Target } from '@pages/calculator/config';
import { getJDCTarget } from '@core/selector';
import { setJDCTarget } from '@core/action';

export const JDCTarget = () => {
  const dispatch = useDispatch();
  const target = useSelector(getJDCTarget);

  const changeTarget = currentTarget => {
    dispatch(setJDCTarget(currentTarget));
  };

  return (
    <div className='calculator-item'>
      <div className='calculator-item-title'>目标选择</div>
      <Select value={target} onChange={changeTarget} style={{ width: '100%' }}>
        {Target.map(item => {
          return (
            <Select.Option key={item.value} value={item.value}>
              {item.title}
            </Select.Option>
          );
        })}
      </Select>
    </div>
  );
};
