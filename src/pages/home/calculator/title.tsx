import { InfoCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Modal, Timeline } from 'antd';
import './index.css';

function CalculatorTitle() {

  const [visible, setVisible] = useState(false);

  const data = [
    '更新 少林侠士3%增伤 2021-08-30',
    '新增小吃',
    '新增加速计算',
    '新增橙武、水特效武器',
    '新增团队辅助技能',
    '新增小队辅助技能',
  ];

  return (
    <header
      className='calculator-header'
    >
      <div onClick={() => setVisible(true)}>
        <span className='calculator-header-title'>易筋经DPS计算器 Version1.0</span>
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
        <Timeline>
          {data.map((item) => {
            return (
              <Timeline.Item>{item}</Timeline.Item>
            )
          })}
        </Timeline>
      </Modal>
    </header>
  );
}
export default CalculatorTitle;