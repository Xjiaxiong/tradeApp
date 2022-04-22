<script setup>
import AppHeader from '../components/AppHeader.vue';
import AppMarket from '../components/AppMarket.vue';
import AppCenter from '../components/AppCenter.vue';
import AppGov from '../components/AppGov.vue';
import AppService from '../components/AppService.vue';
import AppCluster from '../components/AppCluster.vue';
</script>

<template>
  <div class="app-bg">
    <AppHeader></AppHeader>
    <div class="app-main">
      <div class="app-main-top">
          <AppMarket />
          <AppCenter />
          <AppGov />
      </div>
      <div class="app-main-bottom">
          <AppService />
          <AppCluster />
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-bg {
  height: 100%;
  overflow: hidden;
  background: #0a0c2e;
}
.app-main {
  height: calc(100vh - 9rem);
  width: 100%;
  padding: 1.6rem 3.2rem;
}
.app-main-bottom,
.app-main-top {
  display: flex;
}
.app-main-bottom {
  padding-top: 2rem;
}
</style>
