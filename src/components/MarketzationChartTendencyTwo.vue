<script setup>
import { ref, inject, onMounted } from 'vue'
import { tendencyData } from '../utils/mockMarketzation.js'

const echarts = inject('ec');
const tabIndex = ref(0);
const clickTabItem = (index) => {
  tabIndex.value = index;
  getLineChart_tendency()
}
const getLineChart_tendency = () => {
    let res = tendencyData[tabIndex.value]
    if(tabIndex.value === 1) {
      res = tendencyData[0]
    }
    let re = res[1]
    let Xdata = re.times
    let data = re.datas;
    let option = {
        color:['#b66d36'],
        backgroundColor: '',
        tooltip: {
          trigger: 'axis',
          extraCssText: 'color:#B9B8CE;border: 1px solid #1691dd;background:#12113d;text-align:left;'
        },
        grid:{
          top: '5%',
          left: '13%',
          right: '3%',
          bottom: '16%'
        },
        xAxis: {
          type: 'category',
          data: Xdata
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}万元'
          }
        },
        series: [
          {
            data: data,
            type: 'line',
            areaStyle:{
              opacity: 0.1
            },
            lineStyle:{
              shadowBlur: 30,
              shadowOffsetY: 30
            },
            smooth: true
          }
        ]
      };
    let domID = 'main-chart2'
    let myChart =  echarts.init(document.getElementById(domID),'dark');
    document.getElementById(domID).setAttribute('_echarts_instance_', '')
    myChart.setOption(option)
}
onMounted(() => {
    getLineChart_tendency();
})
</script>
<template>
    <div class="tendency-bg">
        <div class="tabs">
            <span :class="{curr: tabIndex === 0}" @click="clickTabItem(0)">当月</span>
            <span :class="{curr: tabIndex === 1}" @click="clickTabItem(1)">当年</span>
            <span :class="{curr: tabIndex === 2}" @click="clickTabItem(2)">去年</span>
        </div>
        <div class="main-chart-tendency" id="main-chart2"></div>
    </div>
</template>
<style scoped lang="less">
  .tendency-bg {
    color:#fff;
    font-size: 14px;
    padding: 0 1rem;
  }
  .tabs {
    display: flex;
    padding: 1rem 0;
    >span {
      border-radius: 4px;
      padding: 0.5rem 1rem;
      font-size: 14px;
      background: #020f43;
      border: 1px solid #020f43;
      color: #405184;
      margin-right: 1.5rem;
      cursor: pointer;
    }
    >span.curr {
      border: 1px solid #04abcf;
      color: #04abcf;
    }
  }
  .main-chart-tendency {
    height: 16rem;    
  }

</style>