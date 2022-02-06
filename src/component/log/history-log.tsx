import React, { useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';
import { Timeline } from 'antd';
import { makeHistoryLogItem } from '@utils/utils';

export const HistoryLog = () => {
  const [visible, setVisible] = useState(false);

  const data = [
    '重写并重新开放属性收益模块; 2022-02-04',
    '重新开放S级Dps; 2022-02-04',
    '新增满阶小橙武特效; 2022-02-03',
    '修复使用金刚日轮时，其他技能数较多的bug; 2022-02-02',
    '修复颂言4%错误描述bug实际400攻击; 2022-01-31',
    '修复刀刀烈火bug; 2022-01-31',
    '新增从魔盒导入人物属性; 2022-01-29',
    '新增金刚日轮; 2022-01-28',
    '移除武器伤害; 2022-01-25',
    '新增手动修改橙武触发次数; 2022-01-25',
    '修改计算器核心库v2.2.6; 2022-01-01',
    '血妈更新一波; 2022-01-01',
    '新增正式版和讲武堂版本; 2021-10-30',
    '新增属性收益; 2021-10-30',
    '新增保存最近一次的人物属性; 2021-10-30',
    '修复和尚阵、气纯阵、莫问阵无双少加bug; 2021-09-30',
    '新增梅花盾、弘法; 2021-09-30',
    '修复无视内防计算方式; 2021-08-30',
    '更新 少林侠士3%增伤; 2021-08-30',
    '新增小吃; 2021-08-30',
    '新增加速计算; 2021-08-30',
    '新增橙武、水特效武器; 2021-08-30',
    '新增团队辅助技能; 2021-08-30',
    '新增小队辅助技能; 2021-08-30',
  ];

  return (
    <>
      <div className='calculator-title-logs' onClick={() => setVisible(true)}>
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
        <div className='calculator-title-logs-box'>
          <Timeline>
            {data.map(item => {
              const { log, time } = makeHistoryLogItem(item);
              return (
                <Timeline.Item key={item} className='calculator-history-item'>
                  <span>{log}</span>
                  <span>{time}</span>
                </Timeline.Item>
              );
            })}
          </Timeline>
        </div>
      </Modal>
    </>
  );
};
