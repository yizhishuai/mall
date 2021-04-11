<template>
  <div class="productparams">
    <div class="nav-topbar" >
      <div class="container">
        <div class="title">{{title}}</div>
        <div class="params">
          <a href="javascript:;">概述</a>
          <span>|</span>
          <a href="javascript:;">参数</a>
          <span>|</span>
          <a href="javascript:;">用户评价</a>
          <slot name="buy"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "product",
  components: {},
  props:{
    title: String
  },
  data() {
    return {
      isFixed: false
    };
  },
  mounted() { 
  },
  methods: {
  },
  destroyed() {
  }
};
</script>
 
<style lang="scss">
@import "./../assets/scss/config.scss";
.productparams {
  .nav-topbar {
    border-top: 1px solid #e5e5e5;
    background-color: #ffffff;
    height: 71px;
    line-height: 71px;
    z-index: 10;
    .container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .title {
        font-size: 20px;
        font-weight: bold;
      }
      .params {
        font-size: 14px;
        a {
          color: #666666;
          margin-right: 10px;
        }
        span {
          margin-right: 10px;
          &:last-child:margin-right {
            display: none;
          }
        }
      }
    }
  }
}
</style>