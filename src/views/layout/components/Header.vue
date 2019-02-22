<template>
  <div class="omega-header-container">
    <el-dropdown class="omega-header-name" trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        {{ username }}
        <i class="el-icon-caret-bottom" />
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item divided command="loginout">
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { dashboard } from '@/api/request.js'
export default {
  data() {
    return {
      username: ''
    }
  },
  created() {
    this.username = Cookies.get('username')
  },
  methods: {
    handleCommand(command) {
      if (command === 'loginout') {
        this.$confirm('是否确定退出', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            window.location.href = dashboard
          })
          .catch(() => {
            this.$message.info('已取消')
          })
      }
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/css/var.less';

.omega-header-container {
  background-color: #fff;
  height: 100%;
  box-shadow: @lightBoxShadow;
  position: relative;
  .omega-header-name {
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    .el-dropdown-link {
      cursor: pointer;
    }
  }
}
</style>
