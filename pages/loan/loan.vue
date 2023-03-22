<template>
  <view class="container">
    <uni-section title="输入数据" type="line">
      <view class="example">
        <uni-forms ref="form" label-width="90px" label-align="right" :rules="rules" :modelValue="form">
          <uni-forms-item label="还款方式" name="savings">
            <view style="display: flex; align-items: center; height: 100%">
              <uni-data-checkbox v-model="form.savings" placeholder="请选择还款方式" :clear="false" :localdata="sexs" />
            </view>
          </uni-forms-item>
          <uni-forms-item label="贷款本金" name="principal">
            <uni-easyinput v-model="form.principal" type="digit" placeholder="请输入贷款本金" :clearable="false">
              <template #right>
                <view class="rightSlot">元</view>
              </template>
            </uni-easyinput>
          </uni-forms-item>
          <uni-forms-item label="贷款年限" name="termInYears">
            <uni-data-select v-model="form.termInYears" placeholder="请选择贷款年限" :localdata="termRange" :clear="false" />
          </uni-forms-item>
          <uni-forms-item label="贷款年利率" name="interestRate">
            <uni-easyinput v-model="form.interestRate" type="digit" placeholder="请输入贷款年利率" :clearable="false">
              <template #right>
                <view class="rightSlot">%</view>
              </template>
            </uni-easyinput>
          </uni-forms-item>
          <uni-forms-item>
            <view style="display: flex">
              <button style="flex: 1" type="primary" @click="submit('form')">计算</button>
              <button style="flex: 1" type="primary" @click="submit('form')">重置</button>
            </view>
          </uni-forms-item>
        </uni-forms>
      </view>
    </uni-section>

    <uni-section title="计算结果" type="line">
      <view class="example">
        <uni-forms label-width="90px" label-align="right" :modelValue="form">
          <uni-forms-item label="还款合计"><uni-easyinput v-model="form.totalRepayment" :clearable="false" /></uni-forms-item>
          <uni-forms-item label="本息合计"><uni-easyinput v-model="form.totalInterest" :clearable="false" /></uni-forms-item>
          <uni-forms-item label="月供"><uni-easyinput v-model="form.monthlyPayment" :clearable="false" /></uni-forms-item>
          <uni-forms-item label="月利率" name="monthlyInterestRate">
            <uni-easyinput v-model="form.monthlyInterestRate" type="digit" :clearable="false">
              <template #right>
                <view class="rightSlot">‰</view>
              </template>
            </uni-easyinput>
          </uni-forms-item>
        </uni-forms>
      </view>

      <view style="margin-top: 30px; text-align: right">
        <view
          style="
            box-sizing: border-box;
            width: 100vw;
            display: flex;
            background-color: rgb(248, 249, 250);
            color: rgb(47, 55, 70);
            font-size: 14px;
            font-weight: 600;
            line-height: 1;
          "
        >
          <view style="flex: 1; padding: 15px 8px; text-align: left">期数</view>
          <view style="flex: 1; padding: 15px 8px">还款额</view>
          <view style="flex: 1; padding: 15px 8px">应还本金</view>
          <view style="flex: 1; padding: 15px 8px">应还利息</view>
        </view>
        <view
          v-for="(item, index) in loanDetails"
          style="box-sizing: border-box; width: 100vw; display: flex; color: rgb(17, 25, 39); font-size: 16px; font-weight: 400; line-height: 22px"
          :key="index"
        >
          <view style="flex: 1; padding: 15px 8px; border-bottom: 1px solid rgb(242, 244, 247); text-align: left">第{{ index + 1 }}月</view>
          <view style="flex: 1; padding: 15px 8px; border-bottom: 1px solid rgb(242, 244, 247)">
            <text>{{ priceFormat(item.principal + item.interest, 2) }}</text>
          </view>
          <view style="flex: 1; padding: 15px 8px; border-bottom: 1px solid rgb(242, 244, 247)">
            <text>{{ priceFormat(item.principal, 2) }}</text>
          </view>
          <view style="flex: 1; padding: 15px 8px; border-bottom: 1px solid rgb(242, 244, 247)">
            <text>{{ priceFormat(item.interest, 2) }}</text>
          </view>
        </view>
      </view>
    </uni-section>
  </view>
</template>

<script>
import { priceFormat } from '@/utils/function'

export default {
  data() {
    return {
      // 基础表单数据
      form: {
        interestRate: 5,
        monthlyInterestRate: 0,
        monthlyPayment: 0,
        principal: 100000,
        savings: 0,
        termInYears: 3,
        totalInterest: 0,
        totalRepayment: 0
      },
      sexs: [
        { value: 0, text: '等额还款' },
        { value: 1, text: '按月递减还款' }
      ],
      termRange: [
        { value: 0.5, text: '半年（6期）' },
        { value: 1, text: '1年（12期）' },
        { value: 2, text: '2年（24期）' },
        { value: 3, text: '3年（36期）' },
        { value: 4, text: '4年（48期）' },
        { value: 5, text: '5年（60期）' },
        { value: 6, text: '6年（72期）' },
        { value: 7, text: '7年（84期）' },
        { value: 8, text: '8年（96期）' },
        { value: 9, text: '9年（108期）' },
        { value: 10, text: '10年（120期）' },
        { value: 11, text: '11年（132期）' },
        { value: 12, text: '12年（144期）' },
        { value: 13, text: '13年（156期）' },
        { value: 14, text: '14年（168期）' },
        { value: 15, text: '15年（180期）' },
        { value: 16, text: '16年（192期）' },
        { value: 17, text: '17年（204期）' },
        { value: 18, text: '18年（216期）' },
        { value: 19, text: '19年（228期）' },
        { value: 20, text: '20年（240期）' },
        { value: 21, text: '21年（252期）' },
        { value: 22, text: '22年（264期）' },
        { value: 23, text: '23年（276期）' },
        { value: 24, text: '24年（288期）' },
        { value: 25, text: '25年（300期）' },
        { value: 26, text: '26年（312期）' },
        { value: 27, text: '27年（324期）' },
        { value: 28, text: '28年（336期）' },
        { value: 29, text: '29年（348期）' },
        { value: 30, text: '30年（360期）' }
      ],
      // 校验规则
      rules: {
        savings: { rules: [{ required: true, errorMessage: '储蓄方式不能为空' }] },
        principal: {
          rules: [
            { required: true, errorMessage: '定期类型不能为空' },
            { format: 'number', errorMessage: '年利率只能输入数字' }
          ]
        },
        termInYears: { rules: [{ required: true, errorMessage: '期限不能为空' }] },
        interestRate: {
          rules: [
            { required: true, errorMessage: '年利率不能为空' },
            { format: 'number', errorMessage: '年利率只能输入数字' },
            { minimum: 0.001, maximum: 100, errorMessage: '年利率应大于{minimum}，且小于{maximum}%' }
          ]
        },
        deposits: {
          rules: [
            { required: true, errorMessage: '金额不能为空' },
            { format: 'number', errorMessage: '金额只能输入数字' },
            { minimum: 5000, errorMessage: '输入金额需大于 5000 元' }
          ]
        }
      },

      // 贷款详细
      loanDetails: []
    }
  },
  computed: {},
  onLoad() {},
  onReady() {
    // 设置自定义表单校验规则，必须在节点渲染完毕后执行
    this.$refs.form.setRules(this.rules)
  },
  methods: {
    priceFormat,

    /**
     * 计算等额本息还款
     * @param {number} principal 贷款总金额
     * @param {number} interestRate 年利率
     * @param {number} termInYears 贷款期数（年数）
     * @returns {number} 每月还款金额
     */
    calculateEqualPaymentsLoan(principal, interestRate, termInYears) {
      const monthlyRate = interestRate / 1200
      const termInMonths = termInYears * 12
      const monthlyPayment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termInMonths))
      const totalPayments = monthlyPayment * termInMonths
      const totalInterest = totalPayments - principal

      return {
        monthlyPayment: monthlyPayment.toFixed(2),
        totalPayments: totalPayments.toFixed(2),
        totalInterest: totalInterest.toFixed(2)
      }
    },

    calculateLoan(principal, interestRate, termInYears) {
      // 计算每个月的还款额
      const monthlyRate = interestRate / 1200
      const termInMonths = termInYears * 12
      const payment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termInMonths))

      // 计算每个月的还款本金和利息
      const payments = []
      let balance = principal
      for (let i = 1; i <= termInMonths; i++) {
        const interest = balance * monthlyRate
        const principal = payment - interest
        payments.push({ interest, principal })
        balance = balance - principal
      }

      return payments
    },

    // 1111111111111111

    calculateMonthlyPayments(principal, annualInterestRate, numberOfYears) {
      // Convert annual interest rate to monthly interest rate
      var monthlyInterestRate = annualInterestRate / 1200

      // Convert number of years to number of monthly payments
      var numberOfMonths = numberOfYears * 12

      // Calculate monthly payment using the formula for monthly payment in the case of monthly decreasing
      var monthlyPayment = (principal * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfMonths))

      // Initialize arrays to hold the data for each month
      var monthlyData = []
      var remainingBalance = principal

      // Loop through each month and calculate the data for that month
      for (var i = 1; i <= numberOfMonths; i++) {
        // Calculate the interest for the month
        var interest = remainingBalance * monthlyInterestRate

        // Calculate the principal for the month
        var principalPayment = monthlyPayment - interest

        // Calculate the remaining balance after the payment
        remainingBalance -= principalPayment

        // Add the data for the month to the array
        monthlyData.push({
          month: i,
          payment: monthlyPayment.toFixed(2),
          principal: principalPayment.toFixed(2),
          interest: interest.toFixed(2),
          balance: remainingBalance.toFixed(2)
        })
      }

      // Return the array of monthly data
      return monthlyData
    },

    submit() {
      this.$refs.form
        .validate()
        .then((res) => {
          if (this.form.savings === 0) {
            const equalInstallment = this.calculateEqualPaymentsLoan(res.principal, res.interestRate, res.termInYears)
            this.form.monthlyInterestRate = priceFormat(res.interestRate / 1.2, 4)
            this.form.monthlyPayment = priceFormat(equalInstallment.monthlyPayment, 2)
            this.form.totalInterest = priceFormat(equalInstallment.totalInterest, 2)
            this.form.totalPayments = priceFormat(equalInstallment.totalPayments, 2)
            this.form.totalRepayment = priceFormat(Number(res.principal) + Number(equalInstallment.totalInterest), 2)
            this.loanDetails = this.calculateLoan(res.principal, res.interestRate, res.termInYears)
          } else {
            const result = this.calculateMonthlyPayments(res.principal, res.interestRate, res.termInYears)
            this.loanDetails = result.monthlyPayments
            console.log(result)
          }
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
  width: 14px;
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
