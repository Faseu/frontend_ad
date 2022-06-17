import React, { useEffect } from 'react';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { StateType } from '../model';

import { PageContainer } from '@ant-design/pro-layout';
import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
} from 'antd';

import styles from '../style.less';
import { COL_LAYOUT, COL_LAYOUT_3, ROW_GUTTER, TEMP_NUM } from '@/constant';
import Uploader, { getUploadFileIds } from '@/components/Uploader';
import { backPage, toastSuccess } from '@/utils/utils';
import type { CreateParams } from '../data';

const { Item: FormItem } = Form;
const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
interface IProps {
  dispatch: Dispatch;
  adList: StateType;
  loading: boolean;
}

const AdCreate: React.FC<IProps> = (props) => {
  const { dispatch } = props;
  const [form] = Form.useForm();
  let submitting = false;

  const plainOptions = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

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
  const onChangeImage = () => {
    console.log(1111);
  };
  const getInfoImage = (e: any) => {
    console.log(e);
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
                  label="广告名称"
                  name="name"
                  rules={[{ required: true, message: '请填写名称' }]}
                >
                  <Input />
                </FormItem>
              </Col>
              <Col {...COL_LAYOUT}>
                <FormItem
                  label="跳转类型"
                  name="type"
                  rules={[{ required: true, message: '请选择跳转类型' }]}
                >
                  <Select
                    style={{ width: '100%', minWidth: '1px' }}
                    placeholder="请选择跳转类型"
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
                  label="地址"
                  name="APPID"
                  rules={[{ required: true, message: '请填写地址' }]}
                >
                  <Input />
                </FormItem>
              </Col>
              <Col {...COL_LAYOUT}>
                <FormItem
                  label="跳转地址"
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
                  label="所属广告主"
                  name="type"
                  rules={[{ required: true, message: '请选择所属广告主' }]}
                >
                  <Select
                    style={{ width: '100%', minWidth: '1px' }}
                    placeholder="请选择所属广告主"
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
                  label="投放状态"
                  name="type"
                  rules={[{ required: true, message: '请选择投放状态' }]}
                >
                  <Select
                    style={{ width: '100%', minWidth: '1px' }}
                    placeholder="请选择投放状态"
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
          <div className={styles.header}>定向规则</div>
          <Form form={form}>
            <Row gutter={ROW_GUTTER}>
              <Col {...COL_LAYOUT}>
                <FormItem
                  label="投放广告位"
                  name="contactName"
                  rules={[{ required: true, message: '请选择投放广告位' }]}
                >
                  <Input />
                </FormItem>
              </Col>
              <Col {...COL_LAYOUT}>
                <FormItem
                  label="广告权重"
                  name="phone"
                  rules={[{ required: true, message: '请选择广告权重' }]}
                >
                  <InputNumber min={1} max={100} />
                  <a> (1-100 值越大权重越高)</a>
                </FormItem>
              </Col>
              <Col {...COL_LAYOUT}>
                <FormItem
                  label="投放周期"
                  name="contactName"
                  rules={[{ required: true, message: '请选择投放广告位' }]}
                >
                  <RangePicker style={{ width: '100%', minWidth: '1px' }} />
                </FormItem>
              </Col>
              <Col {...COL_LAYOUT}>
                <FormItem
                  label="投放性别"
                  name="contactName"
                  rules={[{ required: true, message: '请选择投放性别' }]}
                >
                  <Radio.Group>
                    <Radio value={0}>不限</Radio>
                    <Radio value={1}>女</Radio>
                    <Radio value={2}>男</Radio>
                  </Radio.Group>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col {...COL_LAYOUT}>
                <FormItem
                  label="投放时间"
                  name="contactName"
                  rules={[{ required: true, message: '请选择投放时间' }]}
                >
                  <Radio.Group>
                    <Radio value={0}>不限</Radio>
                    <Radio value={1}>指定时间</Radio>
                  </Radio.Group>
                </FormItem>
              </Col>
              <Col {...COL_LAYOUT_3}>
                <FormItem
                  label="时间"
                  name="contactName"
                  rules={[{ required: true, message: '请选择投放时间' }]}
                >
                  <Checkbox.Group options={plainOptions} />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormItem
                  label="投放地点"
                  name="contactName"
                  rules={[{ required: true, message: '请选择投放时间' }]}
                >
                  <Radio.Group>
                    <Radio value={0}>不限</Radio>
                    <Radio value={1}>按照省市区</Radio>
                    <Radio value={1}>按照楼宇</Radio>
                  </Radio.Group>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Card style={{ width: '100%' }}>
                <FormItem
                  label="属性设定"
                  name="contactName"
                  rules={[{ required: true, message: '请选择投放时间' }]}
                >
                  <Radio.Group>
                    <Radio value={0}>指定所选</Radio>
                    <Radio value={1}>排除所选</Radio>
                  </Radio.Group>
                </FormItem>
              </Card>
            </Row>
          </Form>
        </Card>
        <Card className={styles.mt20}>
          <div className={styles.header}>广告素材</div>
          <Form>
            <Row>
              <Uploader
                maxLength={2}
                type="IMAGE"
                onChange={onChangeImage}
                getInfo={getInfoImage}
              />
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

export default connect(({ adList }: { adList: StateType }) => ({
  adList,
}))(AdCreate);
