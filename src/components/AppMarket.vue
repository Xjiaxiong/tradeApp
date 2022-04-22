<script setup>
import AppTitle from './AppTitle.vue';
import AppH3TitleVue from './AppH3Title.vue';
import knowledgeLogo from '../assets/imgs/main_zhishi.png'
import zlLogo from '../assets/imgs/main_zhiliang.png'
import { ref, inject, onMounted, getCurrentInstance } from 'vue'
import { unwarp, getNumber } from '../utils/kits'
import CountToLoopVue from './CountToLoop.vue';
import { trade_InfosRequest, trade_KnowledgeRequest } from '../utils/http'
const $router  = getCurrentInstance().appContext.config.globalProperties.$router

const echarts = inject('ec');
const dayjs = inject('dayjs');

let knowledgeData = ref(null);
let tab1 = ref(1);
let tab2 = ref(1);
let _myChart = ref(null);
// let nowText = `截止 ${dayjs().format('YYYY-MM-DD')}` 

const switchTab1 = (index) => {
  tab1.value = index;
  getLineChart()
}
const switchTab2 = (index) => {
  tab2.value = index;
}
const getLineChart = async () => {
  //图表初始化
  if(!_myChart.value) { 
    _myChart.value = echarts.init(document.getElementById("line-chart"),'dark')
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
  let res = await trade_InfosRequest(tab1.value)
  _myChart.value.hideLoading();

  //图表数据解析
  const data = res.data.data;
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
        values.push(parseFloat(value).toFixed(2))
    })
    return {
      name: item.name,
      type: 'line',
      data: values
    }
  })

  //图表设置
  let options = {
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
            if(name === '去年外贸信保额' || name === '今年外贸信保额') {
              return `${name}($)`
            }
            return `${name}(￥)`
        }
      },
      tooltip: {
        trigger: 'axis',
        confine: true,
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
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value}万元'
        }
      },
      series: series,
  }
  document.getElementById('line-chart').setAttribute('_echarts_instance_', '')
  unwarp(_myChart.value).setOption(options);
  //tools.loopShowTooltip(_myChart.value, options, {loopSeries: false});
}
const getKnowledgeData = async () => {
  let res = await trade_KnowledgeRequest();
  knowledgeData.value = res.data.data;
}
onMounted(() => {
    getLineChart()
    getKnowledgeData() 
})
// onBeforeUnmount(() => {
//   _myChart && _myChart.dispose();
// })
const viewPage = () => {
  $router.push('/servicePage')
}
</script>

<template>
  <div class="sider-border market-panel">
    <AppTitle title="市场供给" @click="viewPage" :isClick="true"/>
    <div class="market-body">
      <div class="tabs-wrap">
        <div class="tabs">
          <div class="tab-item" :class="{'curr':tab1 === 1}" @click="switchTab1(1)">内外贸信保</div>
          <div class="tab-item" :class="{'curr':tab1 === 2}" @click="switchTab1(2)">银行融资</div>
        </div>
      </div>
      <div class="chart-box" id="line-chart"></div>
      <AppH3TitleVue title="知识产权" />
      <div class="box-bottom-con">
        <div class="info-row">
          <span class="info-row-label">申请总数</span>
          <span class="info-row-value"><CountToLoopVue :endVal="getNumber(knowledgeData?.value1)" /></span>
        </div>
        <div class="infos">
          <div class="infos-left">
            <img :src=" tab2 === 1 ? knowledgeLogo : zlLogo" alt="main_zhishi">
            <p>{{tab2 === 1 ? '知识产权' : '质量认证'}}</p>
          </div>
          <ul v-show="tab2 === 1">
            <li>
              <span>商标数</span>
              <span><CountToLoopVue :endVal="getNumber(knowledgeData?.value2)" /></span>
            </li>
            <li>
              <span>实用新型专利数</span>
              <span><CountToLoopVue :endVal="getNumber(knowledgeData?.value4)" /></span>
            </li>
            <li>
              <span>发明专利数</span>
              <span><CountToLoopVue :endVal="getNumber(knowledgeData?.value3)" /></span>
            </li>
            <li>
              <span>外观专利数</span>
              <span><CountToLoopVue :endVal="getNumber(knowledgeData?.value5)" /></span>
            </li>
          </ul>
          <ul v-show="tab2 === 2">
            <li>
              <span>国内商标</span>
              <span>{{knowledgeData?.value7}}</span>
            </li>
            <li>
              <span>马德里商标</span>
              <span>{{knowledgeData?.value8}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
  .market-panel {
    width: 27%;
    height: 56rem;
    overflow: hidden;
  }
  .market-body {
    padding: 0rem 1rem;
  }
  .tabs-wrap {
    padding-top: 1rem;
    display: flex;
    justify-content: space-between;
    >span {
      color: #08daff;
      font-size: 14px;
      align-self: flex-end;
      margin-bottom: 0.5rem;
      padding: 5px 12px;
      border: 1px solid #08daff;
      border-radius: 4px;
    }
    .tabs {
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
  }
 
  .chart-box {
    height: 23rem;
  }
  .info-row {
    height: 4.2rem;
    background: #0d1d47;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1rem 0;
    padding: 0 2rem;
  }
  .info-row-label {
    font-size: 1.8rem;
    color: #fff;
  }
  .info-row-value {
    font-size: 2rem;
    color: #0c90ff;
    font-weight: 700;
  }
  .infos {
    display: flex;
    align-items: center;
    .infos-left {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      width: 10rem;
      height: 10rem;
      text-align: center;
      img {
        width: 3.7rem;
        height: 4rem;
      }
      p {
        font-size: 1.6rem;
        color: #fff;
        font-weight: 700;
      }
    }
    ul {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      align-content: space-around;
      height: 10rem;
      li {
        display: flex;
        justify-content: space-between;
        flex-basis: 50%;
        padding: 0 1.6rem;
        >span:first-child {
            font-size: 1.8rem;
            color: #5f6f98;
            font-weight: 700;
        }
        >span:last-child {
            font-size: 1.8rem;
            color: #fff;
        }
      }
    }
  }
</style>
