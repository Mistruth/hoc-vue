<template>
  <div class="base-container">
    <div class="base-inner-container">
      <G-searchbox>
        <G-search slot="left" />
        <div slot="right">
          <slot name="btn" />
        </div>
      </G-searchbox>
      <BaseTableBox
        :query-params="queryParams_raw"
        :total="total"
        :current.sync="currentPage"
        @handleSizeChange="handleSizeChange"
        @currentPageChange="currentPageChange"
      >
        <div
          v-loading="tableLoading"
          element-loading-text="加载中"
          element-loading-spinner="el-icon-loading"
          class="slot-table-container"
        >
          <slot
            :scope="tableList"
            name="table"
          />
        </div>
      </BaseTableBox>
    </div>
  </div>
</template>

<script>
import BaseTableBox from '@/components/BaseTableBox/BaseTableBox.vue'
import { queryByService } from '@/api/request.js'
export default {
  components: {
    BaseTableBox
  },
  props: {
    type: {
      type: String,
      required: true
    },
    attrs: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      currentPage: 1,
      total: 0,
      queryParams_raw: {
        page_num: 1,
        page_size: 20
      },
      tableList: [],
      tableLoading: false
    }
  },
  computed: {
    queryParams() {
      return {
        attrs: { ...this.attrs },
        with_wild: true,
        sort: '',
        q: '*',
        service: this.type,
        page_num: this.queryParams_raw.page_num,
        page_size: this.queryParams_raw.page_size
      }
    }
  },
  created() {
    this.query()
  },
  methods: {
    async query(page = 1) {
      this.tableLoading = true
      this.queryParams_raw.page_num = page
      const res = await queryByService(this.queryParams)
      this.tableLoading = false
      const { code, data, message } = res.data
      if (code === 200 && message === 'ok') {
        this.tableList = data.content
        this.total = data.total
        this.$emit('afterSuccessQuery', Array.from(this.tableList))
      }
    },
    currentPageChange(page) {
      this.query(page)
    },
    handleSizeChange(size) {
      this.queryParams_raw.page_size = size
      this.query(1)
    }
  }
}
</script>

<style lang="less">

</style>
