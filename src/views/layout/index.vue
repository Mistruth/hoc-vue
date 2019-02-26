<template>
  <el-container class="omega-container">
    <el-aside :width="collapse ? '36px':'180px'">
      <SideBar />
    </el-aside>
    <el-container>
      <el-header height="50px">
        <Header />
      </el-header>
      <el-main>
        <Main />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideBar from './components/Siderbar/index.vue'
import Header from './components/Header.vue'
import Main from './components/Main.vue'
export default {
  components: {
    SideBar,
    Header,
    Main
  },
  data() {
    return {
      collapse: false
    }
  }
}
</script>

<style lang="less">
.omega-container {
  height: 100%;
  .el-aside {
    transition: all 0.35s;
  }
}
</style>
