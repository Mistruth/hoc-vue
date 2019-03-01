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

      <div class="grant-temp-radio">
        <el-radio-group v-model="activeModule" @change="handleRadioChange">
          <el-radio-button v-for="(item,index) in moduleList" :key="index" :label="item" />
        </el-radio-group>
      </div>

      <template v-if="isNoModule">
        <NoModule />
      </template>
      <template v-else>
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
            <el-table
              :data="tableList"
              style="width: 100%"
            >
              <el-table-column prop="id" label="ID" width="80" />
              <el-table-column prop="pattern" label="模式" width="120">
                <template slot-scope="scope">
                  <span v-text="scope.row.pattern==='include'?'包含':'排除'" />
                </template>
              </el-table-column>
              <el-table-column prop="type" label="模块分类" width="120" />
              <el-table-column prop="name" label="名称" width="200" />
              <el-table-column prop="display_name" label="显示名称" width="230" />
              <el-table-column prop="priority" label="优先级" width="120" align="center" />
              <el-table-column prop="operates" label="操作权限" min-width="180">
                <template slot-scope="scope">
                  <el-tag v-for="item in scope.row.operates" :key="item.id" type="info" :disable-transitions="true">
                    {{ item.display_name }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="operate" label="操作" width="120" align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click="handleEditClick(scope.row)">
                    编辑
                  </el-button>
                  <G-split />
                  <el-button class="danger-type" type="text" @click="handleDelClick(scope.row.id)">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </BaseTableBox>
      </template>
    </div>

    <el-dialog
      class="grant-template-add-dialog"
      :visible.sync="grantAddDialog"
      title="添加权限"
      width="560px"
      @close="clearAddDialog"
    >
      <el-form ref="grantAddDialog" label-position="left">
        <el-form-item label="模式" label-width="80px">
          <el-select v-model="patternChoosed">
            <el-option v-for="item in patternList" :key="item.value" :label="item.label" :value="item.value">
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="应用" label-width="80px">
          <el-select v-model="appChoosed" filterable @change="appchange">
            <el-option v-for="item in APPLIST" :key="item.value" :label="item.label" :value="item.value">
              <span style="float: left">{{ item.value }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px;">{{ item.label }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模块类型" label-width="80px">
          <el-select v-model="typeChoosed" :disabled="!TYPELIST.length" filterable @change="typechange">
            <el-option v-for="item in TYPELIST" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="应用模块" label-width="80px">
          <el-select v-model="nameChoosed" :disabled="!GRANTLIST.length" filterable @change="namechange">
            <el-option v-for="item in GRANTLIST" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="操作" label-width="80px">
          <el-select v-model="operateChoosed" :disabled="!OPERATELIST.length" filterable multiple>
            <el-option v-for="item in OPERATELIST" :key="item.value" :label="item.label" :value="item.value">
              <span style="float: left">{{ item.value }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px ;margin-right: 20px;">{{ item.label }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="优先级" label-width="80px">
          <el-input v-model="priorityChoosed" auto-complete="off" placeholder="请输入优先级(数字)" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="grantAddDialog = false">
          取 消
        </el-button>
        <el-button type="primary" @click="submitAddForm">
          确 定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="grantEditDialog" title="编辑权限" width="560px" @close="$refs.grantEditDialog.resetFields()">
      <el-form ref="grantEditDialog" :model="editForm.data" label-position="left">
        <el-form-item label="模式" label-width="80px" prop="pattern">
          <el-select v-model="editForm.data.pattern">
            <el-option v-for="item in patternList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="操作" label-width="80px" prop="operates">
          <el-select v-model="editForm.data.operates" multiple>
            <el-option v-for="item in operateList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <div class="bili_input_274">
          <el-form-item label="优先级" label-width="80px" prop="priority">
            <el-input v-model="editForm.data.priority" auto-complete="off" />
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="grantEditDialog = false">
          取 消
        </el-button>
        <el-button type="primary" @click="submitEditDialog">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import NoModule from '@/components/NoModule/NoModule.vue'
import BaseTableBox from '@/components/BaseTableBox/BaseTableBox.vue'
import { getAttrsIdByMap } from '@/constant/index.js'
import { getModules, queryByService, delCommon } from '@/api/request.js'
import add from './mixins/add.js'
import edit from './mixins/edit.js'
export default {
  components: {
    BaseTableBox,
    NoModule
  },
  mixins: [add, edit],
  props: {
    type: {
      type: String,
      required: true
    },
    id: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      queryParams_raw: {
        page_num: 1,
        page_size: 20
      },
      total: 0,
      currentPage: 1,
      tableLoading: false,
      attrs: {
        apiac_id: null,
        app_display_name: '',
        type: '*',
        user_id: null,
        treerole_id: null,
        group_id: null,
        role_id: null
      },
      activeIdName: '',
      activeModule: '',
      isNoModule: false,
      moduleList: [],
      tableList: []
    }
  },
  computed: {
    queryParams() {
      return {
        attrs: { ...this.attrs },
        page_num: this.queryParams_raw.page_num,
        page_size: this.queryParams_raw.page_size,
        q: '*',
        service: this.type,
        with_wild: true
      }
    },
    queryModulesParams() {
      return {
        id: this.id,
        service: this.type
      }
    }
  },
  created() {
    this.activeIdName = getAttrsIdByMap(this.type)
    this.queryModules()
  },
  methods: {
    async queryModules() {
      this.tableLoading = true
      const res = await getModules({ params: this.queryModulesParams })
      const { code, message, data } = res.data
      if (code === 200 && message === 'ok') {
        // 没有任何模块
        this.moduleList = Object.keys(data)
        this.isNoModule = this.moduleList.length === 0
        // 如果存在模块 且 第一次进入
        if (!this.isNoModule && this.activeModule === '') {
          this.activeModule = this.moduleList[0]
        } else if (!this.isNoModule && this.activeModule !== '') {
          const isDelModuleExist = this.moduleList.some(i => this.activeModule === i)
          if (!isDelModuleExist) {
            this.activeModule = this.moduleList[0]
          }
        }
      } else {
        this.$message.error(message)
      }
      this.queryGrant()
    },
    async queryGrant(activeModule = this.activeModule, page = 1, id = this.id) {
      this.tableLoading = true
      this.queryParams_raw.page_num = page
      this.attrs[this.activeIdName] = id
      this.attrs.app_display_name = activeModule
      const res = await queryByService(this.queryParams)
      this.tableLoading = false
      const { code, message, data } = res.data
      if (code === 200 && message === 'ok') {
        this.tableList = data.content
        this.total = data.total
      } else {
        this.$message.error(message)
      }
    },
    currentPageChange(page) {
      this.queryGrant(this.activeModule, page)
    },
    handleSizeChange(size) {
      this.queryParams_raw.page_size = size
      this.currentPage = 1
      this.queryGrant(this.activeModule, 1)
    },
    handleAddClick() {
      this.grantAddDialog = true
      this.getApplications()
      this.getModules()
    },
    handleDelClick(id) {
      this.$delbox({
        submit: () => this.submitDelForm(id)
      })
    },
    async submitDelForm(id) {
      const params = {
        id: id,
        service: this.type
      }
      const res = await delCommon({ params })
      const { code, message } = res.data
      if (code === 200 && message === 'ok') {
        this.$message.success('删除成功')
        this.queryModules()
      } else {
        this.$message.error(message)
      }
    },
    handleRadioChange(module) {
      this.currentPage = 1
      this.queryGrant(module)
    }
  }
}
</script>

<style lang="less">
.grant-temp-radio {
  margin: 20px 0px 10px 0px;
}
</style>
