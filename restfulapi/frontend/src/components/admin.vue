<template>
<div id="root">
  <div id="header">
    <mu-paper>
      <mu-appbar title="管理">
          <mu-icon-button icon="close" @click.native="goback" slot="left" />
      </mu-appbar>
    </mu-paper>
  </div>
  <div id="editor">
    <vue-html5-editor :content="content" @change="updateData" :height="500" :z-index="1000" :auto-height="true" :show-module-name="true"></vue-html5-editor>
    <mu-raised-button label="提交" @click.native="publish" class="demo-raised-button" primary/>
  </div>

</div>
</template>
<script>
export default {
  data() {
    return {
      content: ""
    };
  },
  methods: {
    getArticle() {
      this.$http
        .get()
        .then(response => {
          this.content = response.body;
        })
        .catch(error => {
          console.log(error);
        });
    },
    goback() {
      this.$router.go(-1);
    },
    publish() {
      console.log(this.content);
    },
    updateData() {
      console.log(this.content);
    }
  },
  mounted() {
    //
  }
};
</script>

<style>

</style>
