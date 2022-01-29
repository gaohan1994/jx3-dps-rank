import React, { useMemo } from 'react';
import { notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { CoreHelper, createCalculator, createDpsCore, Support } from 'jx3-dps-core';
import numeral from 'numeral';
import {
  checkCharacterAttributeCanBeEmpty,
  makeCharacterOptions,
  makeJDCSupportUseGain,
} from '@core/util';
import {
  getCalculatorOptions,
  getCore,
  getJDCCharacter,
  getJDCCWTimes,
  getJDCGainGroupValue,
  getJDCTarget,
} from '@core/selector';
import cache from '@core/cache';
import { setJDCCore, setJDCResult, setJDCSupport } from '@core/action';

const { GainGroupTypes } = CoreHelper;

export const useCalculatorHook = () => {
  const dispatch = useDispatch();
  const calculatorTarget = useSelector(getJDCTarget);
  const calculatorCWTimes = useSelector(getJDCCWTimes);
  const calculatorOptions = useSelector(getCalculatorOptions);
  const characterAttributes = useSelector(getJDCCharacter);
  const coreComponentsValue = useSelector(getCore);

  const jdcComponentsSelectedValues = useMemo(
    () => [
      getJDCGainGroupValue(coreComponentsValue, GainGroupTypes.Formations),
      getJDCGainGroupValue(coreComponentsValue, GainGroupTypes.TeamSkills),
      getJDCGainGroupValue(coreComponentsValue, GainGroupTypes.GroupSkills),
      getJDCGainGroupValue(coreComponentsValue, GainGroupTypes.SetBonusesGain),
      getJDCGainGroupValue(coreComponentsValue, GainGroupTypes.Weapons),
      getJDCGainGroupValue(coreComponentsValue, GainGroupTypes.Enchants),
      getJDCGainGroupValue(coreComponentsValue, GainGroupTypes.EffectSpines),
      getJDCGainGroupValue(coreComponentsValue, GainGroupTypes.Banquet),
      getJDCGainGroupValue(coreComponentsValue, GainGroupTypes.DrugEnhance),
      getJDCGainGroupValue(coreComponentsValue, GainGroupTypes.DrugSupport),
      getJDCGainGroupValue(coreComponentsValue, GainGroupTypes.FoodEnhance),
      getJDCGainGroupValue(coreComponentsValue, GainGroupTypes.FoodSupport),
      getJDCGainGroupValue(coreComponentsValue, GainGroupTypes.HomeFood),
      getJDCGainGroupValue(coreComponentsValue, GainGroupTypes.Target),
      getJDCGainGroupValue(coreComponentsValue, GainGroupTypes.WeaponEnchant),
      getJDCGainGroupValue(coreComponentsValue, GainGroupTypes.HomeDrink),
      getJDCGainGroupValue(coreComponentsValue, GainGroupTypes.FestivalFood),
    ],
    [coreComponentsValue]
  );

  const jdcSupportUseGains = useMemo(
    () => makeJDCSupportUseGain(jdcComponentsSelectedValues),
    [jdcComponentsSelectedValues]
  );

  const calculate = async () => {
    try {
      for (const [attributeKey, attributeValue] of Object.entries(characterAttributes)) {
        if (checkCharacterAttributeCanBeEmpty(attributeKey)) {
          continue;
        }
        if (!attributeValue) {
          const [attributeTitle] = makeCharacterOptions(attributeKey);
          throw new Error(`请输入${attributeTitle}`);
        }
      }
      const jdcCore = createDpsCore(
        numeral(characterAttributes.YuanQi).value(),
        numeral(characterAttributes.JiChuGongJi).value(), // 14470,
        numeral(characterAttributes.HuiXin).value(), // 19.05,
        numeral(characterAttributes.HuiXiao).value(), // 175.77,
        numeral(characterAttributes.PoFang).value(), // 38.01,
        numeral(characterAttributes.PoZhao).value(), // 4130,
        numeral(characterAttributes.WuShuang).value(), // 54.06,
        characterAttributes.JiaSu as any, // 'YiDuanJiaSu',
        numeral(characterAttributes.WuQiShangHai).value() // 1998
      );

      cache.saveCoreAttributes(characterAttributes);
      dispatch(setJDCCore(jdcCore));

      const jdcSupport = new Support({
        mode: 'NeiGong',
        target: calculatorTarget,
        CWTimes: calculatorCWTimes,
      });
      jdcSupport.use(CoreHelper.TeamSkills.JinGangNuMu);
      jdcSupport.use(CoreHelper.TeamSkills.QinLongJue);
      jdcSupport.use({
        name: 'UPDATE08-30',
        type: 'Costom',
        data: [{ gainTarget: 'damageBonus', value: 0.03, coverage: 1 }],
      });
      jdcSupport.use({
        name: '少林常驻破防加成',
        type: 'Costom',
        data: [{ gainTarget: 'PoFangPercent', value: 0.15, coverage: 1 }],
      });

      if (jdcSupportUseGains.length > 0) {
        jdcSupportUseGains.forEach(jdcSupportUseGain => {
          jdcSupport.use(jdcSupportUseGain.gain, jdcSupportUseGain.options);
        });
      }
      dispatch(setJDCSupport(jdcSupport));
      const currentResult = createCalculator(jdcCore, jdcSupport, calculatorOptions);
      dispatch(setJDCResult(currentResult));
    } catch (error: any) {
      notification.error({
        message: error.message,
      });
    }
  };

  return { calculate };
};
