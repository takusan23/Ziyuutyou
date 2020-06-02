<template>
  <v-app>
    <v-card>
      <v-card-title class="headline">備忘録をNuxt（読み方わからん）で作ってみる。Vueわからんけど</v-card-title>
      <v-card-text>
        <p>字うっすwww</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" nuxt to="pages/about">進捗</v-btn>
        <v-btn color="primary" nuxt to="/posts">記事一覧</v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script>
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";

export default {
  components: {
    Logo,
    VuetifyLogo
  }
};
</script>
