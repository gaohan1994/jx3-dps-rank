import React from 'react';
import { getBackgroundColor } from '@utils/utils';
import icon from '../../assets/sl_yjj.png';

export const EmptyDetail = () => {
  return (
    <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <div className='calculator-loading'>
        <img src={icon} />
        <span style={{ backgroundColor: getBackgroundColor() }} />
      </div>
    </div>
  );
};
