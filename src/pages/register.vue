<template>
  <div class="register">
      <div class="register-form">
        <div class="tags"></div>
        <div class="title">注册账号</div>
        <div class="input">
          <input type="text" v-model="username" placeholder="请输入用户名" autocomplete="on" />
        </div>
        <div class="input">
          <input type="password" v-model="password" placeholder="请输入密码" autocomplete="on" />
        </div>
        <div class="input">
          <input type="text" v-model="email" placeholder="请输入邮箱" autocomplete="on" />
        </div>
        <div class="btn-box">
          <div class="btn">
            <a href="javascript:;" @click="register">立即注册</a>
          </div>
        </div>
        <div class="foot">
          已阅读并同意：mall
          <span>用户协议</span>和
          <span>隐私政策</span>
        </div>
      </div>
  </div>
</template>
<script>

export default {
  name: "register",
  data() {
    return {
      username: "",
      password: "",
      email: ""
    };
  },
  components: {
  },
  methods: {
    register() {
      let { username, password, email } = this;
      let reg =  /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (!reg.test(email)) {
        alert("邮箱格式不正确");
        return;
      }
      this.axios
        .post("/user/register", {
          username,
          password,
          email
        })
        .then(() => {
          alert("注册成功");          
          this.$router.push("/login");
        });
    }
  }
};
</script>
<style lang="scss">

  .register-form {
    position: fixed;
    background-color: #ffffff;
    top: 35%;
    left: 50%;
    width: 860px;
    height: auto;
    transform: translate(-50%, -50%);
    text-align: center;
    .tags {
      width: 50px;
      height: 50px;
      background: url("/imgs/logo-mi.png") no-repeat center;
      background-size: contain;
      margin: 0 auto;
      margin-bottom: 20px;
    }
    .title {
      font-size: 26px;
      font-weight: 500;
      margin-bottom: 20px;
    }
    .input {
      input {
        width: 350px;
        padding: 18px;
        margin-bottom: 20px;
        background-color: #e8f0fe;
        border: none;
      }
    }
    .btn-box {
      .btn {
        width: 350px;
        height: 50px;
        a {
          font-size: 16px;
          color:white;
          line-height: 50px;
          width: 100%;
          display: inline-block;
        }
        margin-bottom: 30px;
      }
    }
    .foot {
      font-size: 16px;
      margin-bottom: 20px;
      span {
        color: #ff6600;
      }
    }
  }

</style>