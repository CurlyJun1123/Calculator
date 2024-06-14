<template>
  <view>
    <view class="head-tabs">
      <ct-tabs :options="[{ name: '全部' }, { name: '待付款' }, { name: '待发货' }]" />
    </view>

    <view class="order-row">
      <view v-for="(item, index) in dataSource" class="order-card" :key="index" @click="onNavigateTo(item)">
        <view class="order-item">
          <view class="order-code">订单编号：{{ item.orderCode }}</view>
          <!-- <view v-for="(specs, specsIndex) in item.project" :key="specsIndex" class="order-specs"> -->
          <view class="order-specs">
            <view class="order-specs-img">
              <ct-avatar :src="$static + item.project.img" :size="80" :radius="8" />
            </view>
            <view class="order-specs-details">
              <view class="order-specs-content">
                <view class="order-specs-title line-1">
                  {{ item.project.title }}
                </view>
              </view>
              <view class="order-specs-amount-quantity">
                <view class="order-specs-price">
                  <text class="order-specs-price-fit">￥</text>
                  <text class="order-specs-price-num">{{ item.project.price }}</text>
                </view>
                <view class="order-specs-num">x{{ item.totalNum }}</view>
              </view>
            </view>
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
    }
  },

  onLoad() {
    this.getListData()
  },

  methods: {
    getListData() {
      this.$http.get('/hy/orders/getOrdersList').then((data) => {
        this.dataSource = data
        console.log('🚀 ~ this.$http.get ~ data:', data)
      })
    },

    onNavigateTo(order) {
      uni.navigateTo({ url: `/pages/order/details?id=${order.id}` })
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
  background-color: #f8f8f8;
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
</style>
