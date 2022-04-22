<script setup>
import { ref } from 'vue'
const title = ref('浙江内外贸一体化服务在线')
</script>

<template>
  <div class="title">
    <h1 class="h1">{{ title }}</h1>
  </div>
</template>

<style scoped>
.title {
  height: 9rem;
  width: 100vw;
  background: url(../assets/imgs/web_title_bg.png) no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-content: center;
}
.h1 {
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 3.2rem;
    letter-spacing: 3px;
    background-image: linear-gradient( to bottom, #ffffff, #6fe1fd );
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
}
</style>
