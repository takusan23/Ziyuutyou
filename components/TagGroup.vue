// タグのChipまとめたやつ

<template>
  <div>
    <v-chip
      class="ma-1"
      small
      color="indigo"
      text-color="white"
      v-for="tag in tags"
      :key="tag"
      :to="`../../posts/tag/${tag}`"
    >{{tag}}</v-chip>
  </div>
</template>

<script>
export default {
  props: ["tags"],
  data: () => ({}),
  methods: {}
};
</script>