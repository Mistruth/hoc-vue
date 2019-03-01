import { editCommon, getRoleByName } from '@/api/request.js'

export default {
  methods: {
    async handleStatusClick(payload, type) {
      this.$confirm(`是否改变${name}的状态`, 'Tips', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleStatusData(payload, type)
      })
    },
    async handleStatusData(payload, type) {
      const { name, status } = payload
      const newData = { ...payload }
      let groups, users
      if (type === 'role') {
        const params = {
          name
        }
        const res = await getRoleByName({ params })
        groups = res.data.data.groups
        users = res.data.data.users
        newData.groups = groups
        newData.users = users
      }

      newData.status = status === 'normal' ? 'blocked' : 'normal'
      const params = {
        data: newData,
        service: type
      }
      const res = await editCommon(params)
      const { code, message } = res.data
      if (code === 200 && message === 'ok') {
        this.$message.success('状态修改成功')
        this.$refs.service.query()
      } else {
        this.$message.error(message)
      }
    }
  }
}
