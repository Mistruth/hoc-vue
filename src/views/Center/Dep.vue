<template>
  <QueryWrapper
    ref="service"
    type="group"
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
          prop="name"
          label="部门名称"
          min-width="220"
        >
          <template slot-scope="scope">
            <a @click="handleDetailClick(scope.row)">{{ scope.row.name }}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="manager"
          label="负责人"
          min-width="150"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.manager.length !== 0">
              <el-tag v-for="(item, index) in scope.row.manager" :key="index" :disable-transitions="true" type="info">
                {{ item || '-' }}
              </el-tag>
            </template>
            <template v-else>
              <span>{{ '-' }}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          prop="roles"
          label="角色"
          min-width="200"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.roles.length !== 0">
              <el-tag v-for="(item, index) in scope.row.roles" :key="index" :disable-transitions="true" type="info">
                {{ item || '-' }}
              </el-tag>
            </template>
            <template v-else>
              <span>{{ '-' }}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          prop="_user"
          label="部门用户"
          min-width="100"
          align="center"
        >
          <template slot-scope="scope">
            <i class="iconfont icon-yonghu1" @click="handleUserClick(scope.row)" />
          </template>
        </el-table-column>
        <el-table-column
          prop="module"
          label="权限管理"
          min-width="100"
          align="center"
        >
          <template slot-scope="scope">
            <i class="iconfont icon-quanxian" @click="handleGrantClick(scope.row)" />
          </template>
        </el-table-column>
        <el-table-column
          prop="opreate"
          label="操作"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="handleEditClick(scope.row)">
              编辑
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
import QueryWrapper from '@/components/QueryWrapper/QueryWrapper.vue'
export default {
  components: {
    QueryWrapper
  },
  mixins: [del],
  methods: {
    handleAddClick() {

    },
    handleEditClick() {

    },
    handleDetailClick() {

    },
    handleGrantClick(payload) {
      const { id, name } = payload
      this.$router.push(`/grant?id=${id}&name=${name}&type=groupgrant`)
    },
    handleUserClick(payload) {
      const { id, name } = payload
      this.$router.push(`/users?id=${id}&name=${name}&type=department`)
    }
  }
}
</script>

<style>

</style>

