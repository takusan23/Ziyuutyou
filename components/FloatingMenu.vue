// フローティングメニュー

<template>
  <div class="overlay_menu">
    <v-btn text href="#profile">Profile</v-btn>
    <v-btn text href="#links">Link</v-btn>
    <v-btn text href="#apps">Apps</v-btn>
  </div>
</template>

<style scoped>
/* ライトテーマ */
@media (prefers-color-scheme: light) {
  --background-color: rgba(255, 255, 255, 0.8);
}

/* ダークモード */
@media (prefers-color-scheme: dark) {
  --background-color: rgba(0, 0, 0, 0.8);
}
/*
 メニューCSS 
 https://glassmorphism.com/
*/
.overlay_menu {
  position: fixed;
  bottom: 50px;
  white-space: nowrap;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  background-color: var(--background-color);
}

/** スペース */
.space {
  height: 100px;
}
</style>
