import request from '@/utils/request';
import type { CreateParams, QueryParams } from './data';

export function fetchPositionList(params: QueryParams) {
  return request('/adSpace/queryList', {
    params,
  });
}
export function fetchDetails(id: number) {
  return request('/sponsor/details', {
    params: { id },
  });
}

export function addPosition(params: CreateParams) {
  return request('/adSpace/add', {
    method: 'POST',
    data: params,
  });
}

export function editAdvertiser(params: CreateParams) {
  return request('/adSpace/edit', {
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
