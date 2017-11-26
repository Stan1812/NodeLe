<template>
<div id="root">
  <messagebox v-show="sendMes" :message="mesContent"></messagebox>
  <div id="header">
    <mu-paper>
      <mu-appbar title="管理">
          <mu-icon-button icon="close" @click.native="goback" slot="left" />
      </mu-appbar>
    </mu-paper>
  </div>

  <div id="navg">
    <mu-tabs :value="activeTab" @change="handleTabChange">
      <mu-tab value="newart" title="编辑"/>
      <mu-tab value="artlist" title="文章列表"/>
    </mu-tabs>
  </div>

  <div id="newpost" v-show="activeTab==='newart'">

      <div id="baseinfo" v-show="isNew">
        <mu-text-field v-model="artTitle" hintText="文章名" /><br/>
        <mu-text-field v-model="artDes" hintText="简单的描述:sub-title" multiLine :rows="1" :rowsMax="6"/><br/>
      </div> 
      <div  id="editor">
        <textarea :value="input" @input="update"></textarea>	
        <div v-html="compiledMarkdown" id="reviewer"></div>
      </div>
      <div id="commit">
          <mu-raised-button v-show="isNew===true" label="发表" @click.native="artPublish" class="demo-raised-button" primary/>          
          <mu-raised-button v-show="isNew===false" label="更新" @click.native="artUpdate" class="demo-raised-button" primary/>
      </div>
  </div>

  <div id="postlist" v-show="activeTab==='artlist'">
    <div class="main">
      <div id="container">
        <transition-group name="list">
        <div class=" list-item" v-for="(art,index) in artList"  v-bind:key="art">
          <mu-card >
              <mu-card-media title="Image Title" subTitle="Image Sub Title">
                <img src="http://ossweb-img.qq.com/images/lol/web201310/skin/big103000.jpg" />
             </mu-card-media>
              <mu-card-text>
                  符文之地的潜在力量是她与生俱来的纽带，原始的魔法在她手中凝为魔法宝珠。瓦斯塔亚人阿狸醉心于玩弄猎物的情感，然后吞噬他们的生命精魄。虽然阿狸是天生的掠食者，但她却对猎物始终保存着一份同情，因为每吞噬一个灵魂，都伴随着他们生前的记忆。
              </mu-card-text>
              <div id="control"> 
                <mu-raised-button label="编辑" @click.native="readyUpdate(index)" class="demo-raised-button" primary/>
                <mu-raised-button label="删除" @click.native="readyDelete(index)" class="demo-raised-button" primary/>
              </div> 
          </mu-card>
           </div>
        </transition-group>
      <!-- <mu-infinite-scroll :scroller="scroller" :loadingText="'正在加载'"	 :loading="loading" @load="loadMore"/> -->
      </div>
    </div>
  </div>


</div>
</template>
<script>
import posts from "./posts";
import messagebox from "./message";
const sendMessage = messagebox.methods.sendMessage;
const log = console.log;
export default {
  data() {
    return {
      content: "",
      input: "# hello",
      activeTab: "newart",
      artDes: "",
      artTitle: "",
      artList: [1, 2, 3, 4],
      isNew: true,
      currentArt: 1,
      mesContent: "",
      sendMes: false
    };
  },
  components: {
    messagebox: messagebox
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
          log(error);
        });
    },
    readyUpdate(index) {
      log(index);
            // sendMessage(this,"hhhhhh")
      this.activeTab = "newart";
      this.isNew = false;
      this.$http
        .get()
        .then(response => {
          log(response);
          if (!!response.status) {
            this.input = response.data;
          }
        })
        .catch(err => {
          log(err);
        });
      this.input = "responsedata";
    },
    readyDelete(index) {
      log(index);
      // this.currentArt=item[index].id
      this.$http
        .post()
        .then(response => {
          if (response.status === 1) {
            log("delete success");
            this.artList.splice(index, 1);
          }
        })
        .catch(error => {
          log(error);
        });
    },
    goback() {
      this.$router.go(-1);
    },
    artPublish() {
      let postData = {
        title: this.artTitle,
        des: this.artDes,
        content: this.input
      };
      log(postData);
      this.$http
        .put(url, { data: postData })
        .then(response => {
          if (response.status === 1) {
            log("发表成功");
          }
        })
        .catch(error => {
          log(error);
        });
      log(this.input);
    },
    artUpdate() {
      var self=this
      let postData = {
        id: this.currentArt,
        content: this.input
      };
      log(postData);
      this.$http
        .put(url, { data: postData })
        .then(response => {
          if (response.status === 1) {
            sendMessage(self,"更新成功");
            this.isNew = false;
          }
        })
        .catch(error => {
          log(error);
        });
      this.isNew = false;
    },
    handleTabChange(val) {
      this.activeTab = val;
    }
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
#control {
  text-align: center;
  padding: 10px;
  display: flex;
  justify-content: space-around;
}
.mu-card {
  margin: 10px;
}
.list-item {
  transition: all 1s;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateX(66px);
}
</style>
