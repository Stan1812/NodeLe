<<template>
  <div>
    <mu-paper>
      <mu-appbar :title="artTitle">
          <mu-icon-button icon="close" @click.native="goback" slot="left" />
      </mu-appbar>
    </mu-paper>
    <mu-card>
        <mu-card-text>
          <div v-html="compiledMarkdown" ></div>
        </mu-card-text>
    </mu-card>
  <div id="comments" v-show="comments.length!==0">
     <div v-for="(comment,index) in comments">
        <mu-paper class="userComment" :zDepth="1"> 
          <mu-sub-header>{{comment.email}}</mu-sub-header>
          <mu-content-block>
            {{comment.content}}
           </mu-content-block>
        </mu-paper>
     </div > 
  </div>
  <div id="comment">
      <mu-paper class="demo-paper" :zDepth="2">
<mu-text-field label="发表你的评论" hintText="email" type="email" v-model="useremail"/><br/>
     <mu-text-field v-model="usercomment" hintText="输入你的评论" multiLine :rows="3" :rowsMax="6"/><br/>
  <mu-raised-button label="提交" @click.native="comment" class="demo-raised-button" primary/>
  </mu-paper>
   

  </div>
</div>

</template>

<script>
import store from "../vuex/store.js";
export default {
  data() {
    return {
      artTitle: "Something is wrong",
      //  when something is wrong, default content will show
      content: `# Hi boddy
--- 
### Here is forfun
*a personal blog system powered by VueJS & NodeJS*   

now just start writing and enjoy it.`,
      comments: [
        {
          email: "2314980309@qq.com",
          content: "Something is wrong . So you can see this page"
        },
        {
          email: "000001@.qqcom",
          content: "VUeJS牛逼！nodejs牛逼！"
        }
      ],
      useremail: "",
      usercomment: ""
    };
  },
  computed: {
    compiledMarkdown: function() {
      return marked(this.content, { sanitize: true });
    }
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    getComments() {
      this.$http
        .get()
        .then(response => {
          this.items = response.body;
        })
        .catch(error => {
          console.log("wrong");
        });
    },
    comment() {
      let self = this;
      let jsonData = JSON.stringify({
        useremail: self.useremail,
        usercomment: self.usercomment
      });
      console.log(jsonData);
      this.$http
        .post("/xxxxxxxxx", jsonData)
        .then(response => {
          if (response.body.status) {
            // success
            self.useremail = "";
            self.usercomment = "";
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    // this.getComments()
    console.log(store.state.currentId);
  }
};
</script>

<style>
#comment {
  text-align: center;
  margin: 20px 0;
}
.mu-raised-button {
  margin-bottom: 20px;
}
.userComment,#comment{
  margin:20px 10px;
}
</style>
