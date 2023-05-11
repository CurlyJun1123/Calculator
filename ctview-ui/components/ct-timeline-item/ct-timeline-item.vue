<template>
  <view class="ct-timeline-item">
    <view class="ct-timeline-item-label">
      <template v-if="$slots.label"><slot name="label"></slot></template>
      <template v-else>{{ label }}</template>
    </view>
    <view class="ct-timeline-item-tail"></view>
    <view class="ct-timeline-item-head"></view>
    <view class="ct-timeline-item-content"><slot /></view>
  </view>
</template>

<script>
export default {
  name: 'ct-timeline-item',

  props: {
    label: String
  },

  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
ct-timeline-item:last-of-type .ct-timeline-item .ct-timeline-item-tail {
  display: none;
}

.ct-timeline-item {
  position: relative;
  box-sizing: border-box;
  margin: 0;
  padding-bottom: 20px;
  font-size: 14px;

  .ct-timeline-item-label {
    position: absolute;
    box-sizing: border-box;
    width: calc(40% - 18px);
    color: $uni-text-color;
    text-align: end;
    font-weight: 500;
    font-size: 16px;
    inset-block-start: -6px;
  }

  .ct-timeline-item-tail {
    position: absolute;
    box-sizing: border-box;
    height: calc(100% - 10px);
    inset-inline-start: calc(40% - 0.5px);
    inset-block-start: 10px;
    border-inline-start: 1px solid rgba(5, 5, 5, 0.06);
  }

  .ct-timeline-item-head {
    position: absolute;
    box-sizing: border-box;
    width: 10px;
    height: 10px;
    border: 3px solid $uni-color-primary;
    border-radius: 50%;
    background-color: $uni-bg-color;
    color: $uni-color-primary;
    margin-inline-start: -5px;
    inset-inline-start: 40%;
  }

  .ct-timeline-item-content {
    position: relative;
    box-sizing: border-box;
    width: calc(60% - 18px);
    color: $uni-text-color;
    text-align: start;
    font-weight: 500;
    font-size: 16px;
    inset-inline-start: 40%;
    inset-block-start: -6px;
    margin-inline-start: 18px;
    margin-inline-end: 0;
    margin-block-start: 0;
    margin-block-end: 0;
    word-break: break-word;
  }
}
</style>
