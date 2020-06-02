<template>
  <v-app>
    <FirstCard></FirstCard>
    <ProfileCard></ProfileCard>
  </v-app>
</template>

<script>
import FirstCard from "~/components/FirstCard.vue";
import ProfileCard from "~/components/ProfileCard.vue";

export default {
  components: {
    FirstCard,
    ProfileCard
  }
};
</script>
