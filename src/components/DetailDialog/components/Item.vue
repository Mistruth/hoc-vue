<template>
  <div class="omega-detail-dialog-item">
    <Key :value="data.key" />
    <Value :value="data.value" />
  </div>
</template>

<script>
import { Key } from './itemcontent.js'
import { Value } from './itemcontent.js'
export default {
  components: {
    Key,
    Value
  },
  props: {
    data: {
      type: Object,
      default: () => ({
        key: '-',
        value: '-'
      })
    }
  }
}
</script>

<style lang="less">
.omega-detail-dialog-item {
  display: flex;
  margin: 2px 0px;
  font-size: 13px;
  .omega-detail-dialog-item-key {
    width: 120px;
    padding: 5px 10px;
    // border-right: 1px solid #000;
    background-color: #e6f7ff;
    margin-right: 2px;
  }
  .omega-detail-dialog-item-value {
    flex: 1;
    padding: 5px 10px;
    background-color: #fafafa;
  }
}
</style>
