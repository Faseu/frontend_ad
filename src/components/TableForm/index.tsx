import type { ReactNode } from 'react';
import React, { Component } from 'react';
import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';
import type { ColumnProps } from 'antd/es/table';
import type { FormInstance } from 'antd/es/form';
import StandardTable from '@/components/StandardTable';
import { getCurrentTime } from '@/utils/utils';
import { getInitialValues } from './utils';

import styles from './index.less';

export interface TablePagination {
  total: number;
  pageSize: number;
  current: number;
}

export type TableParams = Record<string, any>;

interface SelectItem {
  value: any;
  text: string;
}

export interface OptionValue {
  type?: string;
  key: string;
  label: string;
  initialValue?: any;
  placeholder?: string;
  span?: number;
  selectList?: SelectItem[];
  disabledDate?: (current?: Moment) => boolean;
  timeRangeKeys?: string[];
}

interface OperatorItem {
  icon?: ReactNode;
  type?: 'link' | 'default' | 'ghost' | 'primary' | 'dashed' | undefined;
  onClick: () => void;
  text: string;
}

export type TableColumnProps<T> = ColumnProps<T>;

interface TableFormProps<T> {
  bordered: boolean;
  options: OptionValue[];
  isSearch: boolean;
  isReset: boolean;
  isExport: boolean;
  operators: OperatorItem[];
  operatorsNewLine: OperatorItem[];
  data: {
    columns: TableColumnProps<T>[];
    list: T[];
    pagination: any;
    loading: boolean;
  };
  summaryData?: {
    columns: TableColumnProps<T>[];
    list: T[];
  };
  tableConfigs?: any;
  exportFunc?: (params: TableParams) => void;
  searchFunc: (params: TableParams) => void;
  colSpan: number;
}

const { Item: FormItem } = Form;
const { Option } = Select;
const { RangePicker } = DatePicker;

const defaultDisabledDate = (current: any) =>
  current && current > moment(`${moment(getCurrentTime()).format('YYYY-MM-DD')} 23:59:59`);

class TableForm extends Component<TableFormProps<any>> {
  formRef = React.createRef<FormInstance>();

  static defaultProps = {
    bordered: false,
    isSearch: true,
    isExport: false,
    isReset: true,
    options: [],
    tableConfigs: {},
    exportFunc: () => {},
    operators: [],
    operatorsNewLine: [],
    colSpan: 6,
  };

  getSearchParams = () => {
    const { options } = this.props;
    let params = {};
    const form = this.formRef.current;
    if (form) {
      options.forEach((option: OptionValue) => {
        const value = form.getFieldValue(option.key);
        switch (option.type) {
          case 'select':
            if (value !== 'ALL') {
              params = { ...params, [option.key]: value };
            }
            break;
          case 'rangePicker':
            // eslint-disable-next-line no-case-declarations
            const [start = 'startDay', end = 'endDay'] = option.timeRangeKeys || [];
            if (value && value.length > 0) {
              params = {
                ...params,
                [start]: `${value[0].format('YYYY-MM-DD')} 00:00:00`,
                [end]: `${value[1].format('YYYY-MM-DD')} 23:59:59`,
              };
            }
            break;
          default:
            if (value) {
              params = { ...params, [option.key]: value };
            }
            break;
        }
      });
    }
    return params;
  };

  handleSubmit = () => {
    this.handleSearch();
  };

  handleSearch = (pageIndex?: number) => {
    const { searchFunc } = this.props;
    const params = this.getSearchParams();
    searchFunc({ pageIndex: pageIndex || 1, ...params });
  };

  handleReset = () => {
    const form = this.formRef.current;
    if (form) {
      form.resetFields();
    }
    this.handleSearch();
  };

  handleChangeTable = (pagination: Partial<TablePagination>) => {
    const { searchFunc } = this.props;
    const params: Partial<TableParams> = {
      pageIndex: pagination.current,
      pageSize: pagination.pageSize,
      ...this.getSearchParams(),
    };
    searchFunc(params);
  };

  handleExport = () => {
    const { exportFunc } = this.props;
    if (exportFunc) {
      const params = this.getSearchParams();
      exportFunc(params);
    }
  };

  render() {
    const {
      bordered,
      options,
      isSearch,
      isExport,
      isReset,
      data,
      summaryData,
      operators,
      operatorsNewLine,
      tableConfigs,
      colSpan,
    } = this.props;

    return (
      <div className={styles.tableForm}>
        {options.length > 0 && (
          <Form
            ref={this.formRef}
            onFinish={this.handleSubmit}
            initialValues={getInitialValues(options)}
          >
            <div className={styles.searchHead}>
              <div className={styles.searchTitle}>快速查询</div>
              <span className={styles.tableForm__fields__btnGroup}>
                {operators.map((operator: OperatorItem) => (
                  <Button
                    key={operator.text}
                    icon={operator.icon}
                    type={operator.type || 'primary'}
                    style={{ marginRight: 8 }}
                    onClick={operator.onClick}
                  >
                    {operator.text}
                  </Button>
                ))}
                {isExport && (
                  <Button
                    style={{ marginRight: 8 }}
                    icon="export"
                    onClick={this.handleExport}
                    disabled={!data.pagination.total}
                  >
                    导出
                  </Button>
                )}
                {isReset && (
                  <Button style={{ marginRight: 8 }} onClick={this.handleReset}>
                    重置
                  </Button>
                )}
                {isSearch && (
                  <Button type="primary" htmlType="submit">
                    查询
                  </Button>
                )}
              </span>
            </div>
            <Row gutter={[40, 4]}>
              {options.map((option: OptionValue) => {
                let optionContent;
                switch (option.type) {
                  case 'select':
                    optionContent = (
                      <Select style={{ width: '100%' }}>
                        {option.selectList &&
                          option.selectList.map((item: SelectItem) => (
                            <Option key={item.value} value={item.value}>
                              {item.text}
                            </Option>
                          ))}
                      </Select>
                    );
                    break;
                  case 'rangePicker':
                    optionContent = (
                      <RangePicker
                        format="YYYY-MM-DD"
                        allowClear={false}
                        disabledDate={option.disabledDate || defaultDisabledDate}
                      />
                    );
                    break;
                  default:
                    optionContent = (
                      <Input placeholder={option.placeholder} style={{ width: '100%' }} />
                    );
                    break;
                }
                return (
                  <Col key={option.key} sm={24} md={colSpan}>
                    <FormItem name={option.key} label={option.label}>
                      {optionContent}
                    </FormItem>
                  </Col>
                );
              })}
            </Row>
          </Form>
        )}
        {operatorsNewLine.length > 0 && (
          <div className={styles.tableForm__operators}>
            {operatorsNewLine.map((operator: OperatorItem) => (
              <Button
                key={operator.text}
                icon={operator.icon}
                type={operator.type || 'primary'}
                onClick={operator.onClick}
              >
                {operator.text}
              </Button>
            ))}
          </div>
        )}
        {summaryData && (
          <div className={styles.tableForm__summary}>
            <StandardTable
              data={{ list: summaryData.list }}
              columns={summaryData.columns}
              bordered={bordered}
              {...tableConfigs}
            />
          </div>
        )}
        <StandardTable
          bordered={bordered}
          loading={data.loading}
          data={{ list: data.list, pagination: data.pagination }}
          columns={data.columns}
          onChange={this.handleChangeTable}
          {...tableConfigs}
        />
      </div>
    );
  }
}

export default TableForm;
