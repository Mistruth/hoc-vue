<template>
  <el-dialog class="cdn-message-box" :visible.sync="dialog" width="400px" :title="title" @closed="handleClosed" @close="confirmText=''">
    <el-input v-model="confirmText" :placeholder="placeholder" @keyup.enter.native="handleEnterKeyUp" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialog = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmitClick">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import messageHandlers from './main.js'
export default {
  data() {
    return {
      confirmText: '',
      dialog: false,
      title: '',
      placeholder: '请输入',
      sureText: '确定'
    }
  },
  methods: {
    async handleSubmitClick(params) {
      if (this.confirmText !== this.sureText) {
        this.$message({
          message: `请输入\'${this.sureText}\'进行下一步操作`,
          type: 'warning'
        })
        return
      }
      await this.afterSubmit(params)
      this.dialog = false
      await this.handleClosed()
    },
    handleClosed() {
      messageHandlers.remove()
    },
    handleEnterKeyUp() {
      this.handleSubmitClick()
    }
  }
}
</script>

<style lang="less">
.cdn-message-box {
  .el-dialog__body {
    padding:30px;
  }
}
</style>
