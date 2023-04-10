<template>
  <view>
    <view class="container">
      <view class="card-cell">
        <navigator v-for="(item, index) in list" class="card-item" :url="item.url" :key="index">
          <view class="card-item-icon"><image class="card-item-image" :src="item.icon" /></view>
          <text class="card-item-lable">{{ item.lable }}</text>
        </navigator>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { icon: '/static/account.png', lable: '实际利率计算器', url: '/pages/interestRateCalc/interestRateCalc' },
        { icon: '/static/account.png', lable: '贷款计算器', url: '/pages/loanCalc/loanCalc' },
        { icon: '/static/account.png', lable: '利率周期转化器', url: '/pages/rateConversionCalc/rateConversionCalc' },
        { icon: '/static/account.png', lable: '税额计算器', url: '' },
        { icon: '/static/account.png', lable: '个税计算器', url: '/pages/taxCalc/taxCalc' },
        { icon: '/static/account.png', lable: '计算人民币存款利息', url: '/pages/depositInterestCalc/depositInterestCalc' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 40px 20px;
}

.card-cell {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(2, calc((100% - 10px) / 2));
  // grid-template-columns: repeat(3, calc((100% - 20px) / 3));
}

.card-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12px 0;
  border-radius: 8px;

  .card-item-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #f8f8f8;

    .card-item-image {
      display: block;
      width: 40px;
      height: 40px;
    }
  }

  .card-item-lable {
    margin-top: 8px;
    text-align: center;
    font-size: 14px;
  }
}
</style>
