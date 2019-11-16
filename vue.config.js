const StylelintPlugin = require('stylelint-webpack-plugin')
const styleVariable = require('./src/style/variable')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  chainWebpack (config) {
    config.module
      .rule('vue')
      .use('iview-loader')
      .loader('iview-loader')
      .options({
        prefix: false
      })

    config
      .plugin('stylelint')
      .use(StylelintPlugin)
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: Object.keys(styleVariable)
          .map(key => {
            return `$${key}: ${styleVariable[key]};`
          })
          .join('\n')
      }
    }
  },
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ]
}
