# vue 项目

本文用于规范 `vue` 项目的搭建与开发中的一些事项

## 创建

项目使用 `vue-cli` 创建

```bash
vue create project # project 为项目名
```

选择 `features`

```bash
? Check the features needed for your project:
>(*) Babel
 ( ) TypeScript
 ( ) Progressive Web App (PWA) Support
 (*) Router # 存在多页面时选择, 使用 hash 模式
 (*) Vuex   # 建议选择, 结合 service 管理接口, app 状态非常清晰
 (*) CSS Pre-processors # 选择 SCSS/SASS 预处理
 (*) Linter / Formatter # 选择 ESLint + Standard config
 ( ) Unit Testing
 ( ) E2E Testing
```

配置文件选择存放在单独文件中, 完成项目创建

```bash
cd project
```

新建 `vue.config.js` 文件

```js
// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
}
```

随后可以重新安装一下 `vue-router` 和 `vuex` 至最新版

```bash
npm i vue-router vuex --save
```

## 项目结构

调整 `src` 的文件结构

```bash
└── src
    ├── assets            # 静态资源
    ├── components
    │   ├── basis         # 基础组件 (不含业务逻辑)
    │   └── business      # 业务组件
    ├── mock              # 虚拟数据
    ├── service           # 后端接口管理
    ├── store             # vuex 状态
    │   ├── mutations.js
    │   └── store.js
    ├── style             # 样式管理
    ├── utils             # 工具函数
    ├── views
    ├── App.vue
    ├── main.js
    └── router.js         # 路由管理
```

## 组件库

基础组件库使用 `view-design`

```bash
# npm
npm i view-design --save
npm i iview-loader --save-dev
```

```js
// vue.config.js
module.exports = {
  chainWebpack (config) {
    config.module
      .rule('vue')
      .use('iview-loader')
      .loader('iview-loader')
      .options({
        prefix: false
      })
  }
}
```

```js
// main.js
import ViewUI from 'view-design'

import 'view-design/dist/styles/iview.css'

Vue.use(ViewUI, {
  transfer: true
})
```

## 代码规则

在根目录下找到 `.eslintrc.js`, 添加相应的继承与规则

```js
{
  extends: [
    'plugin:vue/essential',
    'plugin:vue/strongly-recommended',
    'plugin:vue/recommended',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/eqeqeq': 'always',
    'vue/object-curly-spacing': 'always',
    'vue/require-direct-export': true,
    'vue/no-parsing-error': [
      2,
      {
        'x-invalid-end-tag': false
      }
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 2,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ],
    'vue/match-component-file-name': [
      'error',
      {
        extensions: ['vue'],
        shouldMatchCase: false
      }
    ],
    'vue/space-infix-ops': [
      'error',
      {
        int32Hint: false
      }
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'never'
        },
        svg: 'always',
        math: 'always'
      }
    ]
  }
}
```

在 `vue` 组件中, `template` 的代码应满足一下格式

```vue
<template>
  <!-- 只有一个属性时, 写在标签同一行 -->
  <div class="div"></div>

  <!-- 有两个或以上属性时, 应分行 -->
  <div
    class="div"
    :count="10"
  ></div>

  <!-- 标签的属性应满足一下顺序 -->
  <!-- 指令属性, 静态属性, 绑定属性, 事件属性 -->
  <div
    v-if="show"
    class="div"
    :count="10"
    @click="handleClick"
  ></div>
</template>
```

>如有需要, 可以自行引入 `stylelint` 并配置相关规则

安装 `stylelint` 相关依赖

```bash
npm i -D stylelint
npm i -D stylelint-config-recess-order
npm i -D stylelint-config-standard
npm i -D stylelint-no-unsupported-browser-features
npm i -D stylelint-order
npm i -D stylelint-scss
npm i -D stylelint-webpack-plugin
```

在根目录下创建 `.stylelintrc.js` 文件

```js
// .stylelintrc.js
module.exports = {
  defaultSeverity: 'error',
  extends: [
    'stylelint-config-recess-order',
    'stylelint-config-standard'
  ],
  plugins: [
    'stylelint-no-unsupported-browser-features',
    'stylelint-order',
    'stylelint-scss'
  ],
  rules: {
    'at-rule-no-unknown': null,
    'at-rule-no-vendor-prefix': true,
    'declaration-property-value-blacklist': {
      '/^transition/': ['/all/'],
      '/^background/': ['http:', 'https:'],
      '/^border/': ['none'],
      '/.+/': ['initial']
    },
    'media-feature-name-no-vendor-prefix': true,
    'property-no-vendor-prefix': true,
    'plugin/no-unsupported-browser-features': [
      true,
      {
        severity: 'warning',
        browsers: [
          '> 5%',
          'last 2 firefox versions',
          'last 2 chrome versions',
          'last 2 safari versions',
          'last 2 edge versions'
        ]
      }
    ],
    'scss/at-rule-no-unknown': true,
    'selector-no-vendor-prefix': true,
    'value-no-vendor-prefix': true
  }
}
```

如果需要 `stylelint` 支持更多的 `scss` 特性, 需要调整 `scss/at-rule-no-unknown` 规则

```js
// .stylelintrc.js
module.exports = {
  rules: {
    // 默认只支持 function, while, media, if, else 五个特性
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          // 需要拓展的特性
          'each',
          'include',
          'return'
        ]
      }
    ],
  }
}
```

添加相关 `webpack` 配置

```js
// vue.config.js
const StylelintPlugin = require('stylelint-webpack-plugin')

module.exports = {
  chainWebpack (config) {
    config
      .plugin('stylelint')
      .use(StylelintPlugin)
  }
}
```

添加 `lint` 相关命令

```js
// package.json
{
  "scripts": {
    "lint:style": "stylelint **/*.{vue,scss} --fix"
  }
}
```

## 代码风格

使用 `prettier` 规范代码风格

```bash
npm i -D -E prettier
```

在根目录下添加配置文件

```js
// .prettierrc.js
module.exports = {
  arrowParens: 'avoid',
  bracketSpacing: true,
  endOfLine: 'crlf',
  jsxBracketSameLine: false,
  quoteProps: 'as-needed',
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  useTabs: false,
  vueIndentScriptAndStyle: false
}
```

安装与 `lint` 插件兼容工作的相关依赖

```bash
# eslint 兼容
npm i -D prettier-eslint-cli

# stylelint 兼容
npm i -D stylelint-config-prettier stylelint-prettier
```

修改相关 `lint` 配置文件

```js
// .stylelintrc.js
module.exports = {
  extends: [
    'other extends ...',
    'stylelint-config-prettier'
  ],
  plugins: [
    'stylelint-prettier'
  ],
  rules: {
    'prettier/prettier': true
  }
}
```

安装自动化构建相关依赖

```bash
npm i -D husky lint-staged
```

添加相关配置文件

```js
// .lintstagedrc
{
  "src/**/*.js": [
    "prettier-eslint --write",
    "git add"
  ],
  "src/**/*.scss": [
    "npm run lint:style",
    "prettier --write",
    "git add"
  ],
  "src/**/*.vue": [
    "npm run lint:style",
    "prettier-eslint --write",
    "npm run lint",
    "git add"
  ]
}
```

添加相应的 `npm` 命令

```js
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "scripts": {
    "pretty": "prettier-eslint --write \"src/**/*.{js,vue,scss}\""
  }
}
```

>每次执行 `git commit` 命令时, 会自动进行代码风格检测与修正, 通过则正常提交

## 接口

所有的接口请求应统一存放在 `service` 文件夹下

```js
// service/request.js
import Axios from 'axios'

// 用于在 mock 用获取
export const baseUrl = 'http://....'

Axios.defaults.baseURL = baseUrl

// 跨域
Axios.defaults.withCredentials = true

// 该文件中对 Axios 进行一些统一的封装

export default Axios
```

```js
// service/project.js
import Axios from './request'

export function queryProject ({ project }) {
  return Axios.post(
    'apiUrl',
    {
      project
    }
  )
}
```

```js
// store.js
import { queryProject } from 'service/project'

// 某个 action 中
actions: {
  [types.QUERY_PROJECT] ({ commit }, { project }) {
    queryProject({ project }).then(data => {
      commit(types.SOME_MUTATION, data)
    })
  }
}
```

## 状态

状态建议使用 `vuex` 统一管理, 可以有效避免繁琐的逐层传递和便于追踪 `App` 状态变化

```js
// store.js
import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutations'

Vue.use(Vuex)

const strict = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict,
  state () {
    return {
      project: ''
    }
  },
  getters: {},
  mutations: {
    [types.INIT_PROJECT] () {}
  },
  actions: {
    [types.INIT_PROJECT] () {}
  }
})
```

```js
// mutations.js
export const INIT_PROJECT = 'INIT_PROJECT'
```

```vue
<!-- views/MyPage.vue -->
<template>
  <!-- 顶层元素应赋予一个唯一的ID -->
  <div id="myPage" @click="initProject">
    {{ project }}
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { INIT_PROJECT } from './store/mutations'

export default {
  name: 'MyPage',
  computed: {
    ...mapState([
      'porject'
    ])
  },
  methods: {
    ...mapMutations({
      initProject: INIT_PROJECT
    })
  }
}
</script>
```

>更多高级的使用方法可参考 `vuex` [官方文档](https://vuex.vuejs.org/zh/guide/)

## 样式

`css` 样式使用预处理语言 `scss` 进行开发

在 `style` 目录下, 建议创建 `share.scss`, 专门用于管理通用样式

```scss
// style/share.scss
$global-color: blue;

* {
  box-sizing: border-box;
  margin: 0;
}

html, body {
  height: 100%;
}

body {
  overflow: hidden;
}

// more...
```

```js
// main.js
import './style/share.scss'
```

各个组件的样式, 应在 `style` 目录下统一管理

各个页面 (`view`) 的特殊样式, 应在 `vue` 文件下的 `<style>` 标签下管理

```vue
<!-- views/MyPage.vue -->
<template>
  <div id="myPage">
    <div class="special"></div>
  </div>
</template>

<style lang="scss">
#myPage {
  width: 100%;
  height: 100%;

  .special {
    // some special style
  }
}
</style>
```

如果在 `scss` 中出现较多变量, 应采用统一管理

```scss
// style/variable.scss
$global-text-color: blue;
// more var...
```

```js
// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import '@/style/variable.scss';`
      }
    }
  }
}
```

随后在任意的 `scss` 文件中

```scss
// style/any.scss
.any {
  color: $global-text-color;
}
```

## 虚拟数据

在后端接口未开发好时, 或请求成本较高时, 应使用 `mock` 数据进行开发

```bash
npm i mockjs --save-dev
```

```js
// mock/index.js
import Mockjs from 'mockjs'
import { baseUrl } from '../service/request'

// project.json 存放 mock 数据
import project from './project'

Mockjs.mock(baseUrl + 'queryProject', project)

// 或直接使用 mock 模版生成数据
Mockjs.mock(baseUrl + 'queryProject', {
  // mock 模版
})
```

```js
// main.js
// 在开发环境下引入 mock
if (process.env.NODE_ENV === 'development') {
  require('./mock')
}
```

## 提交

在进行 `commit` 时的描述, 应添加行为描述的前缀 (`type`)

```bash
git commit -m "<type>(<scope>)?: <subject>"
```

```
feat: 增加新特性
fix: 修复了问题或bug
docs: 文档更新
style: 代码格式更新 (未影响现有代码的运行逻辑的改动)
refactor: 重构
test: 测试相关
chore: 构建过程或辅助工具的变动
build: 新版本的构建, 发布等
dev: 未完整功能, 片段功能的开发
```