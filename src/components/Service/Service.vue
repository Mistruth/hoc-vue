<template>
  <div class="base-container">
    <div class="base-inner-container">
      <G-searchbox>
        <G-search slot="left" />
        <div slot="right">
          <el-button type="primary" @click="handleAddClick">
            新 增
          </el-button>
        </div>
      </G-searchbox>
      <BaseTableBox
        :query-params="queryParams"
        :total="total"
        :current.sync="currentPage"
        @handleSizeChange="handleSizeChange"
        @currentPageChange="currentPageChange"
      >
        <slot
          v-loading="tableLoading"
          :scope="tableList"
          element-loading-text="加载中"
          element-loading-spinner="el-icon-loading"
          name="table"
        />
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
        attrs: {},
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
    handleAddClick() {
      this.$emit('add')
    },
    currentPageChange(page) {
      this.query(page)
    },
    handleSizeChange(size) {
      this.queryParams.page_size = size
      this.query(1)
    }
  }
}
</script>

<style>

</style>
