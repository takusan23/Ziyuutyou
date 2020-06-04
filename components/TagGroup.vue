// タグのChipまとめたやつ

<template>
  <tbody>
    <v-chip
      class="ma-1 pa-4"
      color="indigo"
      text-color="white"
      v-for="tag in tags"
      :key="tag"
      :to="`../../posts/tag/${tag}`"
    >
      <v-avatar left>
        <v-icon>mdi-tag-text-outline</v-icon>
      </v-avatar>
      {{tag}}
    </v-chip>
  </tbody>
</template>

<script>
export default {
  props: ["tags"],
  data: () => ({}),
  methods: {}
};
</script>