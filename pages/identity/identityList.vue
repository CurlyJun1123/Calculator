<template>
  <view>
    <view class="identity-list">
      <view v-for="item in identity" class="identity-item card" v-bind:key="item.id">
        <view class="identity-item-name">{{ item.name }}</view>
        <view class="identity-item-card">身份证 {{ item.idCard }}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      identity: [
        { id: 0, name: '林振明', phone: '13211120149', email: '1004342009@qq.com', idCard: '442000199711111111' },
        { id: 1, name: '林振明', phone: '13211120149', email: '1004342009@qq.com', idCard: '442000199711111111' }
      ]
    }
  },

  onLoad() {
    // this.getIdentityData()
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

.identity-item-name {
  color: #333;
  font-size: 16px;
}

.identity-item-card {
  margin-top: 4px;
  color: #95a5a6;
  font-size: 14px;
}
</style>
