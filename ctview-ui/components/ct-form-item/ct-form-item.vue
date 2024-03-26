<template>
  <view class="ct-form-item" :class="[validateStatus, layout]">
    <view v-if="label" class="ct-form-item-label">
      <text class="ct-form-item-label-text">{{ label }}</text>
    </view>
    <view class="ct-form-item-content" :style="[contentStyle]"><slot /></view>
    <!-- TODO -->
    <!-- <view v-if="!isEmpty(explain)" class="ct-form-item-explain">
      <text class="ct-form-item-explain-text">{{ explain }}</text>
    </view> -->
  </view>
</template>

<script>
export default {
  name: 'CtFormItem',

  inject: {
    ctForm: {
      default: null
    }
  },

  props: {
    // 自定义输入框标题文本
    label: {
      type: String,
      default: ''
    },
    // 输入框占位提示文字
    placeholder: {
      type: String,
      default: ''
    },
    // 底部提示文案
    explain: {
      type: String,
      default: ''
    },
    // 底部提示类型
    validateStatus: {
      type: String,
      default: 'none' // 'success' 'warning' 'error' 'validating'
    },
    // 自定义样式
    contentStyle: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  computed: {
    layout() {
      return this.ctForm && this.ctForm.layout
    }
  },

  methods: {
    // TODO
    // ...{ isEmpty: uni.$ct.isEmpty }
  }
}
</script>

<style lang="scss" scoped>
.ct-form-item {
  padding: 0 16px;

  .ct-form-item-label {
    padding-top: 16px;

    .ct-form-item-label-text {
      color: #192434;
      font-size: 14px;
    }
  }

  .ct-form-item-content {
    padding-bottom: 16rpx;
    border-bottom: 1rpx solid #e5e5e5;
  }

  .ct-form-item-explain {
    padding-top: 5px;

    .ct-form-item-explain-text {
      font-size: 13px;
      line-height: 1.5;
    }
  }
}

.warning {
  .ct-form-item-ccontent {
    border-color: #faad14 !important;
  }

  .ct-form-item-explain {
    .ct-form-item-explain-text {
      color: #faad14 !important;
    }
  }
}

.ct-form-item.card {
  .ct-form-item-label {
    .ct-form-item-label-text {
      color: #333;
      font-weight: 600;
      font-size: 16px;
    }
  }

  .ct-form-item-content {
    margin-top: 8px;
    padding: 0 16px;
    padding-bottom: 0 !important;
    border-bottom: 0;
    border-radius: 4px;
    background: #f3f5f7;
  }
}
</style>
