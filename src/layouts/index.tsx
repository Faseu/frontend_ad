import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

export default function layout(props: any) {
  console.log(props);
  return (
    <>
      <Layout>
        <Sider>Sider</Sider>
        <Layout>
          <Header>Header</Header>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </>
  );
}
