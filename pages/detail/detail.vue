<template>
  <view>
    <swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
      <swiper-item>
        <view class="swiper-item uni-bg-red"><ct-avatar :src="$static + data.img" :size="'100%'" /></view>
      </swiper-item>
    </swiper>

    <view class="detail-info card">
      <view class="detail-info-price">
        <text class="detail-info-price-fit">￥</text>
        <text class="detail-info-price-num">
          {{ minPrice?.price }}
        </text>
        <text class="detail-info-price-fit">起</text>
        <text v-if="minPrice?.linePrice && minPrice?.linePrice != minPrice?.price" class="detail-info-price-original-price">
          优惠前￥{{ minPrice?.linePrice }}起
        </text>
      </view>
      <view class="detail-info-title">{{ data.title }}</view>
      <view class="detail-info-more">
        <view class="detail-info-more-item">
          <uni-icons type="heart" size="14" color="#95a5a6" />
          <text class="detail-info-more-item-text">5分</text>
        </view>
        <view class="detail-info-more-item">
          <uni-icons type="chat" size="14" color="#95a5a6" />
          <text class="detail-info-more-item-text">13条评价</text>
        </view>
        <view class="detail-info-more-item">
          <uni-icons type="redo" size="14" color="#95a5a6" />
          <text class="detail-info-more-item-text">分享</text>
        </view>
      </view>
    </view>

    <view v-if="data.hyProjectTicketList.length" class="ticket card">
      <view class="ticket-list">
        <navigator
          v-for="(item, index) in data.hyProjectTicketList"
          v-bind:key="index"
          :url="`/pages/order/order?id=${data.id}&projectTicketId=${item.id}`"
        >
          <view class="ticket-item">
            <view class="ticket-item-left">
              <view class="ticket-item-title">{{ item.remark }}</view>
              <view class="ticket-item-label">立即取票 需要换票</view>
              <view class="ticket-item-label">已售{{ item.saleNum || 0 }}</view>
            </view>
            <view class="ticket-item-right">
              <view class="ticket-item-original-price">
                <view v-if="item?.linePrice" class="ticket-item-original">￥{{ item.linePrice }}</view>
                <view class="ticket-item-price">
                  <text class="ticket-item-price-fit">￥</text>
                  <text class="ticket-item-price-num">{{ item.price }}</text>
                  <text class="ticket-item-price-fit">起</text>
                </view>
                <view v-if="item?.linePrice" class="ticket-item-result">已优惠￥{{ item.linePrice - item.price }}</view>
              </view>
            </view>
          </view>
        </navigator>
      </view>
    </view>

    <!-- <view class="card">
      <view class="card-title">全部车型</view>
      <view class="vehicle">
        <view class="vehicle-card">
          <view class="vehicle-card-title">舒适5座</view>
          <view class="vehicle-card-capacity">4人 · 2行李</view>
        </view>
        <view class="vehicle-card">
          <view class="vehicle-card-title">经济5座</view>
          <view class="vehicle-card-capacity">4人 · 2行李</view>
        </view>
        <view class="vehicle-card">
          <view class="vehicle-card-title">豪华7座</view>
          <view class="vehicle-card-capacity">6人 · 4行李</view>
        </view>
        <view class="vehicle-card">
          <view class="vehicle-card-title">商务7座</view>
          <view class="vehicle-card-capacity">6人 · 4行李</view>
        </view>
      </view>
    </view> -->

    <view class="rich-text-main card"><rich-text class="rich-text" :nodes="data.content" /></view>

    <ct-action-bar :options="{ button: [{ text: '立即购买' }] }" />
  </view>
</template>

<script>
export default {
  data() {
    return {
      background: ['color1', 'color2', 'color3'],
      indicatorDots: true,
      autoplay: true,
      interval: 2000,
      duration: 500,

      data: {}
    }
  },

  computed: {
    minPrice() {
      return this.data?.hyProjectTicketList?.reduce((prev, current) => (prev?.price < current?.price ? prev : current))
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
    },

    changeValue(value) {
      console.log('返回数值：', value)
    }
  }
}
</script>

<style lang="scss">
page {
  background-color: #efefef;
}
</style>

<style lang="scss" scoped>
.card {
  margin: 12px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.swiper {
  overflow: hidden;
  height: 750rpx;
}

.swiper-item {
  display: block;
  height: 750rpx;
  text-align: center;
  line-height: 750rpx;
}

.detail-info {
  padding: 12px;

  .detail-info-original-price {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .detail-info-original {
    color: #454545;
    text-decoration: line-through;
    font-size: 10px;
  }

  .detail-info-price {
    color: #f86601;
  }

  .detail-info-price-fit {
    font-size: 12px;
  }

  .detail-info-price-original-price {
    margin-left: 8px;
    color: #95a5a6;
    font-size: 12px;
  }

  .detail-info-price-num {
    margin-right: 2px;
    font-weight: 600;
    font-size: 22px;
  }

  .detail-info-title {
    margin-top: 6px;
    color: #333;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }

  .detail-info-more {
    display: flex;
    margin-top: 12px;
    margin-bottom: -6px;
  }

  .detail-info-more-item {
    display: flex;
    padding: 6px 0;
    flex: 1;
    justify-content: center;
    align-items: center;
    color: #95a5a6;
    font-size: 12px;
  }

  .detail-info-more-item-text {
    margin-left: 4px;
  }
}

.card-title {
  margin-bottom: 12px;
  padding: 12px;
  padding-bottom: 0;
  color: #333;
  font-weight: 600;
  font-size: 16px;
}

.vehicle {
  display: grid;
  grid-gap: 8px;

  .vehicle-card {
    padding: 8px 12px;
    border: 1px solid #f86601;
    border-radius: 4px;
    background-color: #f8660110;
  }

  .vehicle-card-title {
    font-weight: 600;
    font-size: 14px;
  }

  .vehicle-card-capacity {
    margin-top: 2px;
    font-size: 12px;
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

.rich-text-main {
  padding: 12px;
}

.rich-text {
  font-size: 14px;
}
</style>
