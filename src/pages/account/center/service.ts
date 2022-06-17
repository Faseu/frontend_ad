import request from '@/utils/request';

export async function queryCurrent() {
  return request('/currentUser');
}

export async function queryFakeList(params: { count: number }) {
  return request('/fake_list', {
    params,
  });
}
