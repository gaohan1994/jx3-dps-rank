import DpsCore from 'jx3-dps-core/build/packages/core/core';
import Support from 'jx3-dps-core/build/packages/support/support';
import Skill from 'jx3-dps-core/build/packages/core/skill';
import { CalculatorResult } from 'jx3-dps-core/build/calculator/calculator';
import { Gain } from 'jx3-dps-core/build/packages/gain/gain';
import { JDCCharacter } from './reducer';

export const getCore = (state: any) => state.jdcCore;

export const getJdcCore = (state: any): DpsCore => state.jdcCore.jdcCore ?? {};

export const getJdcSupport = (state: any): Support => state.jdcCore.jdcSupport ?? {};

export const getSkills = (state: any): Skill[] => state.jdcCore.jdcResult?.skills ?? [];

export const getJdcResult = (state: any): CalculatorResult => state.jdcCore.jdcResult ?? {};

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
