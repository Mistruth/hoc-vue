import {
  getOperateByModule,
  editCommon
} from '@/api/request.js'
export default {
  data() {
    return {
      grantEditDialog: false,
      patternList: [
        {
          value: 'include',
          label: '包含'
        },
        {
          value: 'exclude',
          label: '排除'
        }
      ],
      operateList: [],
      editForm: {
        data: {
          id: null,
          pattern: 'include',
          priority: null,
          operates: []
        },
        service: this.type
      }
    }
  },
  methods: {
    async handleEditClick(payload) {
      this.grantEditDialog = true
      const newObj = { ...payload }
      const operates = newObj.operates.map(item => item.name)
      this.editForm.data = {
        id: newObj.id,
        pattern: newObj.pattern,
        priority: newObj.priority,
        operates
      }
      // 得到当前模块下权限的操作
      const res = await getOperateByModule(newObj.module_id)
      const { code, message, data } = res.data
      if (code === 200 && message === 'ok') {
        this.operateList = data.map(item => ({
          label: `${item.name}(${item.display_name})`,
          value: item.name
        }))
      }
    },
    async submitEditDialog() {
      const res = await editCommon(this.editForm)
      const { code, message } = res.data
      if (code === 200 && message === 'ok') {
        this.$message.success('修改权限成功')
      } else {
        this.$message.error(message)
      }
      this.grantEditDialog = false
      this.currentPage = 1
      this.queryModules()
    }
  }
}
