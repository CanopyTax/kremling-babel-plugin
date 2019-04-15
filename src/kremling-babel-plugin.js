const postcss = require('postcss/lib/postcss');
const postcssKremlingPlugin = require('kremling-loader/src/postcss-kremling-plugin');
const placeholder = '__KREMLING_PLACEHOLDER__';
const separator = '||KREMLING||';

let index = 0;

module.exports = function({ types: t }) {
  return {
    visitor: {
      TaggedTemplateExpression(path, { opts }) {
        let node = path.node;

        const plugins = opts.postcss || {};
        const namespace = opts.namespace || 'kremling';
        const pluginsInit = (Object.keys(plugins)).map(key => {
          return require(key)(plugins[key]);
        });

        if (node.tag.name === 'k') {
          const strings = node.quasi.quasis;
          const evalString = strings.map((item, i) => {
            return `${item.value.raw}${node.quasi.expressions[i] ? placeholder : ''}`;
          }).join('');

          const css = postcss([...pluginsInit, postcssKremlingPlugin(`k${index}`, namespace)]).process(evalString).css;
          const pieces = css.split(placeholder);
          const kString = `k${index}${separator}${namespace}${separator}`;
          node.quasi.quasis = node.quasi.quasis.map((item, i) => {
            item.value.raw = item.value.cooked = `${i === 0 ? kString : ''}${pieces[i]}`;
            return item;
          });
          index++;
        }
      }
    },
  };
}