<template>
  <view class="ct-form-line" :class="[layout]" @tap="onclick">
    <view v-if="value || value === 0" class="ct-form-line-main align-center">
      <text class="ct-form-line-content align-center">
        <slot name="content">{{ value }}</slot>
      </text>
    </view>
    <view v-else class="ct-form-line-main align-center">
      <text class="ct-form-line-content ct-form-line-content-placeholder" :style="[placeholderStyle]">{{ placeholder }}</text>
    </view>
    <view class="ct-form-line-suffix">
      <slot name="suffix"></slot>
      <view v-if="arrow" class="ct-form-line-arrow">
        <ct-icon name="iconarrow1r" size="14" color="#999" />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'CtFormList',

  inject: {
    ctForm: {
      default: null
    }
  },

  props: {
    value: [String, Number],
    placeholder: String,
    placeholderStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    arrow: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    layout() {
      return this.ctForm.layout
    }
  },

  methods: {
    onclick() {
      this.$emit('onclick')
    }
  }
}
</script>

<style lang="scss" scoped>
.ct-form-line {
  display: flex;
  align-items: center;
  flex: 1;
  overflow: hidden;
  padding-top: 8px;
  padding-bottom: 8px;

  .ct-form-line-main {
    flex: 1;
    overflow: hidden;
    box-sizing: initial;
    height: 24px;

    .ct-form-line-content {
      flex: 1;
      overflow: hidden;
      color: #192434;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 16px;
    }

    .ct-form-line-content-placeholder {
      color: #aaa;
    }
  }

  .ct-form-line-suffix {
    display: flex;
    align-items: center;
    padding-left: 10px;
  }
}

.ct-form-line.card {
  .ct-form-line-main {
    height: 32px;
  }

  .ct-form-line-content {
    font-size: 14px;
  }

  .ct-form-line-content-placeholder {
    color: #999;
  }
}
</style>
