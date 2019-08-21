const pluginPkg = require('./package.json');

module.exports = (pkg) => {
  const pluginConfig = pkg[pluginPkg.name] || {
    presets: {},
  };
  return [
    {
      name: 'router',
      type: 'confirm',
      message: 'Use Router?',
      default: pluginConfig.presets.router || false,
    },
    {
      when: answer => answer.router,
      name: 'routerHistoryMode',
      type: 'confirm',
      message: 'Use Router History Mode?',
      default: pluginConfig.presets.routerHistoryMode || false,
    },
    {
      name: 'less',
      type: 'confirm',
      message: 'Use Less?',
      default: pluginConfig.presets.less || false,
    },
    {
      name: 'vuex',
      type: 'confirm',
      message: 'Use Vuex?',
      default: pluginConfig.presets.vuex || false,
    },
    {
      name: 'redirected',
      type: 'confirm',
      message: 'Will be redirected?',
      default: pluginConfig.presets.redirected || false,
    },
    {
      name: 'source',
      type: 'confirm',
      message: 'output to source repository?',
      default: pluginConfig.presets.source || false,
    },
  ];
};
