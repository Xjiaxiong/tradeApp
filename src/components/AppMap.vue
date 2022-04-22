<script setup>
import { ref, onMounted, shallowRef, nextTick, inject, computed } from 'vue';
import AMapLoader from '@amap/amap-jsapi-loader';
import { unwarp } from '../utils/kits'
import logoBlue from '../assets/imgs/dialog_blu.png'
import logoGreen from '../assets/imgs/dialog_gre.png'
import pointImg from '../assets/imgs/map_point.png'
import pointImg2 from '../assets/imgs/map_point2.png'

import { 
  trade_interface8Request,
  trade_interface9Request,
  trade_interfaceMapData
} from '../utils/http'

const input1 = ref('')

const select1 = ref('浙江');
const select0ptions1 = ref([]);

const select2 = ref('台州');
const select0ptions2 = ref([]);

const select3 = ref('331021');
const select0ptions3 = ref([{
	"id": "331002",
	"text": "椒江区"
},{
	"id": "331003",
	"text": "黄岩区"
},{
	"id": "331004",
	"text": "路桥区"
},{
	"id": "331082",
	"text": "临海市"
},{
	"id": "331081",
	"text": "温岭市"
},{
	"id": "331024",
	"text": "仙居县"
}, {
	"id": "331023",
	"text": "天台县"
}, {
	"id": "331022",
	"text": "三门县"
},{
	"id": "331021",
	"text": "玉环市"
}]);
const streetSCenter = {
  '大麦屿街道': [121.173101,28.088896],
  '坎门街道':[121.254812,28.08935],
  '玉城街道':[121.247774,28.146126],
  '芦浦镇': [121.235414,28.195005],
  '龙溪镇':[121.322103,28.195761],
  '干江镇':[121.355234,28.169282],
  '海山乡':[121.164346,28.226469],
  '鸡山乡': [121.402784,28.087381],
  '清港镇': [121.308885,28.270624],
  '楚门镇': [121.314035,28.228586],
  '沙门镇': [121.383386,28.233728],
  '玉环经济开发区': [121.237474,28.236753]
}

const echarts = inject('ec');

let dialogVisible = ref(false)
let markersData = ref([])

let map = shallowRef(null);
let partBase = ref(null);
let brandStrengthList = ref([])
let isShowCharts = ref(false)
let _AMap = null;
let _layer = null;
let _chart1 = null;
let _chart2 = null;
let _chart3 = null;
let _chart4 = null;


const getVipPartCount = computed(() => {
    let count = 0;
    markersData.value.map(item => {
      if(item.tag && item.tag === '1') {
        count++
      }
    })
    return count
})

const initMap = () => {
  AMapLoader.load({
      key:"47924524bbca6c9ae37aeb1379700d87",
      version:"2.0",     
      plugins:[''],      
  }).then((AMap)=>{
      //创建地图
      map = new AMap.Map("container",{
          showLabel: false,  
          zoom:5,           
          center:[105.602725,37.076636], 
          mapStyle: "amap://styles/darkblue"
      });
      _AMap = AMap;
      //创建图层
      _layer = new AMap.LabelsLayer({
          zooms: [3, 20],
          zIndex: 111,
          animation: false,
          collision: false
      });
      map.add(_layer);
      drawArea(AMap);
      getMarkersData();
  }).catch(e=>{
      console.log(e);
  })
}
const getMapText = name => {
    var text = new _AMap.Text({
        text: name,
        anchor:'center', 
        cursor:'pointer',
        angle:10,
        style:{
            'border': 'none',
            'background-color': 'transparent',
            'text-align': 'center',
            'font-size': '14px',
            'color': '#656c83'
        },
        position: streetSCenter[name]
    });

    text.setMap(map)
}
const drawArea = async (AMap) =>  {
        let res = await trade_interfaceMapData();
        let yhData = res.data;
        var streetArr = yhData.features;
        var len = streetArr.length - 1;
        let polygons = [];
        for (var i = len; i >= 0; i--) {
            var street = streetArr[i]
            var MultiPolygon = street.geometry.coordinates[0];
            var type = street.geometry.type; 
            var dbAreaCode = street.properties.XZQHDM + '000'  
            var areaName = street.properties.XZQHMC;
            getMapText(areaName)
            if (type === "MultiPolygon") {
                for (var j = 0; j < MultiPolygon.length; j++) {
                    var regionLngLats = [];
                    var po = MultiPolygon[j]
                    for (var k = 0; k < po.length; k++) {
                        var point = po[k];
                        regionLngLats.push(point)                        
                    }
                    var polygon = new AMap.Polygon({
                        path: regionLngLats,
                        strokeColor: "#3bc7ff", 
                        strokeWeight: 1,
                        strokeOpacity: 0.5,
                        fillOpacity: 0.9,
                        fillColor: '#112e61',
                        zIndex: 50,
                    })
                    polygons.push(polygon)
                    map.add(polygon)
                }
            }
            if (type === "Polygon") {
                var regionLngLats = [];
                for (var j = 0; j < MultiPolygon.length; j++) {
                    var point = MultiPolygon[j];
                    regionLngLats.push(point);
                }
                var polygon = new AMap.Polygon({
                    path: regionLngLats,
                    strokeColor: "#3bc7ff", 
                    strokeWeight: 1,
                    strokeOpacity: 0.5,
                    fillOpacity: 0.9,
                    fillColor: '#112e61',
                    zIndex: 50,
                })
                polygons.push(polygon)
                map.add(polygon)
            }
        }
        // 缩放地图到合适的视野级别
        map.setFitView(polygons)
        //adjust
        setTimeout(() => {
          map.setZoom(11)
        },500)
}
const getMarkersData = async () => {
  let res = await trade_interface8Request();
  const data = res.data.data;
  markersData.value = data;
  renderMarkersByData(data)
}
const renderMarkersByData = (deviceDatas) => {
        _layer && _layer.clear()
        let markers = [];
        for(let i=0; i<deviceDatas.length; i++){
            let item = deviceDatas[i]
            let iconUrl = item.tag && item.tag === '0' ? pointImg2 :pointImg
            let name = item.name;
            var curData = {
                name: name,
                position: [item.lon,item.lat],
                icon: {
                    type: 'image',
                    image: iconUrl,
                    size: [34, 50],
                    anchor: 'bottom-center',
                    angel: 0,
                    retina: true
                },
                extData: {
                    name: name,
                    uuid: item.uuid,
                    lon: item.lon,
                    lat: item.lat,
                    tag: item.tag
                },
              text: {
                  content: name,
                  direction: 'right',
                  zooms:[14,20],
                  style: {
                      fold: true,
                      fontSize: 14,
                      fillColor: '#6588be',
                      padding: [5, 10],
                      backgroundColor: '#03133e',
                      borderColor: '#062a46',
                      borderWidth: 1,
                  }
              }
            };
            let labelMarker = new _AMap.LabelMarker(curData);
            labelMarker.on('click', _handleMarker);
            markers.push(labelMarker)
        }
        // 一次性将海量点添加到图层
        _layer.add(markers);
}
const createMapText = (data) => {
      let _curText = null;
      _curText = new _AMap.Text({
        text: data.name,
        anchor:'top-left',
        cursor:'pointer',
        angle:0,
        offset: new _AMap.Pixel(20, -20),
        style: {
            padding: '5px 12px',
            border: 'none',
            'border-left': '4px solid #ff9232',
            'border-radius': '0',
            'background-image':
                'linear-gradient(to right, #513b5c , #353264)',
            'font-size': '16px',
            color: '#fff',
        },
        position: [data.lon,data.lat]
    });
    _curText.setMap(map);
}
const _handleMarker = (e) => {
  const data = e.target._opts.extData;
  let uuid = data.uuid
  let tag = data.tag;
  getPartInfos(uuid,tag)
}
const getPartInfos = async (uuid,tag) => {
  let uuid1 = null;
  if(tag === '0') {
    uuid1 = '17c325f9630111ec9cba7cd30ab799a4';
  } else {
    uuid1 = uuid
  }
  let res = await trade_interface9Request(uuid,uuid1);
  const data = res.data.data;

  partBase.value = data.data;
  brandStrengthList.value = data.brandStrengthList;
  let base = partBase.value;
  //初始化图表  
  const radarData = [
    parseInt(base.value2),
    parseInt(base.value3),
    parseInt(base.value4),
    parseInt(base.value5)
  ]
  const fznlData = data.fznl;
  const mygmData = data.mygm;
  const yxnlData = data.yxnl;
  dialogVisible.value = true;
  nextTick(() => {
    getCharts(radarData,fznlData,mygmData,yxnlData)
  })
}
const getCharts = (radarData,fznlData,mygmData,yxnlData) => {
  getRadarChart(radarData)
  getLineChart(mygmData)
  getBarChart1(fznlData)
  getBarChart2(yxnlData)
}

//弹出charts
const getRadarChart = (radarData) => {
  if(!_chart1) {
      _chart1 = echarts.init(document.getElementById("radar-chart"),'dark')
  } else {
    _chart1.clear();
  }

  let option = {
          color: ['#67F9D8', '#FFE434', '#56A3F1', '#FF917C'],
          backgroundColor: 'transparent',
          radar: {
              shape: 'circle',
              name: {
                  formatter: '{value}',
                  textStyle: {
                      color: '#fff',
                      padding: [4,4,12,4]
                  }
              },
              tooltip: {},
              radius: '50%',
              center: ['50%', '50%'],
              splitLine: {
                  lineStyle: {
                      color: '#1f5485'
                  }
              },
              splitArea: {
                  show: false
              },
              indicator: [
                  {name: '贸易规模', max: 25},
                  {name: '发展能力', max: 25},
                  {name: '营销能力', max: 25},
                  {name: '品牌能力', max: 25},
              ]
          },
          series: [{
              name: '综合能力',
              type: 'radar',
              data: [
                  {
                      name: '综合能力',
                      value: radarData,
                      areaStyle: {
                        color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
                          {
                            color: 'rgba(255, 145, 124, 0.1)',
                            offset: 0
                          },
                          {
                            color: 'rgba(255, 145, 124, 0.9)',
                            offset: 1
                          }
                        ])
                      },
                      label: {
                        show: true,
                        formatter: function (params) {
                          return params.value;
                        }
                      }
                  },
              ]
          }]
      };
      document.getElementById("radar-chart").setAttribute('_echarts_instance_', '')
      unwarp(_chart1).setOption(option)
}
const getLineChart = async (data) => {
  //图表初始化
  if(!_chart2) {
      _chart2 = echarts.init(document.getElementById("chart__body1"),'dark')
  } else {
    _chart2.clear();
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
        values.push(parseFloat(value).toFixed(2))
    })
    return {
      name: item.name,
      type: 'line',
      data: values
    }
  })
  //图表设置
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
        data: legends
      },
      tooltip: {
        trigger: 'axis'
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
  document.getElementById("chart__body1").setAttribute('_echarts_instance_', '')
  unwarp(_chart2).setOption(option);
}
const getBarChart1 = (data) => {
  //图表初始化
  if(!_chart3) {
      _chart3 = echarts.init(document.getElementById("chart__body2"),'dark')
  } else {
    _chart3.clear();
  }
  //图表数据解析
  let xTimeData = ['营收','利润'];
  let legends = [];
  const series = data.map((item) => {
    legends.push(item.name)
    let value1 = parseFloat(item.data.value1).toFixed(2)
    let value2 = parseFloat(item.data.value2).toFixed(2)
    return {
      name: item.name,
      type: 'bar',
      data: [value1, value2,]
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
        }
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
   document.getElementById("chart__body2").setAttribute('_echarts_instance_', '')
  unwarp(_chart3).setOption(option);
}
const getBarChart2 = (data) => {
  //图表初始化
  if(!_chart4) {
      _chart4 = echarts.init(document.getElementById("chart__body3"),'dark')
  } else {
    _chart4.clear();
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
        values.push(parseFloat(value).toFixed(2))
    })
    if(index === 0) {
      return  {
        name: item.name,
        type: 'line',
        data: values,
        yAxisIndex: 1
      }
    }
    return {
      name: item.name,
      type: 'bar',
      data: values
    }
  })
  // const series1 = series[0];
  // const series2 = series[1];
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
        }
      },
      xAxis: {
        data: xTimeData,
        axisLine: {
          lineStyle: {
            color: '#105188'
          }
        }
      },
      yAxis:[{
            type: 'value',
            axisLabel: {
              formatter: '{value}万元'
            }
        },{
            type: 'value',
        }
      ],
      series: series,
   }
  document.getElementById("chart__body3").setAttribute('_echarts_instance_', '')
  unwarp(_chart4).setOption(option);
}
const closeDialog = () => {
  dialogVisible.value = false;
}
onMounted(() => {
  initMap()
})
</script>

<template>
  <div class="map-wrap">
    <div class="map-container" id="container"></div>
    <div class="search-wrap">
      <el-input
        placeholder="请输入企业名称"
        prefix-icon="el-icon-search"
        v-model="input1">
      </el-input>
    </div>
    <div class="selects-wrap">
      <div class="select-item">
        <el-select v-model="select1" placeholder="请选择">
          <el-option
            v-for="item in select0ptions1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="select-item">
        <el-select v-model="select2" placeholder="请选择">
          <el-option
            v-for="item in select0ptions2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="select-item">
        <el-select v-model="select3" placeholder="请选择">
          <el-option
            v-for="item in select0ptions3"
            :key="item.id"
            :label="item.text"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="legends">
      <img src="../assets/imgs/map_qiye.png" alt="map_qiye">
      <span class="label">示范企业数</span>
      <span class="value">{{getVipPartCount}}家</span>
    </div>
    <el-dialog
        width="60%"
       :show-close="false"
       :visible="dialogVisible">
      <template v-slot:title>
        <div class="dialog__header" >
          <img src="../assets/imgs/dialog_com.png" alt="dialog_com">
          <span>{{partBase?.name}}</span>
          <div class="close" @click="closeDialog">
            <i class="el-icon-close"></i>
          </div>
        </div>
      </template>
      <template v-slot:default>
        <div class="base-infos">
          <div class="base-infos-top">
            <div class="top-left-panel">
              <div class="h3">
                <i class="dot"></i>
                <span>企业综合能力模型</span>
              </div>
              <div class="bg-wrap basic-infos-wrap">
                <div class="basic-infos">
                  <img src="../assets/imgs/dialog_code.png" alt="dialog_code">
                  <div class="basic-infos-score">
                    <p class="score-box">
                      <span>{{partBase?.value1}}</span>
                      <span>分</span>
                    </p>
                    <p class="score-desc">满分为100分</p>
                  </div>
                </div>
                <div class="radar-chart" id="radar-chart"></div>
              </div>
            </div>
            <div class="top-right-panel">
              <div class="right__top">
                <div class="h3">
                  <i class="dot"></i>
                  <span>基本信息</span>
                </div>
                <div class="content bg-wrap">
                  <div class="flex-row">
                    <div class="f-col-6">
                      <span>企业地址:</span>
                      <span>{{partBase?.address}}</span>
                    </div>
                    <div class="f-col-6">
                      <span>企业网址:</span>
                      <span><a :href="`${partBase?.website}`" target="_blank">{{partBase?.website}}</a></span>
                    </div>
                  </div>
                  <div class="flex-row">
                    <div class="f-col-6">
                      <span>所属行业:</span>
                      <span>{{partBase?.industry}}</span>
                    </div>
                    <div class="f-col-6">
                      <span>联系电话:</span>
                      <span>{{partBase?.phone}}</span>
                    </div>
                  </div>
                  <div class="flex-row">
                    <div class="f-col-6">
                      <span>法人代表:</span>
                      <span>{{partBase?.legalPerson}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="right__bottom">
                <div class="chart__item" v-if="isShowCharts">
                  <div class="h3">
                    <i class="dot"></i>
                    <span>贸易规模</span>
                  </div>
                  <div class="chart__body" id="chart__body1"></div>                  
                </div>
                <div class="chart__item" v-if="isShowCharts">
                  <div class="h3">
                    <i class="dot"></i>
                    <span>发展能力</span>
                  </div>
                  <div class="chart__body" id="chart__body2"></div>                  
                </div>
                <div class="chart__item" v-if="isShowCharts">
                  <div class="h3">
                    <i class="dot"></i>
                    <span>营销能力</span>
                  </div>
                  <div class="chart__body" id="chart__body3"></div>                  
                </div>
              </div>
            </div>
          </div>
          <div class="base-infos-bottom" v-show="isShowCharts">
              <div class="h3">
                <i class="dot"></i>
                <span>品牌能力</span>
              </div>
              <div class="bottom-content bg-wrap">
                <div class="item" v-for="item in brandStrengthList" :key="item">
                  <img :src="logoBlue" alt="">
                  <div class="text">{{item}}</div>
                </div>
              </div>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="less">
.base-infos {
    padding: 0 1rem;
    .bg-wrap {
      background-color: #0f1a43;
      padding: 1.5rem 2rem;
    }
    .h3 {
      height: 4rem;
      display: flex;
      align-items: center;
      .dot {
        display: block;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        margin-right: 1rem;
        background-color: #21a8eb;
      }
      >span {
        font-size: 16px;
        color: #fff;
      }
    }
    .base-infos-top {
      display: flex;
      .top-left-panel {
        flex-basis: 30rem;
        flex-shrink: 0;
        margin-right: 1rem;
        display: flex;
        flex-direction: column;
        .basic-infos-wrap {
          height: 37.3rem;
          display: flex;
          flex-direction: column;
        }
        .basic-infos {
          height: 13rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          >img {
            width: 7.4rem;
            height: 7.4rem;
          }
          .basic-infos-score {
              .score-box {
                &>span:first-child {
                  font-size: 3rem;
                  font-weight: 700;
                  color: #fff;
                }
                &>span:last-child {
                  padding-left: 4px;
                  font-size: 1.6rem;
                  color: #546398;
                }
              }
              .score-desc {
                  font-size: 1.6rem;
                  color: #546398;
              }
            }
        }
        .radar-chart {
          flex: 1;
          width: 100%;
        }
      }
      .top-right-panel {
        width: calc( 100% - 31rem);
        .right__top {
          .flex-row {
            margin-bottom: 1rem;
            span {
              font-size: 16px;
              color: #fff;
            }
            span:first-child {
              white-space: nowrap;
              font-size: 16px;
              color: #fff;
            }
            .f-col-6 {
              display: flex;
              align-items: center;
              &>span:first-child {
                  margin-right: 1rem;
              }
              a {
                color: #23b2f7;
                text-decoration: underline;
              }
            }
          }
        }
        .right__bottom {
          display: flex;
          justify-content: space-between;
          >.chart__item {
            width: 32%;
            .chart__body {
              height: 21rem;
              background-color: #0f1a43;
            }
          }
        }
      }
    }
    .base-infos-bottom {
      .bottom-content {
        height: 11rem;
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
        .item {
          flex-basis: 25%;
          display: flex;
          justify-content: center;
          align-items: center;
          >img {
            width: 3rem;
            height: 3rem;
            margin-right: 1rem;
          }
          .text {
            color: #fff;
            font-size: 16px;
            font-weight: 700;
          }
        }
      }
    }
}
.dialog__header {
  padding: 0 1rem;
  align-items: center;
  background-image: linear-gradient(to right, #133f82,#0a1336);
  height: 4rem;
  display: flex;
  >img {
    width: 20px;
    height: 19px;
    margin-right: 1rem;
  }
  >span {
    color: #fff;
    font-size: 2rem;
    font-weight: 700;
  }
  .close {
    cursor: pointer;
    margin-left: auto;
    color: #909399;
  }
}
.map-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 5px;
  .map-container {
    width: 100%;
    height: 100%;
  }
}
.search-wrap {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
}
.selects-wrap {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  display: flex;
  .select-item {
    margin-right: 1rem;
  }
  .select-item:last-child {
    margin-right: 0;
  }
}
.legends {
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  padding: 1rem 2rem;
  background: url(../assets/imgs/map_boa_qiye.png) no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  img {
    width: auto;
    height: auto;
  }
  .label {
    font-size: 16px;
    color: #00ffde;
    padding-left: 1rem;
    padding-right: 3rem;
  }
}
</style>
