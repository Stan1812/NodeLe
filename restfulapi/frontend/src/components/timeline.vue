<template>
<div>
    <mu-paper>
    <mu-appbar title="时间轴">
        <mu-icon-button icon="close" @click.native="goback" slot="left" />
    </mu-appbar>
    </mu-paper>
<div id="container">
  <mu-timeline lineColor="black" lineType="dashed">
    <mu-timeline-item iconColor="red" iconType="dotted">
      <span>发布1.0版本</span>
    </mu-timeline-item>
    <mu-timeline-item lineType="solid">
      <span>发布1.1版本</span>
    </mu-timeline-item>
    <mu-timeline-item>
      <span>发布1.2版本</span>
    </mu-timeline-item>
    <mu-timeline-item lineColor="#3476db">
      <mu-icon value="flight_takeoff" color="red" slot="icon"/>
      <span>发布2.0版本</span>
    </mu-timeline-item>
    <mu-timeline-item iconColor="blue">
      <span>发布2.1版本</span>
    </mu-timeline-item>
    <mu-timeline-item iconLine="5">
      <span>发布2.2版本</span>
    </mu-timeline-item>
  </mu-timeline>
  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    goback() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
#container{
  width: 80vw;
  padding-top:5vh; 
  margin: auto;
  font-size:18px; 
} 
</style>
