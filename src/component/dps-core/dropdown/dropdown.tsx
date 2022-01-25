import React, { useMemo, useCallback } from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from 'antd';
import {
  selectGainGroupByName,
  selectGainById,
  gainModule,
  gainDataToString,
  CoreHelper,
} from 'jx3-dps-core';
import { getCore, getJDCGainGroupValue } from '@core/selector';
import { setJDCGain } from '@core/action';
import { SetExtraModal } from '../extra/extra';
import { gainIsCW, makeJDCComponentSelectOptions } from '@core/util';

const { GainGroupTypes } = CoreHelper;
const { allGainGroupList, allGainList } = gainModule;

export type JDCDropdownProps = {
  JDCDataName: string;
  multiple?: boolean;
  useDescription?: boolean;
};

export const JDCDropdown = (props: JDCDropdownProps) => {
  const { JDCDataName, multiple = false, useDescription = true } = props;
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

  const getSelectedGain = useCallback(
    selectGainId => selectGainById(allGainList, selectGainId),
    [allGainList, selectGainById]
  );

  const emptyDropdownAction = useCallback(() => {
    dispatch(
      setJDCGain({
        target: JDCDataName,
        data: [],
      })
    );
  }, [JDCDataName]);

  const setDropdownAction = useCallback(
    gainId => {
      const currentGain = getSelectedGain(gainId);
      dispatch(
        setJDCGain({
          target: JDCDataName,
          data: currentGain ? [currentGain] : [],
        })
      );
    },
    [getSelectedGain, JDCDataName]
  );

  const setMultipleDropdownAction = useCallback(
    gainIds => {
      const currentGains = gainIds.map(getSelectedGain);
      dispatch(
        setJDCGain({
          target: JDCDataName,
          data: currentGains,
          multiple: true,
        })
      );
    },
    [getSelectedGain, JDCDataName]
  );

  const [selectProps, dropdownOnChangeAction] = useMemo(
    () => [
      !multiple ? {} : ({ mode: 'multiple' } as any),
      !multiple ? setDropdownAction : setMultipleDropdownAction,
    ],
    [multiple]
  );

  const [selectPlaceholder, selectValue, selectOptions, suffixEmptyIcon] = useMemo(
    () => [
      `${currentGroupData.title} - 无`,
      !multiple ? currentGroupValue?.value?.[0] : currentGroupValue.value,
      makeJDCComponentSelectOptions(currentGroupData),
      currentGroupValue.value && currentGroupValue.value.length > 0 && (
        <CloseCircleOutlined onClick={emptyDropdownAction} />
      ),
    ],
    [currentGroupData, currentGroupValue, multiple, JDCDataName]
  );

  // show extra stuff
  const [showGroupSkillsExtra, showTeamSkillsExtra, showWeaponExtra] = useMemo(
    () => [
      currentGroupValue.value &&
        currentGroupValue.value.length > 0 &&
        JDCDataName === GainGroupTypes.GroupSkills,
      currentGroupValue.value &&
        currentGroupValue.value.length > 0 &&
        JDCDataName === GainGroupTypes.TeamSkills,
      currentGroupValue.value &&
        currentGroupValue.value.length > 0 &&
        JDCDataName === GainGroupTypes.Weapons &&
        gainIsCW(selectGainById(allGainList, selectValue as number)),
    ],
    [currentGroupValue, selectValue]
  );
  return (
    <>
      <div className='calculator-item'>
        <div className='calculator-item-title'>{currentGroupData.title}</div>
        <Select
          {...selectProps}
          placeholder={selectPlaceholder}
          value={selectValue}
          onChange={dropdownOnChangeAction}
        >
          {selectOptions.map(item => {
            const selectOptionsName = !useDescription ? item.name : gainDataToString(item);
            return (
              <Select.Option key={item.id} value={item.id}>
                {selectOptionsName}
              </Select.Option>
            );
          })}
        </Select>
        <div className='calculator-suffix-wrapper'>{suffixEmptyIcon}</div>
      </div>

      {showGroupSkillsExtra && (
        <SetExtraModal gainGroup={currentGroupData} currentGroupValue={currentGroupValue} />
      )}
      {showTeamSkillsExtra && (
        <SetExtraModal gainGroup={currentGroupData} currentGroupValue={currentGroupValue} />
      )}
      {showWeaponExtra && (
        <SetExtraModal gainGroup={currentGroupData} currentGroupValue={currentGroupValue} />
      )}
    </>
  );
};
