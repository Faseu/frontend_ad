import { Settings as LayoutSettings } from '@ant-design/pro-layout';
// import LOGO_ICON from '../public/logo.svg'
const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  layout: 'mix',
  contentWidth: 'Fluid',
  headerHeight: 48,
  primaryColor: '#FE690C',
  splitMenus: false,
  fixSiderbar: true,
  fixedHeader: false,
  navTheme: 'light',
  colorWeak: false,
  title: '广告管理系统',
  pwa: false,
  logo: 'https://lxbpaper.oss-cn-beijing.aliyuncs.com/lxbpaper/machineupdate/logo%281%29.svg',
  menu: {
    locale: false,
  },
};

export default Settings;
