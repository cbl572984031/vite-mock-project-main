# 按钮 Button

<br/>

*常用的操作按钮。*

## 基本使用

:::demo
```vue
<template>
  <el-row class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </el-row>

  <el-row class="mb-4">
    <el-button plain>Plain</el-button>
    <el-button type="primary" plain>Primary</el-button>
    <el-button type="success" plain>Success</el-button>
    <el-button type="info" plain>Info</el-button>
    <el-button type="warning" plain>Warning</el-button>
    <el-button type="danger" plain>Danger</el-button>
  </el-row>

  <el-row class="mb-4">
    <el-button round>Round</el-button>
    <el-button type="primary" round>Primary</el-button>
    <el-button type="success" round>Success</el-button>
    <el-button type="info" round>Info</el-button>
    <el-button type="warning" round>Warning</el-button>
    <el-button type="danger" round>Danger</el-button>
  </el-row>

  <el-row>
    <el-button :icon="Search" circle />
    <el-button type="primary" :icon="Edit" circle />
    <el-button type="success" :icon="Check" circle />
    <el-button type="info" :icon="Message" circle />
    <el-button type="warning" :icon="Star" circle />
    <el-button type="danger" :icon="Delete" circle />
  </el-row>
</template>

<script lang="ts" setup>
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star
} from '@element-plus/icons-vue'
</script>
```
:::

## APIs

| 参数 | 说明 | 类型 | 默认值 | 必传 |
| -- | -- | -- | -- | -- |
| routes | 路由数组 | Route[] | [] | true |
| fontSize | 字体大小，单位px | number | 14 | false |
| height | 面包屑高度 | number | 36 | false |
| maxWidth | 文本最大显示宽度，超出后显示省略号，单位px | number | 180 | false |
| separator | 分隔符，默认 '' 时为箭头 | string | '' | false |
| target | 如何打开目标URL | '_self' &#124; '_blank' | '_self' | false |
