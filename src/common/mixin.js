import {debounce} from "./util/utils";
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
  data(){
    return{
      itemImgListener:null
    }
  },
  mounted(){
    let refresh = debounce(this.$refs.scroll.refresh,200)
    this.itemImgListener = ()=>{
      refresh()
    }
    /*监听事件总线 监听图片刷新*/
    this.$bus.$on('imgItemOnLoad',this.itemImgListener)
  }
}

export const backTopMixin = {
  components:{
    BackTop
  },
  data(){
    return{
      isShowBackTop:false,
    }
  },
  methods:{
    /*回到顶部*/
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    listenBackTop(position){
      this.isShowBackTop = -position.y > 1000
    }
  }
}
