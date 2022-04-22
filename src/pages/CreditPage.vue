<script setup>
import CreditTitleVue from '../components/CreditTitle.vue';
import CreditListVue from '../components/CreditList.vue';
import CreditMapVue from '../components/CreditMap.vue';
import CreditBaseVue from '../components/CreditBase.vue';
import CreditCenterVue from '../components/CreditCenter.vue';
import CreditFlowItemVue from '../components/CreditFlowItem.vue';
import { listData, listDetails } from '../utils/mockCredit'
import { getNumber } from '../utils/kits'
import CountToLoopVue from '../components/CountToLoop.vue';
import { ref } from 'vue'
const flow1 = {
    imgIndex: 1,
    count: '505',
    countText: '投保申请(单)',
    oldTime: '48小时',
    newTime: '1小时',
    layoutTwo: false,
    rate: '56%'
}
let dialogVisible = ref(false);
let partBase = ref(listDetails['005'])
const closeDialog = () => {
  dialogVisible.value = false;
}
const clickListRow = (e) => {
  return
  const uuid = e.target.dataset.uuid;
  dialogVisible.value = true;
}
</script>

<template>
  <div class="main-body">
    <div class="body-top">
      <div class="sider-left panel-border-bg">
        <CreditTitleVue title="信保投保企业" />
        <CreditBaseVue />
      </div>
      <div class="body-center">
        <div class="body-center-con panel-border-bg">
          <CreditCenterVue />
        </div>
      </div>
      <div class="sider-right panel-border-bg">
        <CreditTitleVue title="信保服务机构" />
        <ul class="sider__con">
          <li>
            <p class="count"><CountToLoopVue :endVal="3020" /></p>
            <p class="label">"风险预警"信息发布(条)</p>
          </li>
          <li>
            <p class="count"><CountToLoopVue :endVal="956" /></p>
            <p class="label">信保政策智能推送(条)</p>
          </li>
          <li>
            <p class="count"><CountToLoopVue :endVal="3629" /></p>
            <p class="label">保单融资推送（次）</p>
          </li>
          <li>
            <p class="count color__yellow"><CountToLoopVue :endVal="26405" /></p>
            <p class="label">保单授信金额(万元)</p>
          </li>
          <li>
            <p class="count"><CountToLoopVue :endVal="1298" /></p>
            <p class="label">资金申报推送(次)</p>
          </li>
          <li>
            <p class="count color__yellow"><CountToLoopVue :endVal="397" /></p>
            <p class="label">保费支持金额(万元)</p>
          </li>
          <li>
            <p class="count color__purple"><CountToLoopVue :endVal="209" /></p>
            <p class="label">宣传活动(次)</p>
          </li>
          <li>
            <p class="count color__green"><CountToLoopVue :endVal="29037" /></p>
            <p class="label">活动参与数(人次)</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="body-bottom">
      <div class="body-bottom-item panel-border-bg">
        <CreditListVue 
        :listData="listData" 
        :clickRow="clickListRow"/>
      </div>
      <div class="body-bottom-item panel-border-bg map-panel">
        <CreditTitleVue title="全球贸易风险预警图" />
        <div class="map-wrap">
          <CreditMapVue />
        </div>
      </div>
    </div>
    <!-- 弹窗-UI -->
    <el-dialog
      width="130rem"
      :show-close="false"
      :visible="dialogVisible">
      <template v-slot:title>
        <div class="dialog__header" >
          <span>{{partBase?.name}}</span>
          <div class="close" @click="closeDialog">
            <i class="el-icon-close"></i>
          </div>
        </div>
      </template>
      <template v-slot:default>
          <div class="pop-content">
            <h3 class="h3">
              <i class="dot"></i>
              <span>业务流程</span>
            </h3>
            <div class="pop-flows-wrap">
              <div class="pop-flows">
                <div class="pop-flows-item">
                  <div class="left__title">信用保险</div>
                  <div class="right__content">
                    <CreditFlowItemVue :msgs="partBase.process[0]"/>
                    <div class="arrows arrows-right"></div>
                    <CreditFlowItemVue :msgs="partBase.process[1]"/>
                    <div class="arrows arrows-right"></div>
                    <CreditFlowItemVue :msgs="partBase.process[2]"/>
                    <div class="arrows-gap"></div>
                    <CreditFlowItemVue :msgs="partBase.process[3]"/>
                    <div class="arrows arrows-right"></div>
                    <CreditFlowItemVue :msgs="partBase.process[4]"/>
                  </div>
                </div>

                <div class="pop-flows-item">
                  <div class="left__title">银行融资</div>
                  <div class="right__content">
                    <div class="pop_layout_hide">
                      <CreditFlowItemVue :msgs="flow1"/>
                      <div class="arrows arrows-right"></div>
                    </div>
                    <div class="pop_layout_hide">
                      <CreditFlowItemVue :msgs="flow1"/>
                      <div class="arrows arrows-right"></div>
                    </div>
                    <div class="pop_layout_hide">
                      <CreditFlowItemVue :msgs="flow1"/>
                    </div>
                    <div class="arrows-gap"></div>
                    <CreditFlowItemVue :msgs="partBase.process[5]"/>
                  </div>
                </div>

                <div class="pop-flows-item">
                  <div class="left__title">资金兑现</div>
                  <div class="right__content">
                    <div class="pop_layout_hide">
                      <CreditFlowItemVue :msgs="flow1"/>
                      <div class="arrows arrows-right"></div>
                    </div>
                    <div class="pop_layout_hide">
                      <CreditFlowItemVue :msgs="flow1"/>
                      <div class="arrows arrows-right"></div>
                    </div>
                    <div class="pop_layout_hide">
                      <CreditFlowItemVue :msgs="flow1"/>
                    </div>
                    <div class="arrows-gap"></div>
                    <CreditFlowItemVue :msgs="partBase.process[6]"/>
                  </div>
                </div>
              </div>
              <div class="pop-line"></div>
            </div>
            <div class="pop-targets">
              <div class="pop-targets-item-one">
                <div class="pop-targets-item-one_box">
                    <h3 class="h3">
                      <i class="dot"></i>
                      <span>是否投保出口信保</span>
                      <span class="answer-value-text right">{{partBase.valuea}}</span>
                    </h3>
                    <div class="targets-values">
                      <div class="targets-values-item">
                        <div class="targets-values-item_label">投保金额(万元)</div>
                        <div class="targets-values-item_value">{{partBase.value1}}</div>
                      </div>
                      <div class="targets-values-item">
                        <div class="targets-values-item_label">保费(万元)</div>
                        <div class="targets-values-item_value">{{partBase.value2}}</div>
                      </div>
                      <div class="targets-values-item">
                        <div class="targets-values-item_label">出运申请次数</div>
                        <div class="targets-values-item_value">{{partBase.value3}}</div>
                      </div>
                      <div class="targets-values-item">
                        <div class="targets-values-item_label">买家所在地</div>
                        <div class="targets-values-item_value">{{partBase.value4}}</div>
                      </div>
                    </div>                  
                </div>
                <div class="pop-targets-item-one_box">
                    <h3 class="h3">
                      <i class="dot"></i>
                      <span>是否投保内贸信保</span>
                      <span class="answer-value-text right">{{partBase.valueb}}</span>
                    </h3>
                    <div class="targets-values">
                      <div class="targets-values-item">
                        <div class="targets-values-item_label">投保金额(万元)</div>
                        <div class="targets-values-item_value">{{partBase.value5}}</div>
                      </div>
                      <div class="targets-values-item">
                        <div class="targets-values-item_label">保费(万元)</div>
                        <div class="targets-values-item_value">{{partBase.value6}}</div>
                      </div>
                      <div class="targets-values-item">
                        <div class="targets-values-item_label">出运申请次数</div>
                        <div class="targets-values-item_value">{{partBase.value7}}</div>
                      </div>
                      <div class="targets-values-item">
                        <div class="targets-values-item_label">买家所在地</div>
                        <div class="targets-values-item_value">{{partBase.value8}}</div>
                      </div>
                    </div>                  
                </div>
              </div>
              <div class="pop-targets-item-one">
                <div class="pop-targets-item-one_box">
                    <h3 class="h3">
                      <i class="dot"></i>
                      <span>是否保单融资</span>
                      <span class="answer-value-text right">{{partBase.valuec}}</span>
                    </h3>
                    <div class="targets-values">
                      <div class="targets-values-item half">
                        <div class="targets-values-item_label">授信金额(万元)</div>
                        <div class="targets-values-item_value">{{partBase.value9}}</div>
                      </div>
                      <div class="targets-values-item half">
                        <div class="targets-values-item_label">申请金额(万元)</div>
                        <div class="targets-values-item_value">{{partBase.value10}}</div>
                      </div>
                    </div>                  
                </div>
                <div class="pop-targets-item-one_box">
                    <h3 class="h3">
                      <i class="dot"></i>
                      <span>是否申请保费补助</span>
                      <span class="answer-value-text right">{{partBase.valued}}</span>
                    </h3>
                    <div class="targets-values">
                      <div class="targets-values-item half">
                        <div class="targets-values-item_label">系统测算金额(万元)</div>
                        <div class="targets-values-item_value">{{partBase.value11}}</div>
                      </div>
                      <div class="targets-values-item half">
                        <div class="targets-values-item_label">申请金额(万元)</div>
                        <div class="targets-values-item_value">{{partBase.value12}}</div>
                      </div>
                    </div>                  
                </div>
              </div>
            </div>
          </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="less">
  .main-body {
    color: #fff;
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
  .body-top {
    height: 51rem;
    padding-top: 1rem;
    display: flex;
    .sider-left,
    .sider-right {
      width: 41rem;
      height: 100%;
      overflow: hidden;
    }
    .sider-left {
      display: flex;
      flex-direction: column;     
    }
    .sider-right {
      display: flex;
      flex-direction: column;
      .sider__con {
        flex: 1;
        padding: 2rem 1rem;
        display: flex;
        flex-wrap: wrap;
        align-content: space-around;
        >li {
          height: 8.4rem;
          width: 49%;
          border: 1px solid #173e95;
          margin-right: 2%;
          padding: 1rem 0;
          text-align: center;
          border-radius: 4px;
          .count {
            font-size: 2.4rem;
            line-height: 1.4756;
            color:#19ccff;
            font-weight: 700;
          }
          .label {
            font-size: 1.6rem;
            color: #4a659d;
          }
        }
        >li:nth-child(2n) {
          margin-right: 0;
        }
      }
    }
    .body-center {
      padding: 0 2rem;
      height: 100%;
      flex: 1;
      .body-center-con {
        position: relative;
        height: 100%;
      }
    }
  }
  .body-bottom {
    padding-top: 1rem;
    height: 41rem;
    display: flex;
    justify-content: space-between;
    .body-bottom-item {
      width: 49.5%;
      height: 100%;
    }
    .map-panel {
      display: flex;
      flex-direction: column;
      .map-wrap {
        flex: 1;
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
  .pop-content {
    background-color: #030f27;
    padding: 1rem 0;
    .h3 {
      height: 4rem;
      display: flex;
      align-items: center;
      padding-left: 1rem;
      .dot {
        display: block;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        margin-right: 1rem;
        background-color: #2accff;
      }
      >span {
        font-size: 16px;
        color: #fff;
      }
      .answer-value-text {
        padding-left: 1.5rem;
        color: #fff;
      }
      .answer-value-text.right {
        color: #007fdd;
      }
    }
    .pop-flows-wrap {
      position: relative;
    }
    .pop-flows {
      padding: 2rem 0;
      .pop-flows-item {
        height: 14rem;
        display: flex;
        margin-bottom: 1rem;
        background-color: #04163a;
        .left__title {
          width: 40px;
          height: 100%;
          color: #799ee2;
          background-color: #032763;
          margin-right: 2rem;
          padding-right: 10px;
          writing-mode: tb-rl;
          text-align: center;
        }
        .right__content {
          display: flex;
          align-items: center;
          height: 100%;
        }
      }
      .pop-flows-item:last-child {
        margin-bottom: 0;
      }
    }
  }
  .arrows {
      width: 2.4rem;
      height: 2.4rem;
      background-size: 100% 100%;
  }
  .arrows-right {
      margin: 0 5px;
      background: url(../assets/imgs/arr_left.png) no-repeat;
  }
  .arrows-gap {
    width: 0;
    height: 0;
    margin: 0 1.5rem;
  }
  .pop_layout_hide {
    display: flex;
    opacity: 0;
  }
  .pop-line {
    position: absolute;
    left: 77rem;
    top: 11rem;
    width: 1.6rem;
    height: 25rem;
    background: url(../assets/imgs/arr_pop.png) no-repeat;
    background-size: 100% 100%;
  }
  .pop-targets {
    padding: 1rem 2rem;
    padding-top: 0;
    .pop-targets-item-one {
      display: flex;
      justify-content: space-between;
      .pop-targets-item-one_box {
        flex-basis: 48%;
        .targets-values {
          display: flex;
          justify-content: space-between;
          .half.targets-values-item {
            flex-basis: 49%;            
          }
          .targets-values-item {
            flex-basis: 24.5%;
            text-align: center;
            .targets-values-item_label {
              height: 3rem;
              line-height: 3rem;
              background-color: #041839;
              color: #425f81;
              margin-bottom: 2px;
            }
            .targets-values-item_value {
              height: 3rem;
              line-height: 3rem;
              color: #fff;
              background-color: #04122d;
            }
          }
        }
      }
    }
  }
</style>
