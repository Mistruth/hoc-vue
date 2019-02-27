<template>
  <div class="no-module-container">
    <div class="img-box">
      <img :src="noModule">
    </div>
  </div>
</template>

<script>
import noModule from '@/assets/img/nodata.png'
export default {
  data() {
    return {

    }
  },
  computed: {
    noModule() {
      return noModule
    }
  }
}
</script>

<style lang="less">
.no-module-container {
  .img-box {
    width: 250px;
    margin: 0 auto;
    img {
      width: 100%;
    }
  }
}
</style>
