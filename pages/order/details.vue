<template>
  <view>
    <view>{{ project.title }}</view>
    <view>凭「身份证」换票入园</view>
    <view>
      <view v-for="(item, index) in specs" :key="index">
        <view>{{ item.userName }}</view>
        <view>{{ item.userIdcard }}</view>
      </view>
    </view>

    <view class="card">
      <view class="card-head">订单信息</view>
      <view class="descriptions-row">
        <view class="descriptions-item">
          <view class="descriptions-item-container">
            <view class="descriptions-item-label">订单编号</view>
            <view class="descriptions-item-content wrap-normal">{{ dataSource.orderCode }}</view>
          </view>
        </view>
        <view class="descriptions-item">
          <view class="descriptions-item-container">
            <view class="descriptions-item-label">创建时间</view>
            <view class="descriptions-item-content wrap-normal">{{ dataSource.createTime }}</view>
          </view>
        </view>
        <view class="descriptions-item">
          <view class="descriptions-item-container">
            <view class="descriptions-item-label">支付时间</view>
            <view class="descriptions-item-content wrap-normal">{{ dataSource.createTime }}</view>
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
      dataSource: {},
      project: {},
      specs: [],
    }
  },

  onLoad(options) {
    this.getDetailsData(options.id)
  },

  methods: {
    getDetailsData(orderId) {
      this.$http.get(`/hy/orders/getOrders?id=${orderId}`).then((data) => {
        this.dataSource = data
        this.project = data.project
        this.specs = data.hyOrdersDetailsList
      })
    },
  },
}
</script>

<style lang="scss">
page {
  background-color: $uni-bg-color-grey;
}
</style>

<style lang="scss">
.head-tabs {
  background-color: #fff;
}

.order-card {
  padding: 12px;
  padding-top: 0;
}

.order-card:first-of-type {
  padding-top: 12px;
}

.order-item {
  background-color: #fff;
  border-radius: 8px;
}

.order-code {
  margin: 0 12px;
  padding: 8px 0;
  color: #4b494a;
  font-size: 12px;
  border-bottom: 1px solid #f6f6f6;
}

.order-specs {
  display: flex;
  padding: 12px;
}

.order-specs-details {
  display: flex;
  margin-left: 8px;
  justify-content: space-between;
  flex: 1;
}

.order-specs-content {
  flex: 1;

  .order-specs-title {
    color: #333;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
  }
}

.order-specs-amount-quantity {
  margin-left: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.order-specs-price {
  font-size: 14px;

  .order-specs-price-fit {
    font-size: 10px;
  }

  .order-specs-price-num {
    font-weight: 600;
  }
}

.order-specs-num {
  margin-top: 4px;
  font-size: 14px;
}

.card {
  margin: 12px;
  padding: 12px;
  border-radius: 8px;
  background-color: #fff;

  .card-head {
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: bold;
  }
}

.descriptions-row {
  .descriptions-item {
    .descriptions-item-container {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
    }

    .descriptions-item-label {
      color: #333;
    }

    .descriptions-item-content {
      flex: 1;
      color: #95a5a6;
      text-align: right;
    }
  }
}
</style>
