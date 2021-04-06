<template>
  <div class="footer">
    <div class="foot-logo">
      <img src="/imgs/mall-logo.png" alt />
      <p>数码商城</p>
    </div>
    <div class="foot-link">
      <a href="" target="_blank">主页</a>
      <a href="" target="_blank">联系我们</a>
      <a href="" target="_blank">关于我们</a>
    </div>
    <div class="Copyright">
        Copyright ©2020 
      <span>yizhishuai</span>
       <a href="">渝ICP备xxxxxx号</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "nav-footer"
};
</script>

<style lang="scss">
@import "./../assets/scss/config.scss";
.footer {
  height: 180px;
  background-color: $colorB;
  color: #b0b0b0;
  position: absolute;
  border-top: 3px solid $colorA;
  width: 100%;
  text-align: center;
  font-size: 16px;
  .foot-logo{
      margin-top: 10px;
      
      img{
          width: 53px;
          height: 36px;
          margin-bottom: 10px;
      }
      p{
          margin-bottom: 20px;
      }
  }
  .foot-link {
    a {
      color: #b0b0b0;
      margin-right: 20px;
      display: inline-block;
      height: 16px;
      line-height: 16px;
      position: relative;
      &:after {
        content: '';
        position: absolute;
        top: 1px;
        margin-left: 10px;
        border-right: 1px solid #b0b0b0;
        height: 15px;
    }
    &:last-child:after{
        display: none;
    }
    }
    margin-bottom: 10px;
  }
  .Copyright{
      span{
          color: $colorA;
      }
      a{
        color: #b0b0b0;
        font-size: 16px;
        margin-left: 5px;
      }
  }
}
</style>