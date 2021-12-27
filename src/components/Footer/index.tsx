import { DefaultFooter } from '@ant-design/pro-layout';

const Footer: React.FC = () => {
  const defaultMessage = '刘小白';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: '内容管理系统',
          title: '内容管理系统',
          href: 'https://cms.lxbznkj.com/',
          blankTarget: true,
        },
        {
          key: '商品管理系统',
          title: '商品管理系统',
          href: 'http://ecshop.lxbznkj.com',
          blankTarget: true,
        },
        {
          key: '代理商管理系统',
          title: '代理商管理系统',
          href: 'https://agent.lxbznkj.com/',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
