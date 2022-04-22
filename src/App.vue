<script setup>
import TradePage from './pages/TradePage.vue'
import AppLoadingVue from './components/AppLoading.vue'

import * as echarts from 'echarts'
import dayjs from 'dayjs'
import { provide, onMounted, ref } from 'vue'
import { trade_KnowledgeRequest } from './utils/http'
//提供的工具包
provide('ec', echarts)
provide('dayjs', dayjs)

let flag = ref(false)
onMounted( async () => {
    let res = await trade_KnowledgeRequest()
    if(res.status === 200) {
        flag.value = true
    }
})
</script>

<template>
    <router-view></router-view>
</template>

<style lang="less">

[class^="el-icon-fa"], 
[class*=" el-icon-fa"] {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome!important;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
// @import '../../node_modules/font-awesome/css/font-awesome.css';

/*公共的css*/
.sider-border {
    background: url(./assets/imgs/web_boa_bg.png) no-repeat;
    background-size: 100% 100%;
}
.arrow__icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: 0 2px;
}
.arrow__icon.arrow_up {
    background-image: url(./assets/imgs/arrow_up.png);
}
.arrow__icon.arrow_down {
    background-image: url(./assets/imgs/arrow_down.png);
} 
#app {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #FFF;
}
html, body, div, span, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
abbr, address, cite, code,
del, dfn, em, img, ins, kbd, q, samp,
small, strong, sub, sup, var,
b, i,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section, summary,
time, mark, audio, video {
    margin:0;
    padding:0;
    border:0;
    outline:0;
    font-size: inherit;
    vertical-align:baseline;
    background:transparent;
}
*{
  -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
          box-sizing: border-box;
}
*,
*:before,
*:after{
  -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
          box-sizing: border-box;    
}
header,nav,article,aside,section,footer,canvas,menu,hgroup{
    display: block;
}
nav ul{
    list-style: none;
}
ul li {
    list-style: none;
}
/*flex布局*/
.flex-row {
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
}
.flex-row-nowrap {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}
.f-rc-center {
    justify-content: center;
    align-items: center;
}
.f-sb {
    justify-content: space-between;
}
.f-sa {
    justify-content: space-around;
}
.f-se {
    justify-content: space-evenly;
}
.f-col-1 {
    flex:0 0 8.33%;
}
.f-col-2 {
    flex:0 0 16.66%;
}
.f-col-3 {
    flex:0 0 25%;
}
.f-col-4 {
    flex:0 0 33.33%;
}
.f-col-5 {
    flex:0 0 41.66%;
}
.f-col-6 {
    flex:0 0 50%;
}
/*全局颜色*/
.color__yellow {
    color: #fdac3f!important;
}
.color__blue {
    color: #23b2f7!important;
}
.color__green {
    color: #6dc55c!important;
}
.color__purple {
    color: #976ffe!important;
}
.amap-copyright,
.amap-logo {
  display: none!important;
}
/*覆写EleUI 暗风格*/
.el-icon-search {
  color: #0ab0d8!important;
}
.el-input__inner {
  border: 1px solid #0ab0d8!important;
  color: #fff!important;
  background-color: #0a1438!important;
}
.el-input__inner:hover {
  border-color: #0ab0d8!important;
}
.select-item .el-input__inner {
    width: 100px!important;
}
.el-dialog {
    background-color: #0a1336!important;
}
.el-dialog__headerbtn {
    top: 30px!important;
}
.el-dialog__body {
    padding-top: 0!important;
}
.el-popover {
    color: #fff;
    background: #0a1438!important;
    border: 1px solid #08b1d5!important;
}
.popper__arrow {
    display: none!important;
}
.el-dialog__wrapper {
    z-index: 9999999!important;
}
.echarts-tooltip {
    text-align: left!important;
}
.el-select .el-input__inner {
    cursor: pointer;
    padding-right: 35px!important;
    border: 1px solid #1a6ddd!important;
    background: #0b2052!important;
    color: #fff!important;
}
.el-select-dropdown {
    border: 1px solid #1a6ddd!important;
    background: #0b2052!important;
    box-shadow: 0 2px 5px #0b2e67!important;
}
.el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
    background-color: #0A75CB!important;
}
.el-select-dropdown__item {
    color: #fff!important;
}
</style>
