<template>
  <div class="cart">
    <!--购物车导航条-->
    <NavBar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </NavBar>

    <!--商品列表-->
    <cartList />

    <!--购物车底部添加按钮-->
    <cartBottomBar></cartBottomBar>
  </div>
</template>

<script>
  import NavBar from "components/common/navabar/NavBar";
  import cartList from "./childComps/cartList";
  import cartBottomBar from "./childComps/cartBottomBar";

  /*通过辅助函数mapGetters导入getters中的cartLenght*/
  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components:{
      NavBar,
      cartList,
      cartBottomBar
    },
    computed:{
      // cartLenght(){
      //   return this.$store.getters.cartLenght
      // }

      /*两种做法*/
      //方法名字得一致
      //数组方法
      //...mapGetters(['cartLenght'])

      //对象方法，方法名可以自定义
      ...mapGetters({
        length:'cartLenght',
      })
    }
  }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color: #ffffff;
    font-weight: 700;
  }
</style>
