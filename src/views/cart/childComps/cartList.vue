<template>
  <div class="cart-list">
    <Scroll class="content"  ref="scroll">
      <cartListItem v-for="(item,index) in cartList"
                    :key="index"
                    :itemInfo="item" ></cartListItem>
    </Scroll>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  import Scroll from "components/common/scroll/Scroll";
  import cartListItem from "./cartListItem";

  export default {
    name: "cartList",
    components:{
      Scroll,
      cartListItem
    },
    computed:{
      ...mapGetters(['cartList'])
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list{
    height: calc(100% - 44px - 49px - 40px);
  }
  .content{
    height: 100%;
    overflow: hidden;
  }
</style>
