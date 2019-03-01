<template>
  <div class="omega-detail-dialog-set">
    <div class="set-header">
      <slot name="header" />
    </div>
    <div class="set-content">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
@import '~@/assets/css/var.less';

.omega-detail-dialog-set {
  &:nth-child(n+2){
    margin-top: 10px;
  }
  .set-header {
    padding:5px 20px;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      left: 0px;
      height: 16px;
      top:0x;
      width: 5px;
      border-radius: 3px;
      background-color: @themeColor;
    }
  }
  .set-content {
    padding:10px;
  }
}
</style>
