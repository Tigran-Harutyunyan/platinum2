module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'i18n-noroutedemo',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js project'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#3B8070'
  },
  /*
   ** Build configuration
   */
  modules: [
    ['cookie-universal-nuxt', {
      alias: 'cookiz'
    }],

  ],

  build: {
    /*
     ** Run ESLint on save
     */
    vendor: ['vue-i18n', 'vueisotope', 'lodash.debounce', 'scrollmagic', 'jquery'],
    extend(config, {
      isDev,
      isClient
    }) {
      config.resolve.alias['vue'] = 'vue/dist/vue.common'; // ? 
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  router: {
    middleware: 'i18n',
    // mode: 'hash'
  },
  plugins: [
    '~/plugins/i18n.js',
    '~/plugins/main.js',
    {
      src: '~/plugins/scrollmagic.js',
      ssr: false
    },
    {
      src: '~plugins/vue_isotope.js',
      ssr: false
    },
    {
      src: '~/plugins/slick.js',
      ssr: false
    },

  ],
  script: [

  ],
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/sass/styles.scss'
  ],
}
