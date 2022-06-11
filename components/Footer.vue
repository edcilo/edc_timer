<script setup>
const link_edcilo = ref('https://edcilo.com')
</script>

<template>
<el-footer class="footer" height="auto">
    <el-row :gutter="20">
        <el-col :span="8"></el-col>
        <el-col :span="8">
            <el-link :href="link_edcilo" :underline="false" target="_blank">
                edcilo 2022
            </el-link>
        </el-col>
        <el-col :span="8"></el-col>
    </el-row>
</el-footer>
</template>

<style scoped>
.footer {
    padding: 1rem;
    background-color: var(--el-bg-color);
    box-shadow: var(--el-box-shadow-light);
    border-top: 1px solid var(--el-border-color);
    text-align: center;
}
</style>
