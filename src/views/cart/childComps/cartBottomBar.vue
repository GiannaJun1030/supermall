<template>
  <div class="bottom-bar">
    <div class="check-content">
      <CheckButton
        :isChecked="isSelectAll"
        class="check-button"
        @click.native="checkClick"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计:{{totalPrice}}
    </div>

    <div class="calculate">
      去计算：({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  import {mapGetters} from 'vuex'

  export default {
    name: "cartBottomBar",
    components:{
      CheckButton
    },
    computed:{
      ...mapGetters(['cartList']),
      totalPrice(){
        return '￥'+this.cartList.filter(item=>{
          return item.checked
        }).reduce((preValue,item) =>{
          return preValue + item.price * item.count
        },0).toFixed(2)
      },
      checkLength(){
        return this.cartList.filter(item =>{
          return item.checked
        }).length
      },
      isSelectAll(){
        if(this.cartList.length === 0 ) return false
        return !(this.cartList.filter(item =>!item.checked).length)
      }
    },
    methods:{
      checkClick(){
        if(this.isSelectAll){
          return this.cartList.forEach(item =>{item.checked = false})
        }else{
          return this.cartList.forEach(item =>{item.checked = true})
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar{
    position: relative;
    display: flex;

    height: 40px;
    background-color: #eeeeee;
    line-height: 40px;

    font-size: 14px;
  }
  .check-content{
    display: flex;
    align-items: center;
    margin-left: 7px;
    width: 60px;
  }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;

  }
  .price{
    margin-left: 30px;
    flex: 1;
  }
  .calculate{
    width: 100px;
    background-color: red;
  }
</style>
