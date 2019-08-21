<template>
  <div id="app"><? if (router) { ?>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view><? } else { ?>
    <home></home><? } ?>
  </div>
</template>

<script><? if (!router) { ?>
import home from './views/home/index.vue';<? } ?>

export default {
  name: 'app',
  data() {
    return {
    };
  },<? if (!router) { ?>
  components: {
    home,
  },<? } ?>
};
</script>
