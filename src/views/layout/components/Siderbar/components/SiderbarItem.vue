<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <router-link v-if="item.meta.istop" :to="item.path">
      <el-menu-item :index="item.path+'/index'" :class="{'submenu-title-noDropdown':!isNest}">
        <i v-if="item.meta.icon" class="side-item-icon" :class="item.meta.icon" />
        <span v-if="item.meta.title" slot="title" class="side-item-text">{{ item.meta.title }}</span>
      </el-menu-item>
    </router-link>

    <el-submenu v-else :index="item.name||item.path">
      <template slot="title">
        <i v-if="item.meta&&item.meta.icon" class="side-item-icon" :class="item.meta.icon" />
        <span v-if="item.meta&&item.meta.title" slot="title" class="side-item-text">{{ item.meta.title }}</span>
      </template>
      <template v-for="child in item.children">
        <template v-if="!child.hidden">
          <sidebar-item v-if="child.children&&child.children.length>0" :key="child.path" :is-nest="true" :item="child" :base-path="resolvePath(child.path)" class="nest-menu" />

          <router-link v-else :key="child.name" :to="resolvePath(child.path)">
            <el-menu-item :index="resolvePath(child.path)">
              <svg-icon v-if="child.meta&&child.meta.icon" :class="child.meta.icon" />
              <span v-if="child.meta&&child.meta.title" slot="title" class="side-item-text">{{ child.meta.title }}</span>
            </el-menu-item>
          </router-link>
        </template>
      </template>
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
export default {
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    },
    collapse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  computed: {
  },
  created() {},
  methods: {
    resolvePath(...paths) {
      return path.resolve(this.basePath, ...paths)
    }
  }
}
</script>

<style lang="less">
.side-item-text {
  margin-left: 5px;
}
.side-item-icon {
  font-size: 18px;
}
</style>

