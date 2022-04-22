<script setup>
</script>
<template>
    <div class="loading">
        <span>页面加载中...</span>
    </div>
</template>
<style lang="less" scoped>
.loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(10,12,46,.8);
    >span {
        color: #fff;
        font-size: 24px;
        letter-spacing: 3px;
    }
}
</style>