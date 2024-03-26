<template>
  <view>
    <ct-form layout="card">
      <ct-form-item label="中文姓名">
        <ct-input v-model="form.name" />
      </ct-form-item>
      <ct-form-item label="证件类型">
        <ct-form-line v-model="form.type" />
      </ct-form-item>
      <ct-form-item label="证件号码">
        <ct-input v-model="form.idCard" />
      </ct-form-item>
      <ct-form-item label="联系电话">
        <ct-input v-model="form.phone" />
      </ct-form-item>
    </ct-form>

    <text @tap="on">您已知晓您的身份证等信息将用于预订须实名制的产品，请确保信息真实有效。《》仅在有具体交易时授权提供给第三方</text>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          id: undefined,
          idCard: '',
          name: '',
          phone: '13211121312',
          type: '身份证'
        }
      }
    },

    methods: {
      on() {
        console.log(this.form)
      }
    }
  }
</script>

<style lang="scss"></style>