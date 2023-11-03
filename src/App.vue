<!-- Code By QiHongTong -->
<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <span class="title">双招双引系统</span>
        <span class="user">
          <el-icon>
            <User />
          </el-icon>
          <span>陈帮林</span>
          <span class="line">|</span>
          <el-icon>
            <SwitchButton />
          </el-icon>
        </span>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu :default-active="defaultRef" class="el-menu-vertical" @select="select" router>
            <el-menu-item v-for="item in menuList" :key="item.index" :index="item.index">
              <el-icon>
                <component :is="item.icon" />
              </el-icon>
              <span>
                {{ item.label }}
              </span></el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <div class="view-box">
            <RouterView />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { RouterView } from 'vue-router'

const menuList = [
  {
    label: "招商企业管理",
    icon: "Document",
    index: "/role",
  },
  {
    label: "招商人员管理",
    icon: "Memo",
    index: "/user",
  },
]
const defaultRef = ref("/")

onMounted(() => {
  const url = location.href.split("9100")
  defaultRef.value = url[url.length - 1]
})


const select = () => {

}
</script>

<style scoped lang="less">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  margin: 0;
  padding: 0;
  height: 100vh;
}

.el-header {
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  background: #3274E5;
  color: #FFFFFF;


  .title {
    font-family: SourceHanSansCN-Medium;
    font-size: 24px;
    font-weight: 500;
  }

  .user {
    display: flex;
    width: 139px;
    height: 36px;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;

    .line {
      padding-bottom: 4px;
    }
  }
}

.el-aside {
  width: 230px;
  background: #FFFFFF;
  height: calc(100vh - 64px);
  user-select: none;
}

.el-main {
  background: #f5f7fa;
  padding: 18px;
}

.el-menu {
  border-right: none;
}

.view-box {
  position: relative;
  background-color: #fff;
  padding: 0 20px 20px 20px;
}
</style>
