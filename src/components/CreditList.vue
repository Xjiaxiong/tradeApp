<script setup>
defineProps({
  listData: Array,
  clickRow: Function
})
import { ref } from 'vue'
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
const getNodeClassStr = nodeState => {
  const calssMap = {
    '3': 'down',
    '2': 'applying',
    '1': 'waiting'
  }
  let str = calssMap[nodeState]
  return {
    [str] : true
  }
}
</script>

<template>
  <div class="credit-list">
    <div class="list__head flex-row">
      <span class="f-col-2">投保类型</span>
      <span class="f-col-3">企业名称</span>
      <span class="f-col-2">所属乡镇</span>
      <span class="f-col-2">当前节点</span>
      <span class="f-col-3">投保申请时间</span>
    </div>
    <div @click="clickRow($event)">
      <vue3-seamless-scroll
        class="list_body_wrap"
        :hover="true"
        :step="0.3"
        :list="listData">
        <ul>
          <li 
            v-for="(item, index) in listData" 
            :key="index"
            :class="{outting: item.type === '外贸'}"
            :data-uuid="item.uuid">
            <span class="f-col-2" :class="{yellow: item.type === '外贸'}">{{item.type}}</span>
            <span class="f-col-3 click-name" :data-uuid="item.uuid" >{{item.name}}</span>
            <span class="f-col-2 area">{{item.area}}</span>
            <span class="f-col-2" :class="getNodeClassStr(item.state)">{{item.currnode}}</span>
            <span class="f-col-3">{{item.time}}</span>
          </li>
        </ul>
      </vue3-seamless-scroll> 
    </div>
  </div>
</template>

<style scoped lang="less">
  .credit-list {
    padding: 1rem;
    .list__head {
      >span {
        color: #83bbeb;
      }
      margin-bottom: 1rem;
    }
    .list_body_wrap {
      height: 32rem;
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
