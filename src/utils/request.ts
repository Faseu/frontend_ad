/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { history } from 'umi';
import { notification } from 'antd';
import { API_VERSION } from '@/constant';
import { getToken } from '@/utils/token';
import { updateDifferTimestamp } from '@/utils/utils';
import download from './download';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response; message?: string }): Response => {
  const { response, message } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: message || '数据请求错误，请联系管理员',
      message: '请求错误',
    });
  }
  return response;
};

const { NODE_ENV } = process.env;
console.log(NODE_ENV, API_VERSION);
export const prefix =
  NODE_ENV === 'development' && process.env.MOCK !== 'none' ? '/api' : `/${API_VERSION}`;

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  prefix,
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

request.interceptors.request.use((url, options) => ({
  url,
  options: {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getToken()}`,
    },
  },
}));

request.interceptors.response.use(async (response) => {
  updateDifferTimestamp(response.headers.get('Date'));
  const contentType: string = response.headers.get('Content-Type') || '';
  let resData;

  if (contentType.toLocaleLowerCase().includes('application/vnd.ms-excel')) {
    await download(response);
    return false;
  }

  try {
    resData = await response.clone().json();
  } catch (e) {
    throw new Error();
  }
  if (resData.hasOwnProperty('code')) {
    const { code, error, data } = resData;
    //   1001, "用户未登录"
    //   1002, "登录失败，用户不存在"
    //   1003, "权限不足失败"
    //   1004, "登录界面错误,密码错误"
    if (code !== 0) {
      switch (code) {
        case 1001:
          history.replace('/user/login');
          return error;
        case 1003:
          throw new Error('对不起，您没有操作权限');
        default:
          throw new Error(error);
      }
    }
    return data;
  }
  return resData;
});

export default request;
