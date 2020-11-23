<template>
  <div>
    <div>
      <router-link to="/">demo1</router-link>
      <router-link to="/demo2">demo2</router-link>
      <router-link to="/demo3">demo3</router-link>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
.link-exact-active {
  color: cadetblue;
}
</style>
