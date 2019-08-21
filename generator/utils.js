const path = require('path');
const slash = require('slash');
const globby = require('globby');
const match = require('minimatch');

const utils = module.exports = {
  normalizeFilePaths(files) {
    Object.keys(files).forEach(file => {
      const normalized = slash(file);
      if (file !== normalized) {
        files[normalized] = files[file];
        delete files[file];
      }
    });
    return files;
  },
  readFiles(context, options = {
    directoryPrefix: '',
  }) {
    const files = globby.sync(['**'], {
      cwd: context,
      onlyFiles: true,
      gitignore: true,
      ignore: ['**/node_modules/**', '**/.git/**', '**/.DS_Store/**'].concat(options.ignore || []),
      dot: true
    });
    const res = {};
    for (const file of files) {
      res[file] = `${options.directoryPrefix}/${file}`;
    }
    return utils.normalizeFilePaths(res);
  },
  /**
   * Evaluate an expression in meta.json in the context of
   * prompt answers data.
   */
  evaluate(exp, data) {
    /* eslint-disable no-new-func */
    const fn = new Function('data', 'with (data) { return ' + exp + '}');
    try {
      return fn(data);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Error when evaluating filter condition: ' + exp);
    }
  },
  filters(files, filters, data) {
    if (!filters) {
      return false;
    }
    const fileNames = Object.keys(files);
    Object.keys(filters).forEach(glob => {
      fileNames.forEach(file => {
        if (match(file, glob, { dot: true })) {
          const condition = filters[glob];
          if (!utils.evaluate(condition, data)) {
            delete files[file];
          }
        }
      });
    });
  },
  matchs(files, matchs, data, isEval = true) {
    if (!matchs) {
      return false;
    }
    const fileNames = Object.keys(files);
    const matchMap = {};
    Object.keys(matchs).forEach(glob => {
      fileNames.forEach(file => {
        if (match(file, glob, { dot: true })) {
          const condition = matchs[glob];
          if (isEval && utils.evaluate(condition, data)) {
            matchMap[file] = true;
          } else if (!isEval && condition) {
            matchMap[file] = true;
          }
        }
      });
    });
    fileNames.forEach(file => {
      if (!matchMap[file]) {
        delete files[file];
      }
    });
  },
};