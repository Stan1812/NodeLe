<template>
<div>
<mu-paper>
    <mu-appbar title="myblog">
        <mu-icon-button icon="menu" slot="left" @click="toggle(true)"/>
        <mu-icon-button icon="mudocs-icon-custom-github" slot="right"/>
    </mu-appbar>
    <mu-bottom-nav :value="bottomNav" @change="handleChange">
        <mu-bottom-nav-item value="recents" title="文章" icon="restore"/>
        <mu-bottom-nav-item value="favorites" title="Favorite" icon="favorite"/>
        <mu-bottom-nav-item value="nearby" title="关于" icon="location_on"/>
    </mu-bottom-nav>
</mu-paper>
<div class="main">
<div class="card" v-for="item in items">
  <mu-card>
  <mu-card-media title="Image Title" subTitle="Image Sub Title">
    <img src="http://ossweb-img.qq.com/images/lol/web201310/skin/big103000.jpg" />
  </mu-card-media>
  <mu-card-text>
   符文之地的潜在力量是她与生俱来的纽带，原始的魔法在她手中凝为魔法宝珠。瓦斯塔亚人阿狸醉心于玩弄猎物的情感，然后吞噬他们的生命精魄。虽然阿狸是天生的掠食者，但她却对猎物始终保存着一份同情，因为每吞噬一个灵魂，都伴随着他们生前的记忆。
  </mu-card-text>
  <mu-card-actions>
    <mu-flat-button label="全部内容"/>
  </mu-card-actions>
</mu-card>
</div>
 <mu-pagination :total="total" :current="current" @pageChange="handleClick">
  </mu-pagination>
    <!-- <mu-back-top bottom="100"/> -->
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
      <mu-menu-item title="Preview" leftIcon="remove_red_eye"/>
      <mu-menu-item title="Get Links" leftIcon="link"/>
      <mu-divider />
      <mu-menu-item title="登录" @click.native="changeRouter("/login")" leftIcon="person_add"></mu-menu-item>
      <mu-menu-item title="管理"  leftIcon="settings"/>
      <mu-menu-item title="归档" leftIcon="¶"/>
      <mu-menu-item title="分类" leftIcon="§"/>
    </mu-menu>
  </mu-paper>
      </mu-list>
    </mu-drawer>
</div>


</div>
</template>

<script>
export default {
  data() {
    return {
      bottomNav: "recents",
      open: false,
      docked: true,
      items: [1, 2, 4, 5],
      total: 50,
      current: 1
    };
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
    }
  }
};
</script>
<style>
.mu-bottom-nav {
  z-index: 10;
  position: fixed;
  bottom: 0;
}

.card {
  margin: 10px;
}
.main {
  z-index: -1;
  padding-bottom: 56px;
}
.pagination {
  text-align: center;
}
</style>
