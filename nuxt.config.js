module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '嗨范儿社区',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=0'},
      {name: 'apple-mobile-web-app-capable', content: 'yes'},
      {name: 'format-detection', content: 'telephone=no'},
      {name: 'wap-font-scale', content: 'no'},
      {hid: 'description', name: 'description', content: '嗨范儿社区'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: {color: '#3B8070'},
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, {isDev, isClient}) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: ['better-scroll']
  },
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    proxy: true
  },
  proxy: {
    '/api/': { target: 'https://api.hfc.highfaner.com', pathRewrite: {'^/api/': ''} }
  }
}

