<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style lang="scss">
/* 每个页面公共css */
text {
  font-family: Helvetica Neue, robotoregular, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, Helvetica, Arial, monospace, serif;
}

button,
uni-button {
  height: 35px !important;
  line-height: 35px !important;
  font-size: 14px !important;
  background-color: $uni-color-primary !important;
}
</style>
