<template>
  <view class="ct-timeline">
    <view class="ct-timeline-item">
      <view class="ct-timeline-item-label">123</view>
      <view class="ct-timeline-item-tail"></view>
      <view class="ct-timeline-item-head"></view>
      <view class="ct-timeline-item-content">123</view>
    </view>
  </view>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.ct-timeline-item {
  box-sizing: border-box;
  position: relative;
  margin: 0;
  padding-bottom: 20px;
  font-size: 14px;

  .ct-timeline-item-label {
    position: absolute;
    box-sizing: border-box;
    width: calc(50% - 18px);
    text-align: end;
    inset-block-start: -6px;
  }

  .ct-timeline-item-tail {
    position: absolute;
    box-sizing: border-box;
    height: calc(100% - 10px);
    inset-inline-start: calc(50% - 1px);
    inset-block-start: 10px;
    border-inline-start: 2px solid rgba(5, 5, 5, 0.06);
  }

  .ct-timeline-item-head {
    position: absolute;
    box-sizing: border-box;
    width: 10px;
    height: 10px;
    border: 3px solid #1677ff;
    border-radius: 50%;
    background-color: #fff;
    color: #1677ff;
    margin-inline-start: -5px;
    inset-inline-start: 50%;
  }

  .ct-timeline-item-content {
    position: relative;
    box-sizing: border-box;
    width: calc(50% - 12px);
    text-align: start;
    inset-inline-start: calc(50%);
    inset-block-start: -6px;
    margin-inline-start: 18px;
    margin-inline-end: 0;
    margin-block-start: 0;
    margin-block-end: 0;
    word-break: break-word;
  }
}
</style>
