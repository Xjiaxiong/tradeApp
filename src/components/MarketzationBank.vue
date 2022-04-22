<script setup>
// const dataMock = {
//   '0':{
//     val1: 52,
//     val2: 3756,
//     val3: 1306,
//     val4: 43,
//   },
//   '1':{
//     val1: 160,
//     val2: 7968,
//     val3: 2206,
//     val4: 142,
//   },
//   '2':{
//     val1: 453,
//     val2: 35475,
//     val3: 5650,
//     val4: 420,
//   },
// }
//模拟数据
const dataMock = {
  '0':{
    val1: 26,
    val2: 2105,
    val3: 3370,
    val4: 43,
  },
  '1':{
    val1: 160,
    val2: 7968,
    val3: 2206,
    val4: 142,
  },
  '2':{
    val1: 453,
    val2: 89546,
    val3: 251250,
    val4: 420,
  },
}
import { ref, getCurrentInstance, inject, onMounted } from 'vue'
import CountToLoopVue from '../components/CountToLoop.vue';
import logo1 from '../assets/imgs/sig_qiye.png'
import logo2 from '../assets/imgs/sig_zijin.png'
const tabIndex = ref(0);
const data = ref(dataMock['0'])
const clickTabItem = (index) => {
  tabIndex.value = index;
  if(index === 1) {
    data.value = dataMock[0]
  } else {
    data.value = dataMock[index]
  }
  
}
</script>

<template>
    <div class="bank-bg">
        <div class="tabs">
            <span :class="{curr: tabIndex === 0}" @click="clickTabItem(0)">当月</span>
            <span :class="{curr: tabIndex === 1}" @click="clickTabItem(1)">当月</span>
            <span :class="{curr: tabIndex === 2}" @click="clickTabItem(2)">去年</span>
        </div>
        <div class="bank-items">
            <div class="bank-item">
                <img :src="logo1" alt="">
                <p class="count"><CountToLoopVue :endVal="data.val1" /></p>
                <p class="label">融资企业数</p>
            </div>
            <div class="bank-item">
                <img :src="logo2" alt="">
                <p class="count"><CountToLoopVue :endVal="data.val2" /></p>
                <p class="label">订单融资额(万元)</p>
            </div>
            <div class="bank-item">
                <img :src="logo2" alt="">
                <p class="count"><CountToLoopVue :endVal="data.val3" /></p>
                <p class="label">质押融资额(万元)</p>
            </div>
            <!-- <div class="bank-item">
                <img :src="logo1" alt="">
                <p class="count"><CountToLoopVue :endVal="data.val4" /></p>
                <p class="label">已服务企业数</p>
            </div> -->
        </div>
    </div>    
</template>

<style scoped lang="less">
.bank-bg {
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
.bank-items {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .bank-item {
        border-radius: 6px;
        width: 32%;
        height: 16rem;
        border: 1px solid #225ca7;
        background-image: linear-gradient(to bottom, #060937,#0d2869);
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        >img {
            width: 6rem;
            height: 6rem;
            margin: 1rem auto;
        }
        .count {
            color: #fff;
            font-size: 2.2rem;
            font-weight: 700;
        }
        .label {
            font-size: 1.6rem;
            color: #6f7da1;
        }
    }
}
</style>