<template>
  <Service
    type="app"
    @add="handleAddClick"
  >
    <template v-slot:table="{scope}">
      <el-table
        :data="scope"
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="ID"
          width="60"
          align="center"
        />
        <el-table-column
          prop="name"
          label="应用名称"
          width="150"
        >
          <template slot-scope="scope">
            <a @click="handleDetailClick(scope.row)">
              {{ scope.row.name }}
            </a>
          </template>
        </el-table-column>
        <el-table-column
          prop="display_name"
          label="显示名称"
          width="200"
        >
          <template slot-scope="scope">
            <a v-if="scope.row.url" :href="scope.row.url">
              {{ scope.row.display_name }}
            </a>
            <span v-else>
              {{ scope.row.display_name }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="manager"
          label="负责人"
          width="300"
        >
          <template slot-scope="scope">
            <el-tag v-for="(item, index) in scope.row.manager" :key="index" type="info">
              {{ item || '-' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="secret"
          label="秘钥"
          width="200"
        />
        <el-table-column
          prop="status"
          label="状态"
          width="100"
          align="center"
        />
      </el-table>
    </template>
  </Service>
</template>

<script>
import Service from '@/components/Service/Service.vue'

export default {
  components: {
    Service
  },
  data() {
    return {
      tableLoading: false
    }
  },
  methods: {
    handleAddClick() {

    },
    handleDetailClick() {

    }
  }
}
</script>

<style>

</style>
