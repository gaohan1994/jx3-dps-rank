import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import cache from '@core/cache';
import { resetJDCCharacterAttributes } from '@core/action';

/**
 * 旧版本 Jx3-dps-core 适配器
 * 如果是v3之前的jdc则删除掉cache防止出现白屏
 * @component JDCAdapter
 */
export const JDCAdapter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const lastCore = cache.getLastCore();
    if (lastCore && lastCore.YuanQi) {
      cache.clearCore();
      dispatch(resetJDCCharacterAttributes());
    }
  }, []);
  return null;
};
