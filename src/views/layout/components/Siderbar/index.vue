<template>
  <div :class="{'hideSidebar':collapse}" class="sidebar">
    <el-menu
      :collapse="collapse"
      :default-active="routerSetting"
      class="sidebar-el-menu"
      mode="vertical"
      background-color="#324157"
      text-color="#ccc"
      active-text-color="#fff"
      unique-opened
    >
      <sidebar-item v-for="route in permission_routers" :key="route.name" :collapse="collapse" :item="route" :base-path="route.path" />
    </el-menu>
  </div>
</template>

<script>
import { constantRouterMap } from '@/router/index.js'
import SidebarItem from './components/SiderbarItem'
export default {
  components: { SidebarItem },
  data() {
    return {
      permission_routers: [],
      collapse: false
    }
  },
  computed: {
    routerSetting() {
      return this.$route.path
    }
  },
  created() {
    this.permission_routers = constantRouterMap
    this.$bus.$on('switchCollapse', () => {
      this.collapse = !this.collapse
    })
  }
}
</script>

<style lang="less">
@sidebarColor:#001528;
@import "~@/assets/css/var.less";

// 导航栏样式修改
#app {
  .sidebar {
    display: block;
    height: 100%;
    width: 180px;
    overflow-y: scroll;
    box-shadow:2px 0 6px rgba(0,21,41,.35);
    z-index: 2;
    transition: width 0.3s ease;
    &::-webkit-scrollbar {
      width: 0;
    }
    .el-menu-item.is-active {
      border-left: 6px solid @themeColor;
      font-weight: normal;
    }
  }
  .el-menu {
    height: 100%;
    border-right:none;
    background-color:@sidebarColor!important;
  }
  .el-menu-item,.el-submenu__title {
    background-color:@sidebarColor!important;
    height: 45px;
    line-height: 45px;
    box-sizing: border-box;
    border-left: 6px solid transparent;
    transition: none;
    font-size: 16px;
  }
  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 180px;
  }
  .el-menu--collapse {
    width: 36px;
  }
  .hideSidebar {
    .el-menu-item,.el-submenu__title {
      border-left: none;
      &.is-active {
        border-left: none;
      }
    }
    &.sidebar {
      width: 36px;
    }
    .submenu-title-noDropdown {
        padding-left: 10px !important;
        position: relative;
        .el-tooltip {
          padding: 0 10px !important;
        }
      }
    .el-submenu {
      overflow: hidden;
      & > .el-submenu__title {
        padding-left: 10px !important;
        .el-submenu__icon-arrow {
          display: none;
        }
      }
    }
    .el-menu--collapse {
      .el-submenu {
        & > .el-submenu__title {
          & > span {
            height: 0;
            width: 0;
            overflow: hidden;
            visibility: hidden;
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>
