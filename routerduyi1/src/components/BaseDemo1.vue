<template>
  <div>
    demo1
    <div class="buttom">
      <router-link to="/demo2">demo2</router-link>
      <router-link to="/demo2#a">此处可跳到demo2的a</router-link>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    console.log(this.$route.meta);
  },
};
</script>
<style scoped>
.buttom {
  margin-top: 1000px;
}
a {
  margin-left: 20px;
}
</style>