<template>
  <view class="ct-avatar" @tap="clickHandler">
    <image
      class="ct-avatar-image"
      :src="avatarUrl || defaultUrl"
      :mode="mode"
      :style="[{ width: imageWidth, height: imageHeight, borderRadius }]"
      :class="[{ 'ct-avatar-round': round },{  'Ground': !isCallResume() && avatarBool }]"
      @error="errorHandler"
    ></image>
    <!-- 'Ground': !isCallResume() && avatarBool  -->
  </view>
</template>

<script>
const getVal = val => {
  const reg = /^[0-9]*$/g
  return typeof val === 'number' || reg.test(val) ? val + 'px' : val
}

const base64Avatar = 'https://doc.job001.cn/files/default/headimg/photoDefault_m_02.png'

export default {
  name: 'CtAvatar',

  props: {
    // 头像图片路径(不能为相对路径)
    src: {
      type: String,
      default: ''
    },
    // 头像尺寸
    size: {
      type: [Number, String, Array],
      default: '30'
    },
    // 圆角大小，默认单位为 px
    radius: {
      type: [String, Number],
      default: ''
    },
    // 是否显示为圆形
    round: {
      type: Boolean,
      default: false
    },
    // 裁剪模式
    mode: {
      type: String,
      default: 'scaleToFill'
    },
    // 显示的文字
    text: {
      type: String,
      default: ''
    },
    // 背景色
    bgColor: {
      type: String,
      default: ''
    },
    // 文字颜色
    color: {
      type: String,
      default: ''
    },
    // 文字大小
    fontSize: {
      type: [String, Number],
      default: ''
    },
    // 显示的图标
    icon: {
      type: String,
      default: ''
    },
    // 加载失败的默认头像(组件有内置默认图片)
    defaultUrl: {
      type: String,
      default: ''
    },
    // 组件标识符
    name: {
      type: String,
      default: ''
    },
    // 是不是职聊简历
    visibility:{
      type: [String, Number],
      default: ''
    },
    // 有没有投递 有没有购买
     isBuy:{
      type: [String, Number],
      default: ''
    },
  },

  data() {
    return {
      avatarUrl: this.src,
      avatarBool:false
    }
  },

  created(){
    console.log(this.visibility,this.isBuy,'11111');
    let url = this.avatarUrl || this.defaultUrl // 获取头像路径
       if (url.indexOf('/default/headimg') > -1) {  //判断有没有 '/default/headimg' 这个字段 有的话就是系统默认头像
          this.avatarBool = false // 如果是系统默认头像设置为false
        } else {
          this.avatarBool = true// 如果是自定义头像设置为true
        }
  },

  watch: {
    // 监听头像src的变化，赋值给内部的avatarUrl变量，因为图片加载失败时，需要修改图片的src为默认值
    // 而组件内部不能直接修改props的值，所以需要一个中间变量
    src: {
      immediate: true,
      handler(newVal) {
        this.avatarUrl = newVal
        // 如果没有传src，则主动触发error事件，用于显示默认的头像，否则src为''空字符等的时候，会无内容展示
        if (!newVal) {
          this.errorHandler()
        }
      }
    }
  },

  computed: {
    imageWidth() {
      let width = this.size
      if (Array.isArray(width)) {
        width = width[0]
      }
      return getVal(width)
    },

    imageHeight() {
      let height = this.size
      if (Array.isArray(height)) {
        height = height[1]
      }
      return getVal(height)
    },

    borderRadius() {
      return getVal(this.radius)
    }
  },

  methods: {
    // 判断传入的name属性，是否图片路径，只要带有"/"均认为是图片形式
    isImg() {
      return this.src.indexOf('/') !== -1
    },

    // 图片加载时失败时触发
    errorHandler() {
      this.avatarUrl = this.defaultUrl || base64Avatar
      this.avatarBool = false //系统默认头像
    },

    clickHandler() {
      this.$emit('click', this.name)
    },
     //直call简历 还是职聊简历  true:职聊简历  false:直call简历
    isCallResume() {
      // 判断是不是没有字段都没空 避免影响到其他头像
        if(this.visibility=='' && this.isBuy==''){
          return true
        }
        if (this.visibility === 1 || this.isBuy === 1) {
          //公开或者有购买关系可以看到联系方式的为直call简历
          return true
        } else if (this.visibility === 2) {
          //其余的为职聊简历
          return false
        }     
    }
  }
}
</script>

<style lang="scss" scoped>
.ct-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
}

.ct-avatar-image {
  display: block;
}

.ct-avatar-round {
  border-radius: 50%;
}
// 毛玻璃
.Ground {
  // background-attachment: fixed;
  filter: blur(5px);

  color: transparent;

  // color: transparent;
  // text-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}
</style>
