<template>
  <uni-nav-bar :title="title" :background-color="backgroundColor" :fixed="fixed" :status-bar="statusBar" :left-width="capsules.width" :right-width="capsules.width">
    <template #left>
      <view class="ct-nav-bar-capsules" :style="[capsules]">
        <view class="ct-nav-bar-capsules-button" hover-class="ct-nav-bar-capsules-button-active" @tap="onBack"><ct-icon name="iconarrow1l" size="18" color="#000"></ct-icon></view>
        <view class="ct-nav-bar-capsules-line"></view>
        <view class="ct-nav-bar-capsules-button" hover-class="ct-nav-bar-capsules-button-active" @tap="onHome"><ct-icon name="iconchat" size="18" color="#000"></ct-icon></view>
      </view>
    </template>
    <template #right></template>
  </uni-nav-bar>
</template>

<script>
export default {
  name: 'CtNavBar',

  props: {
    // 导航标题
    title: String,
    // 导航背景色
    backgroundColor: String,
    //
    fixed: {
      type: Boolean,
      default: true
    },
    //
    statusBar: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      capsules: { width: '86px', height: '32px' }
    }
  },

  created() {
    const { width, height, right } = uni.getMenuButtonBoundingClientRect()
    const { windowWidth } = uni.getSystemInfoSync()

    this.capsules.width = width + 'px'
    this.capsules.height = height + 'px'
  },

  methods: {
    onBack() {
      uni.navigateBack()
    },

    onHome() {
      uni.navigateBack()
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .uni-nav-bar-text {
  color: #000;
  font-size: 16px;
  font-weight: 600;
}

.ct-nav-bar-capsules {
  z-index: 9;
  display: flex;
  overflow: hidden;
  box-sizing: border-box;
  width: 86px;
  height: 32px;
  border: 0.5px solid rgba(218, 219, 222, 0.58);
  border-radius: 16px;
  background-color: hsla(0, 0%, 100%, 0.5);
  align-items: center;
  justify-content: space-between;

  .ct-nav-bar-capsules-button {
    display: flex;
    height: 100%;
    flex: 1;
    align-items: center;
    justify-content: center;
  }

  .ct-nav-bar-capsules-button-active {
    background-color: rgba(0, 0, 0, 0.3);
  }

  .ct-nav-bar-capsules-line {
    width: 0.5px;
    height: 18px;
    background-color: rgba(0, 0, 0, 0.2);
  }
}
</style>
