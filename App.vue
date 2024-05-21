<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
    uni.setStorage({
      key: 'token',
      data: 'eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImZmNjNlY2NjLTA4NjQtNGUxNS04OTA2LTAzOGE1NmYxMjdiYSJ9.Cv0v8Byz1-Qt-5yWc4HDuMcpqu0udxfgYp73Fb0TIgQzAE9bAiXhg3wS2pmCFd__nhnmA5Tbo2OwtgRwapgqjg',
    })
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style lang="scss">
/* 每个页面公共css */
text {
  font-family: Helvetica Neue, robotoregular, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, Helvetica, Arial, monospace, serif;
}

@import '@/common/scss/index.scss';
</style>
