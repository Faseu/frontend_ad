import type { Reducer, Subscription } from 'umi';
import { getCookie } from 'tiny-cookie';

const currentPageSize = Number(getCookie('pageSize')) || 10;

export interface GlobalModelState {
  collapsed: boolean;
  pageSize: number;
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {};
  reducers: {
    changeLayoutCollapsed: Reducer<GlobalModelState>;
    savePageSize: Reducer<GlobalModelState>;
  };
  subscriptions: { setup: Subscription };
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: {
    collapsed: false,
    pageSize: currentPageSize,
  },

  effects: {},

  reducers: {
    changeLayoutCollapsed(
      state = { collapsed: true, pageSize: currentPageSize },
      { payload },
    ): GlobalModelState {
      return {
        ...state,
        collapsed: payload,
      };
    },
    savePageSize(state, { payload }): GlobalModelState {
      return {
        ...state,
        pageSize: payload,
      } as GlobalModelState;
    },
  },

  subscriptions: {
    setup({ history }): void {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({ pathname, search }): void => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};

export default GlobalModel;
