<template>
  <view>
    <view class="home-head">
      <view class="home-position">定位</view>
      <view class="home-search">搜索框</view>
      <view class="home-service">客服</view>
    </view>

    <view class="home-swiper">
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
    </view>

    <view class="home-nav">
      <view class="home-nav-cell">
        <navigator v-for="(item, index) in list" v-bind:key="index" url="/pages/home/search" open-type="navigate" class="home-nav-item">
          <view class="home-nav-icon"><img :src="item.icon" class="home-nav-icon-img" /></view>
          <view class="home-nav-text">{{ item.lable }}</view>
        </navigator>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      background: ['color1', 'color2', 'color3'],
      autoplay: true,
      duration: 500,
      indicatorDots: true,
      interval: 2000,
      list: [
        { icon: '/static/account.png', lable: '包车', url: '/pages/home/search' },
        { icon: '/static/account.png', lable: '跟团游', url: '/pages/home/search' },
        { icon: '/static/account.png', lable: '景区门票', url: '/pages/home/search' },
        { icon: '/static/account.png', lable: '跟团游', url: '/pages/home/search' },
        { icon: '/static/account.png', lable: '景区门票', url: '/pages/home/search' },
        { icon: '/static/account.png', lable: '跟团游', url: '/pages/home/search' },
        { icon: '/static/account.png', lable: '景区门票', url: '/pages/home/search' }
      ]
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
.home-head {
  display: flex;
  align-items: center;
}

.home-swiper {
  padding: 30rpx;
}

.swiper {
  overflow: hidden;
  height: 300rpx;
  border-radius: 8px;
}

.swiper-item {
  display: block;
  height: 300rpx;
  border-radius: 8px;
  text-align: center;
  line-height: 300rpx;
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

.home-nav {
  padding-left: 30rpx;
  padding-right: 30rpx;

  .home-nav-cell {
    display: grid;
    grid-gap: 15rpx;
    grid-template-columns: repeat(auto-fill, calc((100% - 52rpx) / 4));
  }

  .home-nav-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .home-nav-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80rpx;
    height: 80rpx;
    border-radius: 8px;
    // background-color: red;
  }

  .home-nav-icon-img {
    width: 60rpx;
    height: 60rpx;
  }

  .home-nav-text {
    margin-top: 4px;
    font-size: 12px;
    font-weight: 600;
  }
}
</style>
