<template>
<div id="wrapper">
    <div id="title">我也不知道这个页面要放些什么</div>
    <!-- <div v-html="compiledMarkdown" id="reviewer"></div> -->
</div>
</template>

<script>
export default {
  data() {
    return {
      input: "### hello"
    };
  },
  computed: {
    compiledMarkdown: function() {
      return marked(this.input, { sanitize: true });
    }
  },
  methods: {}
};
</script>

<style>
#wrapper {
  background-attachment: fixed;
  background: url("http://ossweb-img.qq.com/images/lol/web201310/skin/big22009.jpg")
    no-repeat center center;
  min-width: 100vw;
  min-height: 83vh;
  background-size: cover;
  display: flex;
  flex-direction: column-reverse;
}
#title {
  position: relative;
  bottom: 0;
  width: 100vw;
  line-height: 20vh;
  color: aliceblue;
  font-size: 1rem;
  text-align: center;
}
</style>                                           
