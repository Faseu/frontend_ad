export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    // layout: false,
    routes: [
      {
        path: '/user',
        layout: false,
        routes: [
          {
            path: '/user',
            routes: [{ name: '登录', path: '/user/login', component: './user/Login' }],
          },
          {
            component: './404',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/welcome',
              },
              {
                path: '/welcome',
                name: '欢迎',
                icon: 'smile',
                component: './Welcome',
              },
              {
                path: '/admin',
                name: '管理页',
                icon: 'crown',
                access: 'canAdmin',
                component: './Admin',
                routes: [
                  {
                    path: '/admin/sub-page',
                    name: '二级管理页',
                    icon: 'smile',
                    component: './Welcome',
                  },
                  {
                    component: './404',
                  },
                ],
              },
              {
                name: '查询表格',
                icon: 'table',
                path: '/list',
                component: './TableList',
              },
              {
                name: '测试页',
                icon: '',
                path: '/test',
                component: './account/center',
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
