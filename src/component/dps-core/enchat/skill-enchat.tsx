import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Tooltip } from 'antd';
import { getCalculatorOptions } from '@core/selector';
import { setJDCCalculatorOptions } from '@core/action';
import Jx3DpsCore from 'jx3-dps-core';

export const JDCOptions = () => {
  const dispatch = useDispatch();
  const calculatorOptions = useSelector(getCalculatorOptions);

  const jinGangRiLunUsed = useMemo(
    () =>
      calculatorOptions.skillEnchant &&
      calculatorOptions.skillEnchant ===
        Jx3DpsCore.CalculatorVersions.YiJinJingSkillEnchant.JinGangRiLun
        ? true
        : false,
    [calculatorOptions]
  );
  const onChangeJinGangRiLun = useCallback(() => {
    if (jinGangRiLunUsed) {
      return dispatch(setJDCCalculatorOptions('skillEnchant', null));
    }
    dispatch(
      setJDCCalculatorOptions(
        'skillEnchant',
        Jx3DpsCore.CalculatorVersions.YiJinJingSkillEnchant.JinGangRiLun
      )
    );
  }, [jinGangRiLunUsed]);
  return (
    <div className='calculator-item' style={{ justifyContent: 'space-between' }}>
      <Tooltip title='你渴望力量吗！！'>
        <div className='calculator-item-title calculator-item-title-important'>金刚日轮</div>
      </Tooltip>

      <Switch checked={jinGangRiLunUsed} onChange={onChangeJinGangRiLun} />
    </div>
  );
};
