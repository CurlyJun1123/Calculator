<template>
  <view class="container">
    <view class="form">
      <uni-forms ref="form" label-width="90px" label-align="right" :rules="rules" :modelValue="form">
        <uni-forms-item label="还款方式" name="savings">
          <view style="display: flex; align-items: center; height: 100%">
            <uni-data-checkbox v-model="form.savings" placeholder="请选择还款方式" :clear="false" :localdata="sexs" />
          </view>
        </uni-forms-item>
        <uni-forms-item label="贷款本金" name="principal">
          <uni-easyinput v-model="form.principal" type="digit" placeholder="请输入贷款本金" :clearable="false">
            <template #right>
              <view class="right-slot">元</view>
            </template>
          </uni-easyinput>
        </uni-forms-item>
        <uni-forms-item label="贷款年限" name="termInYears">
          <uni-data-select v-model="form.termInYears" placeholder="请选择贷款年限" :localdata="termRange" :clear="false" />
        </uni-forms-item>
        <uni-forms-item label="贷款年利率" name="interestRate">
          <uni-easyinput v-model="form.interestRate" type="digit" placeholder="请输入贷款年利率" :clearable="false">
            <template #right>
              <view class="right-slot">%</view>
            </template>
          </uni-easyinput>
        </uni-forms-item>
      </uni-forms>
      <button type="primary" @click="submit('form')">计算</button>
    </view>

    <template v-if="result">
      <view class="result">
        <view class="result-content">还款总额：{{ loan.totalRepayment }}，本息总额：{{ loan.totalInterest }}</view>
      </view>

      <ct-timeline>
        <ct-timeline-item v-for="(item, index) in loanList" :key="index">
          <template #label>
            <text>{{ item.period }}</text>
            <view class="timeline-subtitle">
              <text>剩余本金 {{ priceFormat(item.balance, 2) }}</text>
            </view>
          </template>
          <view>
            <text>{{ priceFormat(item.payment, 2) }}</text>
          </view>
          <view class="timeline-subtitle">
            <text>含本金 {{ priceFormat(item.principal, 2) }} + 利息 {{ priceFormat(item.interest, 2) }}</text>
          </view>
        </ct-timeline-item>
      </ct-timeline>
    </template>
  </view>
</template>

<script>
import { priceFormat } from '@/utils/function'

export default {
  data() {
    return {
      // 基础表单数据
      form: {
        interestRate: 3.9,
        principal: 870000,
        savings: 0,
        termInYears: 30
      },
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

      result: false, // 计算结果
      loan: {
        monthlyRate: 0,
        totalInterest: 0,
        totalRepayment: 0
      },
      // 贷款详细
      loanList: []
    }
  },

  watch: {
    form: {
      handler(newVal, oldVal) {
        this.result = false
      },
      deep: true
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
     * 计算等额还款
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
        result.push({ period: i === 1 ? '首期' : i + '期', payment: monthlyPayment, principal, interest, balance })
      }

      return { monthlyPayment, totalInterest, monthlyRate, result }
    },

    /**
     * 计算等额本金
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
        result.push({ period: i === 1 ? '首期' : i + '期', payment, principal: principal, interest: interest, balance })
      }

      return { totalPayment: amount + totalInterest, totalInterest: totalInterest, monthlyRate, result }
    },

    submit() {
      this.$refs.form
        .validate()
        .then((res) => {
          if (this.form.savings === 0) {
            const result = this.calculateRepayment(res.principal, res.termInYears, res.interestRate / 100)
            this.loan.monthlyRate = priceFormat(result.monthlyRate * 1000, 4)
            this.loan.totalInterest = priceFormat(result.totalInterest, 2)
            this.loan.totalRepayment = priceFormat(res.principal + result.totalInterest, 2)
            this.loanList = result.result
          } else {
            const result = this.equalPrincipal(res.principal, res.termInYears, res.interestRate / 100)
            this.loan.monthlyRate = priceFormat(result.monthlyRate * 1000, 4)
            this.loan.totalInterest = priceFormat(result.totalInterest, 2)
            this.loan.totalPayment = priceFormat(result.totalPayment, 2)
            this.loan.totalRepayment = priceFormat(res.principal + result.totalInterest, 2)
            this.loanList = result.result
          }
          this.result = true
        })
        .catch((err) => {
          console.log('err', err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  padding: 15px;
  background-color: #fff;
}

.right-slot {
  padding: 0 5px;
  width: 14px;
  text-align: center;
}

.result {
  margin: 15px 0 30px;
  display: flex;
  justify-content: center;

  .result-content {
    margin: auto;
    padding: 0 14px;
    height: 30px;
    border-radius: 30px;
    background-color: #ecf0f1;
    color: rgba(0, 0, 0, 0.8);
    font-size: 14px;
    line-height: 30px;
  }
}

.timeline-subtitle {
  margin-top: 4px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 12px;
  font-weight: 300;
}
</style>
