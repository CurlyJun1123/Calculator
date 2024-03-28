<template>
  <view>
    <view>
      <view class="head">
        <view class="head-avatar"></view>
        <view class="head-info">
          <view>姓名</view>
          <view>13211120149</view>
        </view>
      </view>
    </view>
    <view class="order">
      <view class="order-cell">
        <view class="order-item">
          <view class="order-icon"></view>
          <view class="order-lable">待付款</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="scss">
.head {
  display: flex;
  align-items: center;
}

.head-avatar {
  width: 80px;
  height: 80px;
  background-color: red;
  border-radius: 50%;
}

.head-info {
  margin-left: 8px;
  display: flex;
  flex-direction: column;
}
</style>
