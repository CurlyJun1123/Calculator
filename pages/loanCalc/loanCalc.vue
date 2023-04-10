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
          <uni-forms-item label="还款总额"><uni-easyinput v-model="form.totalRepayment" :clearable="false" /></uni-forms-item>
          <uni-forms-item label="本息总额"><uni-easyinput v-model="form.totalInterest" :clearable="false" /></uni-forms-item>
          <uni-forms-item v-if="form.savings === 0" label="月供"><uni-easyinput v-model="form.monthlyPayment" :clearable="false" /></uni-forms-item>
          <uni-forms-item v-else-if="form.savings === 1" label="首月还款"><uni-easyinput v-model="form.monthlyPayment" :clearable="false" /></uni-forms-item>
          <uni-forms-item label="月利率" name="monthlyRate">
            <uni-easyinput v-model="form.monthlyRate" type="digit" :clearable="false">
              <template #right>
                <view class="rightSlot">‰</view>
              </template>
            </uni-easyinput>
          </uni-forms-item>
        </uni-forms>
      </view>

      <view style="text-align: right">
        <view style="background-color: rgb(248, 249, 250); box-sizing: border-box; color: rgb(47, 55, 70); display: flex; font-size: 14px; font-weight: 600; line-height: 1; width: 100%">
          <view style="flex: 1; padding: 15px 8px; text-align: left">期数</view>
          <view style="flex: 1; padding: 15px 8px">还款额</view>
          <view style="flex: 1; padding: 15px 8px">应还本金</view>
          <view style="flex: 1; padding: 15px 8px">应还利息</view>
          <view style="flex: 1; padding: 15px 8px">剩余本金</view>
        </view>
        <view v-for="(item, index) in loanDetails" style="box-sizing: border-box; width: 100%; display: flex; color: rgb(17, 25, 39); font-size: 15px; font-weight: 400; line-height: 22px" :key="index">
          <view style="flex: 1; padding: 15px 8px; border-bottom: 1px solid rgb(242, 244, 247); text-align: left">
            <text>第{{ item.period }}月</text>
          </view>
          <view style="flex: 1; padding: 15px 8px; border-bottom: 1px solid rgb(242, 244, 247)">
            <text>{{ priceFormat(item.payment, 2) }}</text>
          </view>
          <view style="flex: 1; padding: 15px 8px; border-bottom: 1px solid rgb(242, 244, 247)">
            <text>{{ priceFormat(item.principal, 2) }}</text>
          </view>
          <view style="flex: 1; padding: 15px 8px; border-bottom: 1px solid rgb(242, 244, 247)">
            <text>{{ priceFormat(item.interest, 2) }}</text>
          </view>
          <view style="flex: 1; padding: 15px 8px; border-bottom: 1px solid rgb(242, 244, 247)">
            <text>{{ priceFormat(item.balance, 2) }}</text>
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
        monthlyPayment: 0,
        monthlyRate: 0,
        principal: 100000,
        savings: 0,
        termInYears: 3,
        totalInterest: 0,
        totalRepayment: 0
      },
      sexs: [
        { value: 0, text: '等额还款' },
        { value: 1, text: '等额本金' }
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
     * @param {number} amount 贷款总金额
     * @param {number} termInYears 贷款期数（年数）
     * @param {number} interestRate 年利率
     * @returns
     */
    calculateRepayment(amount, termInYears, interestRate) {
      const monthlyRate = interestRate / 12 // 将年利率转换为月利率
      const periods = termInYears * 12 // 计算还款期数
      const monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -periods)) // 计算每期还款额
      let balance = amount // 初始化剩余本金
      let totalInterest = 0 // 初始化总利息
      const result = [] // 初始化还款计划数组

      for (let i = 1; i <= periods; i++) {
        const interest = balance * monthlyRate // 计算本期应还利息
        const principal = monthlyPayment - interest // 计算本期应还本金
        balance -= principal // 更新剩余本金
        totalInterest += interest // 累加总利息
        result.push({
          period: i,
          payment: monthlyPayment,
          principal,
          interest,
          balance
        })
      }

      return { monthlyPayment, totalInterest, monthlyRate, result }
    },

    /**
     * 计算等额本息还款
     * @param {number} amount 贷款总金额
     * @param {number} termInYears 贷款期数（年数）
     * @param {number} interestRate 年利率
     * @returns
     */
    equalPrincipal(amount, termInYears, interestRate) {
      const monthlyRate = interestRate / 12 // 月利率
      const periods = Math.floor(termInYears * 12) // 还款月数
      const principal = amount / periods // 每月应还本金
      let totalInterest = 0 // 总利息
      const result = [] // 存储每期还款信息的数组

      for (let i = 1; i <= periods; i++) {
        const interest = (amount - (i - 1) * principal) * monthlyRate // 本期应还利息
        const payment = principal + interest // 本期还款额
        const balance = amount - i * principal // 剩余本金
        totalInterest += interest // 累计总利息
        result.push({
          period: i,
          payment,
          principal: principal,
          interest: interest,
          balance
        })
      }

      return { totalPayment: amount + totalInterest, totalInterest: totalInterest, monthlyRate, result }
    },

    submit() {
      this.$refs.form
        .validate()
        .then((res) => {
          if (this.form.savings === 0) {
            const result = this.calculateRepayment(res.principal, res.termInYears, res.interestRate / 100)
            this.form.monthlyPayment = priceFormat(result.monthlyPayment, 2)
            this.form.monthlyRate = priceFormat(result.monthlyRate * 1000, 4)
            this.form.totalInterest = priceFormat(result.totalInterest, 2)
            this.form.totalRepayment = priceFormat(res.principal + result.totalInterest, 2)
            this.loanDetails = result.result
          } else {
            const result = this.equalPrincipal(res.principal, res.termInYears, res.interestRate / 100)
            this.form.monthlyPayment = priceFormat(result.result[0].payment, 2)
            this.form.monthlyRate = priceFormat(result.monthlyRate * 1000, 4)
            this.form.totalInterest = priceFormat(result.totalInterest, 2)
            this.form.totalPayment = priceFormat(result.totalPayment, 2)
            this.form.totalRepayment = priceFormat(res.principal + result.totalInterest, 2)
            this.loanDetails = result.result
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
