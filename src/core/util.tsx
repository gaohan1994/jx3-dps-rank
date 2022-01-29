import React from 'react';
import numeral from 'numeral';
import { CoreHelper } from 'jx3-dps-core';
import { Gain } from 'jx3-dps-core/build/packages/gain/gain';
import { GainGroup } from 'jx3-dps-core/build/packages/gain/group';
import { JDCComponentsGainGroupValue, JDCComponentsSupportOptions } from './selector';
import { JDCCharacter } from './reducer';

const { GainGroupTypes } = CoreHelper;

export const makeCharacterOptions = (characterKey): Array<any> => {
  switch (characterKey) {
    case 'YuanQi':
      return ['元气', null, 1];
    case 'JiChuGongJi':
      return ['基础攻击', null, 2];
    case 'HuiXin':
      return ['会心', '%', 3];
    case 'HuiXiao':
      return ['会效', '%', 4];
    case 'PoFang':
      return ['破防', '%', 5];
    case 'PoZhao':
      return ['破招', null, 6];
    case 'WuShuang':
      return ['无双', '%', 7];
    case 'JiaSu':
      return ['加速', null, 8];
    case 'WuQiShangHai':
      return ['武器伤害', null, 9];
    default: {
      return [''];
    }
  }
};

export type CharacterStuff = {
  title: string;
  target: string;
  suffix?: any;
  sort: number;
};
export const makeCharacterStuff = (characterValues: JDCCharacter): CharacterStuff[] => {
  if (!characterValues) {
    return [];
  }
  const characterSelectKeys: CharacterStuff[] = [];

  for (const attributeKey in characterValues) {
    const [attributeTitle, attributeSuffix, sort] = makeCharacterOptions(attributeKey);
    if (attributeTitle === '武器伤害') {
      continue;
    }
    characterSelectKeys.push({
      title: attributeTitle,
      target: attributeKey,
      suffix: attributeSuffix,
      sort,
    });
  }
  characterSelectKeys.sort((a, b) => a.sort - b.sort);
  return characterSelectKeys;
};

export const checkCharacterAttributeCanBeEmpty = (characterKey: string) => {
  if (characterKey === 'WuQiShangHai') {
    return true;
  }
  return false;
};

const getCurrentGainExtraOptions = (selectedGain: JDCComponentsGainGroupValue, gain: Gain) =>
  selectedGain.extra && selectedGain.extra[gain.id];

type SupportGainParams = {
  gain: Gain;
  options?: JDCComponentsSupportOptions;
};

export const makeJDCSupportUseGain = (selectedGains: JDCComponentsGainGroupValue[]) => {
  const supportGains: Array<SupportGainParams> = [];

  selectedGains.forEach(selectedGain => {
    if (!selectedGain.data) {
      return;
    }

    const currentGains: Array<SupportGainParams> = selectedGain.data.map(gainItem => ({
      gain: gainItem,
      options: getCurrentGainExtraOptions(selectedGain, gainItem),
    }));

    supportGains.push(...currentGains);
  });

  supportGains.filter(sg => !!sg);
  return supportGains;
};

export const makeJDCComponentSelectOptions = (gainGroup: GainGroup) => {
  const { list } = gainGroup;

  if (gainGroup.name === GainGroupTypes.Enchants) {
    const nextList = list
      .map(item => {
        if (
          item.name !== CoreHelper.Enchants.EnChantHand &&
          item.name !== CoreHelper.Enchants.EnChantShoe
        ) {
          return item;
        }
      })
      .filter(nl => !!nl);

    return nextList;
  }

  if (gainGroup.name === GainGroupTypes.TeamSkills) {
    const nextList = list
      .map(item => {
        if (
          item.name !== CoreHelper.TeamSkills.JinGangNuMu &&
          item.name !== CoreHelper.TeamSkills.QinLongJue
        ) {
          return item;
        }
      })
      .filter(nl => !!nl);

    return nextList;
  }

  return list ?? [];
};

export const gainIsCW = (gain: Gain) => gain.name === '橙武';

export const getNumberInteger = (value: number | string) => numeral(value).format('0');

export const hasCalculatorResult = (result): boolean => result !== undefined && !!result.dps;

/**
 * 从剑三魔盒配装器copy过来的数据转换成json格式
 * @param value string
 */
export const getJsonFromBox = (value: string) => {
  if (!value && typeof value !== 'string') {
    return null;
  }

  return JSON.parse(value);
};

const makeNumberPercent = (attr: number): string => {
  return numeral(attr * 100).format('0.00');
};

const makeJiaSuSection = (jiaSuValue: number) => {
  if (jiaSuValue < 0.044) {
    return CoreHelper.JiaSuList.YiDuanJiaSu;
  }
  return CoreHelper.JiaSuList.ErDuanJiaSu;
};

export const mapBoxJsonToCalcolator = (data): JDCCharacter => {
  return {
    YuanQi: `${data.Spunk}`,
    JiChuGongJi: `${data.SolarAttackPowerBase}`,
    HuiXin: makeNumberPercent(data.SolarCriticalStrikeRate),
    HuiXiao: makeNumberPercent(data.SolarCriticalDamagePowerPercent),
    PoFang: makeNumberPercent(data.SolarOvercomePercent),
    PoZhao: `${data.SurplusValue}`,
    WuShuang: makeNumberPercent(data.StrainPercent),
    JiaSu: makeJiaSuSection(data.HastePercent),
    WuQiShangHai: `${data.MeleeWeaponDamage}`,
  };
};
