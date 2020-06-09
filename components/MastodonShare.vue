<template>
  <div>
    <!-- 共有ボタン -->
    <v-btn color="primary" text v-on:click="sheet=!sheet">
      <v-icon>mdi-share-variant</v-icon>Mastodon / Misskey で共有
    </v-btn>
    <!-- ボトムシート -->
    <v-bottom-sheet v-model="sheet">
      <v-sheet height="200px" class="pa-5 text-center">
        <h3 class="ma-1">Mastodon / Misskey のインスタンス名を入れてね。</h3>
        <v-text-field v-model="instanceInput" label="インスタンス名" outlined></v-text-field>
        <v-row class="mr-2" justify="end">
          <v-btn large color="primary" v-on:click="openShare()">
            <v-icon>mdi-send</v-icon>共有
          </v-btn>
        </v-row>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>
<script>
export default {
  components: {},
  data: () => ({ sheet: false, instanceInput: "" }),
  methods: {
    // Mastodonの共有出す
    openShare: function() {
      window.open(
        `https://${this.instanceInput}/share?text=${document.title}\n${location.href}`,
        "_blank"
      );
      // 保存しとく
      localStorage.setItem("share_instance", this.instanceInput);
    }
  },
  mounted() {
    // DOM生成後
    const instanceName = localStorage.getItem("share_instance");
    if (instanceName !== undefined) {
      this.instanceInput = instanceName;
    }
  }
};
</script>