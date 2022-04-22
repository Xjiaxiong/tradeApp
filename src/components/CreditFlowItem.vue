<script setup>
import logo1 from '../assets/imgs/lin_1.png'
import logo2 from '../assets/imgs/lin_2.png'
import logo3 from '../assets/imgs/lin_3.png'
import logo4 from '../assets/imgs/lin_4.png'
import logo5 from '../assets/imgs/lin_5.png'
import logo6 from '../assets/imgs/lin_6.png'
import { getNumber } from '../utils/kits'
import CountToLoopVue from './CountToLoop.vue';
defineProps({
  msgs: Object
})
const getImgSrc = index => {
    if(index == '1') {
        return logo1
    }
    if(index == '2') {
        return logo2
    }
    if(index == '3') {
        return logo3
    }
    if(index == '4') {
        return logo4
    }
    if(index == '5') {
        return logo5
    }
    if(index == '6') {
        return logo6
    }
}
</script>
<template>
    <div class="flow-panel" :style="{height: msgs.isNoBottom === true ? '8rem': '11.5rem' }">
        <div class="flow-top">
            <img :src="getImgSrc(msgs.imgIndex)" :alt="`lin_${msgs.imgIndex}`">
            <div class="flow-top-info" v-if="!msgs.isNoCount">
                <p class="count" v-if="isNaN(parseInt(msgs.count))">{{msgs.count}}</p>
                <p class="count" v-else-if="msgs.decimals === true"><CountToLoopVue :endVal="getNumber(msgs.count)" :decimals="1" /></p>
                <p class="count" v-else><CountToLoopVue :endVal="getNumber(msgs.count)" /></p>
                <p class="label">{{msgs.countText}}</p>
            </div>
            <div class="flow-top-info-other" v-if="msgs.isNoCount">
                出运申请{{msgs.lastCount}}次
            </div>
        </div>
        <div class="flow-bottom" v-if="!msgs.layoutTwo && !msgs.isNoBottom">
            <div class="bottom-box">
                <p class="bottom_box__label">改革前</p>
                <p class="bottom_box__text">{{msgs.oldTime}}</p>
            </div>
            <i class="fa fa-angle-double-right"></i>
            <div class="bottom-box">
                <p class="bottom_box__label">改革后</p>
                <p class="bottom_box__text hour">{{msgs.newTime}}</p>
            </div>
        </div>
        <div class="flow-bottom-text" v-if="msgs.layoutTwo && !msgs.isNoBottom">
            同比提升<span>{{msgs.rate}}</span>
        </div>
    </div>
</template>
<style scoped lang="less">
    .flow-panel {
        height: 11.5rem;
        width: 21rem;
        border-radius: 4px;
        border: 1px solid #173e94;
        padding: 1rem 2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .flow-top {
            display: flex;
            text-align: left;
            align-items: center;
            >img {
                height: 4rem;
                width: 4rem;
                margin-right: 1rem;
            }
            .flow-top-info-other {
                font-size: 2rem;
                color: #fff;
                line-height: 1.4;
                >span {
                    font-size: 2rem;
                    color: #67b045;
                    font-weight: 700;
                }                
            }
            .count {
                font-size: 2rem;
                color: #fff;
                font-weight: 700;
                line-height: 1.4;
            }
            .label {
                font-size: 1.6rem;
                color:#4a6198;
            }
        }
        .flow-bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .fa-angle-double-right {
                font-size: 2.4rem;
                color: #0f2d68;
            }
            .bottom_box__label {
                font-size: 1.6rem;
                color:#4a6198;               
            }
            .bottom_box__text {
                font-size: 1.4rem;
                color:#257fd3;                 
            }
            .bottom_box__text.hour {
                color:#83b240;                 
            }
        }
        .flow-bottom-text {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.6rem;
            color: #445c93;
            >span {
                color: #154688;
                padding: 0 1rem;
                position: relative;
                top: 1px;
            }
        }
    }
</style>