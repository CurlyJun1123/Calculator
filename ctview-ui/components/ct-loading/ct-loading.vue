<template>
  <view class="ct-loading">
    <view class="ct-loading-container" :style="[{ height: 'calc(100vh - ' + safeAreaInsets + 'px)' }]">
      <img class="ct-loading-img" src="/static/ct-avatar.png" />
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      safeAreaInsets: 12,
    }
  },

  mounted() {
    this.$nextTick(() => {
      uni.getSystemInfo({
        success: (res) => {
          if (this.safeAreaInsetBottom) {
            this.safeAreaInsets = Number(res.safeAreaInsets.bottom) || 12
          } else {
            this.safeAreaInsets = 12
          }
        },
      })
    })
  },
}
</script>

<style lang="scss" scoped>
.ct-loading-container {
  display: flex;
  justify-content: center;
  align-items: center;

  .ct-loading-img {
    width: 350rpx;
    height: 350rpx;
  }
}
</style>
