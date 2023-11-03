<template>
    <div>
        <el-date-picker v-model="date" type="date" placeholder="创建时间" value-format="YYYY-MM-DD" @change="change" />
        <slot></slot>
    </div>
</template>
  
<script setup>
import { onMounted, ref } from 'vue'
const emits = defineEmits("change")

const date = ref(null);

const change = () => {
    emits("change", date.value, 'createDate')
}

</script>
  
<style scoped></style>
  