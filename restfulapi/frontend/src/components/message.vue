<template>
  <div>
    <!-- <mu-raised-button label="上面弹出" @click="open()"/> -->
    <div id="messageBox">
      <div id="mesContent">
        {{message}} 
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["message"],
  methods: {
    sendMessage(self, mes) {
      self.mesContent = mes;
      self.sendMes = true;
      setTimeout(() => {
        self.sendMes = false;
        self.mesContent = mes;
      }, 1500);
    }
  }
};
</script>

<style>
#messageBox {
  z-index: 999;
  position: fixed;
  bottom: 50px;
  width: 100%;
  height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: aliceblue;
  font-size: 18px;
}
#mesContent {
  width: 50vw;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  height: 20vw;
  background-color: rgba(179, 146, 236, 0.7);
}
</style>
