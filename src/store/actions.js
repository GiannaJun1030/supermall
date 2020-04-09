import {ADD_COUNTER,ADD_TO_CART} from "./mutaion_types";

export default {
  addCart(context,payload){
    return new Promise((resolve, reject) => {
      /*payload添加新产品*/
      /*let oldProduct = null;
      for(let item of context.state.cartList){
        if(item.iid === payload.iid){
          oldProduct = item
        }
      }*/
      let oldProduct = context.state.cartList.find(item =>item.iid == payload.iid)

      /*判断oldProduct*/
      if(oldProduct){
        //oldProduct.count += 1
        context.commit(ADD_COUNTER,oldProduct)
        resolve('当前商品数量+1')
      }else {
        payload.count = 1
        context.commit(ADD_TO_CART,payload)
        resolve('添加商品成功')
      }
    })
  }
}
