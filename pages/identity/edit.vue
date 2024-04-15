<template>
  <view>
    <ct-form layout="card">
      <ct-form-item label="中文姓名">
        <ct-input v-model="form.name" />
      </ct-form-item>
      <ct-form-item label="证件类型">
        <ct-form-line v-model="type" />
      </ct-form-item>
      <ct-form-item label="证件号码">
        <ct-input v-model="form.idCard" />
      </ct-form-item>
      <ct-form-item label="联系电话">
        <ct-input v-model="form.phone" />
      </ct-form-item>
    </ct-form>

    <button @click="handleSubmit">保存</button>

    <view class="page-card">
      <text>您已知晓您的身份证等信息将用于预订须实名制的产品，请确保信息真实有效。《》仅在有具体交易时授权提供给第三方</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      form: {
        idCard: '',
        name: '',
        phone: ''
      },

      type: '身份证'
    }
  },

  onLoad(options) {
    this.form = options
  },

  methods: {
    handleSubmit() {
      this.$http.post('/hy/tourist', this.form).then((res) => {
        console.log(res)
        uni.navigateBack()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-card {
  margin: 12px 12px;
  padding: 12px;
  background-color: #fff;
  border-radius: 8px;
}
</style>
