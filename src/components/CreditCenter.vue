<script setup>
import CreditFlowItemVue from './CreditFlowItem.vue';
const flow1 = {
    imgIndex: 1,
    count: '505',
    countText: '投保申请(单)',
    oldTime: '48小时',
    newTime: '1小时',
    layoutTwo: false,
    rate: '56%'
}
const flow2 = {
    imgIndex: 2,
    count: '501',
    countText: '受理批复(单)',
    oldTime: '96小时',
    newTime: '1小时',
    layoutTwo: false,
    rate: '56%'
}
const flow3 = {
    imgIndex: 3,
    count: '483',
    countText: '限额申请(单)',
    oldTime: '48小时',
    newTime: '1小时',
    layoutTwo: false,
    rate: '56%'
}
const flow4 = {
    imgIndex: 4,
    count: '481',
    countText: '签约反馈(单)',
    oldTime: '96小时',
    newTime: '1小时',
    layoutTwo: false,
    rate: '56%'
}
const flow5 = {
    imgIndex: 5,
    count: '320',
    countText: '出运申请(单)',
    oldTime: '12小时',
    newTime: '5分钟',
    layoutTwo: false,
    rate: '56%'
}
const flow6= {
    imgIndex: 6,
    count: '26405',
    countText: '保单融资(万元)',
    oldTime: '48小时',
    newTime: '1小时',
    layoutTwo: true,
    rate: '56%'
}
const flow7 = {
    imgIndex: 6,
    count: '397',
    countText: '保单补助(万元)',
    oldTime: '48小时',
    newTime: '1小时',
    layoutTwo: true,
    rate: '43%'
}
</script>
<template>
    <div class="center-panel">
        <div class="middle-panel-wrap">
            <div class="midle-panel">
                <CreditFlowItemVue :msgs="flow1"/>
                <div class="arrows arrows-bottom"></div>
                <div class="flow-items">
                    <CreditFlowItemVue :msgs="flow2"/>
                    <div class="arrows arrows-right"></div>
                    <CreditFlowItemVue :msgs="flow3"/>
                    <div class="arrows arrows-right"></div>
                    <CreditFlowItemVue :msgs="flow4"/>                     
                </div>
            </div>
            <div class="right-panel">
                <div class="right-panel-line"></div>
                <div class="right-panel-items">
                    <CreditFlowItemVue :msgs="flow5"/>
                    <CreditFlowItemVue :msgs="flow6"/>
                    <CreditFlowItemVue :msgs="flow7"/>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
    .center-panel {
        padding: 6rem 8rem;
    }
    .middle-panel-wrap {
        position: relative;
        padding-right: 35rem;
    }
    .arrows {
        width: 2.4rem;
        height: 2.4rem;
        background-size: 100% 100%;
    }
    .arrows-bottom {
        margin: 1rem 9rem;
        background: url(../assets/imgs/arr_down.png) no-repeat;
    }
    .arrows-right {
        margin: 0 1rem;
        background: url(../assets/imgs/arr_left.png) no-repeat;
    }
    .flow-items {
        display: flex;
        align-items: center;
    }
    .right-panel {
        position: absolute;
        right: 3rem;
        top: 0rem;
        width: 30rem;
        height: 40rem;
        display: flex;
        align-items: center;
    }
    .right-panel-line {
        background: url(../assets/imgs/arr_las.png) no-repeat;
        width: 6.6rem;
        height: 30rem;
        background-size: 100% 100%;
        margin-right: 1.5rem;
    }
    .right-panel-items {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
</style>