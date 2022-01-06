import { CalculatorResult } from 'jx3-dps-core/build/calculator/calculator';
import DpsCore from 'jx3-dps-core/build/packages/core/core';
import Support from 'jx3-dps-core/build/packages/support/support';
import GainTypes from 'jx3-dps-core/build/packages/gain/gain';

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
} from './constants';
import { JDCComponentsSupportOptions } from './selector';
import { JDCCharacter } from './reducer';
import { TargetListKeys } from 'jx3-dps-core/build/types';

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
