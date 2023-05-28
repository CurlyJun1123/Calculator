<template>
  <button class="ct-button ct-reset-button" hover-class="ct-button-hover" @tap="handleClick">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    methods: {
      handleClick() {
        this.$emit('click')
      },
      // 下面为对接uniapp官方按钮开放能力事件回调的对接
      getphonenumber(res) {
        this.$emit('getphonenumber', res)
      },
      getuserinfo(res) {
        this.$emit('getuserinfo', res)
      },
      error(res) {
        this.$emit('error', res)
      },
      opensetting(res) {
        this.$emit('opensetting', res)
      },
      launchapp(res) {
        this.$emit('launchapp', res)
      }
    }
  }
</script>

<style lang="scss" scoped>
  // 去除button的所有默认样式，让其表现跟普通的view、text元素一样
  .ct-reset-button {
    padding: 0;
    background-color: transparent;
    border-radius: 0;
    /* #ifndef APP-PLUS */
    font-size: inherit;
    line-height: inherit;
    color: inherit;
    /* #endif */
    /* #ifdef APP-NVUE */
    border-width: 0;
    /* #endif */
  }

  /* #ifndef APP-NVUE */
  .ct-reset-button::after {
    border: none;
  }

  /* #endif */

  .ct-button {
    padding: 0;
    color: #fff;
    line-height: 35px;
    font-size: 14px;
    border-radius: 4px;
    background-color: $uni-color-primary;
  }

  .ct-button-hover {
    opacity: 0.8;
  }
</style>