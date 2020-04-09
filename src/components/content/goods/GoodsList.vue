<template>
  <div class="goods">
    <GoodsListItem v-for="item in goods" :goodsItem="item"></GoodsListItem>
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";
  export default {
    name: "GoodsList",
    components:{
      GoodsListItem
    },
    props:{
      goods:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods{
    display: flex;
    /*包裹根据一张图片的尺寸*/
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 2px;
  }
</style>
