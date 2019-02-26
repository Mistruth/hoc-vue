<template>
  <Service
    type="app"
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
          min-width="300"
        >
          <template slot-scope="scope">
            <el-tag v-for="(item, index) in scope.row.manager" :key="index" :disable-transitions="true" type="info">
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
        >
          <template slot-scope="scope">
            <Badge :type="scope.row.status === 'normal'? 'success': 'danger'">
              {{ scope.row.status === 'normal'? '正常': '异常' }}
            </Badge>
          </template>
        </el-table-column>

        <el-table-column
          prop="module"
          label="模块"
          width="80"
          align="center"
        >
          <i class="iconfont icon-mokuai" />
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
  data() {
    return {
    }
  },
  methods: {
    handleAddClick() {

    },
    handleDetailClick() {

    },
    handleDelClick() {

    },
    handleEditClick() {

    },
    handleStatusClick() {

    }
  }
}
</script>

<style>

</style>
