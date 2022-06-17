import React, { useEffect } from 'react';
import type { Dispatch } from 'umi';
import { connect, history } from 'umi';
import type { StateType } from './model';

import { PageContainer } from '@ant-design/pro-layout';
import type { TableColumnProps, TableParams } from '@/components/TableForm';
import TableForm from '@/components/TableForm';
import { Card, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ADVERTISER_STATUS, ADVERTISER_TYPE } from '@/constant';
import { toastSuccess } from '@/utils/utils';

interface IProps {
  dispatch: Dispatch;
  adList: StateType;
  loading: boolean;
}

const AdList: React.FC<IProps> = (props) => {
  const { dispatch } = props;
  const tableRef = React.createRef<any>();

  const handleCreate = () => {
    history.push('/ad/list/create');
  };
  const handleEdit = (id: number) => {
    history.push(`/ad/list/edit/${id}`);
  };
  const handleEnd = (id: number) => {
    dispatch({
      type: 'adList/end',
      payload: {
        id,
      },
      callback: () => {
        toastSuccess('已终止');
        tableRef.current.handleReset();
      },
    });
  };
  const handleTableChange = (params: TableParams) => {
    const { status, ...rest } = params;
    dispatch({
      type: 'operationLog/fetch',
      payload: {
        status: status !== -1 ? status : undefined,
        ...rest,
      },
    });
  };

  const searchFormList = [
    {
      type: 'input',
      key: 'searchField',
      label: '关键字',
      span: 8,
      placeholder: '请输入用户名、模块名称、操作对象',
    },
  ];
  const columns: TableColumnProps<API.RuleListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '广告主名称',
      dataIndex: 'name',
    },
    {
      title: '主体类型',
      dataIndex: 'type',
      render: (text: string) => ADVERTISER_TYPE[text],
    },
    {
      title: '信用代码/身份证号',
      dataIndex: 'uscc',
    },
    {
      title: '联系人信息',
      dataIndex: 'contactName',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (text: string) => ADVERTISER_STATUS[text],
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
    {
      title: '变更时间',
      dataIndex: 'updatedAt',
    },
    {
      title: '操作',
      render: (_: any, record: any) => {
        const { id, status } = record;
        return (
          <Space>
            <a onClick={() => handleEdit(id)}>编辑</a>
            {status === 'COOPERATE' && <a onClick={() => handleEnd(id)}>终止</a>}
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch({
      type: 'adList/fetch',
      payload: {
        pageIndex: 1,
      },
    });
  }, []);
  const {
    adList: { data },
    loading,
  } = props;
  return (
    <PageContainer>
      <Card>
        <TableForm
          ref={tableRef}
          data={{
            loading,
            ...data,
            columns,
          }}
          options={searchFormList}
          searchFunc={handleTableChange}
          operatorsNewLine={[
            {
              text: '新增',
              icon: <PlusOutlined />,
              onClick: () => handleCreate(),
            },
          ]}
        />
      </Card>
    </PageContainer>
  );
};

export default connect(
  ({
    adList,
    loading,
  }: {
    adList: StateType;
    loading: {
      effects: Record<string, boolean>;
    };
  }) => ({
    adList,
    loading: loading.effects['adList/fetch'],
  }),
)(AdList);
