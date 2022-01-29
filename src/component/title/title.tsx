import React from 'react';
import { Tooltip } from 'antd';
import './index.less';
import { HistoryLog } from '@component/log/history-log';

function CalculatorTitle() {
  /**
   * 为了保证准确计算大多数少林玩家dps，减少不必要的误解，计算器默认为正式版
   * 加入讲武堂之后可以切换至讲武堂版本，两版计算方式完全相同，只有技能数不同
   * 对手法有深刻理解，同时已经脱离基本配装追求更高的dps的师兄弟们可以找我或者
   * 秃酱使用讲武堂版本（无门槛）
   */
  return (
    <>
      <div className='calculator-title-name'>易筋经DPS计算器</div>
      <header className='calculator-title-header'>
        <div>
          <Tooltip
            style={{ width: '800px' }}
            title='为了保证准确计算大多数少林玩家dps，减少不必要的误解，计算器默认为少林前山(基础版)，加入讲武堂之后可以切换至讲武堂版本，两版计算方式完全相同，只有技能数不同，对手法有深刻理解，同时已经脱离基本配装追求更高的dps的师兄弟们可以找我或者，秃酱使用讲武堂版本（无门槛）'
          >
            <span className='calculator-title-header-title'>少林前山</span>
          </Tooltip>
        </div>
      </header>
      <HistoryLog />
    </>
  );
}
export default CalculatorTitle;
