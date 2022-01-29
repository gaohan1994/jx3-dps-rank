import { CoreHelper, gainModule, selectGainByName } from 'jx3-dps-core';
import { CreateCalculatorOptions } from 'jx3-dps-core/build/calculator/calculator';
import { JDCCharacterPayload, JDCGainDropdownPayload, JDCGainExtraOptionPayload } from './action';
import cache from './cache';
import {
  RECEIVE_JDC_RESILT,
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

const { GainGroupTypes } = CoreHelper;
const { allGainList } = gainModule;

const enChantBelt = selectGainByName(allGainList, CoreHelper.Enchants.EnChantBelt);
const enChantBody = selectGainByName(allGainList, CoreHelper.Enchants.EnChantBody);
const enChantHead = selectGainByName(allGainList, CoreHelper.Enchants.EnChantHead);
const initEnchant = {
  data: [enChantBelt, enChantBody, enChantHead],
  value: [enChantBelt, enChantBody, enChantHead].map(e => e.id),
};

const skillSetBonuse = selectGainByName(allGainList, CoreHelper.SetBonusesGain.SkillSetBonuse);
const valueSetBonuse = selectGainByName(allGainList, CoreHelper.SetBonusesGain.ValueSetBonuse);
const initSetBonuse = {
  data: [skillSetBonuse, valueSetBonuse],
  value: [skillSetBonuse, valueSetBonuse].map(e => e.id),
};

export type JDCCharacter = {
  YuanQi: string;
  JiChuGongJi: string;
  HuiXin: string;
  HuiXiao: string;
  PoFang: string;
  PoZhao: string;
  WuShuang: string;
  JiaSu: string;
  WuQiShangHai?: string;
};

const emptyJdcCharacter = {
  YuanQi: '',
  JiChuGongJi: '',
  HuiXin: '',
  HuiXiao: '',
  PoFang: '',
  PoZhao: '',
  WuShuang: '',
  JiaSu: CoreHelper.JiaSuList.YiDuanJiaSu,
  WuQiShangHai: '2000',
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
      WuQiShangHai: '2000',
    }
  : {
      YuanQi: '',
      JiChuGongJi: '',
      HuiXin: '',
      HuiXiao: '',
      PoFang: '',
      PoZhao: '',
      WuShuang: '',
      JiaSu: CoreHelper.JiaSuList.YiDuanJiaSu,
      WuQiShangHai: '2000',
    };

const initTarget = CoreHelper.Target.MuZhuang113;

const initCalculatorOptions: CreateCalculatorOptions = {
  qiXueVersion: CoreHelper.YiJinJingQiXueVersion.XinZheng,
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

  [GainGroupTypes.Formations]: {} as JDCComponentsGainGroupValue,
  [GainGroupTypes.TeamSkills]: {} as JDCComponentsGainGroupValue,
  [GainGroupTypes.GroupSkills]: {} as JDCComponentsGainGroupValue,
  [GainGroupTypes.Weapons]: {} as JDCComponentsGainGroupValue,
  [GainGroupTypes.EffectSpines]: {} as JDCComponentsGainGroupValue,
  [GainGroupTypes.Banquet]: {} as JDCComponentsGainGroupValue,
  [GainGroupTypes.DrugEnhance]: {} as JDCComponentsGainGroupValue,
  [GainGroupTypes.DrugSupport]: {} as JDCComponentsGainGroupValue,
  [GainGroupTypes.FoodEnhance]: {} as JDCComponentsGainGroupValue,
  [GainGroupTypes.FoodSupport]: {} as JDCComponentsGainGroupValue,
  [GainGroupTypes.HomeFood]: {} as JDCComponentsGainGroupValue,
  // [GainGroupTypes.Target]: {} as JDCComponentsGainGroupValue,
  [GainGroupTypes.SetBonusesGain]: initSetBonuse as JDCComponentsGainGroupValue,
  [GainGroupTypes.Enchants]: initEnchant as JDCComponentsGainGroupValue,
};

export const jdcCore = (state = initState, { type, payload }: any) => {
  switch (type) {
    case RECEIVE_JDC_RESILT: {
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
