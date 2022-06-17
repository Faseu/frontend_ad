import { get, remove, set } from 'tiny-cookie';

export const TOKEN = 'token';

export const getToken = (): string => get(TOKEN) || '';

export const setToken = (token: string): void =>
  set(TOKEN, token, {
    expires: '1Y',
  });

export const removeToken = (): void => remove(TOKEN);
