<template>
<div>
  <messagebox v-show="sendMes" :message="mesContent"></messagebox>

  <mu-paper>
    <mu-appbar :title="title">
        <mu-icon-button icon="close" @click.native="goback" slot="left" />
    </mu-appbar>
</mu-paper>
    <div id="login" v-show="islogin">
        <mu-text-field label="用户名" v-model="username" hintText="username"/><br/>
       <mu-text-field label="密码" v-model="password" hintText="请输入密码" type="password" labelFloat/><br/>
    </div>
    <div id="refound" v-show="!islogin">
       <mu-text-field label="用户名" v-model="username" hintText="username"/><br/>
       <mu-text-field label="注册邮箱" v-model="email" hintText="请输入注册邮箱" type="email" labelFloat/><br/>
    </div>  
    <div id="control">
      <mu-raised-button v-show="islogin" label="登录" @click.native="login" class="demo-raised-button" primary/>
    <mu-raised-button label="找回密码" @click.native="forgetPasswd" class="demo-raised-button" primary/>
    </div>
</div>
</template>

<script>
import messagebox from "./message";
const sendMessage = messagebox.methods.sendMessage;
export default {
  data() {
    return {
      username: "",
      password: "",
      email: "",
      islogin: true,
      title: "登录",
      mesContent: "",
      sendMes: false
    };
  },
  components: {
    messagebox: messagebox
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    login() {
      this.islogin = true;
      this.title = "登录";
      // this.$http
      //   .get()
      //   .then(res => {
      //     console.log(res);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
      sendMessage(this, "登录成功");
    },
    forgetPasswd() {
      this.islogin = false;
      this.title = "找回密码";
      // this.$http
      //   .get()
      //   .then()
      //   .catch();
    }
  }
};
</script>
<style>
#login,
#refound,
#control {
  border: 2px;
  padding: 30px;
  text-align: center;
}
.mu-text-field {
  margin: 20px;
}
.mu-raised-button {
  margin: 10px;
}
</style>
