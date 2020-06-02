import colors from 'vuetify/es5/util/colors'

/** 一覧に表示する記事の数。 */
const PAGE_LIMIT = 10;

/** ブログ記事のファイル構成JSON。分割代入だと名前衝突する事に気付くまで時間かかった。マジでJavaScriptむずい */
const postsJSON = require('./contents/posts/summary.json');

/** 固定ページのファイル構成JSON。*/
const pagesJSON = require('./contents/pages/summary.json');

/** 
 * ファイルパスからファイルの名前取り出す
 * @param filepath ファイルのパス contents/posts/markdown/first.md みたいなやつ
 * @param folderName フォルダ名。 posts / posts かな。
 *  */
const sourceFileNameToUrl = (filepath, folderName) => {
  const name = filepath.replace(`contents/${folderName}/markdown/`, '').replace('.md', '')
  return `/${folderName}/${name}`
}

/** 次のページ機能をつける。そうしないと記事一覧にどばーってなってスクロール大変になる */
const generatePagenationRoutesList = () => {
  // 何ページ必要か計算する（10で割ればいいっしょ）
  const calc = Math.floor(postsJSON.sourceFileArray.length / PAGE_LIMIT) - 1
  // ページ分だけ動的ルーティングの配列出す？
  const dynamicRouterPathList = []
  if (calc > 0) {
    // 0 より大きいとき
    for (let i = 1; i <= calc; i++) {
      dynamicRouterPathList.push(`/posts/page/${i}`)
    }
  }
  console.log(dynamicRouterPathList)
  return dynamicRouterPathList
}

/** ブログ記事用の動的ルーティングに使う配列を返す */
const generateDynamicRoutesList = postsJSON.sourceFileArray.map(sourceFileName => {
  return sourceFileNameToUrl(sourceFileName, 'posts');
});

/** 固定ページ用の動的ルーティングに使う配列を返す関数 */
const generatePagesFileDynamicRoutesList = pagesJSON.sourceFileArray.map(sourceFileName => {
  return sourceFileNameToUrl(sourceFileName, 'pages');
});

/** 静的サイトジェネレート関数。配列(pages/とposts/)くっつける */
const generateRoutes = callback => {
  callback(null, [generatePagesFileDynamicRoutesList, generateDynamicRoutesList, generatePagenationRoutesList()].flat())
}

export default {
  mode: 'spa',
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
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/styles.css',
    '~/assets/css/vs2015.css'
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
          primary: '#8c9eff',
          accent: '#c0cfff',
          secondary: '#5870cb',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: '#8c9eff',
          accent: '#c0cfff',
          secondary: '#5870cb'
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
    routes: generateRoutes, // 生成する
    dir: 'docs'
  },
  /** 
   * PWA manifest.json
   */
  manifest: {
    name: 'たくさんの自由帳',
    title: 'たくさんの自由帳',
    'og:title': '遅れます.me',
    lang: 'ja',
    theme_color: '#8c9eff',
    background_color: '#5870cb',
    display: 'standalone',
  },
  /**
   * GitHub Pagesに対応させる
   */
  router: {
    base: '/Ziyuutyou/'
  }
}
