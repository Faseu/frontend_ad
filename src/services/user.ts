import request from '@/utils/request';

export function queryMenuData() {
  return request('/menus');
}

export function getFakeCaptcha(params: { phone: string }) {
  return request('/code/note', {
    method: 'POST',
    data: params,
  });
}

export function login(params: any) {
  return request('/account/login', {
    method: 'POST',
    data: params,
  });
}
