export default async (response: Response): Promise<void> => {
  let resData;
  try {
    resData = await response.clone().blob();
  } catch (e) {
    throw new Error();
  }
  const a = document.createElement('a');
  const url = window.URL.createObjectURL(resData); // 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上)
  const filename = response.headers.get('Content-Disposition') || 'file.xls';
  a.href = url;
  a.download = decodeURIComponent(filename.replace('attachment;filename=', ''));
  a.click();
  window.URL.revokeObjectURL(url);
};
