const postcss = require('postcss/lib/postcss');
const postcssKremlingPlugin = require('kremling-loader/src/postcss-kremling-plugin');
const placeholder = '__KREMLING_PLACEHOLDER__';
const separator = '||KREMLING||';

let index = 0;

module.exports = function({ types: t }) {
  return {
    visitor: {
      TaggedTemplateExpression(path, { opts: babelOpts }) {
        let node = path.node;

        const {
          postcssOptions,
          sassOptions,
          namespace = 'kremling',
        } = babelOpts;

        if (node.tag.name === 'k') {
          const strings = node.quasi.quasis;
          let evalString = strings.map((item, i) => {
            return `${item.value.raw}${node.quasi.expressions[i] ? placeholder : ''}`;
          }).join('');

          const plugins = postcssOptions?.plugins || {};
          const pluginsInit = (Object.keys(plugins)).map(key => {
            return require(key)(plugins[key]);
          });

          if (sassOptions) {
            const sass = require('sass');
            const { additionalData = '', ...restOfSassOptions } = sassOptions;
            evalString = sass.renderSync({
              data: additionalData + evalString,
              ...restOfSassOptions,
            }).css.toString();
          }
          evalString = postcss([...pluginsInit, postcssKremlingPlugin(`k${index}`, namespace)]).process(evalString).css;

          if (evalString) {
            const pieces = evalString.split(placeholder);
            const kString = `k${index}${separator}${namespace}${separator}`;
            node.quasi.quasis = node.quasi.quasis.map((item, i) => {
              item.value.raw = item.value.cooked = `${i === 0 ? kString : ''}${pieces[i]}`;
              return item;
            });
            index++;
          }
        }
      }
    },
  };
}