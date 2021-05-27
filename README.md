# Vue Static Site

A simple static site generator powered by Vuejs & http ajax.

> Since this generator is served by ajax, make sure you run a static server to serve your folder.

[See DEMO](https://johnnywang1994.herokuapp.com/)


## Usage

### Dependencies

Make sure you import the dependencies as following:

  - `vue@3.x`
  - `vue-router@4.x`
  - `vuex@4.x`
  - `axios`
  - `highlightjs@10.x`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vue Static Site</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.7.2/build/styles/monokai-sublime.min.css">
  <script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.7.2/build/highlight.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vue@3.0.11/dist/vue.global.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vue-router@4.0.8/dist/vue-router.global.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vuex@4.0.0/dist/vuex.global.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js"></script>
  <!-- import vue-static-site css -->
  <link rel="stylesheet" href="https://johnnywang1994.github.io/cdn/vue-static-site.min.css">
</head>
<body>
  <div id="app">Loading...</div>

  <!-- import vue-static-site js -->
  <script src="https://johnnywang1994.github.io/cdn/vue-static-site.min.js"></script>
  <script>
    initSite(); // init site
  </script>
</body>
</html>
```

and if you want to use `scss` in custom vue sfc file, add following:

```html
<script src="https://cdn.jsdelivr.net/npm/sass.js@0.11.1/dist/sass.sync.min.js"></script>
```



### settings.js

and just create `settings.js` in your folder root as following:

> remember to expose settings config to `window.__md_settings__`

#### Demo
```js
(function(global) {

  const settings = {
    // ...
  };

  // expose to window
  // __md_settings__ is a fixed key name
  global.__md_settings__ = settings;

})(window);
```

`vue-static-site` will find the `settings` in folder root and auto import by cdn in document head.

#### sitename
- type: `string`  
global sitename used in `navbar` and `home page` title.


#### homeConfig
- type: `object`  
configs used in `home page`, if not exist, default home page will be removed.

1. homeImage
- type: `string`  
main banner url in home page

2. description
- type: `string`  
main description in home page

3. actions
- type: `array`  
buttons in home page
  - **content**  
  type: `string`  
  button text
  - **href**  
  type: `string`  
  button link

4. features
- type: `array`  
features in home page
  - **title**  
  type: `string`  
  title of feature
  - **content**  
  type: `string`  
  content of feature
  - **list**  
  type: `array[string | { content, href }]`  
  list of feature content

5. footer
- type: `string`
footer text in home page

```js
const settings = {
  homeConfig: {
    homeImage: '/assets/me.jpg',
    description: 'Welcome! Vuejs Powered SPA Site',
    // action buttons in home page
    actions: [
      {
        content: 'Enter →',
        href: '/book',
      },
    ],
    // features
    features: [
      {
        title: 'Good',
        content: 'Good look',
      },
      {
        title: 'Nice',
        list: [
          'Nice one',
          {
            content: 'Nice two',
            href: 'https://www.google.com',
          },
        ],
      },
    ],
    // footer
    footer: 'Copyright by Johnnywang',
  },
}
```


#### bookConfig
- type: `object`    
configs used in book route, you can define the default `index` markdown file name

1. index
- type: `string`
index filename in folder

```js
const settings = {
  bookConfig: {
    index: 'README.md',
  },
};
```


#### bookRoutes
- type: `array[route object]`   
configs for book routes, you can define multiple routes to create lots of book.

1. name
- type: `string`  
route name used in navbar

2. path
- type: `string`  
path used in vue-router

3. source
- type: `string`  
folder path for markdown files

```js
const settings = {
  bookRoutes: [
    {
      name: 'Book-1',
      path: '/book-1',
      source: '/docs/book-1',
    },
    {
      name: 'Book-2',
      path: '/book-2',
      source: '/docs/book-2',
    },
  ],
};
```

above will serve folder `/docs/book-1` to vue-router `/book-1`, and `/docs/book-2` to `book-2`, you will see two links added in navbar.


#### customRoutes
- type: `array[route object]` 
configs for custom route, you can use vue sfc file.

1. name
- type: `string`  
route name used in navbar

2. path
- type: `string`  
path used in vue-router

3. component
- type: `string`  
path of vue single file component, global component `navbar` & `sidebar` is inject to your component, you can easily put them into your template.

> the component only compiled their first `template`, `script`, `style` block.

4. layout
- type: `string`  
layout to use for custom route, if not defined, will use the component as route

```js
const settings = {
  customRoutes: [
    {
      name: 'Project',
      path: '/project',
      component: '/docs/custom/Project.vue',
    },
  ],
};
```

> using custom route will not auto import `navbar` & `sidebar` by default, you will need to add it manually

```html
<template>
  <navbar />
  <sidebar />
  <div class="my-custom-block">
    <h1>Hello Custom</h1>
  </div>
</template>

<script>
export default {
  name: 'CustomBlock'
}
</script>
```


#### layout
- type: `object`  
define layouts

`key` is the registered layout name  
`value` is the path to layout file

```js
const settings = {
  layout: {
    Default: '/docs/layout/DefaultLayout.vue',
  },
};
```


#### cache
service-worker file path for handling your static site:
```js
const settings = {
  cache: '/service-worker.js',
};
```

here's a default service-worker made with Google WorkBox:

this will auto cache your CDN dependencies and local .md, .vue files for 7 days.

```js
// service-worker.js
importScripts('https://johnnywang1994.github.io/cdn/vue-static-site.sw.js');
```



### Layout feature

1. Create layout component  
you can use layout to reuse the UI, example for a `DefaultLayout`:
```html
<template>
  <navbar />
  <sidebar />
  <router-view />
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>
```

2. Register layout
```js
const settings = {
  layout: {
    Default: '/docs/layout/DefaultLayout.vue',
  },
};
```

3. Use in CustomRoute
```js
const settings = {
  customRoutes: [
    {
      name: 'Project',
      path: '/project',
      layout: 'Default',
      component: '/docs/custom/Project.vue',
    },
  ],
};
```

this way, the component will be wrapped by specific layout component.


### Vue SFC component
you can use the basic SFC in markdown as following:

```html
<template>
  <div class="counter">
    <span @click="count -= 1">-</span>
    <b>{{ count }}</b>
    <span @click="count += 1">+</span>
  </div>
</template>

<script>
const { ref } = Vue;

export default {
  name: 'Counter',
  setup() {
    const count = ref(0);
    return { count };
  },
}
</script>

<style lang="scss">
.counter {
  b {
    display: inline-block;
    width: 50px;
    text-align: center;
  }
  > span {
    font-size: 20px;
    padding: 1px 3px;
    margin: 0 8px;
    border: 1px solid;
    cursor: pointer;
  }
}
</style>
```

And the component will be shared in the same markdown file(same route)

```vue
<template>
  <counter />
</template>
```



## Compatibility

Since `vue-static-site` needs to get the file names in your server when requesting folder, so websites like `Github Pages` will not work.

Here's an example of using express to serve filefolder:

```js
const path = require('path')
const express = require('express');
const history = require('connect-history-api-fallback');
const serveIndex = require('serve-index');
const app = express();

const publicPath = path.resolve(__dirname, '../public');

app.use(history());
app.use(express.static(publicPath));
app.use(serveIndex(publicPath));

app.listen(8080, function(){
  console.log('Listening on port: 8080');
});
```
