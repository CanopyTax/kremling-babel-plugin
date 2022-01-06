# kremling-babel-plugin

[![npm version](https://badge.fury.io/js/kremling-babel-plugin.svg)](https://badge.fury.io/js/kremling-babel-plugin)

A plugin that allows inline kremling css to omit ampersands.

Instead of writing out ampersands in your css:

```js
const css = `
  & .kangaroo {
    color: brown;
  }
`;
```

omit them completely while keeping your css scoped:

```js
const css = k`
  .kangaroo {
    color: brown;
  }
`;
```

The `k` tagged template is required for babel to target the correct css strings.

React example:

```jsx
import React from 'react';
import { useCss, k } from 'kremling';

export function MyComponent() {
  const scope = useCss(css);
  return (
    <div {...scope} className="custom">
      Custom
    </div>
  );
}

const css = k`
  .custom {
    background-color: red;
  }
`;
```

## Plugin Options

### `namespace` (string)

Customize kremling namespace for project. Helpful when working in a micro-frontend stack with many
front-end services.

### `postcssOptions` (object)

Options pass-through for `postcss`. Only synchronous plugins work due to babel's synchronous nature
(eg: `autoprefixer`).

### `sassOptions` (object)

Options pass-through for `sass`. Required prerequisite:
[Sass npm module](https://www.npmjs.com/package/sass).

Note: even if you don't need sass options, you still must pass an object for the sass compiler to run.

## Opt-out of scoping

Opting out of scoping from within your kremling css is a nice little escape
hatch when you need to add some global styles. Just prepend your rules using
the `:global` pseudo class and the plugin will omit scoping and remove that
class:

```js
const css = k`
  :global .test {
    background-color: red;
  }
`;

// css output:
// .test { background-color: red; }
```

## .babelrc Example

```json
{
  "presets": [
    "@babel/preset-env"
  ],
  "plugins": [
    ["module:kremling-babel-plugin", {
      "namespace": "super-custom",
      "sassOptions": {}
    }]
  ]
}
```


### Related projects

- [kremling-loader](https://kremling.js.org/walkthrough/kremling-loader.html)
