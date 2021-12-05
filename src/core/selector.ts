import DpsCore from 'jx3-dps-core/build/packages/core/core';
import Support from 'jx3-dps-core/build/packages/support/support';
import Skill from 'jx3-dps-core/build/packages/core/skill';
import { CalculatorResult } from 'jx3-dps-core/build/calculator/calculator';

export const getJdcCore = (state: any): DpsCore => state.jdcCore.jdcCore ?? {};

export const getJdcSupport = (state: any): Support => state.jdcCore.jdcSupport ?? {};

export const getSkills = (state: any): Skill[] => state.jdcCore.jdcResult?.skills ?? [];

export const getJdcResult = (state: any): CalculatorResult => state.jdcCore.jdcResult ?? {};
