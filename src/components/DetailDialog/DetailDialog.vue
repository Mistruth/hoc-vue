<template>
  <el-dialog
    :title="title"
    :visible.sync="dialog"
  >
    1
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      title: '提示'
    }
  },
  watch: {

  }
}
</script>

<style>

</style>
