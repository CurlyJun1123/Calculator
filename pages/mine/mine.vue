<template>
  <view>
    <view class="bg"></view>

    <view class="page">
      <view>
        <view class="head">
          <view class="head-avatar"></view>
          <view class="head-info">
            <view class="head-info-name">姓名</view>
            <view class="head-info-number">13211120149</view>
          </view>
        </view>
      </view>

      <view class="order card">
        <view class="order-title">我的订单</view>
        <view class="order-cell">
          <view class="order-item">
            <view class="order-icon"></view>
            <view class="order-lable">待付款</view>
          </view>
          <view class="order-item">
            <view class="order-icon"></view>
            <view class="order-lable">待确定</view>
          </view>
          <view class="order-item">
            <view class="order-icon"></view>
            <view class="order-lable">待实名</view>
          </view>
          <view class="order-item">
            <view class="order-icon"></view>
            <view class="order-lable">进行中</view>
          </view>
          <view class="order-item">
            <view class="order-icon"></view>
            <view class="order-lable">已完成</view>
          </view>
        </view>
      </view>

      <view class="common card">
        <view class="common-title">常用</view>
        <view class="common-cell">
          <navigator url="/pages/identity/list">
            <view class="common-item">
              <uni-icons type="staff" size="28"></uni-icons>
              <view class="common-lable">常用信息</view>
            </view>
          </navigator>
          <navigator url="/pages/identity/list">
            <view class="common-item">
              <uni-icons type="staff" size="28"></uni-icons>
              <view class="common-lable">常用信息</view>
            </view>
          </navigator>
          <navigator url="/pages/identity/list">
            <view class="common-item">
              <uni-icons type="staff" size="28"></uni-icons>
              <view class="common-lable">常用信息</view>
            </view>
          </navigator>
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
page {
  background-color: $uni-bg-color-grey;
}
</style>

<style lang="scss" scoped>
.bg {
  position: fixed;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 180px;
  background: $uni-theme-color-6;
}

.page {
  position: relative;
  z-index: 2;
  padding-top: 12px;
}

.card {
  margin: 12px 12px;
  padding: 0 12px;
  background-color: #fff;
  border-radius: 8px;
}

.head {
  display: flex;
  align-items: center;
  margin: 24px 12px;
}

.head-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background-color: #e4e4ef;
  border-radius: 50%;
}

.head-info {
  margin-left: 10px;
  display: flex;
  flex-direction: column;

  .head-info-name {
    color: #fff;
    font-size: 16px;
  }

  .head-info-number {
    margin-top: 4px;
    color: #fff;
    font-size: 14px;
  }
}

.order {
  .order-title {
    padding-top: 12px;
    font-size: 14px;
    color: #333333;
  }

  .order-cell {
    display: flex;
    padding: 8px 0;

    .order-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 8px 0;

      .order-icon {
        width: 20px;
        height: 20px;
        background-color: #333333;
      }

      .order-lable {
        margin-top: 4px;
        font-size: 14px;
        color: #333333;
      }
    }
  }
}

.common {
  .common-title {
    padding-top: 12px;
    font-size: 14px;
    color: #333333;
  }

  .common-cell {
    padding-bottom: 8px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);

    navigator {
      margin-top: 8px;
    }
  }

  .common-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 8px 0;

    .common-lable {
      margin-top: 4px;
      font-size: 14px;
      color: #333333;
    }
  }
}
</style>
