<script setup>
const value = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const drawer = ref(true)
const workout = ref([ 
    { 
        name: 'Push ups', 
        time: 300,
        unit: 's'
    }, 
    { 
        name: 'Rest', 
        time: 200,
        unit: 's'
    }, 
    { 
        name: 'Singles', 
        time: 300,
        unit: 's'
    },
])

const handleOpen = () => drawer.value = true

const handleClose = () => drawer.value = false

const submitHandler = data => workout.value = [...workout.value, data]

const dropHandler = index => workout.value = workout.value.filter((v, k) => k !== index)

const saveHandler = () => emit('update:modelValue', [...workout.value])
</script>

<template>
<el-button class="dashboard--menu-btn" @click="handleOpen">
    <font-awesome-icon icon="bars" />
</el-button>

<ClientOnly>
    <el-drawer
        v-model="drawer"
        title="Workout"
        size="30%"
        :with-header="true"
        :show-close="true"
        :before-close="handleClose"
    >
        <WorkoutDesc 
            v-for="serie, index in workout" 
            :key="index" 
            :serie="serie"
            :index="index"
            @drop="dropHandler" />

        <WorkoutForm @submit="submitHandler" />

        <el-button @click="saveHandler">
            Apply
        </el-button>
    </el-drawer>
</ClientOnly>
</template>

<style scoped>
.dashboard--menu-btn {
    position: absolute;
    top: 0;
    right: 0;
    box-shadow: var(--el-box-shadow-light);
}

.dashboard--menu-btn:active {
    box-shadow: none;
}
</style>
