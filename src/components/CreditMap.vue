<script setup>
import AMapLoader from '@amap/amap-jsapi-loader';
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
import { onMounted, shallowRef, ref } from 'vue';
let map = shallowRef(null);
const levHigh = ['委内瑞拉','哥伦比亚','危地马拉','朝鲜','阿富汗','伊朗','也门','希腊','阿尔巴尼亚','保加利亚','马其顿','塞尔维亚','波黑','利比亚','苏丹','乍得','尼日尔','波兰','立陶宛','马里','南苏丹','中非','喀麦隆','尼日利亚','津巴布韦','赞比亚','马达加斯加','索马里'];
const levlow = ['美国','缅甸','博茨瓦纳','新西兰','加拿大','沙特阿拉伯','澳大利亚','芬兰','意大利','日本','挪威','西班牙','韩国','瑞典','法国','泰国','英国','爱尔兰']
// const levMidle = ['澳大利亚']
const china = ['中国']
const listData = ref([
  {
    name: '据路透社25日报道，土耳其总统表示，政府采取措施保护里拉存款不受波动性影响，并补充称仍将继续实施低利率经济计划',
    time: '2021-12-25 09:45:00'
  },
  {
    name: '据路透社报道，日本政府24日发布数据显示，日本11月核心CPI同比增长0.5%，创下近两年来最快的增长速度，全球商品价格上涨的影响正在扩大',
    time: '2021-12-24 10:56:00'
  },
  {
    name: '据彭博社报道，由于疫情导致了人员短缺问题，美国的航空公司25日取消了数百趟航班，目前尚不清楚何时能恢复正常运营',
    time: '2021-12-25 06:35:00'
  },
  {
    name: '据俄新社当地时间12月27日报道，俄罗斯央行将从2022年开始，对信贷机构的所有个人间资金流动进行监控',
    time: '2021-12-27 11:34:00'
  },
  {
    name: '据路透社25日报道，土耳其总统表示，政府采取措施保护里拉存款不受波动性影响，并补充称仍将继续实施低利率经济计划',
    time: '2021-12-25 09:45:00'
  },
  {
    name: '据路透社报道，日本政府24日发布数据显示，日本11月核心CPI同比增长0.5%，创下近两年来最快的增长速度，全球商品价格上涨的影响正在扩大',
    time: '2021-12-24 10:56:00'
  },
  {
    name: '据彭博社报道，由于疫情导致了人员短缺问题，美国的航空公司25日取消了数百趟航班，目前尚不清楚何时能恢复正常运营',
    time: '2021-12-25 06:35:00'
  },
  {
    name: '据俄新社当地时间12月27日报道，俄罗斯央行将从2022年开始，对信贷机构的所有个人间资金流动进行监控',
    time: '2021-12-27 11:34:00'
  },
])
const initMap = () => {
      AMapLoader.load({
          key:"47924524bbca6c9ae37aeb1379700d87",
          version:"2.0",     
          plugins:[],      
      }).then((AMap)=>{
    var dis = new AMap.DistrictLayer.World({
        zIndex: 10,
        styles: {
            'stroke-width': 0.8,
            'fill': function (d) {
              if(levHigh.includes(d.NAME_CHN)) {
                return '#c4352a';
              }
              if(china.includes(d.NAME_CHN)) {
                return '#ff8b86';
              }
              if(levlow.includes(d.NAME_CHN)) {
                return '#20b855';
              }
              return '#e0af38'
            },
            'city-stroke': '#999',
            'county-stroke': function (d) {
                if (d.type === 'Nation_Border_China') {
                    return '#ff8b86';
                }
                return '#ff8b86';
            },
            'province-stroke': '#fff',
            'coastline-stroke': function (d) {
                if (d.type === 'Coastline_China') {
                    return '#ff8b86';
                }
                return '#ccc';
            },
            'nation-stroke': function (d) {
                if (d.type === 'Nation_Border_China') {
                    return '#ff8b86';
                }
                return '#fff';
            },
        }
    });
    //创建地图
    map = new AMap.Map("map-container",{
        zoom: 2,           
        center:[105.602725,37.076636],
        mapStyle: "amap://styles/darkblue" 
    });

    map.add(dis);
  }).catch(e=>{
      console.log(e);
  })
}
onMounted(() => {
  initMap()
})
</script>

<template>
<div class="map-wrap-vue">
  <div class="map-legend">
    <h2>当前风险地区</h2>
    <div class="le-item">
      <i class="item-icon red"></i>
      <span>高风险</span>
      <span>{{levHigh.length}}</span>
    </div>
    <div class="le-item">
      <i class="item-icon yellow"></i>
      <span>中风险</span>
      <span>{{151}}</span>
    </div>
    <div class="le-item">
      <i class="item-icon green"></i>
      <span>低风险</span>
      <span>{{levlow.length}}</span>
    </div>
  </div>
  <div class="map-text-wrap">
    <vue3-seamless-scroll
      class="map-text"
      :hover="true"
      :step="0.3"
      :list="listData">
        <ul>
          <li 
          class="map-text-item" 
          v-for="(item,index) in listData" 
          :key="index">
            <i class="fa fa-volume-up"></i>
            <p class="text">{{item.name}}</p>
            <span>{{item.time}}</span>
          </li>
        </ul>
    </vue3-seamless-scroll>
  </div>
  <div class="map" id="map-container"></div>
</div>
</template>

<style scoped lang="less">
.map-wrap-vue {
  position: relative;
  height: 100%;
  .map-legend {
    position:absolute;
    right: 1rem;
    bottom: 1rem;
    padding: 1rem 2rem;
    z-index: 999;
    border: 1px solid #2485e1;
    background-color: #001951;
    >h2 {
      font-size: 1.6rem;
      color: #5e72a5;
      margin-bottom: 1.5rem;
    }
    .le-item {
      margin-bottom: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      >i {
        display: block;
        width: 1rem;
        height: 1rem;
      }
      >i.red {
        background-color: #e33830;
      } 
      >i.yellow {
        background-color: #f6c80a;
      }
      >i.green {
        background-color: #6f9c3d;
      }
      >span {
        font-size: 1.6rem;
        color: #9ab1e9;
        width: 6rem;
      }
    }
  }

  .map-text-wrap {
    z-index: 999;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #041c58;
    .map-text {
      position: relative;
      height: 4rem;
      overflow: hidden;
    }
    .map-text-item {
      height: 4rem;
      padding: 0 2rem;
      display: flex;
      align-items: center;
      font-size: 1.6rem;
      i {
        font-size: 2rem;
        color: #50c7ff;
      }
      .text {
        text-align: left;
        padding: 0 1rem;
        width: 70%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #50c7ff;
      }
      >span {
        color: #9ab1e9;
        margin-left: auto;
      }
    }
  }
  .map {  
    width: 100%;
    height: 100%;
  }
}
</style>
