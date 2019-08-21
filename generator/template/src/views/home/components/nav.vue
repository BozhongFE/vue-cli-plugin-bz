<template>
  <div>
    <ul>
      <li v-for="(r, i) in routes" :key="i">
        <template v-if="$route.name !== r.name">
          <router-link tag="a" :to="r.path">\{{r.meta && r.meta.title ? r.meta.title : r.name}}</router-link>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import routes from '@/router';

export default {
  data() {
    return {
      routes: routes.options.routes,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  margin-top: 20px;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
