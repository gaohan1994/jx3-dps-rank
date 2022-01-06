import React from 'react';
import numeral from 'numeral';
import './rank.css';
import { getBackgroundColor } from '../../utils/utils';

type Props = {
  index: any;
  icon: string;
  name: string;
  value: string;
  percent?: number | string;
  subName?: string;
  extra?: any;
};
/**
 * Rank 组件
 *
 * @param {Props} props
 * @return {*}
 */
function BaseDpsItem(props: Props) {
  const { index, icon, name, subName, value, percent, extra } = props;

  const showValue = numeral(value).format('0,000');

  return (
    <div className='rank'>
      <div className='rank-core'>
        <div className='rank-detail'>
          <b className='rank-index'>{index}</b>
          <i className='rank-icon' style={{ backgroundImage: `url(${icon})` }} />

          <div className='rank-name'>
            <span>{name}</span>
            {subName && (
              <span>
                {'-'}
                {subName}
              </span>
            )}
          </div>
        </div>
        <div className='rank-detail'>
          <span>{`${showValue}`}</span>
          {extra}
          {percent && (
            <div className='rank-box'>
              <span className='rank-pa'>{`${percent} %`}</span>
            </div>
          )}
        </div>
      </div>
      <div
        className='rank-dps'
        style={{
          marginTop: 4,
          backgroundColor: getBackgroundColor(),
          width: `${percent || 100}%`,
        }}
      />
    </div>
  );
}

export default BaseDpsItem;
