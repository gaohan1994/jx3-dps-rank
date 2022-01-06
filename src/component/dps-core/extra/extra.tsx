import React, { useState, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal, Slider } from 'antd';
import { GainGroup } from 'jx3-dps-core/build/packages/gain/group';
import { Gain } from 'jx3-dps-core/build/packages/gain/gain';
import { JDCComponentsGainGroupValue } from '@core/selector';
import { setJDCGainExtraOption } from '@core/action';

type SetExtraModalProps = {
  gainGroup: GainGroup;
  currentGroupValue: JDCComponentsGainGroupValue;
};

export const SetExtraModal = (props: SetExtraModalProps) => {
  const dispatch = useDispatch();
  const { gainGroup, currentGroupValue } = props;

  const [visible, setVisible] = useState(false);
  const onShow = useCallback(() => setVisible(true), []);
  const onHide = useCallback(() => setVisible(false), []);

  const setExtraOptionAction = useCallback(
    (gain: Gain, percent: number) => {
      dispatch(
        setJDCGainExtraOption({
          target: gainGroup.name,
          extraTarget: gain.id,
          extraValue: { coverage: percent / 100 },
        })
      );
    },
    [gainGroup]
  );
  const getCurrentSliderValue = useCallback(
    (gain: Gain) => {
      return currentGroupValue.extra &&
        currentGroupValue.extra[gain.id] &&
        currentGroupValue.extra[gain.id].coverage
        ? currentGroupValue.extra[gain.id].coverage
        : currentGroupValue.data.find(cgv => cgv.id === gain.id)?.data[0].coverage;
    },
    [currentGroupValue, gainGroup]
  );

  const [extraText] = useMemo(() => [`设置${gainGroup.title}覆盖率`], [gainGroup]);

  return (
    <>
      <div className='calculator-item calculator-button-wrapper calculator-item-extra'>
        <Button type='primary' onClick={onShow}>
          {extraText}
        </Button>

        <Modal title={extraText} visible={visible} centered={true} footer={null} onCancel={onHide}>
          {currentGroupValue.data.map(gainData => {
            const currentSliderValue = +getCurrentSliderValue(gainData) * 100;
            return (
              <div key={gainData.id} className='calculator-item'>
                <div className='calculator-item-title'>{gainData.name}</div>
                <Slider
                  style={{ width: '100%' }}
                  min={1}
                  max={100}
                  value={currentSliderValue}
                  onChange={value => setExtraOptionAction(gainData, value)}
                />
              </div>
            );
          })}
        </Modal>
      </div>
    </>
  );
};
