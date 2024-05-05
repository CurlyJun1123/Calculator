<template>
  <view>
    <view class="bg"></view>

    <view class="page">
      <view class="head card">
        <view class="head-title">{{ data.title }}</view>
        <view class="divider"></view>
        <view class="head-time" @click="openCalendar">
          <view class="head-time-lable">2023/11/11 周六</view>
          <view class="head-time-replace">
            更换
            <uni-icons type="right" size="14" />
          </view>
        </view>
      </view>

      <wu-calendar ref="calendar" :insert="false" :monthShowCurrentMonth="true" @confirm="calendarConfirm" />

      <view class="ticket card">
        <view class="ticket-list">
          <view v-for="(item, index) in data.hyProjectTicketList" v-bind:key="index" class="ticket-item">
            <view class="ticket-item-left">
              <view class="ticket-item-title">{{ item.remark }}</view>
              <view class="ticket-item-label">立即取票 需要换票</view>
              <view class="ticket-item-label">已售{{ item.saleNum || 0 }}</view>
            </view>
            <view class="ticket-item-right">
              <view class="ticket-item-price">
                <text class="ticket-item-price-fit">￥</text>
                <text class="ticket-item-price-num">{{ item.price }}</text>
              </view>
              <view class="ticket-item-number"><uni-number-box v-model="item.number" /></view>
            </view>
          </view>
        </view>
      </view>

      <view class="tourist card">
        <view class="tourist-title card-title">游客信息</view>
        <view class="tourist-list">
          <template v-for="(cell, index) in data.hyProjectTicketList">
            <view v-bind:key="index" v-if="cell.number" class="tourist-item">
              <view class="tourist-item-type">{{ cell.remark }}</view>
              <view class="tourist-item-list">
                <view
                  v-for="(tourst, tourstIndex) in tourstList[cell.id]"
                  v-bind:key="tourstIndex"
                  class="tourist-item-info"
                  @click="openTourists(cell.id)"
                >
                  <view class="tourist-item-info-delete"><uni-icons type="minus" size="20" color="#636e72" /></view>
                  <view class="tourist-item-info-main">
                    <view class="tourist-item-info-name">{{ tourst.name }}</view>
                    <view class="tourist-item-info-code">身份证 {{ tourst.idCard }}</view>
                    <view class="tourist-item-info-phone">手机号 {{ tourst.phone }}</view>
                  </view>
                </view>
                <view v-if="cell.number > (tourstList[cell.id]?.length || 0)" class="tourist-item-select" @click="openTourists(cell.id)">
                  还需选择{{ cell.number - (tourstList[cell.id]?.length || 0) }}位{{ cell.remark }}
                </view>
              </view>
              <view class="tourist-item-icon"><uni-icons type="right" size="14" color="#636e72" /></view>
            </view>
          </template>
        </view>
        <view class="tourist-button align-center">
          <view class="tourist-button-left">联系电话</view>
          <input
            v-model="formData.name"
            class="tourist-button-input"
            placeholder-style="font-size: 14px"
            placeholder="请输入姓名"
            type="text"
          />
        </view>
      </view>

      <ct-action-bar :options="{ button: [{ text: '立即付款' }] }" @clickButton="generateOrder" />
    </view>

    <uni-popup ref="popup" type="bottom" background-color="#fff" borderRadius="10px 10px 0 0">
      <view class="popup-title">选择游客</view>

      <view class="tourist-button-left">
        <view class="identity-list">
          <view v-for="(item, index) in identity" v-bind:key="item.id" class="identity-item align-center">
            <view class="align-center flex-1" @click="touristsChange(!item.checked, index)">
              <uni-icons v-if="item.checked" type="circle-filled" size="22" color="#1e90ff" />
              <uni-icons v-else type="circle" size="22" color="#d1d1d1" />

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
  </view>
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

    // 打开日历
    openCalendar() {
      this.$refs.calendar.open()
    },

    close() {
      console.log('弹窗关闭')
    },

    calendarConfirm(e) {
      console.log(e)
    },

    // 打开游客列表
    openTourists(event) {
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

<style lang="scss">
page {
  background-color: $uni-bg-color-grey;
}
</style>

<style lang="scss" scoped>
.bg {
  position: fixed;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 300px;
  background: linear-gradient(to bottom, $uni-theme-color-6, $uni-bg-color-grey);
}

.page {
  position: relative;
  z-index: 2;
  padding-top: 12px;
}

.card {
  margin: 12px 12px;
  margin-top: 0;
  background-color: #fff;
  border-radius: 8px;
}

.divider {
  margin: 12px 0;
  width: 100%;
  border-top: 1rpx solid rgba(0, 0, 0, 0.12);
}

.card-title {
  padding: 12px;
  padding-bottom: 0;
  color: $uni-text-color;
  font-weight: 600;
  font-size: 16px;
}

.head {
  padding: 12px;

  .head-title,
  .head-time-lable {
    color: $uni-text-color;
    font-weight: 600;
    font-size: 16px;
  }

  .head-time {
    display: flex;
    justify-content: space-between;
  }

  .head-time-lable,
  .head-time-replace {
    font-size: 14px;
  }
}

.ticket {
  .ticket-item:first-of-type {
    border-top: none;
  }

  .ticket-item {
    display: flex;
    padding: 12px;
    border-top: 1rpx solid rgba(0, 0, 0, 0.12);

    .ticket-item-left {
      flex: 1;

      .ticket-item-title {
        margin-bottom: 4px;
        font-size: 16px;
        font-weight: 600;
      }

      .ticket-item-label {
        color: #636e72;
        font-size: 14px;
      }
    }

    .ticket-item-right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: space-between;

      .ticket-item-price-fit {
        font-size: 14px;
      }

      .ticket-item-price {
        color: #f86601;
        font-size: 18px;
      }

      .ticket-item-price-num {
        font-weight: 600;
      }
    }
  }
}

.tourist {
  .tourist-title {
    padding: 12px;
  }

  .tourist-item:first-of-type {
    border-top: none;
  }

  .tourist-item {
    padding: 0 12px;
    display: flex;
    align-items: center;
    border-top: 1rpx solid rgba(0, 0, 0, 0.12);

    .tourist-item-type {
      width: 80px;
      color: $uni-text-color;
      font-size: 14px;
    }

    .tourist-item-list {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 0 6px;
    }

    .tourist-item-info:first-of-type {
      border-top: none;
    }

    .tourist-item-info {
      display: flex;
      padding: 12px 0;
      align-items: center;
      border-top: 1rpx solid rgba(0, 0, 0, 0.12);

      .tourist-item-info-delete {
        margin-right: 12px;
      }

      .tourist-item-info-main {
        .tourist-item-info-name {
          margin-bottom: 4px;
          color: $uni-text-color;
          font-size: 14px;
        }

        .tourist-item-info-code,
        .tourist-item-info-phone {
          color: #636e72;
          font-size: 12px;
        }
      }
    }

    .tourist-item-select {
      padding: 12px 0;
      font-size: 14px;
      color: #636e72;
    }
  }

  .tourist-button {
    padding: 12px;

    .tourist-button-left {
      width: 80px;
      color: $uni-text-color;
      font-size: 14px;
    }

    .tourist-button-input {
      flex: 1;
      padding: 0 6px;
      font-size: 14px;
    }
  }
}

.identity-item {
  margin: 12px;

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
