import React, { useEffect } from 'react';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { StateType } from '../model';

import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Col, Form, Input, Row, Select } from 'antd';

import styles from '../style.less';
import { ADVERTISER_TYPE_LIST, COL_LAYOUT, ROW_GUTTER } from '@/constant';
import Uploader, { getUploadFileIds } from '@/components/Uploader';
import { backPage, toastSuccess } from '@/utils/utils';
import type { CreateParams } from '../data';

const { Item: FormItem } = Form;
const { TextArea } = Input;
const { Option } = Select;

interface IProps {
  dispatch: Dispatch;
  advertiserCreate: StateType;
  loading: boolean;
}

const AdvertiserList: React.FC<IProps> = (props) => {
  const { dispatch } = props;
  const [form] = Form.useForm();
  let submitting = false;

  useEffect(() => {}, []);

  // 返回上一页
  const handleBack = () => {
    backPage('/advertiser/list');
  };

  // 新增
  const handleCreate = (values: CreateParams) => {
    if (submitting) {
      return;
    }
    submitting = true;
    dispatch({
      type: 'advertiserList/add',
      payload: {
        ...values,
      },
      callback: () => {
        toastSuccess('新增成功');
        handleBack();
      },
      onFinish: () => {
        submitting = false;
      },
    });
  };

  const handleSave = () => {
    form.validateFields().then((initialValues) => {
      const { phone, contactName, remark, pics, uscc, address, name, type } = initialValues;
      if (pics[pics.length - 1].status !== 'done') {
        return;
      }
      const values = {
        type,
        name,
        address,
        uscc,
        remark,
        contactName,
        phone,
        pics: getUploadFileIds(pics).map((picId) => picId),
      };
      handleCreate(values);
    });
  };

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
                  <Uploader maxLength={2} type="IMAGE" />
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

export default connect(
  ({
    advertiserCreate,
    loading,
  }: {
    advertiserCreate: StateType;
    loading: {
      effects: Record<string, boolean>;
    };
  }) => ({
    advertiserCreate,
    loading: loading.effects['advertiserCreate/fetch'],
  }),
)(AdvertiserList);
