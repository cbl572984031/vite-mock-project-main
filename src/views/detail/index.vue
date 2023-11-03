<template>
    <el-page-header>
        <template #icon>
            <span></span>
        </template>
        <template #title>
            <span class="title"> {{ title }} </span>
        </template>
        <template #content>
            <span class="toback" @click="goBack">
                <el-icon>
                    <Back />
                </el-icon>
                返回上一页
            </span>
        </template>

        <template #extra>
            <div class="flex items-center">
                <el-button @click="goBack">取消</el-button>
                <el-button type="primary" class="ml-2" @click="submitForm(ruleFormRef)">提交</el-button>
            </div>
        </template>
    </el-page-header>
    <el-form :model="formData" label-width="120px" ref="ruleFormRef" :rules="rules">
        <el-form-item v-for="(value, key) in tableHeaderList " :key="key" :label="value.label" :prop="key">
            <EditRow :value="formData[key]" :keyValue="key" :options="value.options" :type="value.type"
                @change="handleChange">
            </EditRow>
        </el-form-item>

    </el-form>
</template>
  
<script setup>
import { onMounted, ref } from 'vue'
import EditRow from "@/components/EditRow/index.vue"
import { getValidate } from "@/utils/validate.js"
import { roleUpdate } from '@/api/role'
import { userUpdate } from '@/api/user'
import { ElMessage } from "element-plus"
import { useRouter } from 'vue-router';
const router = useRouter();
const tableHeaderList = ref({});
const formData = ref({});
const ruleFormRef = ref();
const rules = ref({});
const query = router.currentRoute.value.query;
let title;
switch (query.url) {
    case "role":
        title = "新增企业"
        break;
    case "user":
        title = "新增人员"
        break;
}




onMounted(() => {
    tableHeaderList.value = JSON.parse(sessionStorage.getItem("tableHeaderList"));
    if (query.type == 'edit') {
        formData.value = JSON.parse(sessionStorage.getItem("rowData"));
    }

    for (const key in tableHeaderList.value) {
        if (Object.hasOwnProperty.call(tableHeaderList.value, key)) {
            const element = tableHeaderList.value[key];
            if (element.type == "lock") {
                delete tableHeaderList.value[key];
            }
            rules.value[key] = [
                {
                    required: element.required,
                    validator: getValidate(element.type),
                    trigger: 'change'
                }
            ]
        }
    }

})


const submitForm = (formEl) => {
    console.log(formData.value)
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            let Update;
            if (query.url == 'role') {
                Update = roleUpdate;
            } else if (query.url == 'user') {
                Update = userUpdate;
            }
            let res = await Update(formData.value);
            console.log(res)
            if (res.data.code == 200) {
                ElMessage.success(res.data.msg)
                router.back();
            } else {
                ElMessage.error(res.data.msg)
            }
        } else {
            return false
        }
    })
}

const goBack = () => {
    router.back();

}

const handleChange = (value, key) => {
    formData.value[key] = value;
}

</script>
  
<style scoped lang="less">
.title {
    font-size: 18px;
    color: #1E252C;
}

.toback {
    font-size: 14px;
    color: #999999;
    font-weight: 400;
    cursor: pointer;
}

.el-page-header {
    padding-top: 20px;
    margin-bottom: 20px;
}

.el-form {
    // width: 60%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;

    .el-form-item {
        display: block;
        width: 462px;

        :deep(label) {
            display: block;
        }
    }

    .text_area {
        width: 964px;
    }

    :deep(.el-date-editor.el-input,
        .el-date-editor.el-input__wrapper) {
        width: 462px;
    }

    :deep(.el-checkbox) {
        display: inline-block !important;
    }

    :deep(.el-select) {
        width: 100%;
    }

    :deep(.el-form-item) {
        margin-bottom: 14px;
    }
}
</style>
  