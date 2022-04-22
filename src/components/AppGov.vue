<script setup>
import { ref, inject, onMounted, computed } from 'vue'
import AppTitle from './AppTitle.vue';
import AppH3TitleVue from './AppH3Title.vue';
import { trade_GovRequest } from '../utils/http'
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
import { unwarp, getNumber } from '../utils/kits'
import CountToLoopVue from './CountToLoop.vue';
const echarts = inject('ec');
let govData = ref(null)
let listData = ref([]);
let _myChart = ref(null);

const getLineChart = (data) => {
  if(!_myChart.value) { 
    _myChart.value = echarts.init(document.getElementById("bar-chart"),'dark')
  } else {
    _myChart.value.clear();
    _myChart.value.showLoading('default',{
        text: '加载中...',
        color: '#23b2f7',
        textColor: '#fff',
        maskColor: 'rgba(0, 0, 0, 0.5)',
      });
  }

  //图表数据解析
  let xTimeData = [];
  let legends = [];
  const series = data.map((item,index) => {
    legends.push(item.name)
    if(index === 0) {
      item.data.map(first => {
        xTimeData.push(first.month)
      })
    }
    let values = [];
    item.data.map(serie => {
        let value = serie.value.replace(/,/g,'');
        values.push(parseInt(value))
    })
    return {
      name: item.name,
      type: 'bar',
      data: values
    }
  })

  let option = {
      backgroundColor: 'transparent',
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      legend: {
        top: 10,
        left: 'left',
        data: legends
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        extraCssText: 'color:#B9B8CE;border: 1px solid #1691dd;background:#12113d;text-align:left;',
      },
      xAxis: {
        data: xTimeData,
        axisLine: {
          lineStyle: {
            color: '#105188'
          }
        }
      },
      yAxis: {},
      series: series,
   }
  document.getElementById('bar-chart').setAttribute('_echarts_instance_', '')
  unwarp(_myChart.value).setOption(option);
  //tools.loopShowTooltip(unwarp(_myChart.value), option, {loopSeries: true});

}
const getGovData = async () => {
    let res = await trade_GovRequest()
    const data = res.data.data;
    govData.value = data;
    listData.value = data.list;
    getLineChart(data.jsonArray) 
}
onMounted(() => {
    getGovData()
})

const viewPage = () => {
  location.href = 'http://111.0.89.21:3001/dist/#/home'
}
</script>

<template>
  <div class="sider-border page-panel">
    <AppTitle title="政府服务" :isClick="true" @click="viewPage"/>
    <div class="page-main">
      <AppH3TitleVue title="资金兑现" />
      <div class="money-panel">
        <div class="item">
          <div class="count">
            <CountToLoopVue :endVal="getNumber(govData?.value1)" />
          </div>
          <div class="label">申请企业家数(家)</div>
        </div>
        <div class="item">
          <div class="count color__blue">
            <CountToLoopVue :endVal="getNumber(govData?.value2)" :decimals="2"/>
            </div>
          <div class="label">企业申请金额(万元)</div>
        </div>
        <div class="item">
          <div class="count color__yellow">
            <CountToLoopVue :endVal="getNumber(govData?.value3)" :decimals="2"/>
          </div>
          <div class="label">政府兑现金额(万元)</div>
        </div>
      </div>
      <div class="chart-bar" id="bar-chart"></div>
      <div class="list">
        <div class="list-head flex-row">
          <span class="f-col-4">企业名称</span>
          <span class="f-col-4">申请金额(万元)</span>
          <span class="f-col-4">政府兑现金额(万元)</span>
        </div>
        <vue3-seamless-scroll
          class="list-body"
          :hover="true"
          :step="0.3"
          :list="listData">
            <ul>
              <li class="flex-row" v-for="item in listData" :key="item.name">
                <span class="f-col-4">{{item.name}}</span>
                <span class="f-col-4">{{item.value1}}</span>
                <span class="f-col-4">{{item.value2}}</span>
              </li>
            </ul>
        </vue3-seamless-scroll>
      </div>
    </div>

  </div>
</template>

<style scoped lang="less">
.page-panel {
    width: 27%;
    height: 56rem;
    overflow: hidden;
}
.page-main {
  padding: 1rem 2rem;
  .h2 {
    font-size: 1.6rem;
    color: #fff;
    line-height: 3.2rem;
    text-align: left;
    font-weight: 700;
  }
  .money-panel {
    display: flex;
    padding: 1rem 0;
    .item {
       flex-basis: 33.33%;
       text-align: center;
       .label {
         font-size: 1.8rem;
         color: #626d95;
       }
       .count {
         font-size: 2.4rem;
         font-weight: 700;
         color: #fff;
         padding-bottom: 0.5rem;
       } 
    }
  }
}
.chart-bar {
  height: 23rem;
}
.list span{
  height: 3.8rem;
  line-height: 3.8rem;
  font-size: 1.6rem;
  color: #fff;
  text-align: center;
}
.list .list-head span{
  background: #112c5f;
  color: #99aad5;
}
.list .list-body li {
  margin-bottom: 2px;
}
.list .list-body span{
  background: #0c173f;
  color: #fff;
}
.list-body {
  height: 11rem;
  overflow: hidden;
}
</style>
