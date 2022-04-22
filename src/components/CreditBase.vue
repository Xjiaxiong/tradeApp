<script setup>
import { getNumber } from '../utils/kits'
import CountToLoopVue from './CountToLoop.vue';
import logo1 from '../assets/imgs/waimao_icon.png';
import logo2 from '../assets/imgs/neimao_icon.png';
const data = {
    value1: 479,
    value2: 956,
    value3: 1437,
    value4: 3113,
    value5: 31,
    value6: 66,
    value7: 136,
}
</script>
<template>
    <div class="base-panel">
        <div class="base-top">
            <img :src="logo1" alt="logo1">
            <div class="base-top-info">
                <div class="count"><CountToLoopVue :endVal="getNumber(data.value1)" /></div>
                <div class="label">出口投保企业数</div>
            </div>
        </div>
        <div class="list-p">
            <p>
                <span class="list-p-name">"资信红绿灯"查询数</span>
                <span class="list-p-value"><CountToLoopVue :endVal="getNumber(data.value2)" /></span>
            </p>
            <p>
                <span class="list-p-name">客户查询数</span>
                <span class="list-p-value"><CountToLoopVue :endVal="getNumber(data.value3)" /></span>
            </p>
            <p>
                <span class="list-p-name">"风险预警"点击数</span>
                <span class="list-p-value"><CountToLoopVue :endVal="getNumber(data.value4)" /></span>
            </p>
        </div>
        <div class="base-top">
            <img :src="logo2" alt="logo2">
            <div class="base-top-info blue">
                <div class="count"><CountToLoopVue :endVal="getNumber(data.value5)" /></div>
                <div class="label">内贸投保企业数</div>
            </div>
        </div>
        <div class="list-p">
            <p>
                <span class="list-p-name">客户查询数</span>
                <span class="list-p-value"><CountToLoopVue :endVal="getNumber(data.value6)" /></span>
            </p>
            <p>
                <span class="list-p-name">"风险预警"点击数</span>
                <span class="list-p-value"><CountToLoopVue :endVal="getNumber(data.value7)" /></span>
            </p>
        </div>
    </div>
</template>
<style scoped lang="less">
    .base-panel {
        padding: 2rem;
        flex: 1;
        .base-top {
            display: flex;
            height: 10rem;
            align-items: center;
            >img {
                height: 8rem;
                width: 8rem;
                margin-right: 1.5rem;
            }
            .base-top-info {
                background: url(../assets/imgs/yel_bg.png) no-repeat;
                background-size: 100% auto;
                background-position: top center;
                .count {
                    font-size: 2.4rem;
                    color: #fff;
                    font-weight: 700;
                    line-height: 1.4;
                    letter-spacing: 2px;
                }
                .label {
                    font-size: 2rem;
                    color:#a9b8dc;
                }
            }
            .base-top-info.blue {
                background-image: url(../assets/imgs/blu_bg.png);
            }
        }
        .list-p {
            >p {
                display: flex;
                justify-content: space-between;                
                margin-bottom: 2rem;
                .list-p-name {
                    font-size: 1.8rem;
                    color: #6579ae;
                }
                .list-p-value {
                    font-size: 2rem;
                    color: #fff;
                    font-weight: 700;
                }
            }
        }
        .list-p:last-child {
            margin-bottom: 0;
        }
    }
</style>