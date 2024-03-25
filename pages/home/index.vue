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
        <navigator url="/pages/home/search" open-type="navigate" class="home-nav-item">
          <view class="home-nav-icon"></view>
          <view class="home-nav-text">包车</view>
        </navigator>
        <navigator url="/pages/home/search" open-type="navigate" class="home-nav-item">
          <view class="home-nav-icon"></view>
          <view class="home-nav-text">跟团游</view>
        </navigator>
        <navigator url="/pages/home/search" open-type="navigate" class="home-nav-item">
          <view class="home-nav-icon"></view>
          <view class="home-nav-text">景区门票</view>
        </navigator>
        <navigator url="/pages/home/search" open-type="navigate" class="home-nav-item">
          <view class="home-nav-icon"></view>
          <view class="home-nav-text">景区门票</view>
        </navigator>
        <navigator url="/pages/home/search" open-type="navigate" class="home-nav-item">
          <view class="home-nav-icon"></view>
          <view class="home-nav-text">景区门票</view>
        </navigator>
        <navigator url="/pages/home/search" open-type="navigate" class="home-nav-item">
          <view class="home-nav-icon"></view>
          <view class="home-nav-text">景区门票</view>
        </navigator>
        <navigator url="/pages/home/search" open-type="navigate" class="home-nav-item">
          <view class="home-nav-icon"></view>
          <view class="home-nav-text">景区门票</view>
        </navigator>
      </view>
    </view>

    <button type="default" open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber">获取手机号</button>
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
      menu: [
        { icon: '/static/account.png', lable: '实际利率计算器', url: '/pages/interestRateCalc/interestRateCalc' },
        { icon: '/static/account.png', lable: '贷款计算器', url: '/pages/loanCalc/loanCalc' },
        { icon: '/static/account.png', lable: '利率周期转化器', url: '/pages/rateConversionCalc/rateConversionCalc' },
        { icon: '/static/account.png', lable: '税额计算器', url: '' },
        { icon: '/static/account.png', lable: '个税计算器', url: '/pages/taxCalc/taxCalc' },
        { icon: '/static/account.png', lable: '计算人民币存款利息', url: '/pages/depositInterestCalc/depositInterestCalc' }
      ]
    }
  },
  onLoad() {
    uni.login({
      success: (res) => {
        console.log(res)
      }
    })
    this.getMenuData()
  },
  methods: {
    getMenuData() {
      this.$http.get('/huayi/menu/list')
    },

    decryptPhoneNumber(event) {
      console.log(event)
    },

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
  padding: 15px;
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
  .home-nav-cell {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fill, calc((100% - 40px) / 5));
  }

  .home-nav-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .home-nav-icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background-color: red;
  }

  .home-nav-text {
    margin-top: 4px;
    font-size: 12px;
    font-weight: 600;
  }
}
</style>
