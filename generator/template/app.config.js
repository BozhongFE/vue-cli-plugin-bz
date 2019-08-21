const path = require('path');<? if (dynamicLoadScript) { ?>
const assert = require('assert');<? } if (source) { ?>
const { existsSync } = require('fs');<? } ?>

const {
<? if (dynamicLoadScript) { ?>  NODE_ENV: env,
<? } if (source) { ?>  npm_config_source: sourcePath,<? } ?>
} = process.env;<? if (source) { ?>
/**
 * env: npm run xxx
 */
if (typeof sourcePath === 'undefined') {
  console.log('请先配置打包输出的source根目录');
  console.log('Example: npm config set source "D:\\source"'); 
  throw new Error('没有配置模块路径');
} else if (!existsSync(sourcePath)) {
  throw new Error('source 根目录不存在，请检查配置的 source 根目录是否正确');
}<? } if (dynamicLoadScript) { ?>
const isDev = env === 'development';
const isProduct = env === 'production';<? } ?>
const appConfig = {
<? if (dynamicLoadScript) { ?>  publicPath: '/wcltest/hello/',
  projectPath: '/cropper/',
  bzConfigPath: '/common/js/config.js',
<? } if (source) { ?>  outputPath: path.resolve(sourcePath, './cropper/'),<? } ?>
}
<? if (dynamicLoadScript) { ?>
/**
 * env: development
 */
if (isDev) {
  Object.assign(appConfig, {
    publicPath: undefined,
    projectPath: '/',
    bzConfigPath: 'https://source.office.bzdev.net/common/js/config.js',
  });
}
/**
 * env: prodcution
 */
if (isProduct) {
  assert(appConfig.publicPath, 'publicPath 填写项目发布地址的路径');
  assert(appConfig.projectPath, 'projectPath 填写项目打包输出的路径');
}
<? } ?>
module.exports = appConfig;
