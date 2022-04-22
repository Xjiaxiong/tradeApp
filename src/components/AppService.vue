<script setup>
import { ref, inject, onMounted } from 'vue'
import { unwarp, getNumber } from '../utils/kits'
import CountToLoopVue from './CountToLoop.vue';
import { 
  trade_ShowRequest,
  trade_ShowChartRequest,
  trade_PartCodeRequest,
  trade_interface7Request
} from '../utils/http'
import AppH3TitleVue from './AppH3Title.vue';

const echarts = inject('ec');
let tradeData = ref(null);
let showData = ref(null);
let _myChart = ref(null);
let show2Data = ref(null);
let tab = ref(1)
const switchTab = (index) => {
  tab.value = index;
  getChart()
}
const getChart = async () => {
  //图表初始化
  if(!_myChart.value) { 
    _myChart.value = echarts.init(document.getElementById("bar-chart-service"),'dark')
  } else {
    _myChart.value.clear();
    _myChart.value.showLoading('default',{
        text: '加载中...',
        color: '#23b2f7',
        textColor: '#fff',
        maskColor: 'rgba(0, 0, 0, 0.5)',
      });
  }

  //图表数据请求
  let res = await trade_ShowChartRequest(tab.value)
  _myChart.value.hideLoading();

  console.log('res----trade_ShowChartRequest',res)

  //图表数据解析
  let data = [];
  if(tab.value === 2) {
     let re = (res.data.data)[0]
     data = re.jsonArray;
     show2Data.value = re
  } else {
     data = res.data.data; 
  }
  if(tab.value === 3) {
    data = [(res.data.data)[0],(res.data.data)[2]]
    getChart1([(res.data.data)[1]])
  }
  
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
        data: legends,
        formatter: function (name) {
            let rmbAreas = ['电商销售总额']
            if(rmbAreas.includes(name)) {
              return `${name}(亿元)`
            }
            return name;
        }
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
  if(tab.value === 2) {
    option.xAxis = {
      type: 'value',
    }
    option.yAxis = {
      data: xTimeData,
      axisLine: {
        lineStyle: {
          color: '#105188'
        }
      }
    }
  }
  document.getElementById('bar-chart-service').setAttribute('_echarts_instance_', '')
  let myChart = unwarp(_myChart.value)
  myChart.setOption(option);
  //tools.loopShowTooltip(myChart, option, {loopSeries: true});
}
const getChart1 = (data) => {
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
        values.push(parseFloat(value))
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
        data: legends,
        formatter: function (name) {
            let rmbAreas = ['电商销售总额']
            if(rmbAreas.includes(name)) {
              return `${name}(亿元)`
            }
            return name;
        }
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
  let _myChart = echarts.init(document.getElementById("bar-chart-service1"),'dark')
  document.getElementById('bar-chart-service1').setAttribute('_echarts_instance_', '')
  let myChart = unwarp(_myChart)
  myChart.setOption(option);
}
//饼图设置
const getPieChart = async () => {
  let res = await trade_PartCodeRequest();
  const data = res.data.data;
  const series = data.map((item, index) => {
      let colorStr = index === 0 ? '#ee5454' : index === 1 ? '#6dc55c' : '#e6bd5c' ;
      return  { 
          value: item.value,
          name: item.typeText,
          itemStyle: {
            color:  colorStr
          }
      }
  })
  let option = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        position: ["80%","20%"],
        extraCssText: 'color:#B9B8CE;border: 1px solid #1691dd;background:#12113d;text-align:left;',
      },
      legend: {
        top: 5,
        left: 'center'
      },
      series: [
        {
          name: '企业码',
          type: 'pie',
          radius: ['55%', '72%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: false,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: series
        }
      ]
    };
  let myChart = unwarp(echarts.init(document.getElementById("circle-chart"),'dark'))
      myChart.setOption(option);
  //tools.loopShowTooltip(myChart, option, {loopSeries: true});
}
//获取-展会-数据
const getShowData = async () => {
  let res = await trade_ShowRequest();
  showData.value = res.data.data;
}
//获取-贸易促进活动-数据
const getTradeData = async () => {
  let res = await trade_interface7Request();
  tradeData.value = res.data.data;
}
onMounted(() => {
    getShowData();
    getChart()
    getPieChart();
    getTradeData();
})

</script>

<template>
  <div class="page-panel">
    <div class="main-center">
        <h1 class="app__h2 center">
          <i class="app__h2_left"></i>
            <span class="app__h2_text curr">企业码分析</span>
          <i class="app__h2_right"></i>
        </h1>
        <div class="circle-wrap">
          <div class="circle-icon animate-spain"></div>
          <div class="circle-icon-inner"></div>
          <div class="circle-chart" id="circle-chart"></div>
        </div>
    </div>
    <div class="main">
      <div class="main-left">
          <div class="tabs">
            <div class="tab-item" :class="{'curr':tab === 1}" @click="switchTab(1)">展会服务</div>
            <div class="tab-item" :class="{'curr':tab === 2}" @click="switchTab(2)">供应链服务</div>
            <div class="tab-item" :class="{'curr':tab === 3}" @click="switchTab(3)">电商服务</div>
          </div>
          <div class="con">
            <div class="bar-chart" id="bar-chart-service"></div>
            <div class="bar-chart" id="bar-chart-service1" v-show="tab === 3"></div>
            <div class="con-box" v-show="tab === 1">
              <div class="con-box-item">
                <div class="top__row">
                  <span class="label">线上展会数</span>
                  <span class="count">{{showData?.value1}}</span>
                </div>
                <div class="top__row">
                  <div class="top__row_item">
                    <span class="label">代参展</span>
                    <span class="count">{{showData?.value2}}</span>
                  </div>
                  <div class="top__row_item">
                    <span class="label">自行参展</span>
                    <span class="count">{{showData?.value3}}</span>
                  </div>
                </div>
              </div>
              <div class="con-box-item">
                <div class="top__row">
                  <span class="label">线下展会数</span>
                  <span class="count">{{showData?.value4}}</span>
                </div>
                <div class="top__row">
                  <div class="top__row_item">
                    <span class="label">代参展</span>
                    <span class="count">{{showData?.value5}}</span>
                  </div>
                  <div class="top__row_item">
                    <span class="label">自行参展</span>
                    <span class="count">{{showData?.value6}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="con-box" v-show="tab === 2">
              <div class="con-box-item">
                <div class="top__row max-height">
                  <span class="label">引进供应链平台数</span>
                  <span class="count">{{show2Data?.value1}}</span>
                </div>
              </div>
              <div class="con-box-item">
                <div class="top__row">
                  <span class="label">服务企业数</span>
                  <span class="count">{{show2Data?.value3}}</span>
                </div>
                <div class="top__row padding2">
                  <span class="label">企业节约成本(万元)</span>
                  <span class="count">{{show2Data?.value4}}</span>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div class="main-right">
          <h1 class="app__h2 right">
              <AppH3TitleVue title="贸易促进活动"/>
          </h1>
          <div class="infos-box">
            <div class="infos-box-item">
              <div class="box-item">
                  <p class="value">
                    <CountToLoopVue :endVal="getNumber(tradeData?.value1)" />
                    <span class="text-desc">同比</span><span><CountToLoopVue :endVal="50" />%</span><span class="arrow__icon arrow_up"></span></p>
                  <p class="label">供采对接会场次</p>
              </div>
              <div class="box-item">
                  <p class="value"><CountToLoopVue :endVal="getNumber(tradeData?.value2)" />亿元<span class="text-desc">同比</span><span><CountToLoopVue :endVal="10" />%</span><span class="arrow__icon arrow_up"></span></p>
                  <p class="label">意向订单金额</p>
              </div>
            </div>

            <div class="infos-box-item">
              <div class="box-item">
                  <p class="value"><CountToLoopVue :endVal="getNumber(tradeData?.value3)" /><span class="text-desc">同比</span><span><CountToLoopVue :endVal="20" />%</span><span class="arrow__icon arrow_up"></span></p>
                  <p class="label">自办展会场次</p>
              </div>
              <div class="box-item">
                  <p class="value"><CountToLoopVue :endVal="getNumber(tradeData?.value4)" />亿元<span class="text-desc">同比</span><span><CountToLoopVue :endVal="26" />%</span><span class="arrow__icon arrow_up"></span></p>
                  <p class="label">意向订单金额</p>
              </div>
            </div>

            <div class="infos-box-item">
              <div class="box-item">
                  <p class="value"><CountToLoopVue :endVal="getNumber(tradeData?.value5)" /><span class="text-desc">同比</span><span><CountToLoopVue :endVal="13" />%</span><span class="arrow__icon arrow_up"></span></p>
                  <p class="label">其他展会场次</p>
              </div>
              <div class="box-item">
                  <p class="value"><CountToLoopVue :endVal="getNumber(tradeData?.value6)" />人<span class="text-desc">同比</span><span><CountToLoopVue :endVal="24" />%</span><span class="arrow__icon arrow_up"></span></p>
                  <p class="label">业务培训人次</p>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.tabs {
    position:absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4.4rem;
    display: flex;
    background: url(../assets/imgs/col_line.png) no-repeat;
    background-size: 100% auto;
    background-position: left bottom;
    .tab-item {
      color: #5f6f98;
      cursor: pointer;
      padding: 1rem 2rem;
      font-size: 1.8rem;
    }
    .tab-item.curr {
      color: #fff;
      font-weight: 700;
    }
}
.app__h2 {
    position:absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4.4rem;
    // background: url(../assets/imgs/web_boa_titbg.png) no-repeat;
    // background-size: 100% 100%;
    // display: flex;
    // justify-content: center;
    // align-items: center;
}
.app__h2.right {
    position:absolute;
    top: 0;
    right: 0;
    left: auto;
    width: 96%;
    height: 4.4rem;
    // background: url(../assets/imgs/web_boa_titbg.png) no-repeat;
    // background-size: 100% 100%;
    // display: flex;
    // justify-content: center;
    // align-items: center;
}
.app__h2.center {
    position:absolute;
    top: 10%; 
    left: 20%;
    width: 62%;
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
    color: #6789ac;
    font-size: 1.8rem;
    letter-spacing: 3px;
    cursor: pointer;
}
.app__h2 .app__h2_text.curr {
    font-size: 1.9rem;
    font-weight: bold;
    background-image: linear-gradient( to bottom, #ffffff, #6fe1fd );
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
}
.page-panel {
  position: relative;
  width: 80%;
  height: 33rem;
}

.main-center {
  position: absolute;
  width: 36rem;
  height: 36rem;
  padding-top: 8rem;
  left: 51%;
  top: -1.5rem;
  background: url(../assets/imgs/web_boa2_bg.png) no-repeat;
  background-size: 100% 100%;
  .circle-wrap {
    position: relative;
    width: 26rem;
    height: 26rem;
    margin: 1rem auto;
    .circle-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -6.5rem;
      margin-top: -6.5rem;
      width: 13rem;
      height: 13rem;
      background: url(../assets/imgs/web_coad_circle.png) no-repeat;
      background-size: 100% 100%;
    }
    .circle-icon-inner {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -2.5rem;
      margin-top: -2.5rem;
      width: 5rem;
      height: 5rem;
      background: url(../assets/imgs/web_coad.png) no-repeat;
      background-size: 100% 100%;
    }
    .circle-chart {
      width: 26rem;
      height: 26rem;
    }
  }
}
.main {
  height: 100%;
  display: flex;
  justify-content: space-between;
  .main-left {
    position: relative;
    height: 100%;
    width: 53%;
    background: url(../assets/imgs/web_boa1_bg.png) no-repeat;
    background-size: 100% 100%;
    padding-right: 4%;
    padding-top: 4.4rem;
    .con {
      display: flex;
      padding: 1rem 2rem;
      .bar-chart {
        height: 26rem;
        width: 54%;
        padding-right: 1rem;
      }
      .bar-chart1 {
        height: 26rem;
        width: 46%;
      }
      .con-box {
        height: 26rem;
        width: 46%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .con-box-item {
          display: flex;
          flex-direction: column;
          height: 11rem;
          width: 100%;
          border: 1px solid #094e75;
          border-radius: 6px;
          .top__row.padding2 {
            padding: 0 2rem;
            align-items: center;
          }
          .max-height.top__row {
              height: 100%;
          }
          .top__row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 50%;
            .label {
              color:#fff;
              font-size: 2rem;
            }
            .count {
              color:#17b0ff;
              font-size: 2rem;
              font-weight: 700;
            }
            .top__row_item {
              display: flex;
              align-items: center;
              justify-content: space-between;
              width: 50%;
              padding: 0 2rem;
              .label {
                color:#6f82b7;
                font-size: 1.8rem;
              }
              .count {
                color:#fff;
                font-size: 1.8rem;
                font-weight: 700;
              }
            }
          }
          &>.top__row:first-child {
            padding: 0 2rem;
            align-items: center;
            border-bottom: 1px solid #094e75;
          }
        }
      }
      
    }
  }
  .main-right {
    position: relative;
    height: 100%;
    width: 29%;
    background: url(../assets/imgs/web_boa3_bg.png) no-repeat;
    background-size: 100% 100%;
    padding-left: 4%;
    padding-top: 4.4rem;
    padding-right: 2%;
    .infos-box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 26rem;
      width: 100%;
      margin-top: 1rem;
      .infos-box-item {
        display: flex;
        border-radius: 6px;
        height: 8rem;
        border: 1px solid #094e75;
        .box-item {
          display: flex;
          flex-direction: column;
          text-align: center;
          justify-content: center;
          flex-basis: 50%;
          .value {
            color: #fff;
            font-size: 2.1rem;
          }
          .text-desc {
            padding: 0 4px;
            font-size: 1.2rem;
            color:#656c83;
          }
          .label {
            padding-top: 0.5rem;
            color: #536691;
            font-size: 1.6rem;
          }
        }
        .box-item:first-child {
          border-right: 1px solid #094e75;
        }
      }
    }
  }
}
@keyframes spin-el {
    0% {
        transform: rotate(0deg);
    }
    25% {
        transform: rotate(90deg);
    }
    50% {
        transform: rotate(180deg);
    }
    75% {
        transform: rotate(270deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

@-webkit-keyframes spin-el {
    0% {
        transform: rotate(0deg);
    }
    25% {
        transform: rotate(90deg);
    }
    50% {
        transform: rotate(180deg);
    }
    75% {
        transform: rotate(270deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.animate-spain {
    animation: spin-el 12s linear 1s infinite;
    -webkit-animation: spin-el 12s linear 1s infinite;
}
</style>
