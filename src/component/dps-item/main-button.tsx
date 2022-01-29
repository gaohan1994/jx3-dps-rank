import React, { useCallback } from 'react';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { calculateJDCResultAction } from '@core/action';

export const MainButton = () => {
  const dispatch = useDispatch();

  const onCaculate = useCallback(() => {
    dispatch(calculateJDCResultAction());
  }, [calculateJDCResultAction]);

  return (
    <div className='calculator-button'>
      <Button
        style={{ width: 60, height: 60 }}
        type='primary'
        shape='circle'
        danger={true}
        onClick={onCaculate}
      >
        计算
      </Button>
    </div>
  );
};
