import axios from 'axios'

export function request(config,success,failure) {
  //1.创建axios实例
  const instance01 = axios.create({
    baseURL:'http://106.54.54.237:8000',
    //timeout:5000
  })

  //2.1请求拦截
  instance01.interceptors.request.use(
    config =>{
      return config
    },
    error => {
    }
  )

  //2.2响应拦截
  instance01.interceptors.response.use(
    res =>{
      return res
    },
    error => {
      console.log(error);
    }
  )

  //3.发送真正的网络请求
  return instance01(config)
}
