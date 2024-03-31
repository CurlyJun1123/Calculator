<template>
  <view>
    <view class="identity-list">
      <view class="identity-item card">
        <view class="identity-item-name"></view>
        <view></view>
      </view>
      <view class="identity-list card"></view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      identity: []
    }
  },

  onLoad() {
    this.getIdentityData()
  },

  methods: {
    getIdentityData() {
      this.$http.get('/hy/tourist/list').then((data) => {
        this.identity = data
      })
    }
  }
}
</script>

<style>
page {
  background-color: #efefef;
}
</style>

<style lang="scss" scoped>
.card {
  margin: 12px 12px;
  padding: 12px;
  background-color: #fff;
  border-radius: 8px;
}
</style>
