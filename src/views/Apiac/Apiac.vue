<template>
  <QueryWrapper
    ref="service"
    type="apiac"
  >
    <template v-slot:btn>
      <el-button type="primary" @click="handleAddClick">
        新 增
      </el-button>
    </template>
    <template v-slot:table="{scope,currentService}">
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
          prop="access_id"
          label="秘钥ID"
          min-width="200"
        >
          <template slot-scope="scope">
            <a @click="handleDetailClick(scope.row)">
              {{ scope.row.access_id }}
            </a>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="秘钥名称"
          width="200"
        >
          <template slot-scope="scope">
            {{ scope.row.name || '-' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="um"
          label="创建用户"
          width="200"
        >
          <template slot-scope="scope">
            {{ scope.row.um || '-' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          width="220"
        >
          <template slot-scope="scope">
            {{ scope.row.create_time || '-' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <Badge :type="scope.row.status === 'normal'? 'success': 'warning'">
              {{ scope.row.status === 'normal'? '正常': '锁定' }}
            </Badge>
          </template>
        </el-table-column>
        <el-table-column
          prop="module"
          label="权限管理"
          width="80"
          align="center"
        >
          <template slot-scope="scope">
            <i class="iconfont icon-quanxian" @click="handleGrantClick(scope.row)" />
          </template>
        </el-table-column>
        <el-table-column
          prop="opreate"
          label="操作"
          width="160"
          align="center"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="handleCheckClick(scope.row)">
              查看
            </el-button>
            <G-split />
            <el-button v-if="scope.row.status === 'normal'" type="text" @click="handleStatusClick(scope.row,currentService)">
              锁定
            </el-button>
            <el-button v-else type="text" @click="handleStatusClick(scope.row,currentService)">
              恢复
            </el-button>
            <G-split />
            <el-button type="text" class="danger-type" @click="handleDelClick(scope.row,currentService)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </QueryWrapper>
</template>

<script>
import del from '@/mixins/del.js'
import edit from '@/mixins/edit.js'
import QueryWrapper from '@/components/QueryWrapper/QueryWrapper.vue'
import Badge from '@/components/Badge/Badge.vue'
export default {
  components: {
    QueryWrapper,
    Badge
  },
  mixins: [del, edit],
  data() {
    return {

    }
  },
  methods: {
    handleAddClick() {

    },
    handleCheckClick() {

    },
    handleDetailClick(payload) {

    },
    handleGrantClick(payload) {
      const { id, name } = payload
      this.$router.push(`/grant?id=${id}&name=${name}&type=apiacgrant`)
    }
  }
}
</script>

<style>

</style>
