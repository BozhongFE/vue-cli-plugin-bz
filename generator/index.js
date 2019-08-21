const path = require('path');
const fs = require('fs-extra');
const utils = require('./utils');
const config = require('../config');


module.exports = (api, options, rootOptions) => {
  rootOptions.less = rootOptions.cssPreprocessor === 'less';
  /**
   * vue invoke vue-cli-plugin-bz --debug
   */
  const debug = options.debug;
  const pluginName = config.name;
  const pluginConfig = config.pkg[pluginName];
  const debugHandler = (callback = () => {}, debugCallback = () => {}) => debug ? debugCallback.apply(this) : callback.apply(this);
  const pkgPluginConfig = api.generator.pkg[pluginName] || {
    presets: {},
  };
  /**
   * template perset
   */
  const presets = Object.assign({}, pluginConfig.presets, rootOptions, pkgPluginConfig.presets, options, {
    dynamicLoadScript: options.redirected || rootOptions.routerHistoryMode,
  });
  Object.assign(presets, {
    routerHistoryMode: presets.router ? presets.routerHistoryMode : false,
    dynamicLoadScript: presets.redirected || presets.routerHistoryMode,
  });
  debugHandler(undefined, () => {
    console.log('\ntemplate presets: ');
    console.log(presets);
  });
  /**
   * package preset map
   */
  const presetsMap = {
    router: ['dependencies', ['vue-router']],
    vuex: ['dependencies', ['vuex']],
    less: ['devDependencies', ['less', 'less-loader']],
  };
  const askPresets = Object.keys(pluginConfig.presets);
  /**
   * package update
   */
  const json = {
    dependencies: {},
    devDependencies: {},
    [pluginName]: {
      presets: askPresets.reduce((total, item) => {
        total[item] = presets[item];
        return total;
      }, {}),
    },
  };
  // resolve less compatible (require)
  if (presets.less) json.devDependencies.less = pluginConfig.devDependencies.less;
  askPresets.filter(item => presets[item] && presetsMap[item]).forEach(presetName => {
    let [type, depends] = presetsMap[presetName];
    depends = depends.filter(item => pluginConfig[type] && pluginConfig[type][item]);
    for (const depend of depends) {
      if ((!api.generator.pkg[type] || !api.generator.pkg[type][depend]) && pluginConfig[type] && pluginConfig[type][depend]) {
        json[type][depend] = pluginConfig[type][depend];
      }
    }
  });
  debugHandler(() => {
    api.extendPackage(json);
  }, () => {
    console.log('\npackage update, extendPackage: ');
    console.log(json);
  });
  /**
   * package remove
   */
  debugHandler(() => {
    delete api.generator.pkg.eslintConfig;
  }, () => {
    console.log('\npackage remove: ');
    console.log('delete package.json.eslintConfig');
  });
  askPresets.filter(item => !presets[item] && presetsMap[item]).forEach(presetName => {
    let [type, depends] = presetsMap[presetName];
    for (const depend of depends) {
      if (api.generator.pkg[type]) {
        debugHandler(() => {
          delete api.generator.pkg[type][depend];
        }, () => {
          console.log(`delete package.json.${type}.${depend}`);
        });
      }
    }
  });
  /**
   * template perset: render template (filters)
   */
  const filterFiles = utils.readFiles(path.resolve(__dirname, 'template'), { directoryPrefix: 'template' });
  utils.filters(filterFiles, config.template.filters, presets);
  debugHandler(() => {
    api.render(filterFiles, presets, {
      delimiter: '?',
    });
  }, () => {
    console.log('\ntemplate files (filters): ');
    console.log(Object.keys(filterFiles));
  });
  /**
   * destination preset: removes
   */
  api.render((files) => {
    const removeFiles = Object.assign({}, files);
    utils.matchs(removeFiles, config.destination.removes, presets);
    const removeFileNames = Object.keys(removeFiles);
    removeFileNames.filter(item => fs.existsSync(path.resolve(api.generator.context, item)));
    debugHandler(() => {
      removeFileNames.forEach(item => {
        fs.remove(path.resolve(api.generator.context, item), (err, data) => {
          if (err) console.error(err);
        });
      });
    }, () => {
      console.log('\nremove files: ');
      console.log(removeFileNames);
    });
  });
}