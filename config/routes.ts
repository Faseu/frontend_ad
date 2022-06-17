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
  { path: '/', redirect: '/welcome' },
  { path: '/welcome', name: 'welcome', icon: 'smile', component: './Welcome' },
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
      {
        path: '/advertiser/list/create',
        name: 'advertiserListCreate',
        component: './advertiser/list/subpage/create',
        hideInMenu: true,
      },
      {
        path: '/advertiser/list/edit/:id',
        name: 'advertiserListEdit',
        component: './advertiser/list/subpage/edit',
        hideInMenu: true,
      },
    ],
  },
  {
    name: 'position',
    icon: 'PicLeft',
    path: '/position',
    routes: [
      {
        path: '/position/list',
        name: 'positionList',
        component: './position/list',
      },
      {
        path: '/position/list/create',
        name: 'positionListCreate',
        component: './position/list/subpage/create',
        hideInMenu: true,
      },
      {
        path: '/position/list/edit/:id',
        name: 'positionListEdit',
        component: './position/list/subpage/edit',
        hideInMenu: true,
      },
    ],
  },
  {
    name: 'ad',
    icon: 'Appstore',
    path: '/ad',
    routes: [
      {
        path: '/ad/list',
        name: 'adList',
        component: './ad/list',
      },
      {
        path: '/ad/list/create',
        name: 'adListCreate',
        component: './ad/list/subpage/create',
        hideInMenu: true,
      },
      {
        path: '/ad/list/edit/:id',
        name: 'adListEdit',
        component: './ad/list/subpage/edit',
        hideInMenu: true,
      },
    ],
  },
  { component: './404' },
];
