import React, { useEffect } from 'react';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { StateType } from '../model';

import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Col, Form, Input, Radio, Row, Select } from 'antd';

import styles from '../style.less';
import { COL_LAYOUT, ROW_GUTTER, TEMP_NUM } from '@/constant';
import { backPage, toastSuccess } from '@/utils/utils';
// import type { CreateParams } from '../data';

const { Item: FormItem } = Form;
const { TextArea } = Input;
const { Option } = Select;

interface IProps {
  dispatch: Dispatch;
  positionCreate: StateType;
  loading: boolean;
}

const PositionList: React.FC<IProps> = (props) => {
  const { dispatch } = props;
  const [form] = Form.useForm();
  let submitting = false;

  useEffect(() => {}, []);

  // 返回上一页
  const handleBack = () => {
    backPage('/position/list');
  };

  // 新增 Todo  any
  const handleCreate = (values: any) => {
    if (submitting) {
      return;
    }
    submitting = true;
    dispatch({
      type: 'positionList/add',
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
      const { name, media, platform, size, remark } = initialValues;
      const values = {
        name,
        media,
        platform,
        size,
        remark,
      };
      handleCreate(values);
    });
  };

  const onChangeRadio = () => {};

  return (
    <PageContainer>
      <Card>
        <Card>
          <div className={styles.header}>基础信息</div>
          <Form form={form}>
            <Row gutter={ROW_GUTTER}>
              <Col {...COL_LAYOUT}>
                <FormItem
                  label="广告位名称"
                  name="name"
                  rules={[{ required: true, message: '请填写广告位名称' }]}
                >
                  <Input />
                </FormItem>
              </Col>
              <Col {...COL_LAYOUT}>
                <FormItem
                  label="所属媒体"
                  name="media"
                  rules={[{ required: true, message: '请选择所属媒体' }]}
                >
                  <Select
                    style={{ width: '100%', minWidth: '1px' }}
                    placeholder="请选择所属媒体"
                    optionFilterProp="children"
                  >
                    {TEMP_NUM.map((item) => (
                      <Option key={item.value} value={item.value}>
                        {item.text}
                      </Option>
                    ))}
                  </Select>
                </FormItem>
              </Col>
              <Col {...COL_LAYOUT}>
                <FormItem
                  label="所属平台"
                  name="platform"
                  rules={[{ required: true, message: '请选择所属平台' }]}
                >
                  <Select
                    style={{ width: '100%', minWidth: '1px' }}
                    placeholder="请选择所属平台"
                    optionFilterProp="children"
                  >
                    {TEMP_NUM.map((item) => (
                      <Option key={item.value} value={item.value}>
                        {item.text}
                      </Option>
                    ))}
                  </Select>
                </FormItem>
              </Col>
              <Col {...COL_LAYOUT}>
                <FormItem
                  label="广告位尺寸"
                  name="size"
                  rules={[{ required: true, message: '请选择尺寸' }]}
                >
                  <Select
                    style={{ width: '100%', minWidth: '1px' }}
                    placeholder="请选择尺寸"
                    optionFilterProp="children"
                  >
                    {TEMP_NUM.map((item) => (
                      <Option key={item.value} value={item.value}>
                        {item.text}
                      </Option>
                    ))}
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row gutter={ROW_GUTTER}>
              <Col {...COL_LAYOUT}>
                <FormItem
                  label="状态"
                  name="uscc"
                  rules={[{ required: true, message: '请填写信用代码' }]}
                >
                  <Radio.Group onChange={onChangeRadio}>
                    <Radio value={1}>启用</Radio>
                    <Radio value={2}>禁用</Radio>
                  </Radio.Group>
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
        <Button type="primary" className={styles.mt20} onClick={handleSave}>
          保存
        </Button>
      </Card>
    </PageContainer>
  );
};

export default connect(
  ({
    positionCreate,
    loading,
  }: {
    positionCreate: StateType;
    loading: {
      effects: Record<string, boolean>;
    };
  }) => ({
    positionCreate,
    loading: loading.effects['positionCreate/fetch'],
  }),
)(PositionList);
