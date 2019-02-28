import { delCommon } from '@/api/request.js'
export default {
  methods: {
    handleDelClick(payload, type) {
      const { name, id } = payload
      const params = {
        id,
        service: type
      }
      this.$delbox({
        title: `正在删除${name}`,
        submit: () => {
          delCommon({ params }).then(res => {
            const { code, message } = res.data
            if (code === 200 && message === 'ok') {
              this.$message.success('删除成功')
              this.query()
            } else {
              this.$message.error(message)
            }
          })
        }
      })
    }
  }
}
