<template>
  <div id="home">
    <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>
    <TabControl class="tab-control"
                v-bind:titles="['流行','新款','精选']"
                @tabClick="tabClick"
                ref="tabControl1"
                v-show="isTabFixed"/>
    <Scroll class="content" ref="scroll"
            :probeType="3"
            @backTop="contentBackTop"
            :pullUpLoad="true"
            @pullingUp="learnMore">
      <!--轮播图-->
      <HomeSwiper :banners="banners"
                  @swiperImgLoad="swiperImgLoad"/>
      <!--推荐-->
      <RecommendView :recommends="recommends"></RecommendView>
      <FeatureView></FeatureView>

      <TabControl v-bind:titles="['流行','新款','精选']"
                  @tabClick="tabClick"
                  ref="tabControl2"/>
      <GoodsList :goods="goods[currentType].list"></GoodsList>
    </Scroll>

    <!--监听组件点击-->
    <BackTop @click.native="backClick" v-show="isShowBackTop" ></BackTop>

  </div>
</template>

<script>
  //导入的组件
  import NavBar from "components/common/navabar/NavBar";
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  //导入的函数
  import {getHomeMultidata,getHomeGoods} from "network/home";
  import {itemListenerMixin,backTopMixin} from "common/mixin";

  export default {
    name: "Home",
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
    },
    mixins:[itemListenerMixin,backTopMixin],
    data(){
      return{
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:'pop',
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY:0,
      }
    },
    created() {
      //1.请求到多个数据到首页中
      this.getHomeMultidata()

      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted() {

    },
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      //保存我的y值
      this.saveY = this.$refs.scroll.getScrollY()
    },
    methods:{
      swiperImgLoad(){
        /*获取高度不在vue,在vue的元素上，用于获取组件中的元素,所以用$el*/
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      /*加载更加多*/
      learnMore(){
        this.getHomeGoods(this.currentType)
      },
      /*隐藏上啦按钮*/
      contentBackTop(position){

        this.listenBackTop(position)

        /*隐藏*/
        this.isTabFixed = -position.y > this.tabOffsetTop
      },
      /*
      * 事件监听相关的方法
      * */
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      /*
      * 网络请求相关的方法
      * */
      getHomeMultidata(){
        getHomeMultidata().then(res =>{
          this.banners = res.data.data.banner.list
          this.recommends = res.data.data.recommend.list
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res =>{
          //讲请求数据获取的list一个一个取出来然后赋值给goods 也可以使用遍历
          this.goods[type].list.push(...res.data.data.list)
          this.goods[type].page +=1

          /*刷新一下加载*/
          this.$refs.scroll.finishPullUp()
        })
      }
    }

  }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    height: 100vh;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;

    /*在使用浏览器都使用原生滚动的时候，为了导航不一起滚动，所以设置固定位置，脱离文档流，下面元素就会脱标*/
    /*position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;*/
  }
  .content{
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }
  /*.content{
    !*相对父元素 100% - 93px等于内容的高度 首先父元素就应该设计 100vh*!
    height:calc(100% - 93px);
    overflow: hidden;

    margin-top: 44px;
  }*/
</style>
