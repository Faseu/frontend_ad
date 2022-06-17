import { Table } from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import { setCookie } from 'tiny-cookie';
import type { ColumnProps, TableProps } from 'antd/es/table';
import type { SortOrder } from 'antd/es/table/interface';
import React, { Component } from 'react';
import type { FormInstance } from 'antd/lib/form';
import type { ConnectState } from '@/models/connect';

import styles from './index.less';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type StandardTableColumnProps = ColumnProps<TableListItem>;

type TableListItem = Record<string, any>;

export interface StandardTableProps<T> extends Omit<TableProps<T>, 'columns'> {
  columns: StandardTableColumnProps[];
  data: {
    list: TableListItem[];
    pagination?: StandardTableProps<TableListItem>['pagination'];
  };
  pageSize: number;
  dispatch: Dispatch;
  onChange?: (params: any) => void;
}

class StandardTable extends Component<StandardTableProps<TableListItem>> {
  formRef = React.createRef<FormInstance>();

  sorter: {
    sortField?: string;
    sortType?: SortOrder | number;
  } = {};

  pageIndex = 1;

  pageSize = this.props.pageSize;

  handlePageSizeChange = (size: number) => {
    const { dispatch, pageSize } = this.props;
    if (size !== pageSize) {
      setCookie('pageSize', `${size}`, { expires: '1Y' });
      this.pageSize = size;
      // @ts-ignore
      dispatch({
        type: 'global/savePageSize',
        payload: size,
      });
    }
  };

  handleTableChange: TableProps<TableListItem>['onChange'] = (pagination, filters, sorter) => {
    const { onChange } = this.props;
    // @ts-ignore
    const { field: sortField, order: sortType } = sorter;
    const { current, pageSize } = pagination;
    this.pageIndex = current || 1;
    this.handlePageSizeChange(pageSize || 10);
    this.sorter = sortType ? { sortField, sortType: sortType === 'ascend' ? 1 : 2 } : {};
    if (onChange) {
      let fieldsValue = {};
      if (this.formRef.current) {
        fieldsValue = this.formRef.current.getFieldsValue();
      }
      onChange({ current, ...fieldsValue, ...this.sorter });
    }
  };

  render() {
    const {
      data,
      pageSize,
      dispatch,
      rowKey = 'id',
      onChange,
      bordered = false,
      ...rest
    } = this.props;
    const { list = [], pagination = false } = data || {};

    const paginationProps = pagination
      ? {
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['10', '30', '50', '100'],
          defaultPageSize: 10,
          defaultCurrent: 2,
          onShowSizeChange: (current: number, size: number): void => {
            if (size !== pageSize) {
              setCookie('pageSize', `${size}`, { expires: '1Y' });
              dispatch({
                type: 'global/savePageSize',
                payload: size,
              });
            }
          },
          showTotal: (total: number, range: number[]): string =>
            `第${range[0]}-${range[1]}条/总共${total}条`,
          ...pagination,
          pageSize,
        }
      : false;

    return (
      <div className={styles.standardTable}>
        <Table
          rowKey={rowKey || 'id'}
          dataSource={list}
          pagination={paginationProps}
          onChange={this.handleTableChange}
          scroll={{ x: 'max-content' }}
          bordered={bordered}
          {...rest}
        />
      </div>
    );
  }
}

export default connect(({ global }: ConnectState) => ({
  pageSize: global.pageSize,
}))(StandardTable);
