<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    data(){
      return{
        scroll:null,
        message:'哈哈哈'

      }
    },
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        default: true
      }
    },
    mounted() {
      /*创建scroll对象*/
      this.scroll = new BScroll(this.$refs.wrapper,{
        /*不然div中监听不到，如果click为false那么只有button能监听到*/
        click:true,
        probeType:this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      /*监听滚动事件*/
      this.scroll.on('scroll',(position) =>{
        this.$emit('backTop',position)
        this.$emit('scroll',position)
      })
      /*监听上拉事件*/
      this.scroll.on('pullingUp',()=>{
        this.$emit('pullingUp')
      })

    },
    methods:{
      scrollTo(x,y,time=500){
        this.scroll && this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp()
      },
      refresh(){
        console.log('------');
        this.scroll && this.scroll.refresh()
      },
      getScrollY(){
        return this.scroll ? this.scroll.y : 0
      }
    },
  }
</script>

<style scoped>

</style>
