<template>
  <el-container>
    <el-aside :width="collapse ? '36px':'180px'">
      <SideBar />
    </el-aside>
  </el-container>
</template>

<script>
import SideBar from './components/Siderbar/index.vue'
export default {
  components: {
    SideBar
  },
  data() {
    return {
      collapse: false
    }
  }
}
</script>

<style>

</style>
