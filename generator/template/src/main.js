import Vue from 'vue';
import App from './App.vue';<? if (router) { ?>
import router from './router';<? } if (vuex) { ?>
import store from './vuex';<? } ?>

<? if (dynamicLoadScript) { ?>// eslint-disable-next-line
__webpack_public_path__ = projectFullPath;
<? } ?>Vue.config.productionTip = false;

new Vue({
<? if (router) { ?>  router,<? } if (vuex) { ?>
  store,<? } ?>
  render: h => h(App),
}).$mount('#app');
