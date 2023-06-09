<template>
  <view class="container">
    <view class="form">
      <uni-forms ref="form" label-width="120px" label-align="right" :rules="rules" :modelValue="form">
        <uni-forms-item label="贷款总额" name="principal">
          <uni-easyinput v-model="form.principal" type="digit" placeholder="请输入贷款总额" :clearable="false">
            <template #right>
              <view class="rightSlot">元</view>
            </template>
          </uni-easyinput>
        </uni-forms-item>
        <uni-forms-item label="贷款年限" name="termInYears">
          <uni-data-select v-model="form.termInYears" placeholder="请选择贷款年限" :localdata="termRange" :clear="false" />
        </uni-forms-item>
        <uni-forms-item label="每月还款金额" name="monthlyPayment">
          <uni-easyinput v-model="form.monthlyPayment" type="digit" placeholder="请输入每月还款金额" :clearable="false" />
        </uni-forms-item>
      </uni-forms>
      <ct-button @click="submit('form')">计算</ct-button>
    </view>

    <template v-if="result">
      <view class="result">
        <view class="result-card">
          <view class="result-card-title">真实利率</view>
          <view class="result-card-cell">
            <view class="result-card-item">
              <view class="result-card-item-title">年利率</view>
              <view class="result-card-item-content">{{ annualInterestRate }}%</view>
            </view>
            <view class="result-card-item">
              <view class="result-card-item-title">月利率</view>
              <view class="result-card-item-content">{{ annualInterestRate }}%</view>
            </view>
            <view class="result-card-item">
              <view class="result-card-item-title">日利率</view>
              <view class="result-card-item-content">{{ annualInterestRate }}%</view>
            </view>
          </view>
        </view>
      </view>
    </template>
  </view>
</template>

<script>
export default {
  data() {
    return {
      form: {
        principal: 100000,
        termInYears: 3,
        monthlyPayment: 2997.09
      },
      // 校验规则
      rules: {
        principal: { rules: [{ required: true, errorMessage: '贷款本金不能为空', trigger: 'blur' }] },
        termInYears: { rules: [{ required: true, errorMessage: '贷款年限不能为空', trigger: 'change' }] },
        monthlyPayment: { rules: [{ required: true, errorMessage: '每月还款金额不能为空', trigger: 'blur' }] }
      },

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
      annualInterestRate: ''
    }
  },

  methods: {
    /**
     * 实际利率法
     * @param nper 投资的期数，即总共需要支付多少期
     * @param pmt 每期需要支付的金额
     * @param pv 当前投资的现值
     * @param cnt 运算次数
     * @param ina 误差位数
     * @return 利率
     */
    calculateRepayment(nper, pmt, pv, cnt, ina) {
      const TOLERANCE = 1 / Math.pow(10, ina) // 误差容限
      const MAX_ITERATION = cnt // 最大迭代次数

      let rate = 1
      let x
      let jd = 0.1
      let side = 0.1
      let i = 1

      do {
        x = pv / pmt - (Math.pow(1 + rate, nper) - 1) / (Math.pow(rate + 1, nper) * rate)
        if (x * side > 0) {
          side = -side
          jd *= 10
        }
        rate += side / jd
        i++
      } while (i <= MAX_ITERATION && Math.abs(x) >= TOLERANCE)

      return rate
    },

    submit() {
      this.$refs.form
        .validate()
        .then((res) => {
          const monthlyPaymentAndInterest = res.termInYears * 12 * Number(res.monthlyPayment)
          if (monthlyPaymentAndInterest <= Number(res.principal)) {
            uni.showToast({ title: '还款总额不能小于贷款总额', icon: 'none' })
          } else {
            this.result = true
            this.annualInterestRate = (this.calculateRepayment(res.termInYears * 12, res.monthlyPayment, res.principal, 500, 10) * 100 * 12).toFixed(2)
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
.form {
  padding: 15px;
  background-color: #fff;
}

.rightSlot {
  padding: 0 5px;
  width: 14px;
  text-align: center;
}

.result {
  margin: 0 15px;
  background: linear-gradient($uni-color-primary, rgb(30, 144, 255, 0.9));
  border-radius: 4px;

  .result-card {
    display: flex;
    flex-direction: column;

    .result-card-title {
      margin-top: 20px;
      color: #fff;
      text-align: center;
      font-weight: 500;
      font-size: 16px;
    }

    .result-card-head {
      display: flex;
      flex-direction: column;
      align-items: center;

      .result-card-head-title {
        color: #fff;
        font-size: 16px;
      }

      .result-card-head-content {
        margin-top: 4px;
        color: rgb(255, 255, 255, 0.8);
        font-size: 16px;
      }
    }

    .result-card-cell {
      display: flex;

      .result-card-item {
        display: flex;
        padding: 24px 0;
        text-align: center;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .result-card-item-title {
        color: #fff;
        font-weight: 500;
        font-size: 14px;
      }

      .result-card-item-content {
        margin-top: 4px;
        color: rgb(255, 255, 255, 0.8);
        font-size: 14px;
        display: flex8;
      }
    }
  }
}
</style>
