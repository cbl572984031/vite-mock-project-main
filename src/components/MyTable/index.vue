<template>
    <el-table :data="tableData" class="mb20" border style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column v-for="(item, key) in tableHeaderList" :key="item">
            <template #header="scope">
                <span>{{ getTableNameByLabel(key) }}</span>
            </template>
            <template #default="scope">
                <template v-if='item.options'>
                    <template v-if="['select', 'radio'].includes(item.type)">
                        <template v-for="option in item.options">
                            <span :key="option.value" v-if="option.value == scope.row[key]"> {{
                                option.label
                            }}</span>
                        </template>
                    </template>
                    <template v-else-if="['switch'].includes(item.type)">
                        <template v-for="option in item.options">
                            <el-tag :key="option.value" :type="option.value ? 'success' : 'warning'"
                                v-if="option.value == scope.row[key]"> {{
                                    option.label
                                }}</el-tag>
                        </template>
                    </template>
                    <template v-else>
                        <template v-if="(scope.row[key] instanceof Array)">
                            <el-tag v-for="tag in scope.row[key]" :key="tag">{{ tag }}</el-tag>
                        </template>
                        <template v-else-if="scope.row[key]">
                            <el-tag>{{ scope.row[key] }}</el-tag>
                        </template>
                    </template>
                    <!-- <span v-for="(hobby, index) in scope.row[key]" :key="hobby.value">{{ index == 0 ? '' : ',' }} {{
                        hobby.label
                    }}</span> -->
                </template>

                <span v-else>{{ scope.row[key] }}</span>
            </template>
        </el-table-column>

        <el-table-column label="操作" width="120">
            <template #default="scope">
                <el-button type="primary" link @click="handleEdit(scope.row)">编辑</el-button>
                <el-button type="danger" link @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup>
import { ref, onMounted, toRefs } from 'vue';

const props = defineProps(["tableData", "tableHeaderList"]);
const emit = defineEmits(["edit", "delete"]);
const { tableData, tableHeaderList } = toRefs(props)


const handleEdit = (row) => {
    emit("edit", row);
}

const handleDelete = (id) => {
    emit("delete", id);
}


// 过滤表头 自定义字段名称
const getTableNameByLabel = (name) => {
    if ('email' == name) {
        return "自定义表头名称";
    }
    if (tableHeaderList.value[name]) {
        return tableHeaderList.value[name].label;
    }
    return name
}


</script>

<style scoped>
:deep(.el-table__header tr th) {
    background-color: #F4F6FA;
}
</style>