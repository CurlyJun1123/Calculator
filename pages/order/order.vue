<template>
  <view>
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
            <view class="ticket-item-original-price">
              <view v-if="item.linePrice" class="ticket-item-original">￥{{ item.linePrice }}</view>
              <view class="ticket-item-price">
                <text class="ticket-item-price-fit">￥</text>
                <text class="ticket-item-price-num">{{ item.price }}</text>
                <text class="ticket-item-price-fit">起</text>
              </view>
              <view v-if="item.linePrice" class="ticket-item-result">已优惠￥{{ item.linePrice - item.price }}</view>
            </view>
            <view><uni-number-box /></view>
          </view>
        </view>
      </view>
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

<style>
page {
  background-color: #efefef;
}
</style>
<style lang="scss">
.card {
  margin: 12px 12px;
  background-color: #fff;
  border-radius: 8px;
}

.head {
  padding: 12px;
}

.divider {
  margin: 12px 0;
  width: 100%;
  border-top: 1rpx solid rgba(0, 0, 0, 0.12);
}

.head-title,
.head-time-lable {
  color: #333;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
}

.head-time {
  display: flex;
  justify-content: space-between;
}

.head-time-lable,
.head-time-replace {
  font-size: 16px;
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
        font-size: 16px;
        font-weight: 600;
      }

      .ticket-item-label {
        margin-top: 2px;
        font-size: 14px;
      }
    }

    .ticket-item-right {
      display: flex;

      .ticket-item-original-price {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }

      .ticket-item-original {
        color: #454545;
        text-decoration: line-through;
        font-size: 10px;
      }

      .ticket-item-price {
        color: #f86601;
        font-size: 16px;
      }

      .ticket-item-price-fit {
        font-size: 12px;
      }

      .ticket-item-price-num {
        font-weight: 600;
      }

      .ticket-item-result {
        margin-top: 4px;
        padding: 2px 4px;
        border-radius: 4px;
        background: linear-gradient(to right, #fa7e54, #f33726);
        color: #fff;
        font-size: 10px;
      }
    }
  }
}
</style>
