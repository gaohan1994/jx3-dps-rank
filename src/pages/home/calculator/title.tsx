import { InfoCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Modal, Timeline, Tooltip } from 'antd';
import './index.css';


function CalculatorTitle(props: any) {
  const { version, changeCalculatorVersion } = props;

  const [visible, setVisible] = useState(false);

  const data = [
    '新增正式版和讲武堂版本',
    '新增属性收益',
    '新增保存最近一次的人物属性',
    '修复和尚阵、气纯阵、莫问阵无双少加bug',
    '新增梅花盾、弘法',
    '修复无视内防计算方式',
    '更新 少林侠士3%增伤 2021-08-30',
    '新增小吃',
    '新增加速计算',
    '新增橙武、水特效武器',
    '新增团队辅助技能',
    '新增小队辅助技能',
  ];

  /**
   * 为了保证准确计算大多数少林玩家dps，减少不必要的误解，计算器默认为正式版
   * 加入讲武堂之后可以切换至讲武堂版本，两版计算方式完全相同，只有技能数不同
   * 对手法有深刻理解，同时已经脱离基本配装追求更高的dps的师兄弟们可以找我或者
   * 秃酱使用讲武堂版本（无门槛）
   */
  return (
    <>
      <div className='calculator-name'>
        易筋经DPS计算器
      </div>
      <header
        className='calculator-header'
        onClick={changeCalculatorVersion}
      >
        <div>
          <Tooltip
            style={{ width: '800px' }}
            title='为了保证准确计算大多数少林玩家dps，减少不必要的误解，计算器默认为少林前山(基础版)，加入讲武堂之后可以切换至讲武堂版本，两版计算方式完全相同，只有技能数不同，对手法有深刻理解，同时已经脱离基本配装追求更高的dps的师兄弟们可以找我或者，秃酱使用讲武堂版本（无门槛）'
          >
            <span className='calculator-header-title'>{version === 'Normal'
              ? '少林前山'
              : '讲武堂'}
            </span>
          </Tooltip>

        </div>
      </header>
      <div className='calculator-logs' onClick={() => setVisible(true)}>
        更新日志
        <InfoCircleOutlined style={{ color: '#ffffff', marginLeft: 10 }} />
      </div>
      <Modal
        title='更新日志'
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        okText='确定'
        cancelText='取消'
        centered={true}
      >
        <div className='calculator-logs-box'>

          <Timeline>
            {data.map((item) => {
              return (
                <Timeline.Item key={item}>{item}</Timeline.Item>
              )
            })}
          </Timeline>
        </div>
      </Modal>
    </>

  );
}
export default CalculatorTitle;