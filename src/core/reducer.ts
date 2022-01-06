import { CoreHelper, gainModule, selectGainByName } from 'jx3-dps-core';
import { JDCCharacterPayload, JDCGainDropdownPayload, JDCGainExtraOptionPayload } from './action';
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

const initJdcCharacter: JDCCharacter =
  process.env.NODE_ENV === 'production'
    ? {
        YuanQi: '',
        JiChuGongJi: '',
        HuiXin: '',
        HuiXiao: '',
        PoFang: '',
        PoZhao: '',
        WuShuang: '',
        JiaSu: CoreHelper.JiaSuList.YiDuanJiaSu,
        WuQiShangHai: '',
      }
    : {
        YuanQi: '2897',
        JiChuGongJi: '16912',
        WuQiShangHai: '2000',
        HuiXin: '23.42',
        HuiXiao: '180.8',
        PoFang: '40.6',
        PoZhao: '3066',
        WuShuang: '52.05',
        JiaSu: CoreHelper.JiaSuList.YiDuanJiaSu,
      };

const initTarget = CoreHelper.Target.MuZhuang113;

const initState = {
  jdcResult: {},
  jdcCore: {},
  jdcCharacter: initJdcCharacter,
  jdcSupport: {},
  jdcTarget: initTarget,

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
        jdcCharacter: initJdcCharacter,
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
    default: {
      return state;
    }
  }
};
