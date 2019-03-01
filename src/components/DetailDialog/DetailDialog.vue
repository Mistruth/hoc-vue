<template>
  <el-dialog
    :title="title"
    :visible.sync="dialog"
    :width="width"
  >
    <Set v-for="(i,index) in data" :key="index">
      <template v-slot:header>
        {{ i.title || '-' }}
      </template>
      <template v-slot:content>
        <template v-if="i.type === 'item'">
          <Item v-for="(item,_index) in i.data" :key="_index" :data="item" />
        </template>
        <template v-if="i.type === 'block'">
          1
        </template>
      </template>
    </Set>
  </el-dialog>
</template>

<script>
import Set from './components/Set.vue'
import Item from './components/Item.vue'
export default {
  components: {
    Set,
    Item
  },
  data() {
    return {
      dialog: false,
      title: '提示',
      width: '800px',
      data: [
        {
          title: '基本信息',
          type: 'item',
          data: [
            {
              key: '应用名称',
              value: 'passport'
            }
          ]
        }
      ]
    }
  },
  watch: {

  }
}
</script>

<style>

</style>
