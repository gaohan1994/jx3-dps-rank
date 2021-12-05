import { CalculatorResult } from 'jx3-dps-core/build/calculator/calculator';
import DpsCore from 'jx3-dps-core/build/packages/core/core';
import Support from 'jx3-dps-core/build/packages/support/support';
import { RECEIVE_JDC_CORE, RECEIVE_JDC_RESILT, RECEIVE_JDC_SUPPORT } from './constants';

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
