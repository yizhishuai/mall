import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/home'
import Index from './pages/index'
import Product from './pages/product'
import Detail from './pages/detail'
import Cart from './pages/cart'
import Order from './pages/order'
import OrderConfirm from './pages/orderConfirm'
import OrderList from './pages/orderList'
import OrderPay from './pages/orderPay'
import Alipay from './pages/alipay'
import Login from './pages/login'
import Register from './pages/register'




/* 加载插件固定的语法 */
Vue.use(Router)

export default new Router({
    routes: [    //配置路由，这里是个数组
        {       //每一个链接都是一个对象
            path: '/',  //链接路径
            name: 'home',   //路由名称
            //redirect: '/index',     //重定向
            component: Home,    //对应的组件模板
            children: [{        //子路由
                path: '/index',
                name: 'index',
                component: Index,
            },
            {
                path: '/product/:id',        //动态路由 /:表示动态传id
                name: 'product',
                component: Product,
            },
            {
                path: '/detail/:id',
                name: 'detail',
                component: Detail,
            }
            ]
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart,
        },
        {
            path: '/order',
            name: 'order',
            component: Order,
            children: [{
                path: 'confirm',
                name: 'order-confirm',
                component: OrderConfirm,
            },
            {
                path: 'list',
                name: 'order-list',
                component: OrderList,
            },
            {
                path: 'pay',
                name: 'order-pay',
                component: OrderPay,
            },
            {
                path: 'alipay',
                name: 'alipay',
                component: Alipay,
            }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
        },
    ]
})