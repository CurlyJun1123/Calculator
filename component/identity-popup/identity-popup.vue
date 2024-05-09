<template>
  <uni-popup ref="popup" type="bottom" background-color="#fff" borderRadius="10px 10px 0 0">
    <view class="popup-title">选择游客</view>

    <view class="tourist-button-left">
      <view class="identity-list">
        <view v-for="(item, index) in identity" v-bind:key="item.id" class="identity-item align-center">
          <view class="align-center flex-1" @click="handleIdentitySelect(item.checked, index)">
            <uni-icons v-if="item.checked" type="circle-filled" size="24" color="#1e90ff" />
            <uni-icons v-else type="circle" size="24" color="#d1d1d1" />

            <view class="identity-item-content flex-1">
              <view class="identity-item-name">{{ item.name }}</view>
              <view class="identity-item-info">身份证 {{ item.idCard }}</view>
              <view class="identity-item-info">手机号 {{ item.phone }}</view>
            </view>
          </view>
          <uni-icons type="compose" size="22" />
        </view>
      </view>
    </view>

    <ct-action-bar :fixed="false" :placeholder="false" :safeAreaInsetBottom="false" :options="{ button: [{ text: '确认' }] }" @clickButton="handleIdentitySave" />
  </uni-popup>
</template>

<script>
export default {
  props: {
    dataSource: Object
  },

  data() {
    return {
      // 当前规格
      specs: {},
      // 游客信息
      identity: []
    }
  },

  methods: {
    getIdentity(event) {
      this.$http.get('/hy/tourist/list').then((data) => {
        this.identity = data.map((item) => ({
          ...item,
          checked: event.identity?.some((identity) => identity.id === item.id)
        }))
      })
    },

    // 打开游客列表
    open(event) {
      this.specs = event
      this.getIdentity(event)
      this.$refs.popup.open()
    },

    close() {
      this.$refs.popup.close()
    },

    // 游客列表选择处理
    handleIdentitySelect(value, index) {
      this.$set(this.identity[index], 'checked', !value)
    },

    // 保存选择的游客信息
    handleIdentitySave() {
      const result =
        this.specs?.identity?.length > 0
          ? this.specs.identity.map((itemA) => this.identity.find((itemB) => itemB.id === itemA.id) || itemA)
          : this.identity.filter((item) => item.checked)

      this.$emit('result', { ...this.specs, identity: result })
      this.$refs.popup.close()
    }
  }
}
</script>

<style lang="scss" scoped>
.identity-list {
  padding: 12px 0;
}

.identity-item {
  margin: 18px 12px;
  margin-top: 0;

  &:last-child {
    margin-bottom: 0;
  }

  .identity-item-content {
    margin-left: 11px;
  }

  .identity-item-name {
    margin-bottom: 4px;
    color: $uni-text-color;
    font-size: 16px;
  }

  .identity-item-info {
    color: #636e72;
    font-size: 14px;
  }
}
</style>
