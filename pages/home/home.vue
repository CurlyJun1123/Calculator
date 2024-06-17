<template>
  <view>
    <view class="home-head">
      <view class="home-position">定位</view>
      <view class="home-search">搜索框</view>
      <view class="home-service">客服</view>
    </view>

    <view class="home-swiper">
      <swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
        <swiper-item v-for="(swiper, index) in swipers" :key="index">
          <view class="swiper-item"><ct-avatar :src="$static + swiper.imgUrl" size="100%" :radius="8" /></view>
        </swiper-item>
      </swiper>
    </view>

    <view class="home-nav">
      <view class="home-nav-cell">
        <navigator v-for="(menu, index) in menus" open-type="navigate" :key="index" :url="`${menu.path}&navigationBarTitleText=${menu.title}`">
          <view class="home-nav-item">
            <view class="home-nav-icon"><img class="home-nav-icon-img" :src="$static + menu.imgUrl" /></view>
            <view class="home-nav-text">{{ menu.title }}</view>
          </view>
        </navigator>
      </view>
    </view>

    <!-- <button type="primary" size="mini" open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber">获取手机号</button> -->
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
      menus: [],
    }
  },

  onLoad() {
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
      console.log('🚀 ~ decryptPhoneNumber ~ event:', event)
      uni.login({
        provider: 'weixin',
        success: (loginRes) =>
          this.$http
            .post('/miniapp/login', {
              ...event.detail,
              code: loginRes.code,
            })
            .then((res) => {
              try {
                uni.setStorageSync('token', res.token)
              } catch (e) {
                // error
              }
            }),
      })
    },
  },
}
</script>

<style lang="scss">
page {
  background-color: #fff;
}

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

.home-nav {
  margin-top: -6px;
  padding-left: 30rpx;
  padding-right: 30rpx;

  .home-nav-cell {
    display: grid;
    grid-gap: 15rpx;
    grid-template-columns: repeat(auto-fill, calc((100% - 52rpx) / 4));
  }

  .home-nav-item {
    padding: 6px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .home-nav-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -6px;
    width: 80rpx;
    height: 80rpx;
    border-radius: 8px;
  }

  .home-nav-icon-img {
    width: 60rpx;
    height: 60rpx;
  }

  .home-nav-text {
    font-size: 12px;
    font-weight: 600;
  }
}
</style>
