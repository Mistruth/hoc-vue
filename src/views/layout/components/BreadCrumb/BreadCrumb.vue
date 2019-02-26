<template>
  <div class="omega-com-bread-crumb-container">
    <el-breadcrumb class="omega-com-bread" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>
        应用管理
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
.omega-com-bread-crumb-container {
  height: 100%;
  width: 100%;
  position: relative;
  .omega-com-bread {
    position: absolute;
    top: 50%;
    left: 0px;
    transform: translateY(-50%);
  }
}
</style>
