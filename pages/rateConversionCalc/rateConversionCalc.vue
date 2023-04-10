<template>
  <view class="container">
    <uni-section title="输入数据" type="line">
      <view class="example">
        <uni-forms ref="form" label-width="90px" label-align="right" :rules="rules" :modelValue="form">
          <uni-forms-item label="还款方式" name="fromPeriod">
            <view style="display: flex; align-items: center; height: 100%">
              <uni-data-checkbox v-model="form.fromPeriod" placeholder="请选择还款方式" :clear="false" :localdata="sexs" />
            </view>
          </uni-forms-item>
          <uni-forms-item label="还款方式" name="toPeriod">
            <view style="display: flex; align-items: center; height: 100%">
              <uni-data-checkbox v-model="form.toPeriod" placeholder="请选择还款方式" :clear="false" :localdata="sexs" />
            </view>
          </uni-forms-item>
          <uni-forms-item label="贷款本金" name="rate">
            <uni-easyinput v-model="form.rate" type="digit" placeholder="请输入贷款本金" :clearable="false">
              <template #right>
                <view class="rightSlot">/万</view>
              </template>
            </uni-easyinput>
          </uni-forms-item>
          <uni-forms-item>
            <view style="display: flex">
              <button style="flex: 1" type="primary" @click="submit('form')">计算</button>
            </view>
          </uni-forms-item>
        </uni-forms>
      </view>
    </uni-section>

    <uni-section title="计算结果" type="line">
      <view class="example">
        <uni-forms label-width="90px" label-align="right" :rules="rules" :modelValue="form">
          <uni-forms-item label="日利率"><uni-easyinput v-model="rate" :clearable="false" /></uni-forms-item>
          <uni-forms-item label="月利率"><uni-easyinput v-model="rate" :clearable="false" /></uni-forms-item>
          <uni-forms-item label="年利率"><uni-easyinput v-model="rate" :clearable="false" /></uni-forms-item>
        </uni-forms>
      </view>
    </uni-section>
  </view>
</template>

<script>
// 在 Vue 组件的顶部定义常量
const DAYS_PER_MONTH = 30
const DAYS_PER_YEAR = 360
const periods = { day: 1, month: DAYS_PER_MONTH, year: DAYS_PER_YEAR }

/**
 * 将不同周期的利率进行转换
 * @param {Number} rate - 需要进行转换的利率
 * @param {String} fromPeriod - 当前利率的周期，可选值为'day'、'month'和'year'
 * @param {String} toPeriod - 需要转换到的利率周期，可选值同上
 * @returns {Number} - 转换后的利率
 */
function rateConversion(rate, fromPeriod, toPeriod) {
  // 验证参数
  if (!periods[fromPeriod] || !periods[toPeriod]) {
    throw new Error('Invalid period specified')
  }

  // 计算利率
  const dailyRate = rate / periods[fromPeriod]
  const resultRate = (dailyRate * periods[toPeriod]) / 100

  return resultRate
}

export default {
  data() {
    return {
      form: {
        rate: '',
        fromPeriod: 'day',
        toPeriod: 'year',
        termInYears: '',
        monthlyPayment: ''
      },
      rate: '',
      sexs: [
        { value: 'day', text: 'day' },
        { value: 'month', text: 'month' },
        { value: 'year', text: 'year' }
      ],
      // 校验规则
      rules: {}
    }
  },

  methods: {
    submit() {
      this.$refs.form
        .validate()
        .then((res) => {
          console.log(res)
          console.log(res.rate, res.fromPeriod, res.toPeriod)
          const dailyRate = rateConversion(res.rate, res.fromPeriod, res.toPeriod)
          console.log(dailyRate) // 输出0.0005，即日利率为0.05%
          this.rate = dailyRate
        })
        .catch((err) => {
          console.log('err', err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.example {
  padding: 15px;
  background-color: #fff;
}

.rightSlot {
  padding: 0 5px;
  text-align: center;
}

button,
uni-button {
  margin: 10px 10px;
  height: 35px;
  line-height: 35px;
  font-size: 14px;
}
</style>
