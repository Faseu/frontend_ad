import request from '@/utils/request';
import type { CreateParams, QueryParams } from './data';

export function fetchAdvertiserList(params: QueryParams) {
  return request('/sponsor/queryList', {
    params,
  });
}
export function fetchDetails(id: number) {
  return request('/sponsor/details', {
    params: { id },
  });
}

export function addAdvertiser(params: CreateParams) {
  return request('/sponsor/add', {
    method: 'POST',
    data: params,
  });
}

export function editAdvertiser(params: CreateParams) {
  return request('/sponsor/edit', {
    method: 'POST',
    data: params,
  });
}

export function endAdvertiser(params: { id: number }) {
  return request('/sponsor/close', {
    method: 'POST',
    data: params,
  });
}
