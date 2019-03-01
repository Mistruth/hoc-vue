<template>
  <QueryWrapper
    ref="service"
    type="user"
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
          prop="um"
          label="UM账号"
          width="180"
        >
          <template slot-scope="scope">
            <a @click="handleDetailClick(scope.row)">{{ scope.row.um }}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户姓名"
          width="200"
        >
          <template slot-scope="scope">
            {{ scope.row.name || '-' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="200"
        >
          <template slot-scope="scope">
            {{ scope.row.email || '-' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="department"
          label="部门"
          min-width="250"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.department.length !== 0">
              <el-tag v-for="(item, index) in scope.row.department" :key="index" :disable-transitions="true" type="info">
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
          width="320"
          align="center"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="handleEditClick(scope.row)">
              编辑
            </el-button>
            <G-split />
            <el-button v-if="scope.row.status === 'normal'" type="text" @click="handleStatusClick(scope.row,currentService)">
              锁定
            </el-button>
            <el-button v-else type="text" @click="handleStatusClick(scope.row,currentService)">
              恢复
            </el-button>
            <G-split />
            <el-button type="text" @click="handleResetClick(scope.row)">
              重置密码
            </el-button>
            <G-split />
            <el-button type="text" @click="handleTestClick(scope.row)">
              权限测试
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
  mounted() {

  },
  methods: {
    handleAddClick() {

    },
    handleEditClick() {

    },
    handleDetailClick() {

    },
    handleTestClick() {

    },
    handleGrantClick(payload) {
      const { id, name } = payload
      this.$router.push(`/grant?id=${id}&name=${name}&type=usergrant`)
    }
  }
}
</script>

<style>

</style>

