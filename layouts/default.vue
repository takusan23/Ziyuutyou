<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <!-- Drawerのヘッダー部分 -->
      <template v-slot:prepend>
        <v-list-item two-line>
          <!-- アイコン -->
          <v-list-item-avatar>
            <img src="@/static/icon.png" />
          </v-list-item-avatar>
          <!-- 自由帳 の部分 -->
          <v-list-item-content>
            <v-list-item-title>{{ drawerTitle }}</v-list-item-title>
            <v-list-item-subtitle>
              <v-icon color="indigo">mdi-book</v-icon>
              <a href="https://takusan23.github.io/Bibouroku/" target="_blank"
                >前のブログ</a
              >
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <!-- ダークモードスイッチ -->
      <v-switch
        class="text-center ma-2"
        :append-icon="`${
          $vuetify.theme.dark ? 'mdi-weather-night' : 'mdi-weather-sunny'
        }`"
        v-model="$vuetify.theme.dark"
        label="テーマ切り替え"
      ></v-switch>
      <!-- 区切り線 -->
      <v-divider></v-divider>
      <!-- メニュー -->
      <v-list nav>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- AppBar -->
    <v-app-bar
      :clipped-left="clipped"
      color="secondary"
      extended
      style="position: relative"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <!-- タイトル -->
      <v-toolbar-title
        v-show="!drawer"
        id="title"
        v-text="this.$store.state.barTitle"
      />
      <v-spacer />
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer :fixed="fixed" app>
      <span>takusan_23 &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-home-outline",
          title: "トップページ",
          to: "/",
        },
        {
          icon: "mdi-book-edit-outline",
          title: "記事一覧",
          to: "/posts/page/1/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "About",
          to: "/pages/about/",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
      drawerTitle: "たくさんの自由帳",
      searchText: "",
      resultBlogItems: [],
    };
  },
  created() {
    //
  },
  mounted() {
    // 端末がダークモードになっているか
    // https://stackoverflow.com/questions/56393880/how-do-i-detect-dark-mode-using-javascript

    // 起動時判断
    // Vuetify切り替える
    this.$vuetify.theme.dark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // リアルタイム監視。Androidだと動かなかった
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        const isDeviceDarkModeEnabled = e.matches;
        // Vuetify切り替える
        this.$vuetify.theme.dark = isDeviceDarkModeEnabled;
      });
  },
  watch: {},
};
</script>
