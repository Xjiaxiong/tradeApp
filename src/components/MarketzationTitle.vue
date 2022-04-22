<script setup>
defineProps({
  title: String
})
</script>

<template>
  <h1 class="app__h2">
    <span class="app__h2_text">{{title}}</span>
    <i class="app__h2_right"></i>
  </h1>
</template>

<style scoped>
.app__h2 {
    height: 4rem;
    background-image: linear-gradient(to right, #143687, #020739);
    border-left: 4px solid #48c9ff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
}
.app__h2 .app__h2_right{
    height: 30px;
    width: 6px;
    background: url(../assets/imgs/tit_poi.png) no-repeat;
    background-size: 100% 100%;
}
.app__h2 .app__h2_text {
    color: #fff;
    font-weight: bold;
    font-size: 1.9rem;
    letter-spacing: 3px;
    background-image: linear-gradient( to bottom, #ffffff, #6fe1fd );
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
}
</style>
