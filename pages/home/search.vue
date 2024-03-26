<template>
  <view>
    <view class="page-cell">
      <!-- <navigator url="/pages/home/detail" open-type="navigate" hover-class="navigator-hover">
        <view class="page-item">
          <view class="page-cover"></view>
          <view class="page-info">
            <view class="page-info-title">桂林桂林桂林桂林桂林桂林桂林桂林桂林桂林</view>
            <view class="page-info-content">
              <view class="page-info-score-sold">
                <view class="page-info-score">4.6 分</view>
                <view class="page-info-sold">已售 200 份</view>
              </view>
              <view class="page-info-original-price">
                <view class="page-info-original">￥275</view>
                <view class="page-info-price">
                  <text class="page-info-price-fit">￥</text>
                  <text class="page-info-price-num">300</text>
                  <text class="page-info-price-fit">起</text>
                </view>
                <view class="page-info-result">已优惠 ￥25</view>
              </view>
            </view>
          </view>
        </view>
      </navigator> -->
      <navigator v-for="(item, index) in list" class="page-item" url="/pages/home/detail" open-type="navigate" hover-class="navigator-hover" v-bind:key="index">
        <view class="page-content">
          <view class="page-cover">
            <ct-avatar :src="item.img" :size="105" :radius="8" />
          </view>
          <view class="page-info">
            <view class="page-info-title">
              {{ item.title }}
            </view>
            <view class="page-info-content">
              <view class="page-info-score-sold">
                <view class="page-info-score">4.6 分</view>
                <view class="page-info-sold">已售 {{ item.price }} 份</view>
              </view>
              <view class="page-info-original-price">
                <view class="page-info-original">￥{{ item.price }}</view>
                <view class="page-info-price">
                  <text class="page-info-price-fit">￥</text>
                  <text class="page-info-price-num">{{ item.price }}</text>
                  <text class="page-info-price-fit">起</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </navigator>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  onLoad() {
    this.getListData()
  },
  methods: {
    getListData() {
      this.$http.get('/hy/project/list?pageNum=1&pageSize=10&searchValue=&projectType=1').then((data) => {
        this.list = data.rows
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-content {
  display: flex;
  margin: 0 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f6f6f6;
}

.page-cover {
  margin-right: 8px;
  width: 105px;
  height: 105px;
  border-radius: 8px;
}

.page-info {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.page-info-title {
  margin-bottom: 4px;
  color: #333;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
}

.page-info-content {
  display: flex;
  justify-content: space-between;
}

.page-info-score {
  margin-bottom: 4px;
  color: #0056d0;
  font-size: 12px;
}

.page-info-sold {
  color: #4b494a;
  font-size: 12px;
}

.page-info-original-price {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.page-info-original {
  color: #454545;
  text-decoration: line-through;
  font-size: 10px;
}

.page-info-price {
  color: #f86601;
  font-size: 16px;
}

.page-info-price-fit {
  font-size: 12px;
}

.page-info-price-num {
  font-weight: 600;
}

.page-info-result {
  margin-top: 4px;
  padding: 2px 4px;
  border-radius: 4px;
  background: linear-gradient(to right, #fa7e54, #f33726);
  color: #fff;
  font-size: 10px;
}
</style>
