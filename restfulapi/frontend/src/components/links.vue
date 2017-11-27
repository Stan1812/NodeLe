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
    <mu-list>
        <mu-sub-header>友情链接</mu-sub-header>
        <mu-list-item title="Mike Li">
        <mu-avatar src="/images/avatar1.jpg" slot="leftAvatar"/>
        <mu-icon value="chat_bubble" slot="right"/>
        </mu-list-item>
    </mu-list>
  </div>
</div>
</template>

<script>
export default {

}
</script>