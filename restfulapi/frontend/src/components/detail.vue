<<template>
  <div>
    <mu-paper>
      <mu-appbar title="Content Title">
          <mu-icon-button icon="close" @click.native="goback" slot="left" />
      </mu-appbar>
    </mu-paper>
    <mu-card>

        <mu-card-title title="Content Title" subTitle="Content Title"/>
        <mu-card-text>


        </mu-card-text>
 
    </mu-card>
  <div id="comments">
     <div v-for="(comment,index) in comments">
        <mu-paper class="demo-paper" :zDepth="1"> 
          <mu-sub-header>title</mu-sub-header>
          <mu-content-block>
              这件错事折磨着阿狸，她无法原谅自己，一种深深的悲伤让她怀疑自己的本质。她躲进了森林中的洞穴，与世隔绝，希望能够控制自己残忍的欲望。几年以后，她再次现身于世，现在的她决心只靠自己的双眼去体验生命的每一种滋味。虽
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
export default {
  data() {
    return {
      comments: [1, 2, 3, 4, 5],
      useremail: "",
      usercomment: ""
    };
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
          console.log("wrong");
        });
    }
  },
  mounted() {
    // this.getComments()
  }
};
</script>

<style>
#comment {
  text-align: center;
}
</style>
