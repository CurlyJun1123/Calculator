<template>
  <view class="ct-cell-group" :class="[{ 'ct-cell-group-large': size == 'large', 'ct-cell-group-inset': inset }]">
    <slot name="title">
      <view v-if="title" class="ct-cell-group-title">{{ title }}</view>
    </slot>
    <view class="ct-cell-group-main"><slot /></view>
  </view>
</template>

<script>
export default {
  name: 'CtCellGroup',

  provide() {
    return {
      ctCellGroup: this
    }
  },

  props: {
    // 单元格标题
    title: {
      type: String,
      default: ''
    },
    // 单元格标题
    title: {
      type: String,
      default: ''
    },
    // 尺寸
    size: {
      type: String,
      default: 'large'
    },
    // 是否展示为圆角卡片风格
    inset: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.ct-cell-group-title {
  padding: 32px 16px 16px;
  color: rgba(69, 90, 100, 0.6);
  font-size: 14px;
}

.ct-cell-group-main {
  overflow: hidden;
  background-color: #fff;
}

.ct-cell-group-inset .ct-cell-group-main {
  margin: 0 16px;
  border-radius: 8px;
}
</style>
