import React, { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from 'antd';
import { selectGainGroupByName, gainModule } from 'jx3-dps-core';
import { getCore, getJDCGainGroupValue } from '@core/selector';
import { setJDCGain } from '@core/action';

const { allGainGroupList } = gainModule;

export type JDCDropdownProps = {
  JDCDataName: string;
};

export const JDCSwitch = (props: JDCDropdownProps) => {
  const { JDCDataName } = props;
  const dispatch = useDispatch();
  const jdcCoreValue = useSelector(getCore);

  const currentGroupValue = useMemo(
    () => getJDCGainGroupValue(jdcCoreValue, JDCDataName),
    [jdcCoreValue, JDCDataName]
  );

  const currentGroupData = useMemo(
    () => selectGainGroupByName(allGainGroupList, JDCDataName),
    [allGainGroupList, JDCDataName]
  );

  const setSwitchAction = useCallback(
    switchChecked => {
      const currentGain = currentGroupData.list[0];
      dispatch(
        setJDCGain({
          target: JDCDataName,
          data: switchChecked ? [currentGain] : [],
        })
      );
    },
    [currentGroupData, JDCDataName]
  );

  const selectValue = useMemo(() => currentGroupValue.value ?? [], [currentGroupValue]);
  return (
    <div
      className='calculator-item calculator-item-extra'
      style={{ justifyContent: 'space-between' }}
    >
      <div className='calculator-item-title'>{currentGroupData.title}</div>
      <Switch checked={selectValue.length > 0} onChange={setSwitchAction} />
    </div>
  );
};
