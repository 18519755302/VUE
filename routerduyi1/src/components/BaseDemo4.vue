<template>
  <div>
    <div class="children">
      <router-link :to="{ name: '4-1' }">4-1</router-link>
      <router-link :to="{ name: '4-2' }">4-2</router-link>
      <router-link :to="{ name: '4-3' }">4-3</router-link>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.children {
  margin-bottom: 30px;
}
.children a {
  margin-right: 20px;
  text-decoration: none;
}
.link-exact-active {
  font-weight: 700;
  color: cornflowerblue;
}
</style>