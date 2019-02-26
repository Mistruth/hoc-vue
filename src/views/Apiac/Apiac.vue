<template>
  <Service
    type="apiac"
  >
    <template v-slot:btn>
      <el-button type="primary" @click="handleAddClick">
        新 增
      </el-button>
    </template>
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
          prop="access_id"
          label="秘钥ID"
          min-width="200"
        >
          <template slot-scope="scope">
            <a @click="handleDetailClick">
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
          <i class="iconfont icon-quanxian" />
        </el-table-column>
        <el-table-column
          prop="opreate"
          label="操作"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="handleCheckClick(scope.row)">
              查看
            </el-button>
            <G-split />
            <el-button type="text" @click="handleStatusClick(scope.row)">
              锁定
            </el-button>
            <G-split />
            <el-button type="text" class="danger-type" @click="handleDelClick(scope.row.id)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </Service>
</template>

<script>
import Service from '@/components/Service/Service.vue'
import Badge from '@/components/Badge/Badge.vue'
export default {
  components: {
    Service,
    Badge
  },
  methods: {
    handleAddClick() {

    },
    handleCheckClick() {

    },
    handleStatusClick() {

    },
    handleDelClick() {

    },
    handleDetailClick() {

    }
  }
}
</script>

<style>

</style>
