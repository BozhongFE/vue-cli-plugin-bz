import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';<? if (routerHistoryMode) { ?>

const router = new VueRouter({
  routes,
  mode: 'history',
  // 外链访问的路径，publicPath 在 app.config.js 中配置
  // eslint-disable-next-line
  base: publicFullPath,
});<? } else { ?>

const router = new VueRouter({
  routes,
});<? } ?>

Vue.use(VueRouter);

router.beforeEach((to, form, next) => {
  if (to.meta && to.meta.title) document.title = to.meta.title;
  return next();
});

export default router;
