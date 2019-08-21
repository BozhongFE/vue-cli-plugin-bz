const pluginPkg = require('./package.json');
module.exports = {
  name: pluginPkg.name,
  pkg: {
    [pluginPkg.name]: {
      presets: {
        router: false,
        routerHistoryMode: false,
        vuex: false,
        less: false,
        redirected: false,
        source: false,
      },
      dependencies: {
        vuex: '^3.0.1',
        'vue-router': '^3.0.3',
      },
      devDependencies: {
        less: '3.9.0',
        'less-loader': '^4.1.0',
      },
    },
  },
  template: {
    filters: {
      'src/vuex/**/*': 'vuex',
      'src/router/**/*': 'router',
      'src/views/404.vue': 'router',
      'src/views/sitemap.vue': 'router',
      'src/views/home/components/nav.vue': 'router',
      'app.config.js': 'source || redirected || routerHistoryMode',
    },
  },
  destination: {
    removes: {
      // cli@3.x self
      '.gitignore': 'true',
      'src/store.js': 'vuex',
      'src/router.js': 'router',
      'src/views/About.vue': 'router',
      'src/views/Home.vue': 'router',
      'src/router.js': 'router',
      'src/assets/logo.png': 'true',
      'public/favicon.ico': 'true',
      // plugin self
      // 'src/vuex/**/*': '!vuex',
      // 'src/router/**/*': '!router',
      // 'src/views/404.vue': '!router',
      // 'src/views/sitemap.vue': '!router',
      // 'src/views/home/components/nav.vue': '!router',
      // 'app.config.js': '!source && !redirected && !routerHistoryMode',
    },
  }
};
