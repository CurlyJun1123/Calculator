<template>
  <view class="page-cell">
    <navigator
      v-for="(item, index) in list"
      v-bind:key="index"
      open-type="navigate"
      hover-class="navigator-hover"
      :url="`/pages/detail/detail?id=${item.id}&title=${item.title}`"
    >
      <view class="page-item">
        <view class="page-content">
          <view class="page-cover">
            <ct-avatar :src="$static + item.img" :size="105" :radius="8" />
          </view>
          <view class="page-info">
            <view class="page-info-title">
              {{ item.title }}
            </view>
            <view class="page-info-content">
              <view class="page-info-score-sold">
                <view v-if="item.score" class="page-info-score">{{ item.score }}分</view>
                <view class="page-info-sold">已售{{ item.price }}份</view>
              </view>
              <view class="page-info-original-price">
                <view v-if="item.linePrice && item.linePrice != item.price" class="page-info-original">￥{{ item.linePrice }}</view>
                <view class="page-info-price">
                  <text class="page-info-price-fit">￥</text>
                  <text class="page-info-price-num">{{ item.price }}</text>
                  <text class="page-info-price-fit">起</text>
                </view>
                <view v-if="item.linePrice && item.linePrice != item.price" class="page-info-result">已优惠￥{{ item.linePrice - item.price }}</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </navigator>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    }
  },

  onLoad(options) {
    uni.setNavigationBarTitle({ title: options.navigationBarTitleText })
    this.getListData(options.projectType)
  },

  methods: {
    getListData(projectType) {
      const params = {
        pageNum: 1,
        pageSize: 10,
        projectType,
      }

      this.$http.get('/hy/project/list', { params }).then((data) => {
        this.list = data.rows
      })
    },
  },
}
</script>

<style lang="scss" scoped>
page {
  background-color: #fff;
}

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
