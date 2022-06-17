import { history } from 'umi';
import { message } from 'antd';

/**
 * 判断是否是网址
 */
export const isUrl = (path: string): boolean => {
  const reg =
    /(((^https?:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%\/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg.test(path);
};

/**
 * 获取服务器时间
 */
export const getCurrentTime = () => {
  const differTimestamp = localStorage.getItem('differTimestamp') || 0;
  return new Date(Number(differTimestamp) + new Date().getTime());
};

/**
 * 计算本地时间和服务器时间时间戳差值
 * 当localStorage中的没有differTimestamp或者differTimestamp和新计算的differTimestamp超过1秒时更新differTimestamp
 */
export const updateDifferTimestamp = (serverTime: any) => {
  const differTimestamp = new Date(`${serverTime}`).getTime() - new Date().getTime();
  const localDifferTimestampStr = localStorage.getItem('differTimestamp');
  const localDifferTimestamp = Number(localDifferTimestampStr || 0);
  if (
    localDifferTimestampStr === null ||
    (differTimestamp !== localDifferTimestamp &&
      Math.abs(differTimestamp - localDifferTimestamp) > 1000)
  ) {
    localStorage.setItem('differTimestamp', `${differTimestamp}`);
  }
};

/**
 * 将键值对象转成数组
 * fill为false时不添加ALL
 */
export const mapToArray = (obj: Record<string, any>, fill = false) => {
  let mapList = Object.keys(obj).map((key) => ({
    value: key,
    text: obj[key],
  }));
  if (fill) {
    mapList = [
      {
        value: 'ALL',
        text: '全部',
      },
      ...mapList,
    ];
  }
  return mapList;
};

// 子页面返回列表页
export const backPage = (url: string) => {
  try {
    let pageStash: any = localStorage.getItem('pageStash');
    let paramStr = '';
    if (pageStash) {
      pageStash = JSON.parse(pageStash);
      Object.keys(pageStash).forEach((key: string) => {
        paramStr += `${paramStr ? '&' : ''}${key}=${pageStash[key]}`;
      });
    }
    localStorage.setItem('pageStash', '{}');
    history.replace(`${url}${paramStr ? `?${paramStr}` : ''}`);
  } catch (e) {
    console.error(e);
  }
};

/**
 * 操作成功轻提示
 */
export const toastSuccess = (content: string, duration: number = 1.5) => {
  return message.success(content, duration);
};
