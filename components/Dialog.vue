<script setup>
const show = ref(true)
</script>

<template>
    <el-dialog
        :value.sync="show"
        title="Tips"
        width="30%"
    >
        <span>This is a message</span>
    </el-dialog>
</template>