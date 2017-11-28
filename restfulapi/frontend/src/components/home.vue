<template>
<div>
  <mu-paper>
    <mu-appbar v-show="bottomNav!=='about'" title="myblog">
        <mu-icon-button icon="menu" slot="left" @click="toggle(true)"/>
        <mu-icon-button icon="mudocs-icon-custom-github" slot="right"/>
    </mu-appbar>
    <mu-bottom-nav :value="bottomNav" @change="handleChange">
        <mu-bottom-nav-item value="articles" title="文章" icon="restore"/>
        <mu-bottom-nav-item value="favorites" title="Favorite" icon="favorite"/>
        <mu-bottom-nav-item value="about" title="关于" icon="location_on"/>
    </mu-bottom-nav>
  </mu-paper>
  <div class="main">
    <favorites v-if="bottomNav==='favorites'"> </favorites>
    <aboutme v-if="bottomNav==='about'"></aboutme>
    <div  v-if="bottomNav==='articles'" id="container">
      <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
      <div class="card" v-for="(item,index) in items"  :key="index">
      <mu-card>
          <mu-card-media title="Image Title" subTitle="Image Sub Title">
            <img src="http://ossweb-img.qq.com/images/lol/web201310/skin/big103000.jpg" />
          </mu-card-media>
          <mu-card-text>
              符文之地的潜在力量是她与生俱来的纽带，原始的魔法在她手中凝为魔法宝珠。瓦斯塔亚人阿狸醉心于玩弄猎物的情感，然后吞噬他们的生命精魄。虽然阿狸是天生的掠食者，但她却对猎物始终保存着一份同情，因为每吞噬一个灵魂，都伴随着他们生前的记忆。
          </mu-card-text>
          <mu-card-actions  @click.native="godetail(index)" >
            <mu-flat-button  label="全部内容"/>
          </mu-card-actions>
      </mu-card>
    </div>
    <mu-infinite-scroll :scroller="scroller" :loadingText="'正在加载'"	 :loading="loading" @load="loadMore"/>
  </div>
</div>
    <div>
        <!-- <mu-raised-button label="toggle drawer" /> -->
      <mu-drawer :open="open" :docked="docked" @close="toggle()">
          <mu-appbar title="myblog">
            <mu-icon-button icon="mudocs-icon-custom-github" slot="right"/>
          </mu-appbar>
        <mu-list @itemClick="docked ? '' : toggle()">
          <mu-paper style="display: inline-block; width: 256px;">
            <mu-menu>
              <mu-menu-item title="Get Links" @click.native="changeRouter('/links')" leftIcon="link"/>
              <mu-divider />
              <mu-menu-item title="登录" @click.native="changeRouter('/login')" leftIcon="person_add"/>
              <!-- 测试用 -->
              <!-- <mu-menu-item title="管理" @click.native="changeRouter('/admin')" leftIcon="settings"/> -->
              <mu-menu-item title="归档"  @click.native="changeRouter('/timeline')" leftIcon="¶"/>
              <mu-menu-item title="分类" @click.native="changeRouter('/classify')"  leftIcon="§"/>
            </mu-menu>
          </mu-paper>
        </mu-list>
      </mu-drawer>
    </div>
</div>
</template>

<script>
import favorites from "../components/favorites.vue";
import aboutme from "../components/aboutme.vue";
import store from '../vuex/store.js'
export default {
  data() {
    return {
      bottomNav: "articles",
      open: false,
      docked: true,
      items: [1, 2, 4, 5],
      total: 50,
      current: 1,
      loading: false,
      scroller: null,
      refreshing: false,
      trigger: null,
      num: 4
    };
  },
  components: {
    favorites: favorites,
    aboutme: aboutme,
  },
  methods: {
    handleChange(val) {
      this.bottomNav = val;
    },

    toggle(flag) {
      this.open = !this.open;
      this.docked = !flag;
    },
    handleClick(newIndex) {},
    changeRouter(gopath) {
      this.$router.push({ path: gopath });
    },
    godetail(index){
      store.commit('getdetail',{currentId:index})
      console.log(index)
      this.changeRouter('/detail')
    },
    loadMore() {
      this.loading = true;
      console.log("fuck again");
      setTimeout(() => {
        let num = this.items.length;
        for (let i = num; i < num + 5; i++) {
          this.items.push(i);
        }
        num += 5;
        this.loading = false;
      }, 2000);
    },
    refresh() {
      console.log("fuck");
      this.refreshing = true;
      setTimeout(() => {
        let items = [];
        let num = 0;
        for (let i = num; i < num + 5; i++) {
          items.push(i);
        }
        this.items = items;
        num += 5;
        this.refreshing = false;
      }, 1000);
    }
  },
  mounted() {
    this.scroller = this.$el;
    this.trigger = this.$el;
  }
};
</script>
<style>
.mu-bottom-nav {
  z-index: 10;
  position: fixed;
  bottom: 0;
}
.container {
  position: relative;
}
.card {
  margin: 20px 25px;
}
.main {
  z-index: -1;
  padding-bottom: 56px;
}
.pagination {
  text-align: center;
}
</style>
