<template>
  <view>
    <view class="home-head">
      <view class="home-position">定位</view>
      <view class="home-search">搜索框</view>
      <view class="home-service">客服</view>
    </view>

    <view class="home-swiper">
      <swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
        <swiper-item v-for="(swiper, index) in swipers" v-bind:key="index">
          <view class="swiper-item uni-bg-red">A</view>
        </swiper-item>
      </swiper>
    </view>

    <view class="home-nav">
      <view class="home-nav-cell">
        <navigator v-for="(menu, index) in menus" v-bind:key="index" url="/pages/home/search" open-type="navigate" class="home-nav-item">
          <view class="home-nav-icon"><img class="home-nav-icon-img" :src="menu.imgUrl" /></view>
          <view class="home-nav-text">{{ menu.title }}</view>
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
      // 轮播图
      swipers: [],
      autoplay: true,
      duration: 500,
      indicatorDots: true,
      interval: 2000,

      // 菜单
      menus: []
    }
  },
  onLoad() {
    // uni.login({
    //   success: (res) => {
    //     console.log(res)
    //   }
    // })
    this.getSwiperData()
    this.getMenuData()
  },
  methods: {
    getSwiperData() {
      this.$http.get('/hy/app/getBanner').then((data) => {
        this.swipers = data
      })
    },

    getMenuData() {
      this.$http.get('/hy/app/getMenu').then((data) => {
        this.menus = data
      })
    },

    decryptPhoneNumber(event) {
      console.log(event)
    },

    // 轮播图处理事件
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
