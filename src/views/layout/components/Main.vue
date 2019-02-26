<template>
  <div class="omega-main-container">
    <div class="omega-bread-container">
      <Bread />
    </div>
    <transition name="el-fade-in" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import Bread from './BreadCrumb/BreadCrumb.vue'
export default {
  components: {
    Bread
  }
}
</script>

<style lang="less">
.omega-main-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  .omega-bread-container {
    height: 50px;
    padding: 0px 40px;
    flex-shrink: 0;
  }
}
</style>
