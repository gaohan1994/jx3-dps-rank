import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

export const Contract = () => {
  return (
    <Tooltip title='有问题请加QQ'>
      <div className='calculator-bate'>
        <span>道灵、秃酱</span>
        <span>QQ: 871418277</span>
        <InfoCircleOutlined style={{ color: '#ffffff' }} />
      </div>
    </Tooltip>
  );
};
