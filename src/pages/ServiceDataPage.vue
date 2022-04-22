<script setup>
import CreditPage from './CreditPage.vue'
import Marketization from './Marketization.vue'
import { ref, computed, getCurrentInstance } from 'vue';

let tabFlag = ref(0)
let tabsText = ['市场化服务','信保大数据']
const mainComponents = [Marketization, CreditPage]
const $router  = getCurrentInstance().appContext.config.globalProperties.$router
//计算属性
const currentTabComponent = computed(() => {
  return mainComponents[tabFlag.value]
})
const currTitle = computed(() => {
  return tabsText[tabFlag.value]
})
const doBack = () => {
  $router.push('/')
}
</script>

<template>
  <div class="app-page">
    <div class="app-page-top">
      <div class="app-page-header">
        <span>{{currTitle}}</span>
      </div>
      <div class="tab">
        <div
          v-for="(item,index) in tabsText" 
          :key="index"
          class="tabs-btn" 
          :class="{curr: tabFlag === index}"  
          @click="tabFlag = index">{{item}}</div>
      </div>
      <div class="back hvr-sweep-to-left" @click="doBack">返回首页</div>
    </div>
    <component :is="currentTabComponent"></component>
  </div>
</template>

<style scoped lang="less">
  .app-page {
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(to bottom, #01002e,#001b54);
    color: #fff;
    padding: 0 2rem 2rem 2rem;
  }
  .app-page-top {
    position: relative;
    height: 11rem;
    .back {
      position: absolute;
      right: 0;
      bottom: 0;
      padding: 1rem 2rem;
      font-size: 1.6rem;
      color: #FFF;
      border: 1px solid #009bfe;
      border-radius: 4px;
      cursor: pointer;
    }
    .app-page-header {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: url(../assets/imgs/title_bg.png) no-repeat;
      background-size: 100% 100%;
      >span {
        font-weight: bold;
        font-size: 4.6rem;
        letter-spacing: 3px;
        background-image: linear-gradient( to bottom, #ffffff, #62c7fe );
        color: transparent;
        background-clip: text;
        -webkit-background-clip: text;
      }
    }
      .tab {
        display: flex;
        position: absolute;
        left: 0;
        bottom: 0;
        .tabs-btn {
          font-size: 1.6rem;
          cursor: pointer;
          border: 1px solid #034f7a;
          padding: 1rem 1.5rem;
          color: #034f7a;
          transition: all .3s;
        }
        .tabs-btn:first-child {
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          border-right: none;
        }
        .tabs-btn:last-child {
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          border-left: none;
        }
        .tabs-btn.curr {
          background-color: #009bfe;
          border-color: #009bfe;
          color: #fff;
        }
      }
  }
</style>
