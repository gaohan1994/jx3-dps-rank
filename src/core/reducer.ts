import { RECEIVE_JDC_RESILT, RECEIVE_JDC_CORE, RECEIVE_JDC_SUPPORT } from './constants';

const initState = {
  jdcResult: {},
  jdcCore: {},
  jdcSupport: {},
};

export const jdcCore = (state = initState, { type, payload }: any) => {
  switch (type) {
    case RECEIVE_JDC_RESILT: {
      return {
        ...state,
        jdcResult: payload,
      };
    }
    case RECEIVE_JDC_CORE: {
      return {
        ...state,
        jdcCore: payload,
      };
    }
    case RECEIVE_JDC_SUPPORT: {
      return {
        ...state,
        jdcSupport: payload,
      };
    }
    default: {
      return state;
    }
  }
};
