<script setup>
import logo1 from '../assets/imgs/sig_onl.png'
import logo2 from '../assets/imgs/sig_pex.png'
import { ref, inject, onMounted } from 'vue'
import { getNumber } from '../utils/kits'
import CountToLoopVue from '../components/CountToLoop.vue';
const echarts = inject('ec');
// const data = ref({
//     val1: 241,
//     val2: 45,
//     val3: 196,
//     val4: 226,
//     val5: 41,
//     val6: 185,
// })
const data = ref({
    val1: 5,
    val2: 1,
    val3: 4,
    val4: 8,
    val5: 3,
    val6: 5,
})
const getBarChart = () => {
    // let xTimeData = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
    // let legends = ['参加展会数','参展企业数'];
    // let data1 = [0,0,0,1,2,1,2,1,1,2,3,2];
    // let data2 = [0,0,0,51,45,57,59,58,55,54,52,46];
    let xTimeData = ['一季度','二季度','三季度','四季度'];
    let legends = ['展会数','参展数'];
    let data1 = [0,4,4,5];
    let data2 = [0,153,162,153];
    let option = {
        backgroundColor: 'transparent',
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        legend: {
            left: 10,
            top: 10,
            data: legends,
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            extraCssText: 'color:#B9B8CE;border: 1px solid #1691dd;background:#12113d;text-align:left;'
        },            
        xAxis: {
            type: 'value',
        },
        yAxis: {
            data: xTimeData,
            axisLine: {
                lineStyle: {
                color: '#105188'
                }
            }          
        },
        series: [
            {
                name: legends[0],
                type: 'bar',
                data: data1
            },
            {
                name: legends[1],
                type: 'bar',
                data: data2
            }
        ],
    }
    let domID = 'temp__show_chart'
    let myChart =  echarts.init(document.getElementById(domID),'dark')
    document.getElementById(domID).setAttribute('_echarts_instance_', '')
    myChart.setOption(option)
}
onMounted(() => {
    getBarChart()
})
</script>

<template>
    <div class="temp__show">
        <div class="temp__show_chart" id="temp__show_chart"></div>
        <div class="temp__show_right">
            <div class="show_right__item">
                <div class="show_right__item_top">
                    <img :src="logo1" alt="logo1">
                    <section>
                        <p class="color-blue"><CountToLoopVue :endVal="getNumber(data.val1)"/></p>
                        <p>线上展会数</p>
                    </section>
                </div>
                <div class="show_right__item_bottom">
                    <div class="show_row_half">
                        <span class="label">代参展</span>
                        <span class="value"><CountToLoopVue :endVal="getNumber(data.val2)"/></span>
                    </div>
                    <div class="show_row_half">
                        <span class="label">自行参展</span>
                        <span class="value"><CountToLoopVue :endVal="getNumber(data.val3)"/></span>
                    </div>
                </div>
            </div>
            <div class="show_right__item">
                <div class="show_right__item_top">
                    <img :src="logo2" alt="logo1">
                    <section>
                        <p class="color-green"><CountToLoopVue :endVal="getNumber(data.val4)"/></p>
                        <p>线下展会数</p>
                    </section>
                </div>
                <div class="show_right__item_bottom">
                    <div class="show_row_half">
                        <span class="label">代参展</span>
                        <span class="value"><CountToLoopVue :endVal="getNumber(data.val5)"/></span>
                    </div>
                    <div class="show_row_half">
                        <span class="label">自行参展</span>
                        <span class="value"><CountToLoopVue :endVal="getNumber(data.val6)"/></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
    .temp__show {
        flex: 1;
        padding: 1rem;
        color: #fff;
        display: flex;
        .temp__show_chart {
            width: 60%;
            height: 100%;
        }
        .temp__show_right {
            width: 40%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .show_right__item {
                height: 10rem;
                background: #070d3f;
                padding: 1rem;
                .show_right__item_top {
                    display: flex;
                    align-items: center;
                    >img {
                        width: 3.8rem;
                        height: 3.8rem;
                        margin-right: 1.5rem;
                    }
                    >section {
                        text-align: left;
                        >p {
                            font-size: 1.6rem;
                            line-height: 1.47;
                        }
                    }
                }
                .show_right__item_bottom {
                    align-items: center;
                    display: flex;
                    justify-content: space-between;
                    .show_row_half {
                        height: 3rem;
                        flex-basis: 48%;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        >span {
                            font-size: 1.6rem;
                        }
                        >span.label {
                            color: #3c467b;
                        }
                    }
                }
            }

        }
    }
    .color-blue {
        color: #18aeff;
    }
    .color-green {
        color: #68cb57;
    }
</style>