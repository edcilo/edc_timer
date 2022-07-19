<script setup>
const workout = ref([])
const round = ref(0)

const work = computed(() => {
    return round.value < workout.value.length ? workout.value[round.value] : ''
})

const time = computed(() => {
    return round.value < workout.value.length ? workout.value[round.value].time : null
})

const finishHandler = () => {
    round.value++
}
</script>

<template>
<div class="dashboard">
    <h1 class="dashboard--title">{{work.name}}</h1>

    <Timer :time="time" @finish="finishHandler"/>

    <div class="dashboard--carousel" v-if="workout.length > 0">
        <Workout :items="workout" :current="round" />
    </div>

    <WorkoutMenu v-model="workout"/>
</div> 
</template>

<style scoped>
.dashboard {
    position: relative;
    text-align: center;
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
