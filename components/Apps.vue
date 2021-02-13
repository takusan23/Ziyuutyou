つくったものなど

<template>
  <div align="center" class="apps">
    <h1 class="apps_title">つくったもの</h1>

    <div class="apps_flex">
      <!-- 作ったもの メニュー -->
      <v-list dense color="transparent" nav min-width="100px">
        <v-list-item-group v-model="menuListSelectPos">
          <v-list-item
            link
            v-for="nav in navList"
            v-bind:key="nav.title"
            v-on:click="setAppList(nav.title)"
          >
            <v-list-item-icon>
              <v-icon>{{ nav.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ nav.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <!-- 作ったもの 中身を表示する部分 -->
      <v-main>
        <v-container fluid>
          <!-- 作ったもの-->
          <v-card
            class="ma-2 pa-2"
            v-for="app in makeAppList"
            v-bind:key="app.title"
            outlined
          >
            <v-card-title>{{ app.title }}</v-card-title>
            <v-card-text> {{ app.description }} </v-card-text>
            <v-card-actions>
              <v-row justify="end">
                <v-btn
                  text
                  class="ma-1 pa-1"
                  rel="noreferrer"
                  target="_blank"
                  :href="app.link"
                  >リンク</v-btn
                >
                <v-btn
                  text
                  class="ma-1 pa-1"
                  rel="noreferrer"
                  target="_blank"
                  :href="app.source_code"
                  >ソースコード</v-btn
                >
              </v-row>
            </v-card-actions>
          </v-card>
        </v-container>
      </v-main>
    </div>
  </div>
</template>

<style scoped>
.apps {
  padding: 20px;
}
.apps_title {
  padding: 5px;
}
.apps_flex {
  display: flex;
}
.apps_list {
  display: none;
}
</style>

<script>
// 作ったもの。JSONから読み出す
import appsJSON from "~/assets/json/apps.json";

// TypeScriptにしたい

export default {
  data: () => ({
    navList: [
      {
        title: "Android",
        icon: "mdi-android",
      },
      {
        title: "Web",
        icon: "mdi-web",
      },
      {
        title: "AkashicEngine",
        icon: "mdi-gamepad-square-outline",
      },
      {
        title: "Minecraft",
        icon: "mdi-minecraft",
      },
    ],
    /** 作ったもの　Android編。JSONから読みあ出す */
    androidList: appsJSON["android"],
    /** 作ったもの　Webサイト編 */
    webList: appsJSON["web"],
    akashicEngineList: appsJSON["akashic_engine"],
    minecraftModList: appsJSON["minecraft"],
    /** 作ったものに表示する配列 */
    makeAppList: [],
    /** メニュー現在選択中の位置 */
    menuListSelectPos: 0,
  }),
  methods: {
    /**
     * 作ったもの の表示を切り替える
     * - Android
     * - Web
     * - AkashicEngine
     * - Minecraft
     * が引数に入れられます
     */
    setAppList(name) {
      this.makeAppList = [];
      switch (name) {
        case "Android":
          this.makeAppList = this.androidList;
          break;
        case "Web":
          this.makeAppList = this.webList;
          break;
        case "AkashicEngine":
          this.makeAppList = this.akashicEngineList;
          break;
        case "Minecraft":
          this.makeAppList = this.minecraftModList;
          break;
      }
    },
  },
  mounted() {},
  created() {
    // 描画してたら呼ばれる
    this.setAppList("Android");
  },
};
</script>