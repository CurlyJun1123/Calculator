<template>
  <view class="form" :class="{ layout }">
    <form><slot /></form>
  </view>
</template>

<script>
import validate from '@/utils/validate.js'

export default {
  name: 'CtForm',

  provide() {
    return {
      ctForm: this
    }
  },

  props: {
    // 表单数据对象
    value: {
      type: Object,
      default() {
        return {}
      }
    },
    // 表单校验规则
    rules: {
      type: Object,
      default() {
        return {}
      }
    },
    // 表单校验提示
    messages: {
      type: Object,
      default() {
        return {}
      }
    },
    // 表单布局
    layout: {
      type: String,
      default: 'none' // 'card'
    }
  },

  data() {
    return {
      validate: null
    }
  },

  watch: {
    rules: {
      handler() {
        this.initValidate()
      },
      deep: true
    },
    messages: {
      handler() {
        this.initValidate()
      },
      deep: true
    }
  },

  mounted() {
    this.initValidate()
  },

  methods: {
    initValidate() {
      // 规则
      const rules = { ...this.rules, pattern: this.rules.pattern instanceof RegExp }
      // 提示
      const messages = this.messages
      // 校验规则
      this.validate = new validate(rules, messages)

      // 新增自定义正则
      if (this.rules.pattern) {
        this.validate.addMethod(
          'pattern',
          (value, param) => {
            return this.validate.optional(value) || !this.rules.pattern.test(value)
          },
          this.messages.pattern
        )
      }
    },

    checkForm({ value = this.value } = {}) {
      if (!this.validate.checkForm(value)) {
        const error = this.validate.errorList[0]
        
        uni.$ct.showToast(error.msg)
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  padding-bottom: 20px;
}

.form.card {
  padding-bottom: 32px;
}
</style>
