<template>
  <div class="login">
    <div class="logo">
      <img src="../assets/logo.jpg" alt="">
    </div>
    <!-- 手机号 -->
    <InputGroup 
      type="number"
      v-model="phone"
      placeholder="请输入手机号"
      :disabled="disabled"
      :btnTitle="btnTitle"
      :error="errors.phone"
      @btnClick="getVerifyCode"
      />
      <!-- 验证码 -->
    <InputGroup 
      type="number"
      v-model="verifyCode"
      placeholder="请输入验证码"
      :error="errors.code"
      />
      <!-- 用户服务协议 -->
    <div class="login_des">
      <p>
        新用户登录即自动注册，表示已同意
        <span>《用户服务协议》</span>
      </p>
    </div>
    <button :disabled="isClick" class="btnDl" @click="btnDl">登陆</button>
  </div>
</template>

<script>
import InputGroup from '../components/InputGroup'
export default {
  data() {
    return {
      phone: "",
      disabled: false,
      btnTitle: "获取验证码",
      errors: {},
      verifyCode:""
    }
  },
  computed: {
    isClick() {
      if(!this.phone || !this.verifyCode) return true
      else return false
    }
  },
  methods: {
    getVerifyCode () {
      if(this.validatePhone()){
        this.validateBtn()
        this.$axios
          .post("/api/posts/sms_send",{
            tpl_id: "190050",
            key: "85973fd8037a19ec678fcc5c54162354",
            phone: this.phone
          })
          .then(res => {
            console.log(res)
          })
      }
    },
    // 判断手机是否正确
    validatePhone() {
      if (!this.phone) {
        this.errors = {
          phone: "手机号不能为空"
        }
        return false
      }else if(!/^1[345678]\d{9}$/.test(this.phone)){
        this.errors = {
          phone: "请输入正确格式"
        }
        return false
      }else {
        this.errors = {}
        return true
      }
    },
    // 验证倒计时
    validateBtn() {
      let item = 60;
      let items = setInterval (() => {
        if (item == 0) {
          clearInterval(items);
          this.disabled = false
          this.btnTitle = "获取验证码"
        } else {
          item -- 
          this.disabled = true
          this.btnTitle = item + "秒后重试"
        }
      },1000)
    },
    // 登陆
    btnDl () {
      this.error = {};
      this.$axios
        .post("/api/posts/sms_back", {
          phone: this.phone,
          code: this.verifyCode
        })
        .then(res => {
          localStorage.setItem("ele_login",true)
          this.$router.push("/");
        })
        .catch(err => {
          this.errors = {
            code: err.response.data.msg
          }
        })
    },

  },
  components:{
    InputGroup
  },
}
</script>

<style>
.login {
    width: 100%;
    height: 100%;
    padding: 40px;
    background: #fff;
    box-sizing: border-box;
}
.logo {
  text-align: center;
}
.logo img{
  width: 150px;
}
.login_des {
  margin-top: 30px;
  font-size: 16px;
  color: #666;
  line-height: 30px;
}
.login_des span {
  color: #4d90fe;
}
.btnDl {
  width: 100%;
  height: 40px;
  text-align: center; 
  margin-top: 20px;
  background-color: #48ca38;
  border-radius: 4px;
  border: none;
  outline: none;
  color: #fff;
}
.btnDl[disabled] {
  background-color: #8bda81;
}
</style>