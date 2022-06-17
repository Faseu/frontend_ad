import type { Effect, Reducer } from 'umi';

import type { DetailParams, TableListData } from './data';
import { addAdvertiser, endAdvertiser, fetchAdvertiserList, fetchDetails } from './service';

export interface StateType {
  data: TableListData;
  details: Partial<DetailParams>;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    fetchDetails: Effect;
    add: Effect;
    end: Effect;
  };
  reducers: {
    advertiserList: Reducer<StateType>;
    advertiserDetails: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'advertiserList',

  state: {
    data: {
      list: [],
      pagination: {
        total: 0,
        current: 0,
      },
    },
    details: {},
  },

  effects: {
    *fetch({ payload }, { call, put, select }) {
      const { pageIndex } = payload;
      const pageSize = yield select((state: any) => state.global.pageSize);
      console.log(pageSize);
      try {
        const { records: list, totalCount: total } = yield call(fetchAdvertiserList, {
          ...payload,
          pageSize,
        });
        yield put({
          type: 'advertiserList',
          payload: {
            list,
            pagination: {
              total,
              current: pageIndex,
            },
          },
        });
      } catch (e) {
        console.error(e);
      }
    },
    *fetchDetails({ payload, callback }, { call, put }) {
      try {
        const details = yield call(fetchDetails, payload);
        yield put({
          type: 'advertiserDetails',
          payload: details,
        });
        if (callback) callback();
      } catch (e) {
        console.error(e);
      }
    },
    *add({ payload, callback, onFinish }, { call }) {
      try {
        yield call(addAdvertiser, payload);
        if (callback) callback();
      } catch (e) {
        console.error(e);
      } finally {
        if (onFinish) onFinish();
      }
    },
    *end({ payload, callback, onFinish }, { call }) {
      try {
        yield call(endAdvertiser, payload);
        if (callback) callback();
      } catch (e) {
        console.error(e);
      } finally {
        if (onFinish) onFinish();
      }
    },
  },

  reducers: {
    advertiserList(state, { payload }) {
      return {
        ...(state as StateType),
        data: payload,
      };
    },
    advertiserDetails(state, { payload }) {
      return {
        ...(state as StateType),
        details: payload,
      };
    },
  },
};

export default Model;
