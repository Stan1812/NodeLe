<template>
  <div>
    <div id="header">
        <mu-paper>
            <mu-appbar title="分类">
                <mu-icon-button icon="close" @click.native="goback" slot="left" />
            </mu-appbar>
        </mu-paper>
      </div>
      <div id="tragger">
            <mu-chip v-for="(kind,index) in kinds" @click.native="getKind(index)" :key="index">
                <!-- <mu-avatar color="blue300" backgroundColor="indigo900" :size="32">MB</mu-avatar>  -->
                {{kind}}
            </mu-chip>
      </div>
      <div id="container">
          <div v-for="(article,index) in articles ">
           <mu-card>
               <mu-card-title title="Title" subTitle="subTitle"/>
                <mu-card-actions  @click.native="go(index,'/detail')" >
                    <mu-flat-button  label="全部内容"/>
                </mu-card-actions>
           </mu-card>
          </div>
      </div>
  </div>
</template>

<script>
import store from "../vuex/store.js";
export default {
  data() {
    return {
      items: [1, 2, 3, 4],
      kinds: ["JS", "Vue", "思考", "生活", "CSS", "Node.JS", "various"],
      currentKind: 0
    };
  },
  computed:{
      articles(){return this.items}
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    getKind(index = 0) {
      this.currentKind = index;
        this.$http.
          get()
            .then(response => {
              if (response.status === 1) {
                this.items = response.data;
              }
            })
            .catch(error => {
              console.log(error);
            });
      console.log(index);
    },
    go(index, gopath) {
      store.commit("getdetail", { currentId: index });
      this.$router.push({ path: gopath });
    }
  },
  mounted() {
    // this.getKind();
    // console.log(store);
  }
};
</script>

<style>
#tragger {
  border: 5px solid #ddddde;
  margin: 10px 5px 20px;
  border-radius: 15px;
}
.mu-chip {
  background-color: #b192e8 !important;
  color: aliceblue !important;
  margin: 8px;
  text-align: center;
}
.paper {
  box-sizing: border-box;
}
</style>
