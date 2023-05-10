<template>
  <view class="ct-empty flex-col justify-center align-center">
    <image class="ct-empty-image" :src="imageUrl" :style="[{ width: imageWidth, height: imageHeight }]"></image>
    <view v-if="title" class="ct-empty-title">{{ title }}</view>
    <view v-if="description" class="ct-empty-description">{{ description }}</view>
    <button v-if="button" class="ct-empty-button ct-button ct-button-primary ct-button-small ct-button-round" @tap="onClickButton">{{ button }}</button>
    <slot />
  </view>
</template>

<script>
const getVal = (val) => {
  const reg = /^[0-9]*$/g
  return typeof val === 'number' || reg.test(val) ? val + 'px' : val
}

export default {
  name: 'CtEmpty',

  props: {
    // 图片类型，可选值为 default resume search files notice，支持传入图片 URL
    image: {
      trye: String,
      default: 'resume'
    },
    // 图片大小，默认单位为 px
    // 将 image-size 设置为数组格式，可以分别设置宽高。数组第一项对应宽度，数组第二项对应高度。
    imageSize: {
      type: [Number, String, Array],
      default() {
        return [245, 160]
      }
    },
    // 图片下方的标题
    title: String,
    // 图片下方的描述
    description: String,
    // 图片下方的按钮
    button: String
  },

  data() {
    return {}
  },

  computed: {
    imageUrl() {
      let url
      if (uni.$ct.test.url(this.image)) {
        url = this.image
      } else {
        url = `https://static.job001.cn/images/hr_img/empty/${this.image}.png`
      }
      return url
    },

    imageWidth() {
      let width = this.imageSize
      if (Array.isArray(width)) {
        width = width[0]
      }
      return getVal(width)
    },

    imageHeight() {
      let height = this.imageSize
      if (Array.isArray(height)) {
        height = height[1]
      }
      return getVal(height)
    },

    onClickButton() {
      this.$emit('clickButton')
    }
  }
}
</script>

<style lang="scss" scoped>
.ct-empty {
  padding: 32px 16px;
}

.ct-empty-image {
  display: block;
  width: 245px;
  height: 160px;
}

.ct-empty-title {
  margin-top: 16px;
  color: #192434;
  font-weight: 600;
  font-size: 16px;
}

.ct-empty-description {
  margin-top: 16px;
  color: #666;
  font-size: 14px;
}

.ct-empty-title + .ct-empty-description {
  margin-top: 4px;
}

.ct-empty-button {
  margin-top: 16px;
  width: 164px;
  box-shadow: 0px 4px 16px -1px rgba(22, 118, 243, 0.25);
}
</style>
