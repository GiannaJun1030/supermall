<template>
  <div>
    <NavBar>
      <!--左边-->
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <!--中心-->
      <div slot="center" class="title">
        <div v-for="(item,index) in titles"
             class="title-item"
             :class="{active:currentIndex === index}"
             @click="titleItem(index)">
          {{item}}
        </div>
      </div>
    </NavBar>
  </div>
</template>

<script>
  import  NavBar from 'components/common/navabar/NavBar'

  export default {
    name: "DetailNavBar",
    components:{
      NavBar
    },
    methods:{
      titleItem(index){
        this.currentIndex = index
        this.$emit('titleClick',index)
      },
      backClick(){
        this.$router.go(-1)
      },
    },
    data(){
      return{
        titles:['商品','参数','评论','推荐'],
        currentIndex:0
      }
    }
  }
</script>

<style scoped>
  .title{
    display: flex;
    font-size: 13px;
  }
  .title-item{
    flex: 1;
  }
  .active{
    color: red;
  }
  .back{
    margin-top: 7px;
  }
</style>
