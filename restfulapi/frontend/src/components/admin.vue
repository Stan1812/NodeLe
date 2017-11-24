<template>
<div id="root">
  <div id="header">
    <mu-paper>
      <mu-appbar title="管理">
          <mu-icon-button icon="close" @click.native="goback" slot="left" />
      </mu-appbar>
    </mu-paper>
  </div>

  <div id="navg">
    <mu-tabs :value="activeTab" @change="handleTabChange">
      <mu-tab value="newart" title="新文章"/>
      <mu-tab value="artlist" title="文章列表"/>
    </mu-tabs>
  </div>

  <div id="newpost" v-show="activeTab==='newart'">
      <div id="baseinfo">
        <mu-text-field v-model="artTitle" hintText="文章名" /><br/>
        <mu-text-field v-model="artList" hintText="简单的描述:sub-title" multiLine :rows="1" :rowsMax="6"/><br/>
      </div> 
      <div  id="editor">
        <textarea :value="input" @input="update"></textarea>	
        <div v-html="compiledMarkdown" id="reviewer"></div>
      </div>
      <div id="commit">
          <mu-raised-button label="Primary" class="demo-raised-button" primary/>
      </div>
  </div>

  <div id="postlist" v-show="activeTab==='artlist'">
    this is post
  </div>


</div>
</template>
<script>
export default {
  data() {
    return {
      content: "",
      input: "# hello",
      activeTab: "newart",
      artList: "",
      artTitle: ""
    };
  },
  computed: {
    compiledMarkdown: function() {
      return marked(this.input, { sanitize: true });
    }
  },
  methods: {
    update: _.debounce(function(e) {
      this.input = e.target.value;
    }, 300),
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
      console.log(this.input);
    },
    updateData() {
      console.log(this.content);
    },
    handleTabChange(val) {
      this.activeTab = val;
    }
    // handleActive () {
    //   window.alert('tab active')
    // }
  },
  mounted() {
    //
  }
};
</script>

<style>
html,
body,
#editor {
  margin: 0;
  font-family: "Helvetica Neue", Arial, sans-serif;
  color: #333;
}
textarea,
#editor div {
  display: inline-block;
  width: 49%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 10px;
  text-align: left;
}

textarea,
#reviewer {
  height: 100vh;
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: "Monaco", courier, monospace;
  padding: 20px;
  overflow-y: scroll;
  overflow-x: hidden;
}

code {
  color: #42b983;
}
#baseinfo,
#commit {
  margin: 10px;
  text-align: center;
}
</style>
