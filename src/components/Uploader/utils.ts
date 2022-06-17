import type { UploadChangeParam } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';

export const getUploadFileListFromEvent = (e: UploadChangeParam | UploadFile[]): UploadFile[] => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

export const normalizeUploadFileList = (
  fileList: { id: number; url: string; name?: string }[],
): UploadFile[] => {
  if (!fileList || !fileList[0]) {
    return [];
  }
  return fileList.map((file) => ({
    uid: `${file.id || 1}`,
    size: 500,
    name: file.name || 'image.png',
    type: 'image/png',
    status: 'done',
    url: file.url,
  }));
};

export const getUploadFileIds = (fileList: UploadFile[]): number[] => {
  if (fileList.length > 0) {
    return fileList.map(
      (file: UploadFile): number => (file.response && file.response.data) || Number(file.uid),
    );
  }
  return [];
};
