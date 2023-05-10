<template>
  <view @touchmove.prevent.stop>
    <uni-popup ref="popup" class="ct-popup" type="bottom" :is-mask-click="false" :safe-area="false" @change="popupChange">
      <view class="ct-popup-main">
        <slot name="toolbar"></slot>
        <view class="ct-share-sheet-main">
          <view class="ct-share-sheet-cell">
            <view v-for="(item, index) in options" :key="index" @tap="onConfirm(item, index)">
              <button class="ct-share-sheet-item align-center" :style="item.style" :open-type="item.type">
                <view class="ct-share-sheet-item-icon" :style="[{ backgroundColor: item.backgroundColor }]"><ct-icon :name="item.icon" color="white" :size="item.size"></ct-icon></view>
                <text class="ct-share-sheet-item-text">{{ item.name }}</text>
              </button>
            </view>
          </view>
          <view class="ct-popup-cancel" @tap="onCancel">取消</view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
export default {
  name: 'CtShareSheet',

  props: {
    // 可选项数据源
    options: {
      type: Array,
      default() {
        return []
      }
    }
  },

  methods: {
    open() {
      this.$refs.popup.open()
      this.$emit('open')
    },

    close() {
      this.$refs.popup.close()
      this.$emit('close')
    },

    onConfirm(item) {
      this.$emit('confirm', item)
      this.close()
    },

    onCancel() {
      this.close()
    },

    popupChange({ show, type } = {}) {
      this.$emit('popupChange', { show, type })
    }
  }
}
</script>

<style lang="scss" scoped>
.ct-popup-main {
  background: transparent;

  .ct-popup-cancel {
    position: relative;
    height: 68px;
    height: calc(68px + constant(safe-area-inset-bottom));
    height: calc(68px + env(safe-area-inset-bottom));
    background: #fff;
    color: #192434;
    font-size: 16px;
    line-height: 68px;
    text-align: center;
  }

  .ct-popup-cancel::after {
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
}

.ct-share-sheet-main {
  overflow: hidden;
  border-radius: 8px 8px 0 0;
  background: #fff;

  .ct-share-sheet-cell {
    padding: 4px 0;
  }

  .ct-share-sheet-item {
    box-sizing: content-box;
    position: relative;
    overflow: hidden;
    padding: 12px 24px;
    height: 40px;
    text-overflow: ellipsis;
    white-space: nowrap;
    background: #ffffff;
  }

  .ct-share-sheet-item:last-of-type::after {
    display: none;
  }

  .ct-share-sheet-item-icon {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ct-share-sheet-item-text {
    margin-left: 16px;
    color: #192434;
    font-size: 16px;
    line-height: 40px;
  }
}
</style>
