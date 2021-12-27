import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

const Admin: React.FC = () => {
  return <PageHeaderWrapper content={' 这个页面只有 admin 权限才能查看'} />;
};

export default Admin;
