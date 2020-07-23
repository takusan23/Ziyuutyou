<template>
  <v-app>
    <FirstCard></FirstCard>
    <ProfileCard></ProfileCard>
    <LinkCard></LinkCard>
  </v-app>
</template>

<script>
import FirstCard from "~/components/FirstCard.vue";
import ProfileCard from "~/components/ProfileCard.vue";
import LinkCard from "~/components/LinkCard.vue";

export default {
  components: {
    FirstCard,
    ProfileCard,
    LinkCard,
  },
  head() {
    return {
      //
    };
  },
  created() {
    this.$store.commit("setBarTitle", "トップページ");
  },
};
</script>
