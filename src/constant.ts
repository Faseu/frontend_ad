import { mapToArray } from '@/utils/utils';

export const { API_VERSION } = process.env;
export const ROW_GUTTER = { md: 8, lg: 24, xl: 48 };
export const COL_LAYOUT = { lg: 6, md: 12, sm: 24 };
export const COL_LAYOUT_3 = { lg: 18, md: 12, sm: 24 };

export const ADVERTISER_TYPE = {
  PERSONAL: '个人',
  COMPANY: '公司',
};
export const ADVERTISER_STATUS = {
  COOPERATE: '合作中',
  TERMINATED: '已终止',
};

// 代理 代理商级别
export const ADVERTISER_TYPE_LIST = mapToArray(ADVERTISER_TYPE);

export const TEMP_NUM = [
  { text: '测试1', value: 1 },
  { text: '测试2', value: 2 },
];
