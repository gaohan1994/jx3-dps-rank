/* eslint-disable no-unreachable */
import React, { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { CoreHelper } from 'jx3-dps-core';
import { Card } from 'antd';
import './index.less';
import { getJdcResult } from '@core/selector';
import DetailPage from '../detail/detail';
import CalculatorTitle from '@component/title/title';
import { Character, JDCDropdown, JDCSwitch, JDCTarget } from '@component/dps-core';
import { MainTransitionLayout } from '@component/layout/main-transition-layout';
import { JDCOptions } from '@component/dps-core/enchat/skill-enchat';
import { MainButton } from '@component/dps-item/main-button';
import { Contract } from '@component/bate/contract';
import { EmptyDetail } from '@component/layout/empty-detail';
import { hasCalculatorResult } from '@core/util';
import { CharacherTip } from '@component/log/characher-tip';
import { PZCopy } from '@component/dps-item/pz-copy';

function CalculatorPage() {
  const result = useSelector(getJdcResult);

  useLayoutEffect(() => {
    document.title = '剑网三 少林 易筋经 计算器';
  }, []);
  return (
    <div className='calculator-home'>
      <CalculatorTitle />
      <Card
        style={{
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <MainTransitionLayout>
          <div style={{ width: 260 }}>
            <Character />
            <PZCopy />
            <CharacherTip />
            <JDCTarget />
            <JDCOptions />
          </div>
          <div className='calculator-more-box'>
            <div className='calculator-title'>高级选项</div>
            <JDCDropdown
              JDCDataName={CoreHelper.GainGroupTypes.Formations}
              useDescription={false}
            />
            <JDCDropdown JDCDataName={CoreHelper.GainGroupTypes.Weapons} useDescription={false} />
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
            <JDCDropdown JDCDataName={CoreHelper.GainGroupTypes.Banquet} multiple={true} />
            <JDCDropdown JDCDataName={CoreHelper.GainGroupTypes.HomeFood} />
            <JDCDropdown JDCDataName={CoreHelper.GainGroupTypes.FoodEnhance} />
            <JDCDropdown JDCDataName={CoreHelper.GainGroupTypes.FoodSupport} />
            <JDCDropdown JDCDataName={CoreHelper.GainGroupTypes.DrugEnhance} />
            <JDCDropdown JDCDataName={CoreHelper.GainGroupTypes.DrugSupport} />
            <JDCDropdown JDCDataName={CoreHelper.GainGroupTypes.HomeDrink} />
            <JDCDropdown JDCDataName={CoreHelper.GainGroupTypes.FestivalFood} />
            <JDCDropdown JDCDataName={CoreHelper.GainGroupTypes.TeamSkills} multiple={true} />
            <JDCDropdown JDCDataName={CoreHelper.GainGroupTypes.GroupSkills} multiple={true} />
          </div>
        </MainTransitionLayout>
        <MainButton />
      </Card>
      {hasCalculatorResult(result) ? <DetailPage /> : <EmptyDetail />}
      <Contract />
    </div>
  );
}

export default CalculatorPage;
