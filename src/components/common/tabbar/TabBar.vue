<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style scoped>
  #tab-bar{
    /*水平活动*/
    display: flex;

    /*背景颜色*/
    background-color: #f6f6f6;

    /*相对于浏览器进行定位*/
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    /*下拉阴影高度*/
    box-shadow: 0 -2px 1px rgba(100,100,100,.2);
  }

</style>
