<template>
  <view class="ct-cell flex-col" hover-class="ct-hover" :class="[{ 'ct-cell-border': border, 'ct-cell-size-large': size == 'large' }]" :style="[cellStyle]" @tap="click">
    <view class="ct-cell-main justify-between align-center">
      <view class="ct-cell-title align-center">
        <slot name="icon">
          <view v-if="icon" class="ct-cell-icon"><ct-icon :family="iconFamily" :name="icon" :size="iconSize" :color="iconColor" /></view>
        </slot>
        <slot name="title">
          <text v-if="title" class="ct-cell-title-text">{{ title }}</text>
        </slot>
      </view>
      <slot name="value">
        <view v-if="value" class="ct-cell-value justify-end align-center">
          <text class="ct-cell-value-text">{{ value }}</text>
        </view>
      </slot>
      <ct-icon v-if="isLink" class="ct-cell-arrow" name="iconarrow1r" color="#666" size="14" />
    </view>
    <slot name="label">
      <view v-if="label" class="ct-cell-label">{{ label }}</view>
    </slot>
  </view>
</template>

<script>
export default {
  name: 'CtCell',

  inject: {
    ctCellGroup: {
      default: null
    }
  },

  props: {
    // 左侧标题
    title: {
      type: [String, Number],
      default: ''
    },
    // 右侧内容
    value: {
      type: [String, Number],
      default: ''
    },
    // 标题下方的描述信息
    label: {
      type: [String, Number],
      default: ''
    },
    // 左侧图标名称
    icon: {
      type: String,
      default: ''
    },
    // 左侧图标图标大小
    iconSize: {
      type: [String, Number],
      default: 24
    },
    // 左侧图标颜色
    iconColor: {
      type: String,
      default: '#192434'
    },
    // 左侧图标图标类名前缀
    iconFamily: {
      type: String,
      default: 'iconfont'
    },
    // 点击后跳转的链接地址
    url: String,
    // 点击后跳转的目标路由对象
    to: {
      type: [String, Object],
      default: ''
    },
    // 是否显示内边框
    border: {
      type: Boolean,
      default: false
    },
    // 是否展示右侧箭头并开启点击反馈
    isLink: {
      type: Boolean,
      default: true
    },
    // 单元格额外类名
    cellClass: {
      type: Array,
      default() {
        return []
      }
    },
    // 单元格额外样式
    cellStyle: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  computed: {
    size() {
      return this.ctCellGroup.size
    }
  },

  methods: {
    click() {
      this.$emit('click')

      let url
      if (!uni.$ct.isEmpty(this.url)) {
        url = this.url
        this.navigateTo({ url })
      }

      if (!uni.$ct.isEmpty(this.to)) {
        url = uni.$ct.mixinParam(this.to.path, this.to.query)
        this.navigateTo({ url })
      }
    },

    navigateTo({
      openType = 'navigate',
      url = '',
      animationType = '',
      animationDuration = 300,
      events = {},
      delta = 1,
      success = () => {},
      fail = res => {
        
      },
      complete = res => {
        
      }
    } = {}) {
      switch (openType) {
        case 'navigate':
          uni.navigateTo({ url })
          break
        case 'redirect':
          uni.redirectTo({ url })
          break
        case 'switchTab':
          uni.switchTab({ url })
          break
        case 'reLaunch':
          uni.reLaunch({ url })
          break
        case 'navigateBack':
          uni.navigateBack({
            delta: delta ? Number(delta) : 1
          })
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ct-hover {
  background: #f7f8fa !important;
}

.ct-cell {
  position: relative;
  padding: 12px 16px;
  background: #fff;

  .ct-cell-main {
    flex: 1;
  }

  .ct-cell-title {
    flex: 1;

    .ct-cell-icon {
      margin-right: 8px;
    }

    .ct-cell-title-text {
      color: #192434;
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
    }
  }

  .ct-cell-value {
    .ct-cell-value-text {
      font-size: 14px;
      color: #666;
    }
  }

  .ct-cell-arrow {
    margin-left: 4px;
  }

  .ct-cell-label {
    margin-top: 4px;
    color: #969799;
    font-size: 12px;
  }
}

.ct-cell.ct-cell-border::after {
  position: absolute;
  right: 16px;
  bottom: 0;
  left: 16px;
  box-sizing: border-box;
  border-bottom: 1px solid #ddd;
  content: ' ';
  transform: scaleY(0.5);
  pointer-events: none;
}

.ct-cell-size-large {
  padding: 12px;
  min-height: 58px;

  .ct-cell-title {
    .ct-cell-title-text {
      font-size: 16px;
    }
  }

  .ct-cell-label {
    font-size: 14px;
  }
}
</style>
