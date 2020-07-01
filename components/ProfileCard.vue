// わたし

<template>
  <v-card class="ma-2 pa-2" elevation="10">
    <v-card-title class="headline">私について</v-card-title>
    <v-card-text>
      <p>{{text}}</p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  components: {},
  data: () => ({
    text:
      "KotlinでAndroidアプリを作っていたりする。ボカロが好き。そのうち真面目に書くと思う。"
  })
};
</script>