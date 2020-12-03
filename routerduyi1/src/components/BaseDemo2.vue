<template>
  <div>
    demo2
    <div id="a">a可由首页跳到此处</div>
    <!-- <div class="buttom">
      <router-link to="/demo1">demo1</router-link>
    </div> -->
  </div>
</template>
<script>
export default {
  beforeRouteUpdate(to, from, next) {
    console.log("beforeRouteUpdate");
    next();
  },
  beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter");
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log("beforeRouteLeave");
    next();
  },
};
</script>
<style scoped>
.buttom {
  margin-top: 1000px;
}
#a {
  margin-top: 1500px;
}
</style>