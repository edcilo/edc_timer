<script setup>
const url = ref('https://storage.edcilo.com/edcilo-logo-dark.svg')
</script>

<template>
<el-header class="header" height="auto">
    <el-image class="header--logo-img" :src="url" fit="contain" />
</el-header>
</template>

<style scoped>
.header {
    padding: 1rem;
    background-color: var(--el-bg-color);
    box-shadow: var(--el-box-shadow-light);
    border-bottom: 1px solid var(--el-border-color);
}

.header--logo-img {
    width: 90px;
    height: auto;
}
</style>
