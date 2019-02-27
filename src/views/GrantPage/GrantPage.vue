<template>
  <GrantTemplate :id="id" :type="type" />
</template>

<script>
import GrantTemplate from '@/components/GrantTemplate/GrantTemplate.vue'
export default {
  components: {
    GrantTemplate
  },
  data() {
    return {
      type: ''
    }
  },
  created() {
    this.type = this.getType()
    this.id = this.$route.query.id
  },
  methods: {
    getType() {
      if (!this.$route.query.type) {
        return 'default'
      }
      return this.$route.query.type
    }
  }
}
</script>

<style>

</style>
