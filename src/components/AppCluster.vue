<script setup>
import AppTitleVue from './AppTitle.vue';
import AppH3TitleVue from './AppH3Title.vue';
import itemLogo1 from '../assets/imgs/main_dians.png'
import itemLogo2 from '../assets/imgs/main_yuhuan.png'
import { unwarp, getNumber } from '../utils/kits'
import CountToLoopVue from './CountToLoop.vue';
import { ref, onMounted, computed, inject } from 'vue'
const echarts = inject('ec')
const mockData = [
  [125,62],
  [561,267],
  [1365,749]
]
const mockDataChart = [
  [24, 67, 34],
  [196, 209, 156],
  [275, 600, 490]
]
const tabIndex = ref(0);
const clickTabItem = (index) => {
  tabIndex.value = index;
  getTradeData()
}
const getData = computed(() => {
    if(tabIndex.value === 1) {
      return mockData[0]
    }
    return mockData[tabIndex.value]
})
// //获取-贸易促进活动-数据
const getTradeData = () => {
    let xTimeData = ['汽摩配件','阀门水暖','金属制品'] 
    let data = mockDataChart[tabIndex.value];
    if(tabIndex.value === 1) {
      data = mockDataChart[0];
    }
    let option = {
        backgroundColor: '',
        grid: {
            top: '2%',
            left: '3%',
            right: '4%',
            bottom: '1%',
            containLabel: true
        },
        tooltip: {
            trigger: 'item',
            axisPointer: {
              type: 'shadow'
            },
            extraCssText: 'color:#B9B8CE;border: 1px solid #1691dd;background:#12113d;text-align:left;',
        },            
        xAxis: {
            type: 'value',
            position: 'top',
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            }
        },
        yAxis: {
            data: xTimeData,
            axisLine: {
                lineStyle: {
                  color: '#105188'
                }
            }          
        },
        series: [
            {
              name: '行业有效消息推送数',
              type: 'bar',
              label: {
                show: true,
                color: '#fff'
              },
              emphasis: {
                focus: 'series'
              },
              data: [{
                value: data[0],
                itemStyle: {
                  color: '#e86b34'
                }
              },{
                value: data[1],
                itemStyle: {
                  color: '#e8bc34'
                }
              },{
                value: data[2],
                itemStyle: {
                  color: '#3189ed'
                }
              }]
            }
        ],
    }
    let domID = 'cluster-chart'
    let myChart =  echarts.init(document.getElementById(domID),'dark');
    document.getElementById(domID).setAttribute('_echarts_instance_', '')
    myChart.setOption(option)
}
onMounted(() => {
    getTradeData();
})

</script>

<template>
  <div class="page-panel">
    <div class="main">
      <AppH3TitleVue title="知识产权保护" />
      <div class="main-content">
        <div class="tabs">
            <span class="hvr-float" :class="{curr: tabIndex === 0}" @click="clickTabItem(0)">当月</span>
            <span class="hvr-float" :class="{curr: tabIndex === 1}" @click="clickTabItem(1)">当年</span>
            <span class="hvr-float" :class="{curr: tabIndex === 2}" @click="clickTabItem(2)">去年</span>
        </div>
        <div class="clu-row">
          <div class="item">
            <span><CountToLoopVue :endVal="getNumber(getData[0])" /></span>
            <p>推送消息条数</p>
          </div>
          <div class="item">
            <span><CountToLoopVue :endVal="getNumber(getData[1])" /></span>
            <p>企业回应次数</p>
          </div>
        </div>
        <h3>行业有效消息推送数</h3>
        <div class="chart-bar" id="cluster-chart"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.page-panel {
  width: 20%;
  height: 32rem;
  padding-left: 2rem;
}
.main {
  width: 100%;
  height: 100%;
  background: url(../assets/imgs/web_boa4_bg.png) no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
}
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 5px 2rem;
  >h3 {
    font-size: 1.6rem;
    line-height: 1.4;
    color: #fff;
    text-align: left;
    font-weight: 400;
    margin-top: 4px;
  }
  .tabs {
    display: flex;
    padding: 1rem 0;
    >span {
      border-radius: 4px;
      padding: 0.5rem 1rem;
      font-size: 14px;
      border: 1px solid rgba(0,107,255,.3);
      border-radius: 2px;
      font-size: 15px;
      color: rgba(0,107,255,.5);
      margin-right: 1.5rem;
      cursor: pointer;
    }
    >span.curr {
      border: 1px solid #164591;
      background: #164591;
      color: #42bdeb;
    }
  }
}
.clu-row {
  display: flex;
  justify-content: space-between;
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 8rem;
    width: 48%;
    background-image: linear-gradient(#121340,#1a3169);
    border: 1px solid #1a2e64;
    border-radius: 4px;
    >span {
      font-size: 2rem;
      color: #fff;
      line-height: 3.2rem;
    }
    >p {
      margin-bottom: 0;
      color: hsla(0,0%,100%,.6);
    }
  }
}
.chart-bar {
  height: 10rem;
}
</style>
