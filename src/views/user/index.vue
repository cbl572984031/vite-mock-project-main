<template>
  <p class="title">招商人员管理</p>

  <MySearch class="mb20" @change="handleSearch">

    <el-input v-model="searchData.name" :placeholder="tableHeaderList.name.label" clearable
      @input="handleSearch(searchData.name, 'name')" v-if="tableHeaderList.name" />

    <el-select v-model="searchData.sex" :placeholder="tableHeaderList.sex.label" clearable
      @change="handleSearch(searchData.sex, 'sex')" v-if="tableHeaderList.sex">
      <el-option v-for="item in tableHeaderList.sex.options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>

    <el-input v-model.number="searchData.age" :placeholder="tableHeaderList.age.label" clearable
      @input="handleSearch(searchData.age, 'age')" v-if="tableHeaderList.age" />

    <el-input v-model="searchData.phone" :placeholder="tableHeaderList.phone.label" clearable
      @input="handleSearch(searchData.phone, 'phone')" v-if="tableHeaderList.phone" />

    <el-input v-model="searchData.email" :placeholder="tableHeaderList.email.label" clearable
      @input="handleSearch(searchData.email, 'email')" v-if="tableHeaderList.email" />

    <el-button type="primary" @click="handleAdd">新增</el-button>
  </MySearch>


  <MyTable :tableData="tableData" :tableHeaderList="tableHeaderList" @edit="handleEdit" @delete="deleteById">
  </MyTable>

  <el-pagination v-model:page-size="pageSize" v-model:current-page="pageIndex" background
    layout="total, sizes, prev, pager, next" :total="total" :page-sizes="[10, 20, 30, 50]" @size-change="getData"
    @current-change="getData" />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getList, Delete } from '@/api/user'
import { ElMessage } from "element-plus"
import MySearch from "@/components/MySearch/index.vue"
import MyTable from "@/components/MyTable/index.vue"
import EditRow from "@/components/EditRow/index.vue"
import { useRouter } from 'vue-router';
const router = useRouter();

const searchData = ref({});
const total = ref(0)
const tableData = ref([])
const tableHeaderList = ref({});
const pageIndex = ref(1)
const pageSize = ref(10)

onMounted(() => {
  if (sessionStorage.pageIndex || sessionStorage.pageSize) {
    pageIndex.value = parseInt(sessionStorage.pageIndex) || 1;
    pageSize.value = parseInt(sessionStorage.pageSize) || 10;
    sessionStorage.removeItem("pageIndex");
    sessionStorage.removeItem("pageSize");
  }
  getData();
})

// 获取数据
const getData = () => {
  const params = { pageIndex: pageIndex.value, pageSize: pageSize.value, search: searchData.value };





  getList(params).then(res => {
    console.log(res.data)
    const { records, total: count, headers } = res.data;

    tableHeaderList.value = headers;
    tableData.value = records || []
    total.value = count
  })
}

//新增
const handleAdd = () => {
  sessionStorage.setItem("tableHeaderList", JSON.stringify(tableHeaderList.value));

  router.push({
    path: '/detail',
    query: {
      type: 'create',
      url: 'user'
    }
  });
}


//编辑
const handleEdit = (row) => {
  sessionStorage.setItem("tableHeaderList", JSON.stringify(tableHeaderList.value));
  sessionStorage.setItem("rowData", JSON.stringify(row));
  sessionStorage.setItem("pageIndex", pageIndex.value);
  sessionStorage.setItem("pageSize", pageSize.value);

  router.push({
    path: '/detail',
    query: {
      type: 'edit',
      url: 'user'
    }
  });
}

//删除
const deleteById = async (id) => {
  if (!id) return;
  const res = await Delete(id);
  if (res.data.code == 200) {
    ElMessage.success(res.data.msg);
    getData();
  } else {
    ElMessage.error(res.data.msg)
  }
}


//触发条件搜索
const handleSearch = (value, key) => {
  if (!key) {
    return;
  }
  if (value === undefined || value === null || value === '') {
    delete searchData.value[key]
  } else {
    searchData.value[key] = value;
  }
  pageIndex.value = 1;
  getData();
}
</script>

<style scoped>
.mb20 {
  margin-bottom: 20px;
}

.name {
  display: inline-block;
  width: 80px;
}

.inline {
  width: calc(100% - 80px);
}

:deep(.el-input) {
  width: 150px;
  margin-right: 20px;
}

.title {
  height: 60px;
  line-height: 60px;
  font-size: 18px;
  color: #1E252C;
}
</style>