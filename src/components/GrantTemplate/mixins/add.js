// 权限页添加的数据和逻辑
import {
  getCommon,
  addCommon
} from '@/api/request.js'
export default {
  data() {
    return {
      grantAddDialog: false,
      // 添加模态框里的初始值
      appChoosed: '',
      typeChoosed: '',
      nameChoosed: '',
      operateChoosed: [],
      patternChoosed: '',
      priorityChoosed: 100,
      // 添加默认的列表，不需要请求
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
      // 需要请求
      applications: [],
      modules: []
    }
  },
  computed: {
    // 根据原始值得到需要在选择器中所要展示的值
    APPLIST() {
      return this.applications.map(item => ({
        label: item.display_name,
        value: item.name
      }))
    },
    // 根据APPLIST得到的值，把Module根据不同的APP进行切割
    ModuleListClassedByApp() {
      const arr = []
      this.APPLIST.forEach(aitem => {
        arr.push(this.modules.filter(mitem => mitem.app === aitem.value))
      })
      return arr
    },
    // 当应用类型被选择后，需要过滤出里面的type值
    ORIGINTYPELIST() {
      return this.ModuleListClassedByApp.filter(item => {
        return item.find(i => i.app === this.appChoosed)
      })[0]
    },
    // 根据过滤出来的TYPELIST进行去重
    TYPELIST() {
      // 防止报错
      if (!this.ORIGINTYPELIST) return []
      // 进行去重
      const list = new Set(this.ORIGINTYPELIST.map(item => item.type))
      // 形成elementUI可以识别的数组形式
      return Array.from(list).map(item => ({ value: item }))
    },
    // 选择了模块type后，需要根据type值去寻找ORGINTYPELIST里面对应的权限
    ORIGINGRANTLIST() {
      // 防止报错
      if (!this.ORIGINTYPELIST) return []
      return this.ORIGINTYPELIST.filter(item => {
        return item.type === this.typeChoosed
      })
    },
    GRANTLIST() {
      if (!this.ORIGINGRANTLIST) return []
      return this.ORIGINGRANTLIST.map(item => ({ value: item.display_name }))
    },
    OPERATELIST() {
      if (!this.ORIGINGRANTLIST) return []
      const list = this.ORIGINGRANTLIST.filter(
        item => item.display_name === this.nameChoosed
      )
      if (list.length > 0) {
        return list[0].operates.map(item => ({
          module_id: list[0].id,
          label: item.display_name,
          value: item.name }))
      }
      return []
    },
    addForm() {
      const idkey = {}
      idkey[this.activeIdName] = this.id
      return {
        data: {
          ...idkey,
          pattern: this.patternChoosed,
          module_id: this.OPERATELIST[0].module_id,
          operates: this.operateChoosed,
          priority: this.priorityChoosed
        },
        service: this.type
      }
    }
  },
  methods: {
    async getApplications() {
      const params = {
        service: 'app'
      }
      const res = await getCommon({ params })
      const { code, success, data } = res.data
      if (code === 200 && success === true) {
        this.applications = data
      }
    },
    async getModules() {
      const params = {
        service: 'module'
      }
      const res = await getCommon({ params })
      const { code, success, data } = res.data
      if (code === 200 && success === true) {
        this.modules = data
      }
    },
    async add() {
      // 获取App列表
      this.getApplications()
      // 获取module列表
      this.getModules()
      // 模态框显示
      this.grantAddDialog = true
    },
    async submitAddForm() {
      const res = await addCommon(this.addForm)
      const { code, message } = res.data
      if (code === 200 && message === 'ok') {
        this.$message.success('添加权限成功')
      } else {
        this.$message.error(message)
        this.grantAddDialog = false
        return
      }
      // 添加后需要拿到当前activename
      this.currentPage = 1
      this.queryModules()
      this.grantAddDialog = false
    },
    clearAddDialog() {
      this.appChoosed = ''
      this.typeChoosed = ''
      this.nameChoosed = ''
      this.operateChoosed = []
      this.patternChoosed = ''
      // 优先级的默认值是100
      this.priorityChoosed = 100
    },
    // 如果改变了需要进行重置
    appchange() {
      this.typeChoosed = ''
      this.nameChoosed = ''
      this.operateChoosed = []
    },
    typechange() {
      this.nameChoosed = ''
      this.operateChoosed = []
    },
    namechange() {
      this.operateChoosed = []
    }
  }
}
