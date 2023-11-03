<template>
    <template v-if="['input', 'phone', 'email'].includes(type)">
        <el-input v-model="value" clearable @input="change" />
    </template>

    <template v-else-if="type == 'number'">
        <el-input v-model.number="value" clearable @input="change" />
    </template>

    <template v-else-if="type == 'select'">
        <el-select v-model="value" placeholder="请选择" clearable @change="change">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
    </template>

    <template v-else-if="type == 'date'">
        <el-date-picker v-model="value" type="date" placeholder="Pick a day" value-format="YYYY-MM-DD" @change="change" />
    </template>


    <template v-else-if="type == 'checkbox'">
        <el-checkbox-group v-model="value" @change="change">
            <el-checkbox v-for="item in options" :label="item.label" />
        </el-checkbox-group>
    </template>

    <template v-else-if="type == 'switch'">
        <el-switch v-model="value" :active-text="options[0].label" :inactive-text="options[1].label" @change="change" />
    </template>
</template>

<script setup>
import { ref, toRefs, onMounted } from "vue";


const props = defineProps(["value", "type", "options", "keyValue"]);
const emits = defineEmits(["change"]);
const { value: defaultValue, type, options, keyValue: key } = toRefs(props);
const value = ref();

onMounted(() => {
    valueInit();
})

const valueInit = () => {
    value.value = defaultValue.value;
}


const change = () => {
    emits("change", value.value, key.value)
}


</script>
  
<style scoped></style>