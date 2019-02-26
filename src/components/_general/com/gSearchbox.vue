<template>
  <div class="overlord-com-search-box clearfix">
    <div class="fl">
      <slot name="left" />
    </div>
    <div class="fr">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GSearchbox'
}
</script>

<style>
.overlord-com-search-box {
  margin-bottom: 5px;
}
</style>
