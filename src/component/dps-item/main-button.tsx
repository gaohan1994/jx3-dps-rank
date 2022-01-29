import React from 'react';
import { Button } from 'antd';
import { useCalculatorHook } from '@core/hook';

export const MainButton = () => {
  const { calculate } = useCalculatorHook();
  return (
    <div className='calculator-button'>
      <Button
        style={{ width: 60, height: 60 }}
        type='primary'
        shape='circle'
        danger={true}
        onClick={calculate}
      >
        计算
      </Button>
    </div>
  );
};
