<template>
  <view class="container">
    <uni-section title="输入数据" type="line">
      <view class="example">
        <uni-forms ref="form" label-width="90px" label-align="right" :rules="rules" :modelValue="form">
          <uni-forms-item label="税前工资" name="salary">
            <view style="display: flex; align-items: center; height: 100%">
              <uni-easyinput v-model="form.salary" placeholder="请选择税前工资" :clearable="false" />
            </view>
          </uni-forms-item>
          <uni-forms-item label="五险一金" name="gold">
            <view style="display: flex; align-items: center; height: 100%">
              <uni-easyinput v-model="form.gold" placeholder="请选择五险一金" :clearable="false" />
            </view>
          </uni-forms-item>
          <uni-forms-item label="专项扣除" name="deduct">
            <uni-easyinput v-model="form.deduct" type="digit" placeholder="请输入贷款本金" :clearable="false" />
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
      <view style="text-align: center">
        <view style="background-color: rgb(248, 249, 250); box-sizing: border-box; color: rgb(47, 55, 70); display: flex; font-size: 14px; font-weight: 600; line-height: 1; width: 100%">
          <view style="flex: 1; padding: 15px 8px; text-align: center">月份</view>
          <view style="flex: 1; padding: 15px 8px">纳税金额</view>
          <view style="flex: 1; padding: 15px 8px">税后工资</view>
        </view>
        <view v-for="index in 12" style="box-sizing: border-box; width: 100%; display: flex; color: rgb(17, 25, 39); font-size: 15px; font-weight: 400; line-height: 22px" :key="index">
          <view style="flex: 1; padding: 15px 8px; border-bottom: 1px solid rgb(242, 244, 247); text-align: center">
            <text>{{ index }}月</text>
          </view>
          <view style="flex: 1; padding: 15px 8px; border-bottom: 1px solid rgb(242, 244, 247)">
            <text>{{ priceFormat(taxAmount, 2) }}</text>
          </view>
          <view style="flex: 1; padding: 15px 8px; border-bottom: 1px solid rgb(242, 244, 247)">
            <text>{{ priceFormat(form.salary - form.gold - form.deduct - taxAmount, 2) }}</text>
          </view>
        </view>
      </view>
    </uni-section>
  </view>
</template>

<script>
import { priceFormat } from '@/utils/function'

function calculateTax(salary, socialSecurity, specialDeduction) {
  // 计算应纳税所得额
  const taxableIncome = salary - socialSecurity - specialDeduction - 5000
  if (taxableIncome <= 0) {
    return 0
  }
  // 计算税率和速算扣除数
  let taxRate, quickDeduction
  if (taxableIncome <= 36000) {
    taxRate = 0.03
    quickDeduction = 0
  } else if (taxableIncome <= 144000) {
    taxRate = 0.1
    quickDeduction = 2520
  } else if (taxableIncome <= 300000) {
    taxRate = 0.2
    quickDeduction = 16920
  } else if (taxableIncome <= 420000) {
    taxRate = 0.25
    quickDeduction = 31920
  } else if (taxableIncome <= 660000) {
    taxRate = 0.3
    quickDeduction = 52920
  } else if (taxableIncome <= 960000) {
    taxRate = 0.35
    quickDeduction = 85920
  } else {
    taxRate = 0.45
    quickDeduction = 181920
  }
  // 计算个人所得税
  const tax = taxableIncome * taxRate - quickDeduction
  return tax > 0 ? tax : 0
}

export default {
  data() {
    return {
      form: {
        salary: '',
        gold: '',
        deduct: ''
      },
      taxAmount: '',
      // 校验规则
      rules: {}
    }
  },

  methods: {
    priceFormat,

    submit() {
      this.$refs.form
        .validate()
        .then((res) => {
          this.taxAmount = calculateTax(res.salary, res.gold, res.deduct)
          console.log(this.taxAmount)
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
  height: 35px;
  line-height: 35px;
  font-size: 14px;
}
</style>
