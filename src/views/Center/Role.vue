<template>
  <Service
    type="role"
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
          prop="name"
          label="角色名称"
          min-width="200"
        >
          <template slot-scope="scope">
            <a @click="handleDetailClick(scope.row)">{{ scope.row.name }}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="parent_role"
          label="父角色"
          min-width="220"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.parent_role.length !== 0">
              <el-tag v-for="(item, index) in scope.row.parent_role" :key="index" :disable-transitions="true" type="info">
                {{ item || '-' }}
              </el-tag>
            </template>
            <template v-else>
              <span>{{ '-' }}</span>
            </template>
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
          prop="user"
          label="角色用户"
          width="100"
          align="center"
        >
          <i class="iconfont icon-yonghu1" />
        </el-table-column>
        <el-table-column
          prop="module"
          label="权限管理"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <i class="iconfont icon-quanxian" @click="handleGrantClick(scope.row)" />
          </template>
        </el-table-column>
        <el-table-column
          prop="opreate"
          label="操作"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="handleEditClick(scope.row)">
              编辑
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
    handleEditClick() {

    },
    handleDelClick() {

    },
    handleDetailClick() {

    },
    handleStatusClick() {

    },
    handleGrantClick(payload) {
      const { id, name } = payload
      this.$router.push(`/grant?id=${id}&name=${name}&type=rolegrant`)
    }
  }
}
</script>

<style>

</style>

