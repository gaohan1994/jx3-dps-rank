/* eslint-disable no-unreachable */
import React, { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import Jx3DpsCore from 'jx3-dps-core';
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
              JDCDataName={Jx3DpsCore.GainGroupTypes.Formations}
              useDescription={false}
            />
            <JDCDropdown JDCDataName={Jx3DpsCore.GainGroupTypes.Weapons} useDescription={false} />
            <JDCDropdown
              JDCDataName={Jx3DpsCore.GainGroupTypes.SetBonusesGain}
              multiple={true}
              useDescription={false}
            />
            <JDCSwitch JDCDataName={Jx3DpsCore.GainGroupTypes.EffectSpines} />
            <JDCDropdown
              JDCDataName={Jx3DpsCore.GainGroupTypes.Enchants}
              multiple={true}
              useDescription={false}
            />
            <JDCDropdown JDCDataName={Jx3DpsCore.GainGroupTypes.WeaponEnchant} />
            <JDCDropdown JDCDataName={Jx3DpsCore.GainGroupTypes.Banquet} multiple={true} />
            <JDCDropdown JDCDataName={Jx3DpsCore.GainGroupTypes.HomeFood} />
            <JDCDropdown JDCDataName={Jx3DpsCore.GainGroupTypes.FoodEnhance} />
            <JDCDropdown JDCDataName={Jx3DpsCore.GainGroupTypes.FoodSupport} />
            <JDCDropdown JDCDataName={Jx3DpsCore.GainGroupTypes.DrugEnhance} />
            <JDCDropdown JDCDataName={Jx3DpsCore.GainGroupTypes.DrugSupport} />
            <JDCDropdown JDCDataName={Jx3DpsCore.GainGroupTypes.HomeDrink} />
            <JDCDropdown JDCDataName={Jx3DpsCore.GainGroupTypes.FestivalFood} />
            <JDCDropdown JDCDataName={Jx3DpsCore.GainGroupTypes.TeamSkills} multiple={true} />
            <JDCDropdown JDCDataName={Jx3DpsCore.GainGroupTypes.GroupSkills} multiple={true} />
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
