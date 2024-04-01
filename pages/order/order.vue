<template>
  <view>
    <view class="bg"></view>

    <view class="page">
      <view class="head card">
        <view class="head-title">{{ data.title }}</view>
        <view class="divider"></view>
        <view class="head-time">
          <view class="head-time-lable">2023/11/11 周六</view>
          <view class="head-time-replace">更换&gt;</view>
        </view>
      </view>

      <view class="ticket card">
        <view class="ticket-list">
          <view v-for="(item, index) in data.hyProjectTicketList" v-bind:key="index" class="ticket-item">
            <view class="ticket-item-left">
              <view class="ticket-item-title">{{ item.remark }}</view>
              <view class="ticket-item-label">立即取票 需要换票</view>
              <view class="ticket-item-label">已售31+</view>
            </view>
            <view class="ticket-item-right">
              <view class="ticket-item-price">
                <text class="ticket-item-price-fit">￥</text>
                <text class="ticket-item-price-num">{{ item.price }}</text>
              </view>
              <view class="ticket-item-number"><uni-number-box /></view>
            </view>
          </view>
        </view>
      </view>

      <view class="tourist card">
        <view class="tourist-title card-title">游客信息</view>
        <view class="tourist-list">
          <view v-for="(item, index) in data.hyProjectTicketList" v-bind:key="index" class="tourist-item">
            <view class="tourist-item-type">{{ item.remark }}</view>
            <view class="tourist-item-list">
              <view class="tourist-item-info">
                <view class="tourist-item-info-delete">&gt;</view>
                <view class="tourist-item-info-main">
                  <view class="tourist-item-info-name">{{ item.remark }}</view>
                  <view class="tourist-item-info-code">身份证 442000199700000000</view>
                  <view class="tourist-item-info-phone">手机号 13211100000</view>
                </view>
              </view>
              <view class="tourist-item-info">
                <view class="tourist-item-info-delete">&gt;</view>
                <view class="tourist-item-info-main">
                  <view class="tourist-item-info-name">{{ item.remark }}</view>
                  <view class="tourist-item-info-code">身份证 442000199700000000</view>
                  <view class="tourist-item-info-phone">手机号 13211100000</view>
                </view>
              </view>
            </view>
            <view class="tourist-item-icon">&gt;</view>
          </view>
        </view>
      </view>

      <ct-action-bar :options="{ button: [{ text: 123 }] }"></ct-action-bar>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      data: {}
    }
  },

  onLoad(options) {
    this.getListData(options.id)
  },

  methods: {
    getListData(id) {
      this.$http.get('/hy/project/' + id).then((data) => {
        this.data = data
      })
    }
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
  width: 750rpx;
  height: 300px;
  background: linear-gradient(to bottom, $uni-theme-color-6, $uni-bg-color-grey);
}

.page {
  position: relative;
  z-index: 2;
  padding-top: 12px;
}

.card {
  margin: 12px 12px;
  margin-top: 0;
  background-color: #fff;
  border-radius: 8px;
}

.divider {
  margin: 12px 0;
  width: 100%;
  border-top: 1rpx solid rgba(0, 0, 0, 0.12);
}

.card-title {
  padding: 12px;
  padding-bottom: 0;
  color: $uni-text-color;
  font-weight: 600;
  font-size: 16px;
}

.head {
  padding: 12px;

  .head-title,
  .head-time-lable {
    color: $uni-text-color;
    font-weight: 600;
    font-size: 16px;
  }

  .head-time {
    display: flex;
    justify-content: space-between;
  }

  .head-time-lable,
  .head-time-replace {
    font-size: 14px;
  }
}

.ticket {
  .ticket-item:first-of-type {
    border-top: none;
  }

  .ticket-item {
    display: flex;
    padding: 12px;
    border-top: 1rpx solid rgba(0, 0, 0, 0.12);

    .ticket-item-left {
      flex: 1;

      .ticket-item-title {
        margin-bottom: 4px;
        font-size: 16px;
        font-weight: 600;
      }

      .ticket-item-label {
        color: #636e72;
        font-size: 14px;
      }
    }

    .ticket-item-right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: space-between;

      .ticket-item-price-fit {
        font-size: 14px;
      }

      .ticket-item-price {
        color: #f86601;
        font-size: 18px;
      }

      .ticket-item-price-num {
        font-weight: 600;
      }
    }
  }
}

.tourist {
  .tourist-title {
    padding: 12px;
  }

  .tourist-item:first-of-type {
    border-top: none;
  }

  .tourist-item {
    padding: 0 12px;
    display: flex;
    align-items: center;
    border-top: 1rpx solid rgba(0, 0, 0, 0.12);

    .tourist-item-type {
      width: 80px;
      color: $uni-text-color;
      font-size: 14px;
    }

    .tourist-item-list {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 0 6px;
    }

    .tourist-item-info:first-of-type {
      border-top: none;
    }

    .tourist-item-info {
      display: flex;
      padding: 12px 0;
      align-items: center;
      border-top: 1rpx solid rgba(0, 0, 0, 0.12);

      .tourist-item-info-delete {
        margin-right: 6px;
      }

      .tourist-item-info-main {
        .tourist-item-info-name {
          margin-bottom: 4px;
          color: $uni-text-color;
          font-size: 14px;
        }

        .tourist-item-info-code,
        .tourist-item-info-phone {
          color: #636e72;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
