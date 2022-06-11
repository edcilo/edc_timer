<script setup>
const workout = [
    {
        name: 'push ups',
        time: 300
    },
    {
        name: 'rest',
        time: 200
    },
    {
        name: 'singles',
        time: 300
    },
    {
        name: 'finished',
        time: null
    },
    {
        name: '',
        time: null
    }
]

const round = ref(0)

const work = computed(() => {
    return round.value < workout.length ? workout[round.value] : ''
})

const time = computed(() => {
    return round.value < workout.length ? workout[round.value].time : null
})

const finishHandler = () => {
    round.value++
}
</script>

<template>
    <div class="dashboard">
        <el-button class="dashboard--menu-btn">
            <font-awesome-icon icon="bars" />
        </el-button>
        <h1 class="dashboard--title">{{work.name}}</h1>
        <Timer :time="time" @finish="finishHandler"/>
        <div class="dashboard--carousel">
            <Workout :items="workout" :current="round" />
        </div>
    </div>
</template>

<style scoped>
.dashboard {
    position: relative;
    text-align: center;
}

.dashboard--menu-btn {
    position: absolute;
    top: 0;
    right: 0;
    box-shadow: var(--el-box-shadow-light);
}

.dashboard--menu-btn:active {
    box-shadow: none;
}

.dashboard--title {
    font-size: 3rem;
    text-transform: uppercase;
}

.dashboard--carousel {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 2rem 0;
}
</style>
