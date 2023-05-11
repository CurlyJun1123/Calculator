<template>
  <uni-popup ref="popup" class="ct-popup" :safe-area="false">
    <view class="ct-ad">
      <view class="ct-ad-wrapper">
        <slot />
      </view>
      <view class="ct-ad-close">
        <ct-icon name="" />
      </view>
    </view>
  </uni-popup>
</template>

<script>
export default {
  name: 'CtAd',

  props: {
    url: {
      type: String
    }
  },

  methods: {
    open() {
      this.$refs.popup.open()
    },

    close() {
      this.$refs.popup.close()
    }
  }
}
</script>

<style lang="scss" scoped></style>
