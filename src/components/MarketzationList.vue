<script setup>
import { ref,onMounted } from 'vue'
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
const listData= ref([
  {
    type: '内贸',
    name: '玉环卡布里尔刀具科技有限公司',
    eventType: '融资',
    numbers: '536'
  },
  // {
  //   type: '外贸',
  //   name: '沃茨水暖技术（台州）有限公司',
  //   eventType: '理赔',
  //   numbers: '5'
  // },
  {
    type: '外贸',
    name: '浙江曼尔达水控有限公司',
    eventType: '融资',
    numbers: '498'
  },
  // {
  //   type: '外贸',
  //   name: '台州福良野进出口有限公司',
  //   eventType: '理赔',
  //   numbers: '15'
  // },
  {
    type: '内贸',
    name: '玉环卡布里尔刀具科技有限公司',
    eventType: '融资',
    numbers: '536'
  },
  // {
  //   type: '外贸',
  //   name: '沃茨水暖技术（台州）有限公司',
  //   eventType: '理赔',
  //   numbers: '5'
  // },
  {
    type: '外贸',
    name: '浙江曼尔达水控有限公司',
    eventType: '融资',
    numbers: '498'
  },
  {
    type: '外贸',
    name: '浙江曼尔达水控有限公司',
    eventType: '融资',
    numbers: '498'
  },
  {
    type: '外贸',
    name: '浙江曼尔达水控有限公司',
    eventType: '融资',
    numbers: '498'
  },
  {
    type: '外贸',
    name: '浙江曼尔达水控有限公司',
    eventType: '融资',
    numbers: '498'
  },
  // {
  //   type: '外贸',
  //   name: '台州福良野进出口有限公司',
  //   eventType: '理赔',
  //   numbers: '15'
  // }
])
</script>

<template>
  <div class="market-list">
    <div class="list__head flex-row">
      <span class="f-col-2">企业类型</span>
      <span class="f-col-5">企业名称</span>
      <span class="f-col-2">类型</span>
      <span class="f-col-3">金额（万）</span>
    </div>
    <vue3-seamless-scroll
      class="list_body"
      :hover="true"
      :step="0.3"
      :list="listData">
      <ul>
        <li 
          v-for="(item, index) in listData" 
          :key="index">
          <span class="f-col-2">{{item.type}}</span>
          <span class="f-col-5">{{item.name}}</span>
          <span class="f-col-2">{{item.eventType}}</span>
          <span class="f-col-3">{{item.numbers}}</span>
        </li>
      </ul>
    </vue3-seamless-scroll> 
  </div>
</template>

<style scoped lang="less">
  .market-list {
    padding: 1rem;
    .list__head {
      background: #00337f;
      >span {
        color: #6790c8;
      }
      margin-bottom: 1rem;
    }
    .list_body {
      position: relative;
      height: 16rem;
      overflow: hidden;
      li {
        display: flex;
        background: #031b53;
        margin-bottom: 1rem;
        cursor: pointer;
      }
      li.outting {
        background: #182546;
      }
      
    }
    span {
      height: 4rem;
      line-height: 4rem;
      text-align: center;
      font-size: 1.6rem;
      color: #fff;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    span.area {
      color: #9ba9d2;
    }
    span.down {
      color: #71b138 ;
    }
    span.applying {
      color: #e66d51;
    }
    span.waiting {
      color: #24e3ff;
    }
    span.yellow {
      color: #ffc843;
    }
    span.click-name:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
</style>
