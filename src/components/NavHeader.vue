<template>
 <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="top-menu">
          <a href="javascript:;">商城</a>
          <a href="javascript:;">联系我们</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <div class="top-user">
          <a href="javascript:;" v-if="username">{{username}}</a>
          <a href="javascript:;" v-if="!username" @click="login">登录</a>
          <a href="javascript:;" @click="register">注册</a>
          <a href="javascript:;" v-if="username" @click="goOrderList">我的订单</a>
          <a href="javascript:;" v-if="username" @click="offlogin">退出</a>
          <a href="javascript:;" class="my-cart" @click="goToCart">
            <span class="icon-cart"></span>
            购物车({{cartcount}})
          </a>
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="header-logo">
          <a href="/#/index"></a>
        </div>
        <div class="header-menu">
          <div class="item-menu">
            <span>热门手机</span>
            <div class="children">
              <ul>
                <li class="product" v-for="(item,index) in phoneList" :key="index">
                  <a :href="'/#/product/' + item.id" target="_blank">
                    <div class="product-img">
                      <img :src="item.mainImage" :alt="item.subtitle" />
                    </div>
                    <div class="product-name">{{item.name}}</div>
                    <div class="product-price">{{item.price | currency}}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>热门平板电脑</span>
            <div class="children">
              <ul>
                <li class="product" v-for="(item,index) in padList" :key="index">
                  <a :href="'/#/product' + item.id" target="_blank">
                    <div class="product-img">
                      <img :src="item.mainImage" :alt="item.subtitle" />
                    </div>
                    <div class="product-name">{{item.name}}</div>
                    <div class="product-price">{{item.price | currency}}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="header-search">
          <input type="text" name="keyword" />
          <a href="javascript:;"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: "nav-header",
    data() {
      return {
        phoneList: [],
        padList: []
      };
    },
    computed: {
       ...mapState(['username', 'cartcount'])
    },
    //局部过滤器
    filters: {
      currency(val) {
        if (!val) {
          return "0.00";
        }
        //val.toFixed(2)后面加两个小数点
        return "￥" + val.toFixed(2) + "元";
      }
    },
    mounted() {
      this.getProductList();
      let params = this.$route.params
      //只有从登陆页面跳转过来的时候才会获取购物车数量
      if (params && params.from == 'login') {
        this.getCartCount();
      }
      
    },
    methods: {
      getProductList() {
        this.axios
          .get("/products", {
            
          })
          .then(res => {
            console.log(res.list)
            if (res.list.length > 4) {
              this.phoneList = res.list.slice(0, 6);
              this.padList = res.list.slice(2, 8);
            }
          });
      },
      goToCart() {
        //路由跳转
        this.$router.push("/cart");
      },
      login() {
        this.$router.push("/login");
      },
      register(){
        this.$router.push("/register");
      },
      getCartCount() {
        this.axios.get('/carts/products/sum').then((res = 0) => {
          //to-do 保存到vuex中
          this.$store.dispatch('saveCartCount', res)
        })
      },
      offlogin() {
        //退出登陆时把名字和购物车数量设为空，弹出退出信息，userid失效
        this.axios.post("/user/logout").then(() => {
          alert('退出成功');
          this.$cookie.set('userId', '', { expires: '-1' });  //关闭的窗口的时候userid失效
          this.$store.dispatch('saveUserName', '');
          this.$store.dispatch('saveCartCount', '0');
        })
        
        
      },
      goOrderList(){
        this.$router.push('/order/list')
      }
    }
  };
</script>

<style lang="scss">
  @import "./../assets/scss/base.scss";
  @import "./../assets/scss/mixin.scss";
  @import "./../assets/scss/config.scss";

  .header {
    
    .nav-topbar {
      height: 39px;
      line-height: 39px;
      background-color: #333333;
      color: #b0b0b0;

      .container {
        @include flex();

        a {
          display: inline-block;
          color: #b0b0b0;
          margin-right: 17px;

          &:hover {
            color: #ffffff;
          }
        }

        .my-cart {
          width: 110px;
          text-align: center;
          background-color: $colorA;
          color: #ffffff;
          margin-right: 0px;

          .icon-cart {
            @include bgImg(16px, 12px, "/imgs/icon-cart-checked.png");
            margin-right: 4px;
          }
        }
      }
    }

    .nav-header {
      .container {
        height: 112px;
        @include flex();
        position: relative;

        .header-logo {
          display: inline-block;
          width: 90px;
          height: 90px;
          background-color: $colorA;

          a {
            display: inline-block;
            width: 110px;
            height: 100px;

          
              content: " "; //给图片留白,一定要留白占位置
              @include bgImg(90px, 90px, "/imgs/mall-logo.png");
             
          
            
           
            
          }
        }

        .header-menu {
          display: inline-block;
          padding-left: 209px;
          width: 643px;

          .item-menu {
            display: inline-block;
            line-height: 112px;
            margin-right: 15px;
            color: #333333;
            font-size: 16px;
            font-weight: bold; //加粗字体

            span {
              cursor: pointer; //鼠标放上去就会出现一个小手
            }

            &:hover {
              color: $colorA;

              .children {
                height: 220px;
                opacity: 1;
              }
            }

            .children {
              position: absolute;
              top: 112px;
              left: 0px;
              width: 1226px;
              border-top: 1px solid #e5e5e5;
              box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
              z-index: 10;
              height: 0;
              opacity: 0; //透明度为0
              overflow: hidden; //内容会被修剪，并且其余内容是不可见的。
              transition: all 0.5s;
              background-color: #ffffff;

              .product {
                float: left;
                height: 220px;
                width: 16.6%;
                font-size: 12px;
                line-height: 12px;
                text-align: center;
                position: relative;

                a {
                  display: inline-block;
                }

                img {
                  width: auto;
                  height: 111px;
                  margin-top: 26px;
                }

                .product-img {
                  height: 137px;
                }

                .product-name {
                  font-weight: bold; //字体加粗
                  margin-top: 19px;
                  margin-bottom: 8px;
                  color: $colorB;
                }

                .product-price {
                  color: $colorA;
                }

                &:before {
                  content: " ";
                  position: absolute;
                  top: 28px;
                  right: 0px;
                  border-right: 1px solid $colorF;
                  height: 100px;
                  width: 1px;
                }

                &:last-child::before {
                  display: none; //最后一个before元素不显示
                }
              }
            }
          }
        }

        .header-search {
          width: 319px;
          display: flex;
          flex-direction: row;
          align-items: center;
          height: 50px;
          border: 1px solid #e0e0e0;

          input {
            box-sizing: border-box; //设置内边距包括在总宽度
            width: 264px;
            height: 50px;
            border: none;
            border-right: 1px solid #e0e0e0;
            padding-left: 14px;
          }

          a {
            @include bgImg(18px, 18px, "/imgs/icon-search.png");
            margin-left: 17px;
          }
        }
      }
    }
  }
</style>
