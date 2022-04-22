<script setup>
import MarketzationTitle from '../components/MarketzationTitle.vue'
import MarketzationTitleTabVue from '../components/MarketzationTitleTab.vue';
import MarketzationXbVue from '../components/MarketzationXb.vue';
import MarketzationChartTendencyVue from '../components/MarketzationChartTendency.vue';
import MarketzationChartTendencyTwoVue from '../components/MarketzationChartTendencyTwo.vue';
import MarketzationBankVue from '../components/MarketzationBank.vue';
import MarketzationShowVue from '../components/MarketzationShow.vue';
import MarketzationListVue from '../components/MarketzationList.vue';
import { computed, ref, inject, onMounted } from 'vue'
const echarts = inject('ec');

let tabFlag = ref(0)
let tabFlagTendency = ref(0)
const tabs1 = ['信用保险','投保额趋势','保单融资额趋势']
const tabsComponents = [MarketzationXbVue, MarketzationChartTendencyVue, MarketzationChartTendencyTwoVue]
const currentTabComponent = computed(() => {
  return tabsComponents[tabFlag.value]
})
const clickTab1 = (index) => {
  tabFlag.value = index
}
const tabs2 = ['银行融资']
const clickTab2 = (index) => {
  tabFlagTendency.value = index;
  getLineChart_tendency()
}
const tabIndex = ref(0);
const clickTabItem = (index) => {
  tabIndex.value = index;
  getLineChart_tendency()
}
const getLineChart_active = () => {
    let Xdata = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
    let domID = 'main-chart1'
    let myChart =  echarts.init(document.getElementById(domID),'dark')
    let option = {
        color:['#33c1ef'],
        backgroundColor: '',
        tooltip: {
          trigger: 'axis',
          extraCssText: 'color:#B9B8CE;border: 1px solid #1691dd;background:#12113d;text-align:left;'
        },
        grid:{
          top: '3%',
          left: '5%',
          right: '5%',
          bottom: '10%'
        },
        xAxis: {
          type: 'category',
          data: Xdata
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [98, 76, 89, 91, 95, 89, 86, 93, 87, 100, 99, 103],
            type: 'line',
            areaStyle:{
              opacity: 0.1
            },
            lineStyle:{
              shadowBlur: 30,
              shadowOffsetY: 30
            },
            smooth: true,
            markLine: {
              data: [{
                name: '平均值',
                yAxis: 86
              }]
            }
          }
        ]
      };
    document.getElementById(domID).setAttribute('_echarts_instance_', '')
    myChart.setOption(option)
}
const getLineChart_ds = () => {
    let Xdata = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
    // let data1 = [1286,1025,1167,1275,1280,1258,1296,1296,1230,1266,1588,1326];
    // let data2 = [956,1260,1120,1360,1450,1263,1120,1400,1520,1580,1380,1420];
    let data1 = [1.2,0.5,3.2,1,2.1,2.8,2.2,3,2.5,7.6,12.1,2.5];
    let data2 = [1.7,0.8,3.8,1.6,2.5,4.1,4.1,2.2,2,10.6,14.7,3.1];
    let option = {
      backgroundColor: '',
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        extraCssText: 'color:#B9B8CE;border: 1px solid #1691dd;background:#12113d;text-align:left;'
      },
      legend: {},
      color:['#ee6b3d','#58d9f9'],
      grid:{
        top: '3%',
        left: '6%',
        right: '5%',
        bottom: '10%'
      },
      xAxis: {
        type: 'category',
        data: Xdata
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '跨境电商销售额（亿元）',
          data: data1,
          type: 'bar'
        },
        {
          name: '国内电商销售额（亿元）',
          data: data2,
          type: 'bar'
        }
      ]
    };
    let domID = 'main-chart3'
    let myChart =  echarts.init(document.getElementById(domID),'dark');
    document.getElementById(domID).setAttribute('_echarts_instance_', '')
    myChart.setOption(option)
}
const getLineChart_gyl_chart1 = () => {
    let xTimeData = ['仓储服务','物流平台','供应链平台'];
    let legends = ['总平台数','待引进平台数'];
    // let data1 = [10,16,11];
    // let data2 = [16,10,4];
    let data1 = [3,2,6];
    let data2 = [2,0,1];
    let option = {
        color:['#3284e8','#34abe5'],
        backgroundColor: 'transparent',
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        legend: {
            top: 10,
            right: 10,
            data: legends,
        },
        tooltip: {
            trigger: 'item',
            axisPointer: {
              type: 'shadow'
            },
            extraCssText: 'color:#B9B8CE;border: 1px solid #1691dd;background:#12113d;text-align:left;'
        },            
        xAxis: {
            type: 'value',
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
              name: legends[1],
              type: 'bar',
              label: {
                show: true,
                color: '#fff'
              },
              emphasis: {
                focus: 'series'
              },
              data: data2
            },
            {
              name: legends[0],
              type: 'bar',
              label: {
                show: true,
                color: '#fff'
              },
              emphasis: {
                focus: 'series'
              },
              data: data1
            }
        ],
    }
    let domID = 'main-chart4'
    let myChart =  echarts.init(document.getElementById(domID),'dark');
    document.getElementById(domID).setAttribute('_echarts_instance_', '')
    myChart.setOption(option)
}
const getLineChart_gyl_chart2 = () => {
    let Xdata = ['仓储服务','物流平台','供应链平台'];
    let data = [ 458, 356, 504 ]
    let option = {
        legend:{
          top: 10,
          right: 10
        },
        color:['#e89549'],
        backgroundColor: '',
        tooltip: {
          trigger: 'axis',
          extraCssText: 'color:#B9B8CE;border: 1px solid #1691dd;background:#12113d;text-align:left;'
        },
        grid:{
          left: '5%',
          right: '5%',
          bottom: '10%'
        },
        xAxis: {
          type: 'category',
          data: Xdata
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '已服务企业数',
            data: data,
            type: 'line',
            areaStyle:{
              opacity: 0.1
            },
            lineStyle:{
              shadowBlur: 30,
              shadowOffsetY: 30
            },
          }
        ]
      };
    let domID = 'main-chart5'
    let myChart =  echarts.init(document.getElementById(domID),'dark')
    document.getElementById(domID).setAttribute('_echarts_instance_', '')
    myChart.setOption(option)
}
const getLineChart_gyl_chart3 = () => {
    let Xdata = ['仓储服务','物流平台','供应链平台'];
    // let data = [356, 215, 336];
    let data = [25113, 14561, 20862];
    let option = {
      backgroundColor: '',
      tooltip: {
        trigger: 'item',
        extraCssText: 'color:#B9B8CE;border: 1px solid #1691dd;background:#12113d;text-align:left;'
      },
      legend: {
        top: 10,
        right: 10
      },
      color:['#f1bd35'],
      grid:{
        left: '6%',
        right: '5%',
        bottom: '10%'
      },
      xAxis: {
        type: 'category',
        data: Xdata
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '金额（万元）',
          data: data,
          type: 'bar'
        }
      ]
    };
    let domID = 'main-chart6'
    let myChart =  echarts.init(document.getElementById(domID),'dark');
    document.getElementById(domID).setAttribute('_echarts_instance_', '')
    myChart.setOption(option)
}
onMounted(() => {
  getLineChart_active()
  getLineChart_ds()
  getLineChart_gyl_chart1()
  getLineChart_gyl_chart2()
  getLineChart_gyl_chart3()
})
</script>

<template>
  <div class="market__bg">
     <div class="market__top">
       <div class="market__top_item panel-border-bg">
         <MarketzationTitleTabVue :tabTexts="tabs1" @clickTab="clickTab1"/>
         <component :is="currentTabComponent"></component>
       </div>
       <div class="market__top_item panel-border-bg">
         <MarketzationTitle title="市场化活跃度指数"/>
         <div class="main-chart" id="main-chart1"></div>
       </div>
       <div class="market__top_item panel-border-bg">
         <MarketzationTitle title="展会服务"/>
         <MarketzationShowVue />
       </div>
       <div class="market__top_item panel-border-bg">
         <MarketzationTitleTabVue :tabTexts="tabs2" @clickTab="clickTab2"/>
        <MarketzationBankVue />
       </div>
       <div class="market__top_item panel-border-bg">
         <MarketzationTitle title="最新信保信息"/>
         <MarketzationListVue />
       </div>
       <div class="market__top_item panel-border-bg">
         <MarketzationTitle title="电商服务"/>
         <div class="main-chart" id="main-chart3"></div>
       </div>
     </div>
     <div class="market__bottom panel-border-bg">
         <MarketzationTitle title="供应链服务体系"/>
         <div class="main-chart-group">
           <div class="main-chart-group-item" id="main-chart4"></div>
           <div class="main-chart-group-item" id="main-chart5"></div>
           <div class="main-chart-group-item" id="main-chart6"></div>
         </div>
     </div>
  </div>
</template>

<style scoped lang="less">
  .market__bg {
    color: #fff;
    padding-top: 2rem;
  }
  .panel-border-bg {
    position: relative;
    border: 1px solid #0d4694;
    &::before {
      content: '';
      position: absolute;
      border: 4px solid #1b91ff;
      border-top-color: transparent;
      border-right-color: transparent;
      left: 0;
      bottom: 0;
    }
    &::after {
      content: '';
      position: absolute;
      border: 4px solid #1b91ff;
      border-top-color: transparent;
      border-left-color: transparent;
      right: 0;
      bottom: 0;
    }
  }
  .market__top {
    font-size: 16px;
    color: #fff;
    height: 55rem;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
  }
  .market__top_item {
    height: 27rem;
    width: 33%;
    display: flex;
    flex-direction: column;
  }
  .market__bottom {
    height: 33rem;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    >.main-chart-group {
      flex: 1;
      display: flex;
      justify-content: space-between;
      >.main-chart-group-item {
        width: 33%;
        height: 100%;
      }
    }
  }
  .main-chart {
    padding: 1rem;
    height: 24rem;
  }
  .main-chart-tendency {
    height: 20rem;    
  }
  .market__tabs {
    display: flex;
    padding: 1rem;
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
</style>
