<script setup>
defineProps({
  title: String,
  isClick: Boolean
})
</script>

<template>
  <h1 class="app__h2">
    <i class="app__h2_left"></i>
    <span class="app__h2_text" :class="{'hvr-pop':isClick === true}">{{title}}</span>
    <i class="app__h2_right"></i>
  </h1>
</template>

<style scoped>
.hvr-pop {
  cursor: pointer;
}
.app__h2 {
    height: 4.4rem;
    background: url(../assets/imgs/web_boa_titbg.png) no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.app__h2 .app__h2_left{
    height: 4.4rem;
    width: 4.4rem;
    background: url(../assets/imgs/sig_title_left.png) no-repeat;
    background-size: 100% 100%;
}
.app__h2 .app__h2_right{
    height: 4.4rem;
    width: 4.4rem;
    background: url(../assets/imgs/sig_title.png) no-repeat;
    background-size: 100% 100%;
}
.app__h2 .app__h2_text {
    padding: 0 1rem;
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
