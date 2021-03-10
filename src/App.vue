<template>
  <div id="dd">
    <sysHeader></sysHeader>
    <leftView></leftView>
    <div class="rightContent">
      <router-view></router-view>
    </div>
  </div>
</template> 

<script>
import leftView from "./components/leftView.vue";
import sysHeader from "./components/sysHeader.vue";

export default {
  name: "App",
  components: {
    sysHeader,
    leftView,
  },
};
</script>

<style>
/* @import url("./assets/index.css"); */
@import url("./assets/reset.css");
.rightContent {
  position: fixed;
  left: 150px;
  top: 60px;
  box-sizing: border-box;
  width: calc(100vw - 150px);
  height: calc(100vh - 60px);
  /* border: 1px solid blueviolet; */
  background-color: #eee;
  vertical-align: top;
}
</style>
