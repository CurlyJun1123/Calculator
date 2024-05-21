<template>
  <view class="ct-tabs">
    <view class="ct-tabs-wrapper flex-row align-center">
      <scroll-view ref="ct-tabs-wrapper__scroll-view" class="ct-tabs-wrapper__scroll-view" scroll-with-animation :scroll-x="scrollable" :scroll-left="scrollLeft" :show-scrollbar="false">
        <view class="ct-tab-nav align-center">
          <view
            v-for="(item, index) in options"
            class="ct-tab-item justify-center align-center"
            :key="index"
            :class="[`ct-tab-item-${index}`, active === index && 'ct-tab-active']"
            @tap="click(item, index)"
          >
            <view class="ct-tab-name">{{ item.name }}</view>
            <view class="ct-tab__line" />
          </view>
        </view>
      </scroll-view>
      <view class="ct-tabs-right"><slot name="right" /></view>
    </view>

    <view class="ct-tabs-place" />
  </view>
</template>

<script>
export default {
  props: {
    // 绑定当前选中标签的标识符
    active: {
      type: [Number, String],
      default: 0,
    },
    // 组件参数
    options: {
      type: Array,
      default() {
        return []
      },
    },
    // 标签栏是否可以滚动
    scrollable: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      scrollLeft: 0,
      tabsRect: {},
      scrollViewWidth: 0,
      innerCurrent: 0,
    }
  },

  watch: {
    active: {
      immediate: true,
      handler(newValue, oldValue) {
        // 内外部值不相等时，才尝试移动滑块
        if (newValue !== this.innerCurrent) {
          this.innerCurrent = newValue
          this.$nextTick(() => {
            this.resize()
          })
        }
      },
    },
  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      this.$nextTick(() => {
        this.resize()
      })
    },

    click(item, index) {
      if (this.active === index) return
      this.$emit('update:active', index)
      this.$emit('click', { ...item, index })
      this.$emit('change', { ...item, index })
    },

    // 获取所有标签的尺寸
    resize() {
      // 如果不存在options，则不处理
      if (this.options.length === 0) {
        return
      }
      Promise.all([this.getTabsRect(), this.getAllItemRect()]).then(([tabsRect, itemRect = []]) => {
        this.tabsRect = tabsRect
        this.scrollViewWidth = 0
        itemRect.map((item, index) => {
          // 计算scroll-view的宽度，这里
          this.scrollViewWidth += item.width
          // 另外计算每一个item的中心点X轴坐标
          this.options[index].rect = item
        })
        // 获取了tabs的尺寸之后，设置滑块的位置
        // this.setLineLeft()
        this.setScrollLeft()
      })
    },

    // 获取导航菜单的尺寸
    getTabsRect() {
      return new Promise((resolve) => {
        this.queryRect('.ct-tabs-wrapper__scroll-view').then((size) => resolve(size))
      })
    },

    // 获取所有标签的尺寸
    getAllItemRect() {
      return new Promise((resolve) => {
        const promiseAllArr = this.options.map((item, index) => this.queryRect(`.ct-tab-item-${index}`))
        Promise.all(promiseAllArr).then((sizes) => resolve(sizes))
      })
    },

    queryRect(el) {
      return new Promise((resolve) => {
        const query = uni.createSelectorQuery().in(this)
        query
          .select(el)
          .boundingClientRect((data) => {
            resolve(data)
          })
          .exec()
      })
    },

    setLineLeft() {
      const tabItem = this.list[this.innerCurrent]
      if (!tabItem) {
        return
      }
      // 获取滑块该移动的位置
      let lineOffsetLeft = this.list.slice(0, this.innerCurrent).reduce((total, curr) => total + curr.rect.width, 0)
      // 获取下划线的数值px表示法
      const lineWidth = uni.$u.getPx(this.lineWidth)
      this.lineOffsetLeft = lineOffsetLeft + (tabItem.rect.width - lineWidth) / 2
      // #ifdef APP-NVUE
      // 第一次移动滑块，无需过渡时间
      this.animation(this.lineOffsetLeft, this.firstTime ? 0 : parseInt(this.duration))
      // #endif

      // 如果是第一次执行此方法，让滑块在初始化时，瞬间滑动到第一个tab item的中间
      // 这里需要一个定时器，因为在非nvue下，是直接通过style绑定过渡时间，需要等其过渡完成后，再设置为false(非第一次移动滑块)
      if (this.firstTime) {
        setTimeout(() => {
          this.firstTime = false
        }, 10)
      }
    },

    setScrollLeft() {
      // 当前活动tab的布局信息，有tab菜单的width和left(为元素左边界到父元素左边界的距离)等信息
      const tabRect = this.options[this.innerCurrent]
      // 累加得到当前item到左边的距离
      const offsetLeft = this.options.slice(0, this.innerCurrent).reduce((total, curr) => {
        return total + curr.rect.width
      }, 0)
      // 此处为屏幕宽度
      // const windowWidth = uni.$u.sys().windowWidth
      // 将活动的tabs-item移动到屏幕正中间，实际上是对scroll-view的移动
      let scrollLeft = offsetLeft - (this.tabsRect.width - tabRect.rect.width) / 2 + this.tabsRect.left / 2 + 4
      // 这里做一个限制，限制scrollLeft的最大值为整个scroll-view宽度减去tabs组件的宽度
      scrollLeft = Math.min(scrollLeft, this.scrollViewWidth - this.tabsRect.width)
      this.scrollLeft = Math.max(0, scrollLeft)
    },
  },
}
</script>

<style lang="scss" scoped>
// /deep/ ::-webkit-scrollbar {
//   display: none;
// }

.ct-tabs-place {
  width: 100%;
  height: 44px;
}

.ct-tabs {
  height: 44px;

  .ct-tabs-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 44px;
    // background: #fff;
    /* #ifdef H5 */
    top: 44px;
    /* #endif */
  }

  .ct-tabs-wrapper__scroll-view {
    height: 44px;
    flex: 1;
  }

  .ct-tab-nav {
    display: flex;
    height: 44px;

    &::before {
      display: block;
      padding-left: 4px;
      height: 100%;
      content: '';
    }

    &::after {
      display: block;
      padding-left: 4px;
      height: 100%;
      content: '';
    }

    .ct-tab-item {
      position: relative;
      padding: 0 12px;
      height: 36px;
      // flex: 1 0 auto;
      flex-shrink: 0;

      .ct-tab-name {
        color: #666;
        font-size: 16px;
      }
    }

    .ct-tab-active {
      .ct-tab-name {
        color: #192434;
        font-weight: 600;
      }

      .ct-tab__line {
        position: absolute;
        bottom: -4px;
        left: 12px;
        right: 12px;
        height: 2px;
        background-color: #1676f3;
      }
    }
  }
}
</style>
