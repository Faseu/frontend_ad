import request from '@/utils/request';

export function queryMenuData() {
  return request('/api/menus');
}
