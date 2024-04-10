<template>
  <view>
    <view class="ct-action-bar" :style="[{ position: fixed ? 'fixed' : 'static' }]">
      <view class="ct-action-bar-cell-group flex-row" :style="[{ paddingBottom: safeAreaInsets + 'px' }]">
        <view v-if="options.icon && options.icon.length" class="ct-action-bar-cell flex-row">
          <!-- 图标 -->
          <view
            v-for="(item, index) in options.icon"
            class="ct-action-bar-item ct-action-bar-item-icon flex-col justify-center align-center"
            :key="index"
            @tap="onClickIcon(item, index)"
          >
            <ct-icon
              v-if="item.icon"
              class="ct-action-bar-icon"
              :name="item.icon"
              :size="item.size || 24"
              :color="item.color || '#292929'"
            />
            <text class="ct-action-bar-icon-text">{{ item.text }}</text>
          </view>
        </view>
        <!-- 按钮 -->
        <view v-if="options.button && options.button.length" class="ct-action-bar-cell ct-action-bar-cell-button flex-row">
          <view
            v-for="(item, index) in options.button"
            class="ct-action-bar-item ct-action-bar-button ct-action-bar-item-button justify-center align-center"
            :key="index"
            :class="item.disable ? 'disable' : ''"
            :style="[buttonStyle, item.style]"
            @tap="onClickButton(item, index)"
          >
            <text class="ct-action-bar-button-text" :style="[item.fontStyle]">{{ item.text }}</text>
          </view>
        </view>
      </view>
    </view>

    <view v-if="placeholder" class="ct-action-bar-place" :style="[{ paddingBottom: safeAreaInsets + 'px' }]"></view>
  </view>
</template>

<script>
const getVal = (val) => {
  const reg = /^[0-9]*$/g
  return typeof val === 'number' || reg.test(val) ? val + 'px' : val
}

export default {
  name: 'CtActionBar',

  props: {
    // 组件参数
    options: {
      type: Object,
      default() {
        return {}
      }
    },
    // 底部按钮样式
    buttonStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    // 是否定位在底部
    fixed: {
      type: Boolean,
      default: true
    },
    // 是否开启底部安全区适配
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    },
    // 是否在标签位置生成一个等高的占位元素
    placeholder: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      safeAreaInsets: 12
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
        }
      })
    })
  },

  methods: {
    onClickIcon(item, index) {
      this.$emit('clickIcon', { item, index })
    },

    onClickButton(item, index) {
      if (item.disable) {
        return
      }

      this.$emit('clickButton', { item, index })
    }
  }
}
</script>

<style lang="scss" scoped>
.ct-action-bar {
  left: 0;
  bottom: 0;
  z-index: 10;
  width: 100%;
}

.ct-action-bar-cell-group {
  position: relative;
  padding: 12px;
  background: #fff;
}

.ct-action-bar-cell-group::before {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  box-sizing: border-box;
  border-bottom: 1px solid #ddd;
  content: ' ';
  transform: scaleY(0.5);
  pointer-events: none;
}

.ct-action-bar-cell {
  height: 45px;
}

.ct-action-bar-cell-button {
  flex: 1;
}

// .ct-action-bar-item {
//   margin: 0 6px;
// }

.ct-action-bar-item-icon {
  width: 45px;
  height: 45px;
}

.ct-action-bar-icon-text {
  color: #666;
  font-size: 12px;
}

.ct-action-bar-button {
  height: 45px;
  border-radius: 4px;
  background-color: $uni-theme-color-6;
  flex: 1;
}

.ct-action-bar-button-text {
  color: #fff;
  font-size: 16px;
}

.ct-action-bar-place {
  box-sizing: content-box;
  padding-top: 12px;
  width: 100%;
  height: 45px;
}

.disable {
  background-color: #b9d6fc !important;
}
</style>
