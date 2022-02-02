import numeral from 'numeral';
import {
  CalculatorResult,
  CreateCalculatorOptions,
} from 'jx3-dps-core/build/calculator/calculator';
import DpsCore from 'jx3-dps-core/build/packages/core/core';
import GainTypes from 'jx3-dps-core/build/packages/gain/gain';
import { TargetListKeys } from 'jx3-dps-core/build/types';
import Jx3DpsCore, { Support } from 'jx3-dps-core';

import {
  RECEIVE_JDC_CORE,
  RECEIVE_JDC_RESILT,
  RECEIVE_JDC_SUPPORT,
  RECEIVE_JDC_GAIN,
  RECEIVE_JDC_GAIN_EXTRA,
  RECEIVE_JDC_CHARACTER_CHANGE,
  RESET_JDC_CHARACTER_CHANGE,
  REPLEASE_JDC_CHARACTER_ATTRIBUTES,
  RECEIVE_JDC_TARGET,
  RECEIVE_JDC_CW_TIMES,
  NEED_RESIZE_MAIN_ECHARTS,
  RECEIVE_JDC_CALCULATOR_OPTIONS,
} from './constants';
import {
  getCalculatorOptions,
  getCore,
  getJDCCharacter,
  getJDCCWTimes,
  getJDCGainGroupValue,
  getJDCTarget,
  JDCComponentsSupportOptions,
} from './selector';
import { JDCCharacter } from './reducer';
import {
  checkCharacterAttributeCanBeEmpty,
  makeCharacterOptions,
  makeCharacterValue,
  makeJDCSupportUseGain,
} from './util';
import cache from './cache';
import { notification } from 'antd';

const { GainGroupTypes } = Jx3DpsCore;

export const setJDCResult = (payload: CalculatorResult) => ({
  type: RECEIVE_JDC_RESILT,
  payload,
});

export const setJDCCore = (payload: DpsCore) => ({
  type: RECEIVE_JDC_CORE,
  payload,
});

export const setJDCSupport = (payload: Support) => ({
  type: RECEIVE_JDC_SUPPORT,
  payload,
});

export type JDCGainDropdownPayload = {
  target: string;
  data: GainTypes.Gain[];
  multiple?: boolean;
};

export const setJDCGain = (payload: JDCGainDropdownPayload) => ({
  type: RECEIVE_JDC_GAIN,
  payload,
});

export type JDCGainExtraOptionPayload = {
  target: string;
  extraTarget: number;
  extraValue: JDCComponentsSupportOptions;
};

export const setJDCGainExtraOption = (payload: JDCGainExtraOptionPayload) => ({
  type: RECEIVE_JDC_GAIN_EXTRA,
  payload,
});

export type JDCCharacterPayload = {
  target: string;
  value: string;
};
export const setJDCCharacterAttributes = (payload: JDCCharacterPayload) => ({
  type: RECEIVE_JDC_CHARACTER_CHANGE,
  payload,
});

export const resetJDCCharacterAttributes = () => ({
  type: RESET_JDC_CHARACTER_CHANGE,
});

export const replaceJDCCharacterAttributes = (payload: JDCCharacter) => ({
  type: REPLEASE_JDC_CHARACTER_ATTRIBUTES,
  payload,
});

export const setJDCTarget = (target: TargetListKeys) => ({
  type: RECEIVE_JDC_TARGET,
  payload: target,
});

export const setJDCCWTimes = (times: number) => ({
  type: RECEIVE_JDC_CW_TIMES,
  payload: times,
});

export const setNeedResizeECharts = (value: boolean) => ({
  type: NEED_RESIZE_MAIN_ECHARTS,
  payload: value,
});

export const setJDCCalculatorOptions = (target: keyof CreateCalculatorOptions, value: any) => ({
  type: RECEIVE_JDC_CALCULATOR_OPTIONS,
  payload: {
    target,
    value,
  },
});

export const calculateJDCResultAction = () => (dispatch, getState) => {
  const state = getState();

  const calculatorTarget = getJDCTarget(state);
  const calculatorCWTimes = getJDCCWTimes(state);
  const calculatorOptions = getCalculatorOptions(state);
  const characterAttributes = getJDCCharacter(state);
  const coreComponentsValue = getCore(state);

  const jdcComponentsSelectedValues = [
    getJDCGainGroupValue(coreComponentsValue, GainGroupTypes.Formations),
    getJDCGainGroupValue(coreComponentsValue, GainGroupTypes.TeamSkills),
    getJDCGainGroupValue(coreComponentsValue, GainGroupTypes.GroupSkills),
    getJDCGainGroupValue(coreComponentsValue, GainGroupTypes.SetBonusesGain),
    getJDCGainGroupValue(coreComponentsValue, GainGroupTypes.Weapons),
    getJDCGainGroupValue(coreComponentsValue, GainGroupTypes.Enchants),
    getJDCGainGroupValue(coreComponentsValue, GainGroupTypes.EffectSpines),
    getJDCGainGroupValue(coreComponentsValue, GainGroupTypes.Banquet),
    getJDCGainGroupValue(coreComponentsValue, GainGroupTypes.DrugEnhance),
    getJDCGainGroupValue(coreComponentsValue, GainGroupTypes.DrugSupport),
    getJDCGainGroupValue(coreComponentsValue, GainGroupTypes.FoodEnhance),
    getJDCGainGroupValue(coreComponentsValue, GainGroupTypes.FoodSupport),
    getJDCGainGroupValue(coreComponentsValue, GainGroupTypes.HomeFood),
    getJDCGainGroupValue(coreComponentsValue, GainGroupTypes.Target),
    getJDCGainGroupValue(coreComponentsValue, GainGroupTypes.WeaponEnchant),
    getJDCGainGroupValue(coreComponentsValue, GainGroupTypes.HomeDrink),
    getJDCGainGroupValue(coreComponentsValue, GainGroupTypes.FestivalFood),
  ];

  const jdcSupportUseGains = makeJDCSupportUseGain(jdcComponentsSelectedValues);

  try {
    for (const [attributeKey, attributeValue] of Object.entries(characterAttributes)) {
      if (checkCharacterAttributeCanBeEmpty(attributeKey)) {
        continue;
      }
      if (!attributeValue) {
        const [attributeTitle] = makeCharacterOptions(attributeKey);

        if (attributeTitle) {
          throw new Error(`请输入${attributeTitle}`);
        }
      }
    }
    cache.saveCoreAttributes(characterAttributes);

    const jdcSupport = new Support({
      target: calculatorTarget,
      CWTimes: calculatorCWTimes,
    });
    jdcSupport.use(Jx3DpsCore.TeamSkills.JinGangNuMu);
    jdcSupport.use(Jx3DpsCore.TeamSkills.QinLongJue);
    jdcSupport.use({
      name: 'UPDATE08-30',
      type: 'Costom',
      data: [{ gainTarget: 'damageBonus', value: 0.03, coverage: 1 }],
    });
    jdcSupport.use({
      name: '少林常驻破防加成',
      type: 'Costom',
      data: [{ gainTarget: 'SolarOvercomePercent', value: 0.15, coverage: 1 }],
    });

    if (jdcSupportUseGains.length > 0) {
      jdcSupportUseGains.forEach(jdcSupportUseGain => {
        jdcSupport.use(jdcSupportUseGain.gain, jdcSupportUseGain.options);
      });
    }
    dispatch(setJDCSupport(jdcSupport));
    const jdc = new Jx3DpsCore(
      makeCharacterValue(characterAttributes),
      jdcSupport,
      calculatorOptions
    );
    const result = jdc.calculate();
    // const currentResult = createCalculator(jdcCore, jdcSupport, calculatorOptions);
    dispatch(setJDCResult(result));
  } catch (error: any) {
    notification.error({
      message: error.message,
    });
  }

  return null;
};
