<template>
  <div>
    <v-app>
      <Profile id="profile"></Profile>
      <v-divider />
      <Links id="links"></Links>
      <v-divider />
      <Apps id="apps"></Apps>
      <v-divider />
      <div class="space" />
      <Floating-Menu></Floating-Menu>
    </v-app>
  </div>
</template>

<style scoped>
/** メニューCSS */
.overlay_menu {
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
}
/** スペース */
.space {
  height: 100px;
}
</style>

<script>
import Profile from "~/components/Profile.vue";
import Links from "~/components/Links.vue";
import Apps from "~/components/Apps.vue";
import FloatingMenu from "~/components/FloatingMenu.vue";

export default {
  components: {
    Profile,
    Links,
    Apps,
    FloatingMenu,
  },
  head: () => ({
    title: "トップページ",
  }),
  created() {
    this.$store.commit("setBarTitle", "トップページ");
  },
};
</script>
