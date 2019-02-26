<template>
  <span>
    <span
      :class="['cdn-badge-status-dot',
               {'cdn-badge-status-success':type === 'success',
                'cdn-badge-status-danger':type==='danger',
                'cdn-badge-status-progress':type==='progress',
                'cdn-bandge-status-warning':type==='warning',
                'cdn-bandge-status-info':type==='info'
               }
      ]"
    />
    <slot />
  </span>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'success'
    }
  }
}
</script>

<style lang="less">
.cdn-badge-status-dot {
  position: relative;
  width: 6px;
  height: 6px;
  display: inline-block;
  border-radius: 50%;
  vertical-align: middle;
  top:-1px;
  &.cdn-badge-status-success {
    background-color:rgba(83,196,26);
  }
  &.cdn-badge-status-danger {
    background-color:#f5222d;
  }
  &.cdn-badge-status-progress {
    background-color:  #1890ff;
    &::after {
      position: absolute;
      top:0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border:1px solid rgba(24,144,255,0.8);
      content:'';
      animation:statusProcessing 1.2s ease-in-out infinite;
    }
  }
  &.cdn-bandge-status-warning {
    background-color: #E6A23C;
  }
  &.cdn-bandge-status-info {
    background-color: #d9d9d9;
  }
}
@keyframes statusProcessing {
  0% {
    top:50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    width: 0%;
    height: 0%;
    border:1px solid rgba(83,196,26,0.8);
  }
  100% {
    width: 150%;
    height: 150%;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    border:1px solid rgba(83,196,26,0.3);
  }
}
</style>
