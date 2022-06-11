<script setup>
const props = defineProps(['items', 'current'])
const carousel = ref(null)

watch(() => props.current, (newVal) => {
    carousel.value.setActiveItem(newVal)
})
</script>

<template>
    <el-carousel
        ref="carousel"
        type="card" 
        height="200px" 
        arrow="never" 
        :autoplay="false" 
        :loop="true"
        :pause-on-hover="false">
        <el-carousel-item v-for="item in props.items" :key="item.name">
            <h3 text="3xl" justify="center">{{ item.name }}</h3>
        </el-carousel-item>
    </el-carousel>
</template>

<style scoped>
.el-carousel {
    width: 520px;
}

.el-carousel__item {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    background-color: var(--el-color-info-light-5) !important;
}

.el-carousel__item.is-active {
    box-shadow: var(--el-box-shadow-light);
    background-color: var(--el-color-info-light-3) !important;
}

.el-carousel__item h3 {
    color: var(--el-text-color-primary);
    font-weight: bold;
    text-transform: uppercase;
}
</style>
