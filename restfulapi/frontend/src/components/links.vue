<template>
<div>
  <div id="header">
    <mu-paper>
      <mu-appbar title="友情链接">
          <mu-icon-button icon="close" @click.native="goback" slot="left" />
      </mu-appbar>
    </mu-paper>
  </div>
  <div id="linkList">
    <mu-list v-for="(link ,index) in links" :key="index">
        <!-- <mu-sub-header>someone
        </mu-sub-header> -->
        <a :href="link.href"><mu-list-item :title="link.name">
        <mu-avatar :src="link.avatar" slot="leftAvatar"/>
        <mu-icon value="location_on" slot="right"/>
        </mu-list-item>
        </a>
    </mu-list>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      // 这个界面准备写成静态的了
      links: [
        {
          name: "stan",
          href: "https://github.com/Stan1812",
          avatar: "https://avatars2.githubusercontent.com/u/24350397?s=460&v=4"
        },
        {
          name: "女警",
          href: "http://lol.qq.com/web201310/info-defail.shtml?id=Caitlyn",
          avatar: "http://ossweb-img.qq.com/images/lol/img/champion/Caitlyn.png"
        },
        {
          name:"维恩",
          href:"http://lol.qq.com/web201310/info-defail.shtml?id=Vayne",
          avatar:"http://ossweb-img.qq.com/images/lol/img/champion/Vayne.png"
        },{
          name:"艾希",
          href:"http://lol.qq.com/web201310/info-defail.shtml?id=Ashe",
          avatar:"http://ossweb-img.qq.com/images/lol/img/champion/Ashe.png"
        }
      ]
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    }
  }
};
</script>