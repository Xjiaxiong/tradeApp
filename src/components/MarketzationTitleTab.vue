<script setup>
import { ref } from 'vue'

defineProps({
  tabTexts: Array,
})
const emit = defineEmits(['clickTab'])

//const { defaultTabIndex }  = getCurrentInstance().ctx
const tabIndex = ref(0);

const clickTabItem = (index) => {
  tabIndex.value = index;
  emit('clickTab',index)
}
</script>

<template>
  <h1 class="app__h2">
    <span
      v-for="(item, index) in tabTexts"
      :key="index" 
      class="app__h2_text" 
      :class="{curr: tabIndex === index}"
      @click="clickTabItem(index)">{{item}}</span>
    <i class="app__h2_right"></i>
  </h1>
</template>

<style scoped>
.app__h2 {
    height: 4rem;
    background-image: linear-gradient(to right, #143687, #020739);
    border-left: 4px solid #48c9ff;
    display: flex;
    align-items: center;
    padding: 0 1rem;
}
.app__h2 .app__h2_right{
    height: 30px;
    width: 6px;
    background: url(../assets/imgs/tit_poi.png) no-repeat;
    background-size: 100% 100%;
    margin-left: auto;
}
.app__h2 .app__h2_text {
    color: #6677b2;
    font-weight: bold;
    font-size: 1.9rem;
    letter-spacing: 3px;
    margin-right: 1.5rem;
    cursor: pointer;
}
.app__h2 .app__h2_text.curr {
    background-image: linear-gradient( to bottom, #ffffff, #6fe1fd );
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
}
</style>
