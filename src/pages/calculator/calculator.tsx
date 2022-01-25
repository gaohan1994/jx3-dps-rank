/* eslint-disable no-unreachable */
import React, { useMemo, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CoreHelper, createCalculator, createDpsCore, Support } from 'jx3-dps-core';
import { Button, Card, notification, Tooltip } from 'antd';
import { CaretRightOutlined, InfoCircleOutlined } from '@ant-design/icons';
import './index.css';
import { Motion, spring, presets, TransitionMotion } from 'react-motion';
import numeral from 'numeral';
import DetailPage from '../detail/detail';
import CalculatorTitle from '../../component/title/title';
import cache from '../../core/cache';
import {
  checkCharacterAttributeCanBeEmpty,
  makeCharacterOptions,
  makeJDCSupportUseGain,
} from '../../core/util';
import icon from '../../assets/sl_yjj.png';
import { getBackgroundColor } from '../../utils/utils';
import { setJDCCore, setJDCResult, setJDCSupport } from '../../core/action';
import { Character, JDCDropdown, JDCSwitch, JDCTarget } from '@component/dps-core';
import {
  getCore,
  getJDCCharacter,
  getJDCCWTimes,
  getJDCGainGroupValue,
  getJDCTarget,
} from '@core/selector';

const { GainGroupTypes } = CoreHelper;

const BoxWidthConfig = {
  min: 300,
  max: 700,
};

function CalculatorPage() {
  const dispatch = useDispatch();
  const calculatorTarget = useSelector(getJDCTarget);
  const calculatorCWTimes = useSelector(getJDCCWTimes);
  const characterAttributes = useSelector(getJDCCharacter);
  const coreComponentsValue = useSelector(getCore);

  useLayoutEffect(() => {
    document.title = '剑网三 少林 易筋经 计算器';
  }, []);
  /**
   * 盒子宽度
   * @param boxWidth
   *
   * icon 旋转角度
   * @param translateY
   */
  const [boxWidth, setBoxWidth] = useState(BoxWidthConfig.min);
  const [translateY, setTranslateY] = useState(0);
  const [result, setResult] = useState(undefined as any);
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

  // 切换盒子宽度
  const toogleBox = (value?: boolean) => {
    let targetWidth = 0;
    let targetTranslateY = 0;

    if (boxWidth === BoxWidthConfig.min) {
      targetWidth = BoxWidthConfig.max;
      targetTranslateY = 180;
    } else {
      targetWidth = BoxWidthConfig.min;
      targetTranslateY = 0;
    }

    if (value === true) {
      targetWidth = BoxWidthConfig.max;
      targetTranslateY = 180;
    }

    if (value === false) {
      targetWidth = BoxWidthConfig.min;
      targetTranslateY = 0;
    }

    setBoxWidth(targetWidth);
    setTranslateY(targetTranslateY);
  };

  // 计算dps
  const onCalculator = async () => {
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
      // console.log('[JDC-CORE:]', jdcCore);
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
      // console.log('[JDC-SUPPORT]:', jdcSupport);
      dispatch(setJDCSupport(jdcSupport));

      const result = createCalculator(jdcCore, jdcSupport);
      // console.log('[object]', result);
      dispatch(setJDCResult(result));

      setTimeout(() => {
        setResult(result);
      }, 1000 * 1);
    } catch (error: any) {
      notification.error({
        message: error.message,
      });
    }
  };

  return (
    <div className='calculator-home'>
      <CalculatorTitle />
      <Motion
        style={{
          motionWidth: spring(boxWidth, presets.gentle),
          motionTranslateY: spring(translateY),
        }}
      >
        {interpolatedStyle => {
          return (
            <Card
              style={{
                width: interpolatedStyle.motionWidth,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <div style={{ width: 260 }}>
                <Character />
                <JDCTarget />
              </div>

              <TransitionMotion
                styles={
                  interpolatedStyle.motionWidth > BoxWidthConfig.min + 50
                    ? [
                        {
                          key: 'test',
                          style: { scale: spring(1) },
                        },
                      ]
                    : [
                        {
                          key: 'test',
                          style: { scale: spring(0) },
                        },
                      ]
                }
              >
                {inStyles => {
                  return inStyles[0] ? (
                    <div
                      className='calculator-more-box'
                      style={{
                        transform: `scale(${inStyles[0].style.scale}, ${inStyles[0].style.scale})`,
                      }}
                    >
                      <div className='calculator-title'>高级选项</div>
                      <JDCDropdown
                        JDCDataName={CoreHelper.GainGroupTypes.Formations}
                        useDescription={false}
                      />
                      <JDCDropdown
                        JDCDataName={CoreHelper.GainGroupTypes.Weapons}
                        useDescription={false}
                      />
                      <JDCDropdown
                        JDCDataName={CoreHelper.GainGroupTypes.SetBonusesGain}
                        multiple={true}
                        useDescription={false}
                      />
                      <JDCSwitch JDCDataName={CoreHelper.GainGroupTypes.EffectSpines} />
                      <JDCDropdown
                        JDCDataName={CoreHelper.GainGroupTypes.Enchants}
                        multiple={true}
                        useDescription={false}
                      />
                      <JDCDropdown JDCDataName={CoreHelper.GainGroupTypes.WeaponEnchant} />
                      <JDCDropdown
                        JDCDataName={CoreHelper.GainGroupTypes.Banquet}
                        multiple={true}
                      />
                      <JDCDropdown JDCDataName={CoreHelper.GainGroupTypes.HomeFood} />
                      <JDCDropdown JDCDataName={CoreHelper.GainGroupTypes.FoodEnhance} />
                      <JDCDropdown JDCDataName={CoreHelper.GainGroupTypes.FoodSupport} />
                      <JDCDropdown JDCDataName={CoreHelper.GainGroupTypes.DrugEnhance} />
                      <JDCDropdown JDCDataName={CoreHelper.GainGroupTypes.DrugSupport} />
                      <JDCDropdown JDCDataName={CoreHelper.GainGroupTypes.HomeDrink} />
                      <JDCDropdown JDCDataName={CoreHelper.GainGroupTypes.FestivalFood} />
                      <JDCDropdown
                        JDCDataName={CoreHelper.GainGroupTypes.TeamSkills}
                        multiple={true}
                      />
                      <JDCDropdown
                        JDCDataName={CoreHelper.GainGroupTypes.GroupSkills}
                        multiple={true}
                      />
                    </div>
                  ) : (
                    <div />
                  );
                }}
              </TransitionMotion>

              <div className='calculator-options-button'>
                <div onClick={() => toogleBox()}>
                  <CaretRightOutlined
                    style={{ transform: `rotate(${interpolatedStyle.motionTranslateY}deg)` }}
                  />
                  高级选项
                </div>
              </div>

              <div className='calculator-button'>
                <Button
                  style={{ width: 60, height: 60 }}
                  type='primary'
                  shape='circle'
                  danger={true}
                  onClick={onCalculator}
                >
                  计算
                </Button>
              </div>
            </Card>
          );
        }}
      </Motion>

      {result !== undefined && !!result.dps ? (
        <DetailPage />
      ) : (
        <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <div className='calculator-loading'>
            <img src={icon} />
            <span style={{ backgroundColor: getBackgroundColor() }} />
          </div>
        </div>
      )}
      <Bate />
    </div>
  );
}

function Bate() {
  return (
    <Tooltip title='测试版计算器 后续开放历史记录等功能 特别感谢秃不得、老萧'>
      <div className='calculator-bate'>
        <span>道灵、秃酱</span>
        <span>QQ: 871418277</span>
        <InfoCircleOutlined style={{ color: '#ffffff' }} />
      </div>
    </Tooltip>
  );
}

export default CalculatorPage;
