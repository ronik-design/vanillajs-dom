# vanillajs-dom
A collection of simple DOM utilities for those who prefer a Vanilla JS approach.

# Installation

This is how I use it with a Webpack bundled project. Your set-up may be different.

```sh
$ npm install vanillajs-dom --save-dev
```

```js
import { parents, parent, outerHeight, scrollTop } from "vanillajs-dom";

parents(element, ".selector[data-type=foo]");
parent(element, ".selector[data-type=foo]");
outerHeight(element);
scrollTop();
```
