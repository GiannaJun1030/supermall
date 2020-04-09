<template>
  <div id="detail">
    <DetailNavBar class="detail-navbar"
                  @titleClick="titleClick"
                  ref="nav"/>
    <Scroll class="content"
            ref="scroll"
            :probeType="3"
            @scroll="contentScroll">
      <DetailSwiper :topImages="topImages"/>
      <DetailBaseInfo :goods="goods"/>
      <DetailShopInfo :shop="shop"/>
      <DetailGoodsInfo :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <DetailParamInfo :paramInfo="paramInfo" ref="params"/>
      <DetailCommentInfo :comment-info="commentInfo" ref="comment"/>
      <GoodsList :goods="RecommendInfo" ref="recommend"/>
    </Scroll>
    <!--监听组件点击-->
    <BackTop @click.native="backClick" v-show="isShowBackTop" ></BackTop>
    <!--底部导航-->
    <DetailBottomBar @addToCart="addCart"/>

    <!--收藏提示框-->
    <Toast
      :message="message"
      :show="show"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import Scroll from "components/common/scroll/Scroll";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import GoodsList from "components/content/goods/GoodsList";
  import {debounce} from "../../common/util/utils";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  /*utils*/
  import {itemListenerMixin,backTopMixin} from "common/mixin";

  /*mapAction映射*/
  import {mapActions} from 'vuex'

  import Toast from "components/common/toast/Toast";


  export default {
    name: "Detail",
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      Scroll,
      GoodsList,
      DetailBottomBar,
      Toast
    },
    data(){
      return{
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        RecommendInfo:[],
        themeTopYs:[],
        getThemeTopYs:null,
        message: '',
        show:false

      }
    },
    methods:{
      ...mapActions(['addCart']),
      imageLoad(){
        this.$refs.scroll.refresh()

        this.getThemeTopYs()
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0,-(this.themeTopYs[index]-44),200)
      },
      contentScroll(position){
        const positionY = -position.y
        let length = this.themeTopYs.length
        for(let i = 0;i<length;i++){
          if(this.currentIndex !== i && (i<length-1 && positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
            || (i === length-1 && positionY > this.themeTopYs[i]) ){
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }

        //是否显示回到顶部
        this.listenBackTop(position)
      },
      addCart(){
        /*获取购物车需要展示的东西*/

        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid

        /*将商品添加到购物车上面*/
        //this.$store.commit('addCart',product)
        this.$store.dispatch('addCart',product).then(res =>{
          /*console.log(res);*/

          this.show = true
          this.message = res
          setTimeout(() =>{
            this.show = false
            this.message = ''
          },1500)

        })

        /*this.addCart(product).then(res =>{
          console.log(res);
        })*/
      }

    },
    mixins:[itemListenerMixin,backTopMixin],
    created() {
      /*保存传入的iid*/
      this.iid = this.$route.params.iid

      /*根据id请求数据*/
      getDetail(this.iid).then(res =>{
        console.log(res);
        const data = res.data.result;

        /*获取轮播图数据*/
        this.topImages = data.itemInfo.topImages

        /*获取商品信息*/
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

        /*获取店铺信息*/
        this.shop = new Shop(data.shopInfo)

        /*保存商品详情数据*/
        this.detailInfo = data.detailInfo

        /*获取参数信息*/
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

        /*获取评论信息*/
        if(data.rate.cRate !==0){
          this.commentInfo =data.rate.list[0]

        }

        /*this.$nextTick(()=>{
          //根据最新的数据，对应的DOM是已经被渲染出来了
          //但是图片依然没有加载完（目前offsettop不包含其中的图片）
          //offsettop值不对的时候就是图片没加载出来
          this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

          console.log(this.themeTopYs);
        })*/

        /*给getThemeTopYs复制*/
        this.getThemeTopYs = debounce(()=>{
          this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          //console.log(this.themeTopYs);
        },100)
      })

      /*请求推荐数据*/
      getRecommend().then(res =>{
        //console.log(res);
        this.RecommendInfo = res.data.data.list
      })
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    height: 100vh;
    z-index: 9;
    background-color: #ffffff;
  }
  .content{
    height: calc(100% - 44px - 49px);
  }
  .detail-navbar{
    position: relative;
    z-index: 9;
    background-color: #ffffff;
  }
</style>
