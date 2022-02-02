import React from 'react';
import numeral from 'numeral';
import Jx3DpsCore from 'jx3-dps-core';
import { Gain } from 'jx3-dps-core/build/packages/gain/gain';
import { GainGroup } from 'jx3-dps-core/build/packages/gain/group';
import { JDCComponentsGainGroupValue, JDCComponentsSupportOptions } from './selector';
import { JDCCharacter } from './reducer';

export const makeCharacterOptions = (characterKey): Array<any> => {
  switch (characterKey) {
    case 'Spunk':
      return ['元气', null, 1];
    case 'SolarAttackPowerBase':
      return ['基础攻击', null, 2];
    case 'SolarCriticalStrikeRate':
      return ['会心', '%', 3];
    case 'SolarCriticalDamagePowerPercent':
      return ['会效', '%', 4];
    case 'SolarOvercomePercent':
      return ['破防', '%', 5];
    case 'SurplusValue':
      return ['破招', null, 6];
    case 'StrainPercent':
      return ['无双', '%', 7];
    case 'Haste':
      return ['加速', null, 8];
    case 'MeleeWeaponDamage':
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

    if (attributeTitle) {
      characterSelectKeys.push({
        title: attributeTitle,
        target: attributeKey,
        suffix: attributeSuffix,
        sort,
      });
    }
  }
  characterSelectKeys.sort((a, b) => a.sort - b.sort);
  return characterSelectKeys;
};

export const checkCharacterAttributeCanBeEmpty = (characterKey: string) => {
  if (characterKey === 'MeleeWeaponDamage') {
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

  if (gainGroup.name === Jx3DpsCore.GainGroupTypes.Enchants) {
    const nextList = list
      .map(item => {
        if (
          item.name !== Jx3DpsCore.Enchants.EnChantHand &&
          item.name !== Jx3DpsCore.Enchants.EnChantShoe
        ) {
          return item;
        }
      })
      .filter(nl => !!nl);

    return nextList;
  }

  if (gainGroup.name === Jx3DpsCore.GainGroupTypes.TeamSkills) {
    const nextList = list
      .map(item => {
        if (
          item.name !== Jx3DpsCore.TeamSkills.JinGangNuMu &&
          item.name !== Jx3DpsCore.TeamSkills.QinLongJue
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

const makeHasteSection = (hasteValue: number) => {
  if (hasteValue < 0.044) {
    return Jx3DpsCore.HasteList.YiDuanJiaSu;
  }
  return Jx3DpsCore.HasteList.ErDuanJiaSu;
};

export const mapBoxJsonToCalcolator = (data): JDCCharacter => {
  return {
    ...data,
    SolarCriticalStrikeRate: makeNumberPercent(data.SolarCriticalStrikeRate),
    SolarCriticalDamagePowerPercent: makeNumberPercent(data.SolarCriticalDamagePowerPercent),
    SolarOvercomePercent: makeNumberPercent(data.SolarOvercomePercent),
    StrainPercent: makeNumberPercent(data.StrainPercent),
    Haste: makeHasteSection(data.HastePercent),
  };
};

export const makeCharacterValue = (values: any): JDCCharacter => {
  const coreAttrs: JDCCharacter = {
    Spunk: numeral(values.Spunk).value(),
    SolarAttackPowerBase: numeral(values.SolarAttackPowerBase).value(),
    SolarCriticalStrikeRate: numeral(values.SolarCriticalStrikeRate).value(),
    SolarCriticalDamagePowerPercent: numeral(values.SolarCriticalDamagePowerPercent).value(),
    SolarOvercomePercent: numeral(values.SolarOvercomePercent).value(),
    SurplusValue: numeral(values.SurplusValue).value(),
    StrainPercent: numeral(values.StrainPercent).value(),
    Haste: values.Haste,
    MeleeWeaponDamage: numeral(values.MeleeWeaponDamage).value(),
  };
  return coreAttrs;
};
