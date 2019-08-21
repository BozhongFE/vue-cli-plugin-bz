import home from './page/home';
// 这种方式通过webpackChunkName 控制是否打包在一起
const error404 = () => import(/* webpackChunkName: "dev" */ '@/views/404.vue');
const sitemap = () => import(/* webpackChunkName: "dev" */ '@/views/sitemap.vue');

export default [
  home,
  {
    path: '/404',
    name: '404',
    component: error404,
    meta: {
      title: '404',
    },
  },
  {
    path: '/sitemap',
    name: 'sitemap',
    component: sitemap,
    meta: {
      title: '站点地图',
    },
  },
  {
    path: '/first/second',
    name: 'first-second',
    component: {
      template: '<div>测试路由，可以删除</div>',
    },
    meta: {
      title: '测试路由',
    },
  },
  {
    path: '/index',
    redirect: '/',
  },
  {
    path: '*',
    redirect: '/404',
  },
];
