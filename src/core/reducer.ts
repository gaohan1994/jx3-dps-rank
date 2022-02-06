import Jx3DpsCore, { selectGainByName, gainModule } from 'jx3-dps-core';
import { CreateCalculatorOptions } from 'jx3-dps-core/build/calculator/calculator';
import { CreateDpsCoreOptions } from 'jx3-dps-core/build/packages/core/core';
import { JDCCharacterPayload, JDCGainDropdownPayload, JDCGainExtraOptionPayload } from './action';
import cache from './cache';
import {
  RECEIVE_JDC_RESULT,
  RECEIVE_JDC_CORE,
  RECEIVE_JDC_SUPPORT,
  RECEIVE_JDC_GAIN,
  RECEIVE_JDC_GAIN_EXTRA,
  RESET_JDC_CHARACTER_CHANGE,
  RECEIVE_JDC_CHARACTER_CHANGE,
  REPLEASE_JDC_CHARACTER_ATTRIBUTES,
  RECEIVE_JDC_TARGET,
  RECEIVE_JDC_CW_TIMES,
  NEED_RESIZE_MAIN_ECHARTS,
  RECEIVE_JDC_CALCULATOR_OPTIONS,
} from './constants';
import { JDCComponentsGainGroupValue } from './selector';

const { allGainList } = gainModule;

const enChantBelt = selectGainByName(allGainList, Jx3DpsCore.Enchants.EnChantBelt);
const enChantBody = selectGainByName(allGainList, Jx3DpsCore.Enchants.EnChantBody);
const enChantHead = selectGainByName(allGainList, Jx3DpsCore.Enchants.EnChantHead);
const initEnchant = {
  data: [enChantBelt, enChantBody, enChantHead],
  value: [enChantBelt, enChantBody, enChantHead].map(e => e.id),
};

const skillSetBonuse = selectGainByName(allGainList, Jx3DpsCore.SetBonusesGain.SkillSetBonuse);
const valueSetBonuse = selectGainByName(allGainList, Jx3DpsCore.SetBonusesGain.ValueSetBonuse);
const initSetBonuse = {
  data: [skillSetBonuse, valueSetBonuse],
  value: [skillSetBonuse, valueSetBonuse].map(e => e.id),
};

export type JDCCharacter = CreateDpsCoreOptions;

const emptyJdcCharacter = {
  Spunk: '',
  SolarAttackPowerBase: '',
  SolarCriticalStrikeRate: '',
  SolarCriticalDamagePowerPercent: '',
  SolarOvercomePercent: '',
  SurplusValue: '',
  StrainPercent: '',
  Haste: Jx3DpsCore.HasteList.YiDuanJiaSu,
  MeleeWeaponDamage: '2000',
};
/**
 * @param initJdcCharacter 角色属性
 *
 * @todo 修改导入方式
 * @todo 默认导入上次计算时的角色属性
 */
const initJdcCharacter: JDCCharacter = cache.hasLastCore()
  ? {
      ...cache.getLastCore(),
      MeleeWeaponDamage: '2000',
    }
  : {
      Spunk: '',
      SolarAttackPowerBase: '',
      SolarCriticalStrikeRate: '',
      SolarCriticalDamagePowerPercent: '',
      SolarOvercomePercent: '',
      SurplusValue: '',
      StrainPercent: '',
      Haste: Jx3DpsCore.HasteList.YiDuanJiaSu,
      MeleeWeaponDamage: '2000',
    };

const initTarget = Jx3DpsCore.Target.MuZhuang113;

const initCalculatorOptions: CreateCalculatorOptions = {
  qiXueVersion: Jx3DpsCore.CalculatorVersions.YiJinJingQiXueVersion.XinZheng,
  skillEnchant: null as any,
};

const initState = {
  jdcResult: {},
  jdcCore: {},
  jdcCharacter: initJdcCharacter,
  jdcSupport: {},
  jdcTarget: initTarget,
  jdcCWTimes: 3,
  jdcCalculatorOptions: initCalculatorOptions,
  resizeECharts: false,

  [Jx3DpsCore.GainGroupTypes.Formations]: {} as JDCComponentsGainGroupValue,
  [Jx3DpsCore.GainGroupTypes.TeamSkills]: {} as JDCComponentsGainGroupValue,
  [Jx3DpsCore.GainGroupTypes.GroupSkills]: {} as JDCComponentsGainGroupValue,
  [Jx3DpsCore.GainGroupTypes.Weapons]: {} as JDCComponentsGainGroupValue,
  [Jx3DpsCore.GainGroupTypes.EffectSpines]: {} as JDCComponentsGainGroupValue,
  [Jx3DpsCore.GainGroupTypes.Banquet]: {} as JDCComponentsGainGroupValue,
  [Jx3DpsCore.GainGroupTypes.DrugEnhance]: {} as JDCComponentsGainGroupValue,
  [Jx3DpsCore.GainGroupTypes.DrugSupport]: {} as JDCComponentsGainGroupValue,
  [Jx3DpsCore.GainGroupTypes.FoodEnhance]: {} as JDCComponentsGainGroupValue,
  [Jx3DpsCore.GainGroupTypes.FoodSupport]: {} as JDCComponentsGainGroupValue,
  [Jx3DpsCore.GainGroupTypes.HomeFood]: {} as JDCComponentsGainGroupValue,
  // [GainGroupTypes.Target]: {} as JDCComponentsGainGroupValue,
  [Jx3DpsCore.GainGroupTypes.SetBonusesGain]: initSetBonuse as JDCComponentsGainGroupValue,
  [Jx3DpsCore.GainGroupTypes.Enchants]: initEnchant as JDCComponentsGainGroupValue,
};

export const jdcCore = (state = initState, { type, payload }: any) => {
  switch (type) {
    case RECEIVE_JDC_RESULT: {
      return {
        ...state,
        jdcResult: payload,
      };
    }
    case RECEIVE_JDC_CORE: {
      return {
        ...state,
        jdcCore: payload,
      };
    }
    case RECEIVE_JDC_SUPPORT: {
      return {
        ...state,
        jdcSupport: payload,
      };
    }
    case RECEIVE_JDC_GAIN: {
      const { target, data } = payload as JDCGainDropdownPayload;
      const value = data.map(item => item.id);
      return {
        ...state,
        [target]: {
          data,
          value,
        },
      };
    }
    case RECEIVE_JDC_GAIN_EXTRA: {
      const { target, extraTarget, extraValue } = payload as JDCGainExtraOptionPayload;
      return {
        ...state,
        [target]: {
          ...state[target],
          extra: {
            ...state[target].extra,
            [extraTarget]: extraValue,
          },
        },
      };
    }
    case RECEIVE_JDC_CHARACTER_CHANGE: {
      const { target, value } = payload as JDCCharacterPayload;
      return {
        ...state,
        jdcCharacter: {
          ...state.jdcCharacter,
          [target]: value,
        },
      };
    }
    case RESET_JDC_CHARACTER_CHANGE: {
      return {
        ...state,
        jdcCharacter: emptyJdcCharacter,
      };
    }
    case REPLEASE_JDC_CHARACTER_ATTRIBUTES: {
      return {
        ...state,
        jdcCharacter: payload,
      };
    }
    case RECEIVE_JDC_TARGET: {
      return {
        ...state,
        jdcTarget: payload,
      };
    }
    case RECEIVE_JDC_CW_TIMES: {
      return {
        ...state,
        jdcCWTimes: payload,
      };
    }
    case NEED_RESIZE_MAIN_ECHARTS: {
      return {
        ...state,
        resizeECharts: payload,
      };
    }
    case RECEIVE_JDC_CALCULATOR_OPTIONS: {
      const { target, value } = payload;
      return {
        ...state,
        jdcCalculatorOptions: {
          ...state.jdcCalculatorOptions,
          [target]: value,
        },
      };
    }
    default: {
      return state;
    }
  }
};
