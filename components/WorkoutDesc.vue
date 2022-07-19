<script setup>
const props = defineProps(['serie', 'index'])
const emit = defineEmits(['drop'])

const dropHandler = () => emit('drop', props.index)
</script>

<template>
<div class="workout-desc">
    <el-button class="workout-desc--drop-btn" size="small" @click="dropHandler">
        <font-awesome-icon icon="trash" />
    </el-button>
    <span class="workout-desc--title">
        {{ props.serie.name }}
    </span>
    <span class="workout-desc--time">
        {{ `${props.serie.time}${props.serie.unit}` }}
    </span>
</div>
</template>

<style scoped>
.workout-desc {
    position: relative;
    padding: 1rem;
    margin-bottom: 1rem;
    text-align: center;
    border: 1px solid var(--el-border-color);
    border-radius: var(--el-border-radius-small);
    background: var(--el-fill-color-light);
}

.workout-desc--title {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    font-size: 1.2rem;
}

.workout-desc--time {
    display: block;
    color: var(--el-color-info-dark-2)
}

.workout-desc--drop-btn {
    position: absolute;
    font-size: 0.75rem;
    top: 0.5rem;
    right: 0.5rem;
}
</style>