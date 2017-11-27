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
        <mu-list-item title="Mike Li">
        <mu-avatar src="http://ossweb-img.qq.com/images/lol/img/champion/Caitlyn.png" slot="leftAvatar"/>
        <mu-icon value="location_on" slot="right"/>
        </mu-list-item>
    </mu-list>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      links: [1, 2, 3, 4, 5, 6]
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    }
  }
};
</script>