<script setup>
import AppMapVue from './AppMap.vue';
import { ref, onMounted } from 'vue'
import { trade_interface7Request, trade_PartCodeRequest } from '../utils/http'
import { unwarp, getNumber } from '../utils/kits'
import CountToLoopVue from './CountToLoop.vue';
let topData = ref(null)
let codeObj = ref(null)
const getTopCenterData = async () => {
  let res = await trade_interface7Request();
  topData.value = res.data.data;
}
const getCodeObj= async () => {
  let res = await trade_PartCodeRequest();
  let data = res.data.data;
  let obj = {
    redCount: 0,
    yellowCount: 0,
    greenCount: 0
  }
  data.map(item => {
    if(item.typeText === "红码") {
      obj.redCount = item.value
    }
    if(item.typeText === "黄码") {
      obj.yellowCount = item.value
    }
    if(item.typeText === "绿码") {
      obj.greenCount = item.value
    }
  })
  codeObj.value = obj;
}
onMounted(() => {
    getTopCenterData()
    getCodeObj() 
})
</script>

<template>
  <div class="map-border-wrap">
    <div class="bg-border">
      <div class="top-infos">
        <el-popover
          placement="bottom"
          width="230"
          trigger="hover">
            <div class="pop-box">
              <div class="pop-h1">内贸总额</div>
              <div class="infos-row">
                <div class="infos__left">
                  <span>{{topData?.value9}}</span>
                  <span>亿元</span>
                </div>
                <div class="infos__right">
                  <span>同比</span>
                  <span>{{topData?.value10}}</span>
                  <span class="arrow__icon arrow_up"></span>
                </div>  
              </div>
              <div class="pop-h1">外贸总额</div>
              <div class="infos-row">
                <div class="infos__left">
                  <span>{{topData?.value11}}</span>
                  <span>亿元</span>
                </div>
                <div class="infos__right">
                  <span>同比</span>
                  <span>{{topData?.value12}}</span>
                  <span class="arrow__icon arrow_up"></span>
                </div>  
              </div>  
            </div> 
            <template #reference>
              <div class="infos-item">
              <img src="../assets/imgs/map_data_maoyi.png" alt="map_data_maoyi">
              <div class="infos-con">
                <div class="label-panel">
                  <span class="text">贸易额</span>
                  <span class="text-desc">同比</span>
                  <span class="text-rate">{{topData?.value8}}</span>
                  <span class="arrow__icon arrow_up"></span>
                </div>
                <div class="value-panel">
                  <span class="text color__yellow"> <CountToLoopVue :decimals="2" :endVal="getNumber(topData?.value7)" />亿元</span>
                </div>
              </div>
            </div>
          </template>
        </el-popover>
        <el-popover
          placement="bottom"
          width="260"
          trigger="hover">
        <div class="pop-box">
          <p class="pop-row-infos">内贸企业数:<span class="color__blue">{{topData?.value14}}</span>家</p>
          <p class="pop-row-infos">外贸企业数:<span class="color__blue">{{topData?.value15}}</span>家</p>
          <p class="pop-row-infos">内外贸一体化企业数:<span class="color__blue">{{topData?.value16}}</span>家</p>
        </div>
        <template #reference>
          <div class="infos-item">
            <img src="../assets/imgs/map_data_qiye.png" alt="map_data_qiye">
            <div class="infos-con">
              <div class="label-panel">
                <span class="text">企业数</span>
              </div>
              <div class="value-panel">
                <span class="text color__blue">
                  <CountToLoopVue :endVal="getNumber(topData?.value13)" />家
                </span>
              </div>
            </div>
          </div>
        </template>
        </el-popover>
        <div class="infos-item">
          <img src="../assets/imgs/map_data_qiyema.png" alt="map_data_qiyema">
          <div class="infos-con">
            <div class="label-panel">
              <span class="text adjust-font">企业码</span>
            </div>
            <div class="value-panel">
              <div class="codes">
                <div class="code-item">
                  <img src="../assets/imgs/code_red.png" alt="code_red">
                  <span>
                    <CountToLoopVue :startVal="0" :endVal="getNumber(codeObj?.redCount)" />
                  </span>
                </div>
                <div class="code-item">
                  <img src="../assets/imgs/code_yel.png" alt="code_yel">
                  <span>
                    <CountToLoopVue :startVal="0" :endVal="getNumber(codeObj?.yellowCount)" />
                  </span>
                </div>
                <div class="code-item">
                  <img src="../assets/imgs/code_gre.png" alt="code_gre">
                  <span>
                    <CountToLoopVue :startVal="0" :endVal="getNumber(codeObj?.greenCount)" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="map-container">
        <AppMapVue />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
  .pop-box {
    color: #fff;
    .pop-h1 {
      font-size: 16px;
      line-height: 32px;
    }
    .infos-row {
      display: flex;
      justify-content: space-between;
      span {
        font-size: 14px;
      }
      .infos__left {
        display: flex;
        align-items: center;
        &>span:first-child {
          color: #f4b122;
          padding-right: 4px;
        }
      }
      .infos__right {
        display: flex;
        align-items: center;
        &>span:first-child {
          color: #656c82;
          padding-right: 4px;
        }
      }
    }
    .pop-row-infos {
      line-height: 32px;
      font-size: 16px;
      >span {
        font-weight: 700;
        padding: 0 4px;
      }
    }
  }
  .map-border-wrap {
    width: 46%;
    height: 56rem;
    overflow: hidden;
    padding: 0 2rem;
  }
  .bg-border {
    position: relative;
    height: 100%;
    width: 100%;
    background: url(../assets/imgs/web_boa_map_bg.png) no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    .map-container {
      flex: 1;
    }
  }
  .top-infos {
    height: 9.8rem;
    display: flex;
    justify-content: space-evenly;
    padding: 2rem 2rem 1rem 2rem;
    .infos-item {
      display: flex;
      align-items: center;
      >img {
        width: 5.8rem;
        height: 5.8rem;
        margin: 0 1rem;
      }
      .infos-con {
        display: flex;
        flex-direction: column;
        .label-panel {
          display: flex;
          align-items: center;
          padding-bottom: 1rem;
          .text {
            font-size: 2rem;
            color:#fff;
            font-weight: 700;
          }
          .adjust-font {
            position: relative;
            top: -5px;
          }
          .text-desc {
            padding: 0 5px 0 1rem;
            font-size: 16px;
            color:#656c83;
          }
          .text-rate {
            font-size: 16px;
            color:#fff;           
          }
        }
        .value-panel {
          display: flex;
          align-items: center;
          .text {
            font-size: 2.2rem;
            font-weight: 700;
          }
          .codes {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .code-item {
              display: flex;
              padding-right: 1.5rem;
              >img {
                width: 1.8rem;
                height: 1.8rem;
              }
              >span {
                font-size: 1.8rem;
                color: #fff;
                padding: 0 4px;
              }
            }
          }
        }
      }
    }
  }
</style>
