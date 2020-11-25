<template>
  <div>
    <div class="list">
      <span class="left" @click="handleClick"> helloWorld </span>
      <!-- <router-link to="/demo1" class="left" tag="span">helloWorld</router-link> -->
      <div class="right">
        <router-link to="/demo1">demo1</router-link>
        <router-link to="/demo2">demo2</router-link>
        <router-link to="/demo3">demo3</router-link>
        <router-link to="/demo4">demo4</router-link>
      </div>
    </div>
    <div class="view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import "./assets/reset.css";

export default {
  name: "App",
  components: {},
  methods: {
    handleClick() {
      //点击 跳转demo1
      this.$router.push({ name: "demo1" });
    },
  },
};
</script>

<style>
.list {
  display: flex;
  justify-content: space-between;
  padding: 10px 50px;
  background-color: cornflowerblue;
}
.right {
  display: flex;
  width: 300px;
  justify-content: space-around;
}
.left,
.right a {
  color: yellow;
  text-decoration: none;
}
.view {
  margin: 50px;
}
.right a.link-active {
  font-weight: 900;
  color: #fff;
}
</style>
