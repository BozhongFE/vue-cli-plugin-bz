const home = () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue');

export default {
  path: '/',
  name: 'home',
  component: home,
  meta: {
    title: '首页',
    // keepAlive: true, // 开启缓存
  },
};
