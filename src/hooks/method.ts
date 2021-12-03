import { DpsCore } from 'jx3-dps-core';
import { CalculatorBase } from 'jx3-dps-core/build/calculator';
import { useMemo, useState } from 'react';

export const useMethods = (initialValue: any, methods: any) => {
  const [value, setValue] = useState(initialValue);
  const boundMethods = useMemo(
    () =>
      Object.entries(methods).reduce((methods: any, [name, fn]: any) => {
        const method = (...args: any) => {
          setValue((value: any) => fn(value, ...args));
        };
        methods[name] = method;
        return methods;
      }, {}),
    [methods]
  );
  return [value, boundMethods];
};

type DpsAttribute = CalculatorBase;

interface DpsMethodPayload {
  target: any;
  value: any;
}

interface DpsAttributeMethod {
  (state: DpsAttribute, payload: DpsMethodPayload): any;
}

/**
 * 计算器接口
 */
const dpsAttributeMethods: { [name: string]: DpsAttributeMethod } = {
  setOtherAttr(state, payload) {},
};

const useDpsAttribute = (initState = {}) => {
  return useMethods(initState, dpsAttributeMethods);
};

interface UserAttributeMethod {
  (state: DpsCore, payload: DpsMethodPayload): any;
}

/**
 * 用户接口
 */
const userAttributeMethods: { [name: string]: UserAttributeMethod } = {
  /**
   * 设置角色属性
   */
  setUserAttr(state, payload) {
    state[payload.target as keyof DpsCore] = payload.value;
    return { ...state };
  },

  /**
   * 重置角色属性
   */
  replaceUserAttr(state, payload) {
    return {
      ...state,
      ...payload,
    };
  },
};

const useUserAttribute = (initState = {}) => {
  return useMethods(initState, userAttributeMethods);
};

export { useDpsAttribute, useUserAttribute };
