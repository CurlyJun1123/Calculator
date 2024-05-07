<template>
  <uni-popup ref="popup" type="bottom" background-color="#fff" borderRadius="10px 10px 0 0">
    <view class="popup-title">选择游客</view>

    <view class="tourist-button-left">
      <view class="identity-list">
        <view v-for="(item, index) in identity" v-bind:key="item.id" class="identity-item align-center">
          <view class="align-center flex-1" @click="touristsChange(!item.checked, index)">
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

    <ct-action-bar
      :fixed="false"
      :placeholder="false"
      :safeAreaInsetBottom="false"
      :options="{ button: [{ text: '确认' }] }"
      @clickButton="selectTourists"
    />
  </uni-popup>
</template>

<script>
export default {
  data() {
    return {
      data: {},

      tourstList: {},

      formData: {
        name: ''
      },

      tourists: null,
      identity: []
    }
  },

  onLoad(options) {
    this.getListData(options)
  },

  onReady() {
    this.$nextTick(() => {
      this.showCalendar = true
    })
  },

  methods: {
    getListData(options) {
      this.$http.get(`/hy/project/${options.id}`).then((data) => {
        this.data = data
        this.data.hyProjectTicketList = data.hyProjectTicketList.map((item) => ({
          ...item,
          number: Number(options.projectTicketId) === item.id ? 1 : 0
        }))
      })
    },

    close() {
      console.log('弹窗关闭')
    },

    calendarConfirm(e) {
      console.log(e)
    },

    // 打开游客列表
    open(event) {
      this.tourists = event
      console.log('🚀 ~ openTourists ~ event:', event)
      this.$http.get('/hy/tourist/list').then((data) => {
        this.identity = data.map((item) => ({ ...item, checked: this.tourstList[event]?.some((identity) => identity.id === item.id) }))
      })
      this.$refs.popup.open()
    },

    // 游客列表选择处理
    touristsChange(value, index) {
      this.$set(this.identity[index], 'checked', value)
    },

    selectTourists() {
      this.tourstList[this.tourists] = this.identity.filter((item) => item.checked === true)
      console.log('🚀 ~ selectTourists ~ this.tourstList:', this.tourstList)
      this.$refs.popup.close()
    },

    // 生成订单
    generateOrder() {
      console.log(this.data)
      console.log(this.tourstList)
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
