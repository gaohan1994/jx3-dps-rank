import DpsCore from 'jx3-dps-core/build/packages/core/core';
import Support from 'jx3-dps-core/build/packages/support/support';
import Skill from 'jx3-dps-core/build/packages/core/skill';
import {
  CalculatorResult,
  CreateCalculatorOptions,
} from 'jx3-dps-core/build/calculator/calculator';
import { Gain } from 'jx3-dps-core/build/packages/gain/gain';
import { JDCCharacter } from './reducer';
import { ProfitCore } from 'jx3-dps-core/build/packages/profit/profit';

type Jx3DpsCoreCalculateResult = { profit: ProfitCore[] } & CalculatorResult;

export const getCore = (state: any) => state.jdcCore;

export const getJdcCore = (state: any): DpsCore => state.jdcCore.jdcCore ?? {};

export const getJdcSupport = (state: any): Support => state.jdcCore.jdcSupport ?? {};

export const getSkills = (state: any): Skill[] => state.jdcCore.jdcResult?.skills ?? [];

export const getJdcResult = (state: any): Jx3DpsCoreCalculateResult =>
  state.jdcCore.jdcResult ?? {};

export type JDCComponentsSupportOptions = { coverage: number };

export type JDCComponentsGainGroupValue = {
  data: Array<Gain>;
  value: Array<number>;
  extra?: {
    [name: string]: JDCComponentsSupportOptions;
  };
};

export const getJDCGainGroupValue = (
  coreValues: any,
  target: string
): JDCComponentsGainGroupValue => coreValues[target] ?? {};

export const getJDCCharacter = (state: any): JDCCharacter => state.jdcCore.jdcCharacter ?? {};

export const getJDCTarget = (state: any) => state.jdcCore.jdcTarget ?? {};

export const getJDCCWTimes = (state: any) => state.jdcCore.jdcCWTimes ?? 3;

export const getNeedResizeECharts = (state: any) => state.jdcCore.resizeECharts ?? false;

export const getCalculatorOptions = (state: any): CreateCalculatorOptions =>
  state.jdcCore.jdcCalculatorOptions ?? {};
