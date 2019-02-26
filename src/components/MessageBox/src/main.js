import Vue from 'vue'
import Message from './MessageBox.vue'
const MessageConstructor = Vue.extend(Message)
let instance
const div = document.createElement('div')

const Initinstance = (option) => {
  const type = typeof option
  if (type !== 'object') {
    throw new Error('option must be object')
  }
  const { title, placeholder, sureText, submit } = option
  instance = new MessageConstructor({
    el: div,
    data: {
      title: title || '警告',
      placeholder: placeholder || '请输入\'确定\'进行删除',
      sureText: sureText || '确定'
    },
    methods: {
      afterSubmit: submit
    }
  })
  document.querySelector('#app').appendChild(instance.$el)
  setTimeout(() => {}, 0)
  instance.dialog = true
}

const MessageBox = (option) => {
  Initinstance(option)
}

MessageBox.show = (option) => {
  return MessageBox(option)
}

MessageBox.remove = () => {
  instance.$destroy()
  document.querySelector('#app').removeChild(instance.$el)
}

export default MessageBox

// 示例
// this.$delbox.show({
//   title: '警告',
//   placeholder: '请输入\'确定\'进行删除',
//   sureText: '确定',
//   submit: () => {
//     this.submitDel(id)
//   }
// })
