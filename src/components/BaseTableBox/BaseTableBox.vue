<template>
  <div class="overlord-com-base-table-box-container clearfix">
    <slot />
    <div class="overlord-pagination-container fr">
      <el-pagination
        :page-sizes="[20, 50, 100]"
        :page-size="queryParams.page_size"
        :total="total"
        :current-page.sync="currentPage"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="currentPageChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pageSizes: {
      type: Array,
      default: () => [20, 50, 100]
    },
    queryParams: {
      type: Object,
      default: () => ({
        pageNum: 1,
        pageSize: 20
      })
    },
    total: {
      type: [Number, String],
      default: 0
    },
    current: {
      type: [Number, String],
      default: 1
    }
  },
  data() {
    return {
      currentPage: this.current
    }
  },
  watch: {
    currentPage: {
      handler(val) {
        this.$emit('update:current', val)
      }
    }
  },
  methods: {
    handleSizeChange(size) {
      this.$emit('handleSizeChange', size)
    },
    currentPageChange(page) {
      this.$emit('currentPageChange', page)
    }
  }
}
</script>

<style lang="less">
.overlord-com-base-table-box-container {
  .overlord-pagination-container {
    padding:5px;
  }
}
</style>
