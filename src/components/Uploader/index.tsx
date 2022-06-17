import { PureComponent } from 'react';
import { Button, Upload } from 'antd';
import {
  CloseOutlined,
  LeftOutlined,
  PlusOutlined,
  RightOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { getToken } from '@/utils/token';
import { prefix } from '@/utils/request';

import styles from './index.less';

export * from './utils';

function getBase64(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

interface UploaderProps {
  onChange?: (fileList: UploadFile[]) => void;
  getInfo?: (e: any) => void;
  fileList?: UploadFile[];
  maxLength: number;
  type: string;
  url?: string;
  readonly?: boolean;
}

interface UploaderState {
  previewVisible: boolean;
  previewImage: string;
  previewImageUid: string;
}

class Uploader extends PureComponent<UploaderProps, UploaderState> {
  static defaultProps = {
    onChange: () => {},
    getInfo: () => {},
    maxLength: 1,
    url: '/upload/attachment',
  };

  state = {
    previewVisible: false,
    previewImage: '',
    previewImageUid: '',
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handleChange = async (info: UploadChangeParam): Promise<void> => {
    const { onChange, getInfo } = this.props;
    const { file, fileList } = info;
    const img_url = file.originFileObj ? await getBase64(file.originFileObj) : '';

    const img = new Image();
    img.src = img_url;
    img.onload = () => {
      // 获取到 图片的宽高
      const ww = img.width;
      const hh = img.height;
      console.log(ww, hh);
      if (getInfo) {
        getInfo({ width: ww, height: hh });
      }
    };
    if (onChange) {
      onChange(fileList);
    }
  };

  handleRemove = (file: UploadFile): void => {
    const { fileList = [], onChange } = this.props;
    if (onChange) {
      onChange(fileList.filter((f: UploadFile): boolean => f.uid !== file.uid));
    }
  };

  handlePreview = async (file: UploadFile): Promise<void> => {
    let previewImage = file.url;
    if (!previewImage) {
      previewImage = file.originFileObj ? await getBase64(file.originFileObj) : '';
    }

    this.setState({
      previewImage,
      previewImageUid: file.uid,
      previewVisible: true,
    });
  };

  handleChangeImg = async (index: number) => {
    const { fileList } = this.props;
    // @ts-ignore
    const file: UploadFile = fileList[index];
    let previewImage = file.url;
    if (!previewImage) {
      previewImage = file.originFileObj ? await getBase64(file.originFileObj) : '';
    }

    this.setState({
      previewImage,
      previewImageUid: file.uid,
    });
  };

  render() {
    const { fileList, url, maxLength, type, onChange, readonly = false, ...restProps } = this.props;
    const { previewImage, previewImageUid, previewVisible } = this.state;
    let accept: string;

    switch (type) {
      case 'IMAGE':
        accept = 'image/*';
        break;
      case 'VIDEO':
        accept = 'video/*';
        break;
      case 'AUDIO':
        accept = 'audio/*';
        break;
      case 'EXCEL':
        accept = '.xls, .xlsx';
        break;
      case 'TEMPLATE':
        accept = '.doc, .pdf, .docx';
        break;
      default:
        accept = '*';
    }

    const uploadButtonPic = (
      <div className={styles.uploadBox}>
        <PlusOutlined type="plus" style={{ fontSize: '36px' }} />
      </div>
    );

    const uploadButton = <Button icon={<UploadOutlined />}>上传</Button>;

    let currentIndex = -1;
    if (fileList && fileList.length) {
      fileList.forEach((file, index) => {
        if (file.uid === previewImageUid) {
          currentIndex = index;
        }
      });
    }
    return (
      // TODO 上传组件可再优化
      <div className="clearfix">
        {type === 'IMAGE' && (
          <Upload
            key="0"
            className={styles.uploadFile}
            name="file"
            action={`${prefix}${url}`}
            listType="picture-card"
            data={{
              fileType: 1,
            }}
            headers={{
              Authorization: `Bearer ${getToken()}`,
            }}
            defaultFileList={fileList}
            onChange={this.handleChange}
            onPreview={this.handlePreview}
            onRemove={this.handleRemove}
            disabled={readonly}
            {...restProps}
            multiple
            accept="image/*"
          >
            {fileList && fileList.length === maxLength ? null : uploadButtonPic}
          </Upload>
        )}
        {type !== 'IMAGE' && (
          <Upload
            key="1"
            name="file"
            action={`${prefix}${url}`}
            listType="text"
            data={{
              fileType: 'OTHER',
            }}
            headers={{
              Authorization: `Bearer ${getToken()}`,
            }}
            defaultFileList={fileList}
            onChange={this.handleChange}
            onRemove={this.handleRemove}
            disabled={readonly}
            {...restProps}
            multiple
            accept={accept}
          >
            {fileList && fileList.length === maxLength ? null : uploadButton}
          </Upload>
        )}
        {previewVisible && (
          <div className={styles.picContainer} onClick={this.handleCancel}>
            <div className={styles.picList}>
              <div className={styles.picBox} onClick={(e) => e.stopPropagation()}>
                <CloseOutlined
                  className={styles.picBox_close}
                  onClick={this.handleCancel}
                  style={{ fontSize: '16px' }}
                />
                {fileList && fileList.length > 1 && (
                  <LeftOutlined
                    className={currentIndex > 0 ? styles.picBox_icon_active : ''}
                    onClick={
                      currentIndex > 0 ? () => this.handleChangeImg(currentIndex - 1) : () => {}
                    }
                    style={{ fontSize: '22px' }}
                  />
                )}
                {fileList &&
                  fileList
                    .filter((file) => file.uid === previewImageUid)
                    .map(() => (
                      <img key={previewImageUid} alt="previewImageUid" src={previewImage} />
                    ))}
                {fileList && fileList.length > 1 && (
                  <RightOutlined
                    className={currentIndex < fileList.length - 1 ? styles.picBox_icon_active : ''}
                    onClick={
                      currentIndex < fileList.length - 1
                        ? () => this.handleChangeImg(currentIndex + 1)
                        : () => {}
                    }
                    type="right"
                    style={{ fontSize: '22px' }}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Uploader;
