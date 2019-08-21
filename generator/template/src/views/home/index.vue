<template>
  <div id="home">
    <!-- html内引入资源带~ -->
    <img src="@/assets/img/logo.png">
    <h1>\{{ msg }}</h1><? if (router) { ?>
    <home-nav></home-nav><? } ?>
  </div>
</template>

<script><? if (vuex) { ?>
import { mapGetters } from 'vuex';<? } if (router) { ?>
import HomeNav from './components/nav.vue';<? } ?>

export default {
  data() {
    return {<? if (!vuex) { ?>
      msg: 'Welcome to Your Vue.js App',<? } ?>
    };
  },<? if (router) { ?>
  components: {
    HomeNav,
  },<? } if (vuex) { ?>
  computed: {
    ...mapGetters({
      msg: 'home/msg',
    }),
  },<? } ?>
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style<? if (less) { ?> lang="less"<? } ?>>
#home {
  text-align: center;
  margin-top: 60px;
}
</style>
