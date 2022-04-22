<script setup>
/*备份数据*/
// const seriesDataMap = {
//   'xb_chart1': [
//     [
//       { value: 2, name: '内贸' },
//       { value: 58, name: '外贸' },
//     ],
//     [
//       { value: 8, name: '内贸' },
//       { value: 145, name: '外贸' },
//     ],
//     [
//       { value: 31, name: '内贸' },
//       { value: 479, name: '外贸' },
//     ]
//   ],
//   'xb_chart2': [
//     [
//       { value: 103, name: '内贸' },
//       { value: 10548, name: '外贸' },
//     ],
//     [
//       { value: 310, name: '内贸' },
//       { value: 39095, name: '外贸' },
//     ],
//     [
//       { value: 4471, name: '内贸' },
//       { value: 290390, name: '外贸' },
//     ],
//   ],
//   'xb_chart3': [
//     [
//       { value: 8, name: '内贸' },
//       { value: 949, name: '外贸' },
//     ],
//     [
//       { value: 24, name: '内贸' },
//       { value: 3518, name: '外贸' },
//     ],
//     [
//       { value: 357, name: '内贸' },
//       { value: 26135, name: '外贸' },
//     ],
//   ],
// }
// const namesMap = {
  
//   'xb_chart1': '信保投保企业',
//   'xb_chart2': '投保金额',
//   'xb_chart3': '保费金额'
// }
// const legendDataMock = {
//   '0':{
//     val1: 2,
//     val2: 58,
//     val3: 103,
//     val4: 10548,
//     val5: 8,
//     val6: 949,
//     val7: 252,
//   },
//   '1':{
//     val1: 8,
//     val2: 145,
//     val3: 310,
//     val4: 39095,
//     val5: 24,
//     val6: 3518,
//     val7: 299
//   },
//   '2':{
//     val1: 31,
//     val2: 479,
//     val3: 4471,
//     val4: 290390,
//     val5: 357,
//     val6: 26135,
//     val7: 2493
//   },
// }
/*模拟数据*/
const seriesDataMap = {
  'xb_chart1': [
    [
      { value: 2, name: '内贸' },
      { value: 11, name: '外贸' },
    ],
    [
      { value: 8, name: '内贸' },
      { value: 145, name: '外贸' },
    ],
    [
      { value: 31, name: '内贸' },
      { value: 479, name: '外贸' },
    ]
  ],
  'xb_chart2': [
    [
      { value: 105, name: '内贸' },
      { value: 2004, name: '外贸' },
    ],
    [
      { value: 310, name: '内贸' },
      { value: 39095, name: '外贸' },
    ],
    [
      { value: 4471, name: '内贸' },
      { value: 290390, name: '外贸' },
    ],
  ],
  'xb_chart3': [
    [
      { value: 8, name: '内贸' },
      { value: 180, name: '外贸' },
    ],
    [
      { value: 24, name: '内贸' },
      { value: 3518, name: '外贸' },
    ],
    [
      { value: 357, name: '内贸' },
      { value: 26135, name: '外贸' },
    ],
  ],
}
const namesMap = {
  
  'xb_chart1': '信保投保企业',
  'xb_chart2': '投保金额',
  'xb_chart3': '保费金额'
}
const legendDataMock = {
  '0':{
    val1: 2,
    val2: 11,
    val3: 105,
    val4: 2004,
    val5: 8,
    val6: 180,
    val7: 0,
  },
  '1':{
    val1: 8,
    val2: 145,
    val3: 310,
    val4: 39095,
    val5: 24,
    val6: 3518,
    val7: 299
  },
  '2':{
    val1: 31,
    val2: 479,
    val3: 4471,
    val4: 290390,
    val5: 357,
    val6: 26135,
    val7: 2493
  },
}
/*模拟数据*/

import { ref, inject, onMounted } from 'vue'
import CountToLoopVue from '../components/CountToLoop.vue';
import logo from '../assets/imgs/sig_jine.png'
const echarts = inject('ec');

const tabIndex = ref(0);
const legendData = ref(legendDataMock[tabIndex.value])
const clickTabItem = (index) => {
  tabIndex.value = index;
  if(index === 1) {
    legendData.value = legendDataMock[0]
  } else {
    legendData.value = legendDataMock[tabIndex.value]
  }
  getChartPies()

}
const getChartPie = (domID) => {
    let myChart =  echarts.init(document.getElementById(domID),'dark')
    let option = {
      color:['#34aae8','#ff9638'],
      backgroundColor: '',
      tooltip: {
        trigger: 'item',
        extraCssText: 'color:#B9B8CE;border: 1px solid #1691dd;background:#12113d;text-align:left;'
      },
      series: [
        {
          name: namesMap[domID],
          type: 'pie',
          radius: ['50%', '70%'],
          center:['50%','40%'],
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
          data: tabIndex.value === 1 ? seriesDataMap[domID][0] : seriesDataMap[domID][tabIndex.value]
        }
      ]
    };
    document.getElementById(domID).setAttribute('_echarts_instance_', '')
    myChart.setOption(option)
}
const getChartPies = () => {
  getChartPie('xb_chart1');
  getChartPie('xb_chart2');
  getChartPie('xb_chart3');
}
onMounted(() => {
  getChartPies();
})
</script>

<template>
  <div class="xb-panel">
    <div class="tabs">
      <span :class="{curr: tabIndex === 0}" @click="clickTabItem(0)">当月</span>
      <span :class="{curr: tabIndex === 1}" @click="clickTabItem(1)">当年</span>
      <span :class="{curr: tabIndex === 2}" @click="clickTabItem(2)">去年</span>
    </div>
    <div class="xb-content-wrap">
      <div class="xb-content">
        <div class="xb_item-wrap">
          <div class="xb_chart" id="xb_chart1"></div>
          <div class="xb_chart_desc">信保<br/>投保企业</div>
          <div class="xb_legend">
            <div class="xb_legend_item">
              <i class="bar in"></i>
              <span class="desc">内贸</span>
              <span class="count"><CountToLoopVue :endVal="legendData.val1" /></span>
            </div>
            <div class="xb_legend_item">
              <i class="bar out"></i>
              <span class="desc">外贸</span>
              <span class="count"><CountToLoopVue :endVal="legendData.val2" /></span>
            </div>
          </div>
        </div>
        <div class="xb_item-wrap">
          <div class="xb_chart" id="xb_chart2"></div>
          <div class="xb_chart_desc one-row">投保金额</div>
          <div class="xb_legend">
            <div class="xb_legend_item">
              <i class="bar in"></i>
              <span class="desc">内贸</span>
              <span class="count"><CountToLoopVue :endVal="legendData.val3" />(万元)</span>
            </div>
            <div class="xb_legend_item">
              <i class="bar out"></i>
              <span class="desc">外贸</span>
              <span class="count"><CountToLoopVue :endVal="legendData.val4" />(万美元)</span>
            </div>
          </div>
        </div>
        <div class="xb_item-wrap">
          <div class="xb_chart" id="xb_chart3"></div>
          <div class="xb_chart_desc one-row">保费金额</div>
          <div class="xb_legend">
            <div class="xb_legend_item">
              <i class="bar in"></i>
              <span class="desc">内贸</span>
              <span class="count"><CountToLoopVue :endVal="legendData.val5" />(万元)</span>
            </div>
            <div class="xb_legend_item">
              <i class="bar out"></i>
              <span class="desc">外贸</span>
              <span class="count"><CountToLoopVue :endVal="legendData.val6" />(万美元)</span>
            </div>
          </div>
        </div>
      </div>
      <div class="xb_item_right">
        <img :src="logo" alt="">
        <p class="right__count"><CountToLoopVue :endVal="legendData.val7" /></p>
        <p class="right__desc">理赔金额(万元)</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.xb-panel {
  display: flex;
  flex-direction: column;
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
.xb-content-wrap {
  padding-right: 14rem;
  position: relative;
  .xb-content {
    display: flex;
    justify-content: space-between;
    .xb_item-wrap {
      position: relative;
      height: 16rem;
      width: 33%;
      .xb_chart {
        width: 100%;
        height: 100%;
      }
      .xb_chart_desc {
        position: absolute;
        font-size: 1.6rem;
        color: #fff;
        top: 28%;
        left: 50%;
        transform: translate(-50%, 0);
      }
      .xb_chart_desc.one-row {
        top: 34%;
      }
      .xb_legend {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 0 1rem;
        .xb_legend_item {
          display: flex;
          align-items: center;
          >i {
            display: block;
            width: 4px;
            height: 1rem;
          }
          >i.in {
            background-color: #34aae8;
          }
          >i.out {
            background-color: #ff9638;
          }
          >span {
            font-size: 12px
          }
          .desc {
            padding: 0 4px;
            color: #475789;
          }
          .count {
            font-size: 12px;
            color: #fff;
            margin-left: auto;
          }
        }
      }
    }
  }
  .xb_item_right {
    position: absolute;
    width: 14rem;
    height: 16rem;
    border-left: 1px solid #133372;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: space-around;
    >img {
      width: 5.3rem;
      height: 5.3rem;
    }
    .right__count {
      color: #fff;
      font-size: 2.2rem;
      font-weight: 700;
    }
    .right__desc {
      font-size: 1.6rem;
      color: #6f7da1;
    }
  }
}
</style>
