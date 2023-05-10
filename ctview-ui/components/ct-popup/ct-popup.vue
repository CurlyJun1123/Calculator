<template>
  <uni-popup ref="popup" class="ct-popup" type="bottom" :safe-area="false" @change="change" :is-mask-click="isMask">
    <ct-icon class="ct-popup-close" name="icon43-guanbi" color="#192434" size="16px" @click="close" weight="bold"></ct-icon>
    <view class="ct-popup-main" :style="[{ height: popupHeight }]">
      <view class="ct-popup-title">{{ title }}</view>
      <slot></slot>
    </view>
  </uni-popup>
</template>

<script>
const getVal = (val) => {
  const reg = /^[0-9]*$/g
  return typeof val === 'number' || reg.test(val) ? val + 'px' : val
}

export default {
  name: 'CtPopup',

  props: {
    // 标题
    title: String,
    // 弹窗高度
    height: {
      type: [Number, String],
      default: 16
    },
    isMask: {
      type: Boolean,
      default: true
    }
  },

  mounted() {
    console.log(this.mask)
  },

  computed: {
    popupHeight() {
      return getVal(this.height)
    }
  },

  methods: {
    open() {
      this.$refs.popup.open()
    },

    close() {
      this.$refs.popup.close()
      uni.showTabBar()
    },

    change(e) {
      if (!e.show) {
        this.$emit('close')
      }
    }
  }
}
</script>
