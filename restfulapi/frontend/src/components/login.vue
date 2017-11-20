<template>
<div>
  <mu-paper>
    <mu-appbar title="登录">
        <mu-icon-button icon="close" @click.native="goback" slot="left" />
    </mu-appbar>
</mu-paper>
    <div id="login">
        <mu-text-field label="用户名" v-model="username" hintText="username"/><br/>
       <mu-text-field label="密码" v-model="password" hintText="请输入密码" type="password" labelFloat/><br/>
  <mu-raised-button label="登录" class="demo-raised-button" primary/>
    <mu-raised-button label="忘记密码" class="demo-raised-button" primary/>

    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      username:'',
      password:''
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    }
  }
};
</script>
<style>
#login {
  border: 2px;
  padding: 30px;
  text-align: center;
}
.mu-text-field{
  margin: 20px;
}
.mu-raised-button{
  margin: 10px;
}
</style>
