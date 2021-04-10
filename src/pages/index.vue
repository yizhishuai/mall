<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li class="menu-item">
              <a href="javascript:;">手机 电话卡</a>
              <div class="children">
                <ul class="products" v-for="(item,i) in menuList" :key="i">
                  <li class="product" v-for="(sub,j) in item" :key="j">
                    <a :href="sub?'/#/product/'+sub.id:''">
                      <img src="sub?sub.image:'/imgs/item-box-1.png'" alt />
                      {{sub?sub.name:'小米CC9'}}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电视 盒子</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">笔记本 平板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">家电 插线板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">出行 穿戴</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">智能 路由器</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电源 配件</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">生活 箱包</a>
            </li>
          </ul>
        </div>
        <swiper :options="swiperOptions">
          <swiper-slide v-for="(item,index) in swiperList" :key="index">
            <a :href="'/#/product/' + item.id">
              <img v-bind:src="item.image" alt />
            </a>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
          <div class="swiper-button-next" slot="button-next"></div>
          <!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
        </swiper>
      </div>

      <div class="banner">
        <a :href="'/#/product/' + banner.id">
          <img v-bind:src="banner.image" alt />
        </a>
      </div>
    </div>
    <div class="product-box">
      <div class="container">
        <h2>手机</h2>
        <div class="wraper">
          <div class="banner">
            <a href="/#/product/35">
              <img src='/imgs/mix-fold.png' alt />
            </a>
          </div>
          <div class="list-box">
            <div class="list" v-for="(arr,i) in phoneList" :key="i">
              <div class="item" v-for="(item,j) in arr" :key="j">
                <div class="item-img">
                  <img v-bind:src="item.mainImage" />
                </div>
                <h3>{{item.name}}</h3>
                <div class="item-info">
                  <p>{{item.subtitle}}</p>
                </div>
                <div class="item-price">
                  <p @click="addCart(item.id)">{{item.price}}元</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <modal
      title="友情提示"
      btnType="1"
      sureText="查看购物车"
      modalType="middle"
      :showModal="showModal"
      @submit="gotoCart"
      @cancel="showModal=false"
    >
      <template v-slot:body>
        <p>商品添加成功！</p>
      </template>
    </modal>
    <modal></modal>
  </div>
  
</template>

<script>

import Modal from "./../components/Modal";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import 'swiper/swiper-bundle.css'


export default {
  name: "index",
  components: {
    Swiper,
    SwiperSlide,
    Modal
  },
  data() {
    return {
      swiperOptions: {
        //环绕
        loop: true,
        //自动切换
        autoplay: true,
        //方块旋转
        effect: "cube",
        cubeEffect: {
          slideShadows: true,
          shadow: true,
          shadowOffset: 100,
          shadowScale: 0.6
        },
        //分页器
        pagination: {
          el: ".swiper-pagination",
          clickable: true //点击原点可切换
        },
        //箭头实现切换效果
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      swiperList: [
        {
          id: "42",
          image: "/imgs/slider/slide-1.jpg"
        },
        {
          id: "45",
          image: "/imgs/slider/slide-2.jpg"
        },
        {
          id: "46",
          image: "/imgs/slider/slide-3.jpg"
        },
        {
          id: "",
          image: "/imgs/slider/slide-4.jpg"
        },
        {
          id: "",
          image: "/imgs/slider/slide-5.jpg"
        }
      ],
      menuList: [
        [
          {
            id: 30,
            image: "/imgs/item-box-1.png",
            name: "小米CC9"
          },
          {
            id: 31,
            image: "/imgs/item-box-2.png",
            name: "小米8青春版"
          },
          {
            id: 32,
            image: "/imgs/item-box-3.jpg",
            name: "Redmi K20 Pro"
          },
          {
            id: 33,
            image: "/imgs/item-box-4.jpg",
            name: "移动4G专区"
          }
        ],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
    
      banner: {
        id: "30",
        image: "/imgs/banner.png"
      },
      phoneList: [],
      showModal: false
    };
  },
  methods: {
    init() {
      this.axios
        .get("/products", {            
          params: {
            categoryId: "100012",
            pageSize: 14
          }
        })
        .then(res => {
          res.list = res.list.slice(6, 14);
          this.phoneList = [res.list.slice(0, 4), res.list.slice(4, 8)];
        });
    },
    addCart(id) {
      this.id = id;
      this.showModal = true;
      // if(this.$cookie.get('userId')){                //监控点
      //   this.axios
      //   .post("/carts", {
      //     productId: id,
      //     selected: true
      //   })
      //   .then((res) => {   //cartProductVoList: 0购物车默认值为0
      //     this.showModal = true;
      //     this.$store.dispatch('saveCartCount',res.cartTotalQuantity);   //实时更新购物车数量
      //   })
      //   .catch(() => {
      //     this.showModal = true;
      //   });
      // }else{
      //   this.$router.push('/login')
      // }
      
    },
    gotoCart() {
      this.$router.push("/cart");
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="scss">
@import "./../assets/scss/mixin.scss";
@import "./../assets/scss/config.scss";
.index {
  .swiper-box {
    .swiper-container {
      height: 451px;
      .swiper-button-prev {
        left: 274px;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    .nav-menu {
      position: absolute;
      z-index: 5;
      height: 451px;
      width: 264px;
      padding: 26px 0;
      box-sizing: border-box;
      background-color: $colorI;
      // background-color: #55585a91;
      .menu-wrap {
        .menu-item {
          height: 50px;
          line-height: 50px;
          position: relative;
          
          a {
            color: #ffffff;
            font-size: 16px;
            margin-left: 30px;
            display: inline-block;
            &:after {
              content: "";
              @include bgImg(10px, 15px, "/imgs/icon-arrow.png");
              position: absolute;
              top: 17.5px;
              right: 30px;
            }
          }
          &:hover {
            background-color: $colorA;
            .children {
              display: block;
            }
          }
          .children {
            display: none;
            width: 962px;
            position: absolute;
            top: -26px;
            left: 264px;
            background-color: $colorG;
            border: 1px solid $colorH;
            ul {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              height: 75px;
              li {
                height: 75px;
                line-height: 75px;
                flex: 1; //平均分布
                padding-left: 23px;
              }
              img {
                width: 42px;
                height: 35px;
                vertical-align: middle;
                margin-right: 15px;
              }
              a {
                display: inline-block;
                color: #333333;
                font-size: 14px;
              }
            }
          }
        }
      }
    }
  }
  
  .banner {
    margin-top: 20px;
    height: 170px;
    a {
      display: inline-block;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .product-box {
    width: 100%;
    background-color: #f5f5f5;
    padding-bottom: 30px;
    h2 {
      font-size: 22px;
      padding-bottom: 20px;
      padding-top: 20px;
      display: inline-block;
      color: #333333;
    }
    .wraper {
      height: 650px;
      display: flex;
      .banner {
        margin-right: 14px;
        a {
          width: 224px;
          height: 650px;
          img {
            display: inline-block;
            width: 100%;
            height: 100%;
          }
        }
      }
      .list-box {
        width: 986px;
        .list {
          @include flex();
         // width: 986px;
          margin-bottom: 14px;
          &:last-child {
            margin-bottom: 0;
          }
          .item {
            height: 330px;
            width: 236px;
            background-color: #ffffff;
            text-align: center;
            .item-img {
              img {
                width: 100%;
                height: 180px;
                display: inline-block;
              }
            }
            .item-info {
              color: #999999;
              margin-bottom: 0px;
              margin-top: 3px;
            }
            .item-price {
              cursor: pointer;
              height: 30px;
              p {
                display: inline-block;
                color: #f20a0a;
                font-size: 14px;
                font-weight: bold;
                &:after {
                  @include bgImg(20px, 30px, "/imgs/icon-cart-hover.png");
                  margin-left: 5px;
                  vertical-align: middle;
                  content: "";
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>