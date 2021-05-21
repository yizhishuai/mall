<template>
  <div class="manage-header">
    <div class="container clearfix">
      <div class="logo fl">
        <a href="/#/index"></a>
      </div>
      <div class="title">
        <h2 class="fl">{{title}}<slot name="tips"></slot>
        </h2>
      </div>
      <div class="username fr">
        <a href="javascript:;">{{username}}</a>
        <a href="javascript:;" v-if="username" @click="offlogin">退出</a>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: "manage-header",
    props: {
      title: String
    },
    computed: {
      ...mapState(['username'])
    },
    methods:{
         offlogin() {
        //退出登陆时把名字和购物车数量设为空，弹出退出信息，userid失效
        this.axios.post("/user/logout").then(() => {
          alert('退出成功');
          this.$cookie.set('userId', '', { expires: '-1' });  //关闭的窗口的时候userid失效
          this.$store.dispatch('saveUserName', '');
          this.$store.dispatch('saveCartCount', '0');
          this.$router.push("/login")
        })
      },
    }
  };
</script>
<style lang="scss">
  @import "./../assets/scss/mixin.scss";
  @import "./../assets/scss/config.scss";

  .manage-header {
    padding: 30px 0;
    border-bottom: 2px solid $colorA;
    background-color: #ffffff;
    .logo {
      width: 55px;
      height: 55px;
      display: inline-block;
      background-color: $colorA;

      a {
        display: inline-block;
        width: 110px;
        height: 55px;
        @include bgImg(55px, 55px, "/imgs/mall-logo.png");
        
      }
    }

    .title {
      h2 {
        font-size: 28px;
        color: #333333;
        margin-left: 55px;
        line-height: 55px;
      }

      span {
        font-size: 14px;
        margin-left: 17px;
        color: #999999;
        line-height: 55px;
        font-weight: 200;
      }
    }

    .username {
      a {
        font-size: 16px;
        color: #666666;
        display: inline-block;
        padding-right: 10px;
      }
      line-height: 55px;
      
    }
  }
</style>