<template>
  <view class="ct-input-box align-center" :class="[layout, { 'flex-col': field === 'textarea', 'align-end': field === 'textarea' }]" @tap.stop="inputClick">
    <template v-if="field === 'input'">
      <input
        :disabled="disabled"
        class="ct-input"
        :value="defaultValue"
        :type="type"
        :placeholder="placeholder"
        :placeholder-class="placeholderClass"
        :maxlength="maxlength"
        :cursor-spacing="cursorSpacing"
        :focus="focus"
        :show-confirm-bar="showConfirmbar"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
        confirm-type="search"
        @confirm="doSearch"
      />
      <view class="ct-input-suffix">
        <slot name="suffix">
          <text v-if="count" class="ct-input-count">{{ value.length }}/{{ maxlength }}</text>
        </slot>
      </view>
    </template>
    <template v-else-if="field === 'textarea'">
      <textarea
        class="ct-input ct-textarea"
        :value="defaultValue"
        :type="type"
        :placeholder="placeholder"
        :placeholder-class="placeholderClass"
        :maxlength="maxlength"
        :cursor-spacing="cursorSpacing"
        :focus="focus"
        :show-confirm-bar="showConfirmbar"
        :disable-default-padding="true"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
      />
      <slot name="suffix">
        <view class="ct-input-suffix" :class="{ 'ct-textarea-suffix': field === 'textarea' }">
          <text v-if="count" class="ct-input-count">{{ value.length }}/{{ maxlength }}</text>
        </view>
      </slot>
    </template>
  </view>
</template>

<script>
import { isEmpty } from '@/utils/function'

export default {
  name: 'CtInput',

  inject: {
    ctForm: {
      default: null
    }
  },

  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    field: {
      type: String,
      default: 'input'
    },
    placeholder: String,
    maxlength: {
      type: [String, Number],
      default: 140
    },
    cursorSpacing: {
      type: Number,
      default: 48
    },
    // 是否自动获得焦点
    focus: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    count: {
      type: Boolean,
      default: false
    },
    // 是否显示键盘上方带有”完成“按钮那一栏
    showConfirmbar: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      defaultValue: '',
      placeholderClass: 'ct-input-placeholder-none'
    }
  },

  computed: {
    layout() {
      return this.ctForm && this.ctForm.layout
    }
  },

  watch: {
    value: {
      handler(nVal, oVal) {
        this.defaultValue = nVal
      },
      immediate: true,
      deep: true
    },
    layout: {
      handler(nVal, oVal) {
        this.placeholderClass = nVal === 'card' ? 'ct-input-placeholder-card' : 'ct-input-placeholder-none'
      }
    }
  },

  methods: {
    ...{ isEmpty },
    handleFocus(event) {
      this.$emit('focus', event)
    },

    handleBlur(event) {
      // vue 原生的方法 return 出去
      this.$emit('blur', event)
    },
    doSearch() {
      this.$emit('doSearch', this.defaultValue)
    },
    handleInput(event) {
      let value = event.detail.value
      // vue 原生的方法 return 出去
      this.$emit('input', value)
    },

    inputClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.ct-input-box {
  flex: 1;
  overflow: hidden;
  padding-top: 8px;
  padding-bottom: 8px;

  .ct-input {
    overflow: hidden;
    box-sizing: border-box;
    padding: 4px 0;
    height: 32px;
    color: #333;
    font-size: 16px;
    flex: 1;
    caret-color: #1676f3;
  }

  .ct-textarea {
    display: inline-table;
    overflow: hidden;
    box-sizing: border-box;
    padding: 4px 0;
    width: 100%;
    max-height: 104px;
    min-height: 104px;
    color: #333;
    font-size: 16px;
    line-height: 22px;
    flex: 1;
    caret-color: #1676f3;
  }

  .ct-input-suffix {
    display: flex;
    align-items: center;

    .ct-input-count {
      padding-left: 10px;
      color: #999;
      font-size: 12px;
    }
  }

  .ct-textarea-suffix {
    padding: 8px 0 4px;

    .ct-input-count {
      padding-left: 10px;
      color: #999;
      font-size: 12px;
    }
  }
}

.ct-input-placeholder-none {
  color: #aaa;
}

.ct-input-placeholder-card {
  color: #999;
}

.ct-input-box.card {
  .ct-input {
    font-size: 14px !important;
  }

  .ct-input-count {
    color: #999 !important;
    font-size: 14px !important;
  }
}
</style>
