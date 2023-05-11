<template>
  <view class="icon" :style="{ width: iconSize, height: iconSize }" @tap="onClick">
    <text :class="[family, name]" :style="{ color: color, fontWeight: weight, fontSize: iconSize }"></text>
  </view>
</template>

<script>
const getVal = (val) => {
  const reg = /^[0-9]*$/g
  return typeof val === 'number' || reg.test(val) ? val + 'px' : val
}

export default {
  name: 'CtIcon',

  props: {
    // icon 库
    family: {
      type: String,
      default: 'iconfont'
    },

    // 图标名称
    name: {
      type: String,
      default: ''
    },

    // 图标颜色
    color: {
      type: String,
      default: 'inherit'
    },

    // 图标粗细
    weight: {
      type: String,
      default: 'normal'
    },

    // 图标大小
    size: {
      type: [Number, String],
      default: 16
    }
  },

  computed: {
    iconSize() {
      return getVal(this.size)
    }
  },

  methods: {
    onClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
