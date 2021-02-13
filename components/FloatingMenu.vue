// フローティングメニュー

<template>
  <div class="overlay_menu">
    <v-btn text href="#profile">Profile</v-btn>
    <v-btn text href="#links">Link</v-btn>
    <v-btn text href="#apps">Apps</v-btn>
  </div>
</template>

<style scoped>
/*
 メニューCSS 
 https://glassmorphism.com/
*/
.overlay_menu {
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
}

/** スペース */
.space {
  height: 100px;
}
</style>
