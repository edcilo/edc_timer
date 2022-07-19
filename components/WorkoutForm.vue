<script setup>
const formRef = ref()
const emit = defineEmits(['submit'])

const form = ref({
    name: "",
    time: null,
    unit: 's'
})

const timeOpt = [
    {
        value: 's',
        label: 'Seconds'
    },
    {
        value: 'm',
        label: 'Minutes'
    }
]

const rules = reactive({
    name: [
        {
            required: true, 
            trigger: 'blur'
        },
        {
            max: 60,
        }
    ],
    unit: [
        {
            required: true,
            trigger: 'blur',
        },
        {
            type: 'enum',
            enum: timeOpt.map(i => i.value)
        }
    ],
    time: [
        {
            type: 'integer',
            required: true,
            trigger: 'blur'
        }
    ]
})

const submitHandler = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            emit("submit", {...form.value})
            formEl.resetFields()
        } else {
            console.log('error submit!', fields)
        }
    })
}

const resetHandler = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>

<template>
<div class="form">
    <el-form :model="form" 
        ref="formRef" 
        label-width="20%" 
        :rules="rules">
        <el-form-item label="Name" prop="name">
            <el-input v-model="form.name" />
        </el-form-item>

        <el-form-item label="Time">
            <el-col :span="11">
                <el-form-item prop="time">
                    <el-input v-model.number="form.time" />
                </el-form-item>
            </el-col>
            <el-col class="text-center" :span="1">
                <span class="text-gray-500">&nbsp;</span>
            </el-col>
            <el-col :span="12">
                <el-form-item prop="unit">
                    <el-select v-model="form.unit" placeholder="Unit">
                        <el-option 
                            v-for="item in timeOpt"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
            </el-col>
        </el-form-item>

        <el-form-item class="form--btn">
            <el-button type="primary" @click="submitHandler(formRef)">
                Add
            </el-button>
            <el-button @click="resetHandler(formRef)">
                Reset
            </el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<style scoped>
.form {
    border: 1px solid var(--el-border-color);
    border-radius: var(--el-border-radius-small);
    padding: 1rem;
    background-color: var(--el-bg-color);
    margin-bottom: 1rem;
}

.form--btn {
    margin-bottom: 0;
}
</style>