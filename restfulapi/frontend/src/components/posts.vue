<template>
  <div class="main">
    <div id="container">
      <div class="card" v-for="item in items">
        <mu-card>
            <mu-card-media title="Image Title" subTitle="Image Sub Title">
              <img src="http://ossweb-img.qq.com/images/lol/web201310/skin/big103000.jpg" />
            </mu-card-media>
            <mu-card-text>
                符文之地的潜在力量是她与生俱来的纽带，原始的魔法在她手中凝为魔法宝珠。瓦斯塔亚人阿狸醉心于玩弄猎物的情感，然后吞噬他们的生命精魄。虽然阿狸是天生的掠食者，但她却对猎物始终保存着一份同情，因为每吞噬一个灵魂，都伴随着他们生前的记忆。
            </mu-card-text>
            <mu-card-actions  @click.native="changeRouter('/detail')" >
              <mu-flat-button  label="全部内容"/>
            </mu-card-actions>
        </mu-card>
      </div>
      <!-- <mu-infinite-scroll :scroller  ="scroller" :loadingText="'正在加载'"	 :loading="loading" @load="loadMore"/> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [1, 2, 4, 5]
    };
  }
};
</script>

<style>

</style>
