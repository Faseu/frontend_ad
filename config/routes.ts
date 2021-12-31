export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [{ name: 'login', path: '/user/login', component: './user/Login' }],
      },
      { component: './404' },
    ],
  },
  {
    name: 'advertiser',
    icon: 'UserSwitch',
    path: '/advertiser',

    routes: [
      {
        path: '/advertiser/list',
        name: 'advertiserList',
        component: './advertiser/list',
      },
    ],
  },
  { path: '/welcome', name: 'welcome', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      { path: '/admin/sub-page', name: 'adminSubPage', icon: 'smile', component: './Welcome' },
      { component: './404' },
    ],
  },
  { name: 'list', icon: 'table', path: '/list', component: './TableList' },
  {
    name: 'test',
    icon: 'fileText',
    path: '/test',
    component: './account/center',
  },
  { path: '/', redirect: '/welcome' },
  { component: './404' },
];
