<template>
  <view class="ct-list">
    <slot name="header" />

    <!-- 列表 -->
    <view v-if="list.length" class="ct-list-">
      <slot />
    </view>

    <!-- 空省页 -->
    <view v-else class="page-empty justify-center align-center">
      <slot name="empty" />
    </view>

    <slot name="footer" />
  </view>
</template>

<script>
export default {
  props: {
    // 数组
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },

  data() {
    return {
      triggered: false,
      scrollIntoView: '',
      scrollIntoQuery: [] // 滚动节点属性
    }
  },

  mounted() {
    this._freshing = false
    setTimeout(() => {
      this.triggered = true
    }, 1000)
  },

  methods: {
    // 滚动时触发
    onScroll(event) {
      //
    },

    // 滚动到底部/右边
    onScrolltolower() {},

    onPulling(e) {
      //
    },

    onRefresh() {
      if (this._freshing) return
      this._freshing = true
      setTimeout(() => {
        this.triggered = false
        this._freshing = false
      }, 3000)
    },

    onRestore() {
      this.triggered = 'restore' // 需要重置
    },

    onAbort() {}
  }
}
</script>

<style lang="scss" scoped>
.ct-list {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  animation-timing-function: ease-out;
}

.ct-list- {
  position: relative;
  flex: 1;

  .ct-list--view {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    bottom: constant(safe-area-inset-bottom);
    bottom: env(safe-area-inset-bottom);
    left: 0;
    height: auto;
  }
}

.page-empty {
  padding-bottom: 0;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  flex: 1;
}
</style>
