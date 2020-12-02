<template>
  <button @click="setLogin">{{ loginDesc }}</button>
</template>
<script>
import cookie from "../utils/cookie";
export default {
  data() {
    return {
      //登入状态
      login: cookie.isLogin(),
    };
  },
  methods: {
    setLogin() {
      //根据登入状态，进入不同条件
      if (this.login) {
        //可取消登入
        cookie.cancelLogin();
      } else {
        //可登入
        cookie.login();
        this.goBack();
      }
      //登入状态改变
      this.login = !this.login;
    },
    goBack() {
      const isBack = window.confirm("登入成功，需要跳回之前的页面吗？");
      if (isBack) {
        //调回
        this.$router.go(-1);
      }
    },
  },
  computed: {
    loginDesc() {
      return this.login == false ? "登入" : "取消登入";
    },
  },
};
</script>