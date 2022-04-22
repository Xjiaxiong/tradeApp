<script setup>
import CountTo from './CountTo.vue'
import { onMounted, ref, onBeforeUnmount, nextTick } from 'vue'
defineProps({
    decimals: {
        type: Number,
        default: 0
    },
    startVal: {
        type: Number,
        default: 0
    },
    endVal: Number
})

let timer = null;
const timeGap = 30*1000;
let refresh = ref(true)
const refreshComp = () => {
    timer && clearTimeout(timer)
    timer = setTimeout(refreshComp,timeGap)
    refresh.value = false;
    nextTick(() => {
        refresh.value = true;
    })
}
onMounted(() => {
    refreshComp();
})
onBeforeUnmount(() => {
    timer && clearTimeout(timer)
})
</script>

<template>
    <CountTo :start-val='startVal' :end-val='endVal' :decimals="decimals" :duration=3000 v-if="refresh" />
</template>

<style>
</style>
