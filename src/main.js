import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyload from 'vue-lazyload'
import VueAwesomeSwiper from 'vue-awesome-swiper';
//import 'swiper/dist/css/swiper.css'

//根据前端跨域进行调整，`baseURL` 将自动加在 `url` 前面//接口跨域
//axios.defaults.baseURL = '/api'
//设置超时时间
axios.defaults.timeout = 8000

//接口错误拦截
axios.interceptors.response.use(function(response){   //拦截页面返回数据状态码
  let res = response.data   //返回的数据为response.data，包括status和data
  if(res.status == 0){      //状态码为0代表登陆成功
    return res.data
  }else if(res.status == 10){    //状态码为10代表未登陆，跳转到登陆页面
      window.location.href = "/#/login"   //跳转到登陆页面
    }else{
      alert(res.msg);
    }
  });
 
//     return Promise.reject()   //发生错误，promise返回拒绝值
//   }else{
//     Message.error(res.msg)
//     return Promise.reject()   //发生错误，promise返回拒绝值
//   }
// },(error)=>{    //拦截http请求状态码（请求发送失败）
//   let res = error.response
//   Message.error(res.data.message)
//   return Promise.reject()   //发生错误，promise返回拒绝值
// })

Vue.use(VueAxios,axios)
Vue.config.productionTip = false
Vue.use(VueLazyload,{
  loading: '/imgs/loading-svg/loading-bars.svg'   //懒加载loading动画
})
Vue.use(VueAwesomeSwiper);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
