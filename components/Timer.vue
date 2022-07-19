<script setup>
const emit = defineEmits(['start', 'finish', 'pause', 'restart'])
const props = defineProps(['time'])
const timer = ref(props.time || null)
let interval = null

const toStr = (timer, callback) => {
    if (isNaN(timer)) {
        return '--'
    }
    const time = callback(timer)
    return time.toString().length === 1 ? `0${time}` : time
}

const minStr = computed(() => {
    return toStr(timer.value, (time) => Math.floor(time/6000))
})

const secStr = computed(() => {
    return toStr(timer.value, (time) => Math.floor((time % 6000) / 100))
})

const msecStr = computed(() => {
    return toStr(timer.value, (time) => time % 100)
})

watch(() => props.time, newVal => {
    timer.value = newVal
    play()
})

const play = () => {
    if (timer.value === null || isNaN(timer.value)) {
        return
    }
    pause()
    emit('start')
    interval = setInterval(() => {
        if (timer.value === 0) {
            pause()
            emit('finish')
        } else {
            timer.value--
        }             
    }, 10)
}

const pause = () => {
    clearInterval(interval)
}

const stop = () => {
    pause()
    timer.value = props.time || null
}

const restart = () => {
    stop()
    play()
}
</script>

<template>
<div class="timer">
    <div class="timer--clock">
        {{minStr}}:{{secStr}}<span class="timer--clock-ms">:{{msecStr}}</span>
    </div>
    <div class="timer--ctrls">
        <el-button @click="play">
            <font-awesome-icon icon="play" />
        </el-button>
        <el-button @click="pause">
            <font-awesome-icon icon="pause" />
        </el-button>
        <el-button @click="restart">
            <font-awesome-icon icon="repeat" />
        </el-button>
        <el-button @click="stop">
            <font-awesome-icon icon="stop" />
        </el-button>
    </div>
</div>
</template>

<style scoped>
.timer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.timer--clock {
    font-family: 'Roboto Mono', monospace;
    font-size: 14rem;
    margin: 2rem 0;
}

.timer--clock-ms {
    font-size: 10rem;
}

.timer--ctrls button {
    box-shadow: var(--el-box-shadow-light);
}

.timer--ctrls button:active {
    box-shadow: none;
}
</style>
