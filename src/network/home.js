import {request} from './request'

//首页所有的请求都放在这里，进行统一的管理
export function getHomeMultidata() {
  return request({
    url:'/home/multidata'
  })
}
export function getHomeGoods(type,page) {
  return request({
    url:'/api/h8/home/data',
    params:{
      type,
      page
    }
  })
}
