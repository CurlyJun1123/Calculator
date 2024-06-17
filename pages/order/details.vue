<template>
  <view>
    <ct-loading v-if="loading" />

    <template v-else>
      <view class="head">{{ project.title }}</view>

      <view class="card">
        <view class="card-head">凭「身份证」换票入园</view>
        <view class="id-card-row">
          <view v-for="(item, index) in specs" class="id-card-item align-center" :key="index">
            <view class="id-card-item-type">证件</view>
            <view class="id-card-item-content">
              <view>{{ item.userName }}</view>
              <view>{{ item.userIdcard }}</view>
            </view>
          </view>
        </view>
      </view>

      <view class="card">
        <view class="card-head">订单信息</view>
        <view class="descriptions-row">
          <view class="descriptions-item">
            <view class="descriptions-item-container justify-between">
              <view class="descriptions-item-label">订单编号</view>
              <view class="descriptions-item-content flex-1 wrap-normal">{{ dataSource.orderCode }}</view>
            </view>
          </view>
          <view class="descriptions-item">
            <view class="descriptions-item-container justify-between">
              <view class="descriptions-item-label">创建时间</view>
              <view class="descriptions-item-content flex-1 wrap-normal">{{ dataSource.createTime }}</view>
            </view>
          </view>
          <view class="descriptions-item">
            <view class="descriptions-item-container justify-between">
              <view class="descriptions-item-label">支付时间</view>
              <view class="descriptions-item-content flex-1 wrap-normal">{{ dataSource.createTime }}</view>
            </view>
          </view>
        </view>
      </view>
    </template>
  </view>
</template>

<script>
export default {
  data() {
    return {
      loading: true,

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
        this.loading = false

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

<style lang="scss" scoped>
.head {
  padding: 12px 12px 0;
  font-size: 16px;
  font-weight: bold;
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

.id-card-row {
  .id-card-item:last-of-type {
    margin-bottom: 0;
  }

  .id-card-item {
    margin-bottom: 8px;
    background-color: #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    font-size: 14px;

    .id-card-item-type {
      padding: 8px 3px;
      background-color: #505050;
      color: #fff;
      writing-mode: vertical-rl;
    }

    .id-card-item-content {
      padding: 0 12px;
    }
  }
}

.descriptions-row {
  .descriptions-item {
    .descriptions-item-container {
      font-size: 14px;
    }

    .descriptions-item-label {
      color: #333;
    }

    .descriptions-item-content {
      color: #95a5a6;
      text-align: right;
    }
  }
}
</style>
