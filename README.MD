# kremling-babel-plugin

A plugin that allows inline kremling css to omit ampersands.

Before:

```js
import {k, useCss} from 'kremling'

function SomeComponent() {
  return <div {...useCss(css)} />
}

const css = `
  & .kangaroo {
    color: brown;
  }
`
```

With the `kremling-babel-plugin`, the CSS from above can become:

```js
const css = k`
  .kangaroo {
    color: brown;
  }
`
```

Without the [kremling-loader](https://kremling.js.org/walkthrough/kremling-loader.html) or the `kremling-babel-plugin`, all the `k` does is provide syntax highlighting and intellisense (depending on your IDE)

[kremling-loader](https://kremling.js.org/walkthrough/kremling-loader.html) allows you to write .css files and import them without using ampersands

`kremling-babel-plugin` does the same thing, except as template literals using the `k` tag (inline js)