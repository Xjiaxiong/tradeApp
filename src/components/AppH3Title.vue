<script setup>
defineProps({
  title: String,
})
</script>

<template>
  <h3 class="app__h3">
    <span class="app__h3_text">{{title}}</span>
  </h3>
</template>

<style scoped>
.app__h3 {
    height: 4rem;
    background: url(../assets/imgs/col_line.png) no-repeat;
    background-size: 100% auto;
    background-position: left bottom;
    display: flex;
    align-items: center;
}
.app__h3 .app__h3_text {
    padding: 0 2rem;
    color: #fff;
    font-weight: bold;
    font-size: 1.8rem;
    letter-spacing: 2px;
}
</style>
