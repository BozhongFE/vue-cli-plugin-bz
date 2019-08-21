<? if (source || dynamicLoadScript) { ?>const appConfig = require('./app.config');
<? } ?>
module.exports = {
<? if (source) { ?>  outputDir: appConfig.outputPath,
<? } if (dynamicLoadScript) { ?>  publicPath: appConfig.projectPath,
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: '首页',
      chunks: ['chunk-vendors', 'index'],
      inject: false,
      bzConfigPath: appConfig.bzConfigPath,
      projectPath: appConfig.projectPath,
      publicPath: appConfig.publicPath,
    }
  },<? } else { ?>
  publicPath: './',<? } ?> 
};