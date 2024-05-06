<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
    uni.setStorage({
      key: 'token',
      data: 'eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImE3NTE1OWM2LWIyMWYtNGE0ZS05NjllLTQ1MGQ1M2YwMDhlMSJ9.481-sWr-nPC_tG1qKQS1G1FFF-GNcusjRJ_PDuaAzip7by0qJhGI-1DulBirpVd3dDsnBShnPz2iSUUv9smDNg'
    })
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
  font-family: Helvetica Neue, robotoregular, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, Helvetica,
    Arial, monospace, serif;
}

@import '@/common/scss/index.scss';
</style>
