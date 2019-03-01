<template>
  <QueryWrapper
    type="user"
    :attrs="attrs"
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
          prop="um"
          label="UM账号"
          width="200"
        />
        <el-table-column
          prop="name"
          label="姓名"
          width="220"
        >
          <template slot-scope="scope">
            {{ scope.row.name || '-' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="300"
        >
          <template slot-scope="scope">
            {{ scope.row.email || '-' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="department"
          label="部门"
          min-width="220"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.department.length > 0">
              <el-tag v-for="(item, index) in scope.row.department" :key="index" :disable-transitions="true" type="info">
                {{ item || '-' }}
              </el-tag>
            </template>
            <template v-else>
              -
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
          prop="opreate"
          label="操作"
          width="80"
          align="center"
        >
          <template slot-scope="scope">
            <el-button type="text" class="danger-type" @click="handleDelClick(scope.row.id)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </QueryWrapper>
</template>

<script>
import QueryWrapper from '@/components/QueryWrapper/QueryWrapper.vue'
import Badge from '@/components/Badge/Badge.vue'
export default {
  components: {
    QueryWrapper,
    Badge
  },
  data() {
    return {
      attrs: {}
    }
  },
  created() {
    this.getTypeAndName()
  },
  methods: {
    getTypeAndName() {
      const { name, type } = this.$route.query
      this.attrs[type] = name
    },
    handleAddClick() {

    },
    handleDelClick() {

    }
  }
}
</script>

<style>

</style>
