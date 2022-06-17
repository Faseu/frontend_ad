import React, { useEffect, useState } from 'react';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { StateType } from '../model';
import type { match } from 'react-router';

import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Col, Form, Input, Row, Select } from 'antd';

import styles from '../style.less';
import { ADVERTISER_TYPE_LIST, COL_LAYOUT, ROW_GUTTER } from '@/constant';
import Uploader, { normalizeUploadFileList } from '@/components/Uploader';

const { Item: FormItem } = Form;
const { TextArea } = Input;
const { Option } = Select;

interface Params {
  id: string;
}

interface IProps {
  dispatch: Dispatch;
  advertiserList: StateType;
  loading: boolean;
  match: match<Params>;
}

const AdvertiserList: React.FC<IProps> = (props) => {
  const [uploaderLoad, setUploaderLoad] = useState(false);
  const [form] = Form.useForm();
  const {
    dispatch,
    advertiserList,
    match: {
      params: { id },
    },
  } = props;
  const { details } = advertiserList;

  const handleSave = () => {};

  useEffect(() => {
    dispatch({
      type: 'advertiserList/fetchDetails',
      payload: id,
    });
  }, []);

  useEffect(() => {
    const picsTemp = normalizeUploadFileList([
      {
        id: 1,
        url: 'http://lxbprivate.oss-cn-beijing.aliyuncs.com/attachment/20221/1642408150072383.jpg?Expires=1957768150&OSSAccessKeyId=LTAI4FqEAZwG4qZxdq7zRCAK&Signature=kKEpqwzWv5dRVu%2FgTKZU6WLJ%2BXI%3D',
      },
    ]);
    console.log(picsTemp);
    form.setFieldsValue({ ...details, pics: picsTemp });
    setUploaderLoad(true);
  }, [details]);

  return (
    <PageContainer>
      <Card>
        <Card>
          <div className={styles.header}>主体信息</div>
          <Form form={form}>
            <Row gutter={ROW_GUTTER}>
              <Col {...COL_LAYOUT}>
                <FormItem
                  label="主体类型"
                  name="type"
                  rules={[{ required: true, message: '请选择主体类型' }]}
                >
                  <Select
                    style={{ width: '100%', minWidth: '1px' }}
                    placeholder="请选择主体类型"
                    optionFilterProp="children"
                  >
                    {ADVERTISER_TYPE_LIST.map((item) => (
                      <Option key={item.value} value={item.value}>
                        {item.text}
                      </Option>
                    ))}
                  </Select>
                </FormItem>
              </Col>
              <Col {...COL_LAYOUT}>
                <FormItem
                  label=" 广告主名称"
                  name="name"
                  rules={[{ required: true, message: '请填写名称' }]}
                >
                  <Input />
                </FormItem>
              </Col>
              <Col {...COL_LAYOUT}>
                <FormItem
                  label="地址"
                  name="address"
                  rules={[{ required: true, message: '请填写地址' }]}
                >
                  <Input />
                </FormItem>
              </Col>
            </Row>
            <Row gutter={ROW_GUTTER}>
              <Col {...COL_LAYOUT}>
                <FormItem
                  label="信用代码"
                  name="uscc"
                  rules={[{ required: true, message: '请填写信用代码' }]}
                >
                  <Input />
                </FormItem>
              </Col>
              <Col {...COL_LAYOUT}>
                <FormItem
                  label="图片"
                  name="pics"
                  rules={[
                    {
                      required: true,
                      message: '请上传图片',
                    },
                  ]}
                  valuePropName="fileList"
                >
                  {uploaderLoad && <Uploader maxLength={2} type="IMAGE" />}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col lg={24}>
                <FormItem label="备注：" name="remark">
                  <TextArea rows={4} maxLength={200} placeholder="可填写备注" />
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card className={styles.mt20}>
          <div className={styles.header}>联系信息</div>
          <Form form={form}>
            <Row gutter={ROW_GUTTER}>
              <Col {...COL_LAYOUT}>
                <FormItem
                  label="联系人名称"
                  name="contactName"
                  rules={[{ required: true, message: '请选择主体类型' }]}
                >
                  <Input />
                </FormItem>
              </Col>
              <Col {...COL_LAYOUT}>
                <FormItem
                  label="联系方式"
                  name="phone"
                  rules={[{ required: true, message: '请选择主体类型' }]}
                >
                  <Input />
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
        <Button type="primary" className={styles.mt20} onClick={handleSave}>
          保存
        </Button>
      </Card>
    </PageContainer>
  );
};

export default connect(({ advertiserList }: { advertiserList: StateType }) => ({
  advertiserList,
}))(AdvertiserList);
