<template>
  <view class="container">
    <uni-section title="输入数据" type="line">
      <view class="example">
        <uni-forms ref="form" label-width="90px" label-align="right" :rules="rules" :modelValue="form">
          <uni-forms-item label="储蓄方式" required name="savings">
            <uni-data-select v-model="form.savings" placeholder="请选择储蓄方式" :clear="false" :localdata="savingsRange" />
          </uni-forms-item>
          <uni-forms-item label="定期类型" required name="regularType">
            <uni-data-select v-model="form.regularType" placeholder="请选择定期类型" :clear="false" :localdata="regularTypeRange" />
          </uni-forms-item>
          <uni-forms-item label="期限" required name="term"><uni-data-select v-model="form.term" placeholder="请选择期限" :localdata="termRange" :clear="false" /></uni-forms-item>
          <uni-forms-item label="年利率" required name="annualInterestRate">
            <uni-easyinput v-model="form.annualInterestRate" type="digit" placeholder="请输入年利率" :clearable="false">
              <template #right>
                <view class="rightSlot">%</view>
              </template>
            </uni-easyinput>
          </uni-forms-item>
          <uni-forms-item label="存入金额" required name="deposits">
            <uni-easyinput v-model="form.deposits" type="digit" placeholder="请输入存入金额" :clearable="false">
              <template #right>
                <view class="rightSlot">￥</view>
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

    <template v-if="calculating">
      <uni-section title="计算结果" type="line">
        <view class="example">
          <uni-forms label-width="90px" label-align="right" :modelValue="form">
            <uni-forms-item label="所得利息"><uni-easyinput v-model="form.interest" disabled /></uni-forms-item>
            <uni-forms-item label="本息合计"><uni-easyinput v-model="form.total" disabled /></uni-forms-item>
          </uni-forms>
        </view>
      </uni-section>
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
        savings: 0,
        regularType: 0,
        term: 1,
        annualInterestRate: 1.75,
        deposits: null,
        interest: null,
        total: null
      },
      savingsRange: [
        { value: 0, text: '定期' },
        { value: 1, text: '活期' },
        { value: 2, text: '通知存款' }
      ],
      regularTypeRange: [
        { value: 0, text: '整存整取' },
        { value: 1, text: '教育储蓄' },
        { value: 2, text: '零存整取' },
        { value: 3, text: '整存零取' },
        { value: 4, text: '存本取息' }
      ],
      termRange: [
        { value: 0.25, text: '三个月' },
        { value: 0.5, text: '六个月' },
        { value: 1, text: '一年' },
        { value: 2, text: '两年' },
        { value: 3, text: '三年' },
        { value: 5, text: '五年' }
      ],
      // 校验规则
      rules: {
        savings: { rules: [{ required: true, errorMessage: '储蓄方式不能为空' }] },
        regularType: { rules: [{ required: true, errorMessage: '定期类型不能为空' }] },
        term: { rules: [{ required: true, errorMessage: '期限不能为空' }] },
        annualInterestRate: {
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

      calculating: false
    }
  },

  onReady() {
    // 设置自定义表单校验规则，必须在节点渲染完毕后执行
    this.$refs.form.setRules(this.rules)
  },

  methods: {
    priceFormat,

    submit() {
      this.$refs.form
        .validate()
        .then((res) => {
          console.log('success', res)
          this.form.interest = priceFormat(this.form.term * (this.form.annualInterestRate / 100) * this.form.deposits, 2)
          this.form.total = priceFormat(Number(this.form.deposits) + Number(this.form.interest), 2)
          uni.showToast({ title: `校验通过` })
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
  height: 35px;
  line-height: 35px;
  font-size: 14px;
}
</style>
