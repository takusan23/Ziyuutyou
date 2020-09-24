import colors from 'vuetify/es5/util/colors'

export default {
  // 静的サイト書き出し。universalとstatic入れてね
  mode: 'universal',
  target: 'static',
  /*
  ** Headers of the page
  */
  head: {
    // titleTemplate: '%s - ' + process.env.npm_package_name,
    titleTemplate: '%s - ' + 'たくさんの自由帳',
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/styles.css'
    // '~/assets/css/vs2015.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~plugins/ganalytics.js', mode: 'client' }],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/markdownit',
    '@nuxt/content'
  ],
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.indigo,
          accent: colors.indigo.accent1,
          secondary: colors.indigo.lighten1,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: colors.indigo,
          accent: colors.indigo.accent1,
          secondary: colors.indigo.lighten1
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },
  /**
   * 書いたMarkdownのファイルをHTMLに書き出す（せいてきサイトジェネレート機能）
   */
  generate: {
    // routes: generateRoutes, // 生成する
    dir: 'docs'
  },
  /** 
   * PWA manifest.json
   */
  manifest: {
    name: 'たくさんの自由帳',
    title: 'たくさんの自由帳',
    short_name: 'たくさんの自由帳',
    'og:title': 'たくさんの自由帳',
    lang: 'ja',
    theme_color: '#5870cb',
    background_color: '#5870cb',
    display: 'standalone',
    shortcuts: [
      {
        name: "記事一覧",
        short_name: "記事一覧",
        description: "記事一覧を開きます",
        url: "/posts/page/1/"
      }
    ]
  },
  server: {
    host: '0.0.0.0' // デフォルト: localhost
  },
  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-vsc-dark-plus.css'
      }
    },
    fullTextSearchFields: ['title']
  }
}
