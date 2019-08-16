module.exports = (api, projectOptions) => {
  api.chainWebpack(config => {
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');
    // css loader
    if (process.env.NODE_ENV === 'production') {
      config.plugin('extract-css').tap(args => {
        Object.assign(args[0], {
          filename: 'css/[name].css?[contenthash:8]',
          chunkFilename: 'css/[name].css?[contenthash:8]',
        });
      });
    }
    // media file loader
    [{
      type: 'images',
      dir: 'img',
    }, {
      type: 'media',
    }, {
      type: 'fonts',
    }].forEach((item) => {
      config.module.rule(item.type).use('url-loader').loader('url-loader').options({
        limit: 4 * 1024,
        fallback: {
          loader: 'file-loader',
          options: {
            name: `${item.dir || item.type}/[name].[ext]?[hash:8]`,
          },
        },
      });
    });
    ['svg'].forEach((type) => {
      config.module.rule(type).use('file-loader').loader('file-loader').options({
        name: 'img/[name].[ext]?[hash:8]',
      });
    });
  });
  api.configureWebpack({
    output: {
      filename: 'js/[name].js?[hash:8]',
      chunkFilename: 'js/[name].js?[hash:8]',
    },
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js',
      },
    },
    devServer: {
      port: 8000,
      sockPort: 8000,
      disableHostCheck: true,
    },
  });

  api.registerCommand('test', args => {
    // 注册 `vue-cli-service test`
  })
}