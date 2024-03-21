<template>
  <view>
    <swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
      <swiper-item>
        <view class="swiper-item uni-bg-red">A</view>
      </swiper-item>
      <swiper-item>
        <view class="swiper-item uni-bg-green">B</view>
      </swiper-item>
      <swiper-item>
        <view class="swiper-item uni-bg-blue">C</view>
      </swiper-item>
    </swiper>

    <view class="card detail-info">
      <view>
        <view class="detail-info-price">
          <text class="detail-info-price-fit">￥</text>
          <text class="detail-info-price-num">300</text>
          <text class="detail-info-price-fit">起</text>
        </view>
      </view>
      <view class="detail-info-title">山西平遥古城旅拍晋商服饰清汉女簪花女格格服战国袍跟拍写真拍照</view>
      <view class="detail-info-more">
        <view class="detail-info-more-item">
          <view class="detail-info-more-item-icon"></view>
          5分
        </view>
        <view class="detail-info-more-item">
          <view class="detail-info-more-item-icon"></view>
          13条评价
        </view>
        <view class="detail-info-more-item">
          <view class="detail-info-more-item-icon"></view>
          分享
        </view>
      </view>
    </view>

    <view class="card">
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
    </view>

    <ct-action-bar :options="{ button: [{ text: 123 }] }"></ct-action-bar>
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
      duration: 500
    }
  },
  methods: {
    changeIndicatorDots(e) {
      this.indicatorDots = !this.indicatorDots
    },
    changeAutoplay(e) {
      this.autoplay = !this.autoplay
    },
    intervalChange(e) {
      this.interval = e.target.value
    },
    durationChange(e) {
      this.duration = e.target.value
    }
  }
}
</script>

<style lang="scss" scoped>
body {
  background-color: #efefef;
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

.uni-bg-blue {
  background-color: $uni-color-primary;
}
.uni-bg-green {
  background-color: $uni-color-success;
}
.uni-bg-red {
  background-color: $uni-color-error;
}

.card {
  margin: 12px 12px;
  padding: 12px;
  background-color: #fff;
  border-radius: 8px;
}

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
  line-height: 20px;
}

.detail-info-more {
  display: flex;
  margin-top: 6px;
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

.detail-info-more-item-icon {
  margin-right: 4px;
  width: 12px;
  height: 12px;
  background-color: #f86601;
}

.card-title {
  margin-bottom: 12px;
  color: #333;
  font-weight: 600;
  font-size: 16px;
}

.vehicle {
  display: grid;
  grid-gap: 8px;
  // grid-template-columns: repeat(2, calc((100% - 8px) / 2));
}

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
</style>
