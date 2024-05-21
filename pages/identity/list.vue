<template>
  <view class="identity-list">
    <view v-for="item in identity" v-bind:key="item.id" class="identity-item align-center" @click="() => onNavigateTo(item)">
      <view class="flex-1">
        <view class="identity-item-name">{{ item.name }}</view>
        <view class="identity-item-info">身份证 {{ item.idCard }}</view>
        <view class="identity-item-info">手机号 {{ item.phone }}</view>
      </view>
      <uni-icons type="compose" size="20"></uni-icons>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      identity: [],
    }
  },

  onShow() {
    this.getIdentityData()
  },

  methods: {
    getIdentityData() {
      this.$http.get('/hy/tourist/list').then((data) => {
        this.identity = data
      })
    },

    onNavigateTo(item) {
      uni.navigateTo({ url: `/pages/identity/edit?id=${item.id}&name=${item.name}&phone=${item.phone}&idCard=${item.idCard}` })
    },
  },
}
</script>

<style>
page {
  background-color: #efefef;
}
</style>

<style lang="scss" scoped>
.identity-item {
  margin: 12px 12px;
  padding: 12px;
  background-color: #fff;
  border-radius: 8px;
}

.identity-item-name {
  margin-bottom: 6px;
  color: $uni-text-color;
  font-size: 16px;
}

.identity-item-info {
  color: #636e72;
  font-size: 14px;
}
</style>
