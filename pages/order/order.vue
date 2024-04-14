<template>
  <view>
    <view class="bg"></view>

    <view class="page">
      <view class="head card">
        <view class="head-title">{{ data.title }}</view>
        <view class="divider"></view>
        <view class="head-time" @click="open">
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

      <!-- <view class="tourist card">
        <view class="tourist-title card-title">游客信息</view>
        <view class="tourist-list">
          <view v-for="(item, index) in data.hyProjectTicketList" v-bind:key="index" class="tourist-item">
            <view class="tourist-item-type">{{ item.remark }}</view>
            <view class="tourist-item-list">
              <view class="tourist-item-info">
                <view class="tourist-item-info-delete"><uni-icons type="minus" size="20" color="#636e72" /></view>
                <view class="tourist-item-info-main">
                  <view class="tourist-item-info-name">{{ item.remark }}</view>
                  <view class="tourist-item-info-code">身份证 442000199700000000</view>
                  <view class="tourist-item-info-phone">手机号 13211100000</view>
                </view>
              </view>
              <view class="tourist-item-info">
                <view class="tourist-item-info-delete"><uni-icons type="minus" size="20" color="#636e72" /></view>
                <view class="tourist-item-info-main">
                  <view class="tourist-item-info-name">{{ item.remark }}</view>
                  <view class="tourist-item-info-code">身份证 442000199700000000</view>
                  <view class="tourist-item-info-phone">手机号 13211100000</view>
                </view>
              </view>
            </view>
            <view class="tourist-item-icon"><uni-icons type="right" size="14" color="#636e72" /></view>
          </view>
        </view>
      </view> -->

      <view class="tourist card">
        <view class="tourist-title card-title">联系人信息</view>
        <view class="tourist-list">
          <view v-for="(item, index) in data.hyProjectTicketList" v-bind:key="index" class="tourist-item">
            <view class="tourist-item-type">{{ item.remark }}</view>
            <view class="tourist-item-list">
              <view class="tourist-item-info">
                <view class="tourist-item-info-delete"><uni-icons type="minus" size="20" color="#636e72" /></view>
                <view class="tourist-item-info-main">
                  <view class="tourist-item-info-name">{{ item.remark }}</view>
                  <view class="tourist-item-info-code">身份证 442000199700000000</view>
                  <view class="tourist-item-info-phone">手机号 13211100000</view>
                </view>
              </view>
              <view class="tourist-item-info">
                <view class="tourist-item-info-delete"><uni-icons type="minus" size="20" color="#636e72" /></view>
                <view class="tourist-item-info-main">
                  <view class="tourist-item-info-name">{{ item.remark }}</view>
                  <view class="tourist-item-info-code">身份证 442000199700000000</view>
                  <view class="tourist-item-info-phone">手机号 13211100000</view>
                </view>
              </view>
            </view>
            <view class="tourist-item-icon"><uni-icons type="right" size="14" color="#636e72" /></view>
          </view>
        </view>
      </view>

      <ct-action-bar :options="{ button: [{ text: '立即付款' }] }"></ct-action-bar>
    </view>
  </view>
</template>

<script>
/**
 * 获取任意时间
 */
function getDate(date, AddDayCount = 0) {
  if (!date) {
    date = new Date()
  }
  if (typeof date !== 'object') {
    date = date.replace(/-/g, '/')
  }
  const dd = new Date(date)

  dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期

  const y = dd.getFullYear()
  const m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 // 获取当前月份的日期，不足10补0
  const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
  return {
    fullDate: y + '-' + m + '-' + d,
    year: y,
    month: m,
    date: d,
    day: dd.getDay()
  }
}

export default {
  data() {
    return {
      data: {},

      info: {
        lunar: true,
        range: true,
        insert: false,
        selected: []
      }
    }
  },

  onLoad(options) {
    this.getListData(options.id)
  },

  onReady() {
    this.$nextTick(() => {
      this.showCalendar = true
    })

    // TODO 模拟请求异步同步数据
    setTimeout(() => {
      this.info.date = getDate(new Date(), -30).fullDate
      this.info.startDate = getDate(new Date(), -60).fullDate
      this.info.endDate = getDate(new Date(), 30).fullDate
      this.info.selected = [
        {
          date: getDate(new Date(), -3).fullDate,
          info: '打卡'
        },
        {
          date: getDate(new Date(), -2).fullDate,
          info: '签到',
          data: {
            custom: '自定义信息',
            name: '自定义消息头'
          }
        },
        {
          date: getDate(new Date(), -1).fullDate,
          info: '已打卡'
        }
      ]
    }, 2000)
  },

  methods: {
    getListData(id) {
      this.$http.get('/hy/project/' + id).then((data) => {
        this.data = { ...data, hyProjectTicketList: data.hyProjectTicketList.map((item) => ({ ...item, number: 0 })) }
      })
    },

    // 打开日历
    open() {
      this.$refs.calendar.open()
    },

    close() {
      console.log('弹窗关闭')
    },

    calendarConfirm(e) {
      console.log(e)
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
  }
}
</style>
