<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <MainTabBar></MainTabBar>
  </div>
</template>

<script>
  import MainTabBar from "components/content/mainTabbar/MainTabBar";

  export default {
    name: 'App',
    components: {
      MainTabBar
    }
  }
</script>

<style>
  /*导入格式文件 base.css里面也导入了normalize*/
  @import "assets/css/base.css";
</style>
