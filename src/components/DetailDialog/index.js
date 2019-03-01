import Vue from 'vue'
import Detail from './DetailDialog.vue'
const DetailConstructor = Vue.extend(Detail)
let instance
const div = document.createElement('div')

const Initinstance = (option) => {
  const type = typeof option
  if (type !== 'object') {
    throw new Error('option must be object')
  }
  const { title, data } = option
  instance = new DetailConstructor({
    el: div,
    data: {
      title: title || '提示',
      data: data
    },
    methods: {

    }
  })
  document.querySelector('#app').appendChild(instance.$el)
  setTimeout(() => {}, 0)
  instance.dialog = true
}

const DetailBox = (option) => {
  Initinstance(option)
}

DetailBox.show = (option) => {
  return DetailBox(option)
}

DetailBox.remove = () => {
  instance.$destroy()
  document.querySelector('#app').removeChild(instance.$el)
}

export default DetailBox

// 示例
// this.$delbox.show({
//   title: '警告',
//   placeholder: '请输入\'确定\'进行删除',
//   sureText: '确定',
//   submit: () => {
//     this.submitDel(id)
//   }
// })
