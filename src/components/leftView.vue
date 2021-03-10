<template>
  <div class="left">
    <div class="firstType">
      <span>学生管理</span>
    </div>
    <router-link to="list" class="title" tag="div">
      <span>学生列表</span>
    </router-link>
    <router-link to="addStudent" class="title" tag="div">
      <span>增加学生</span>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.left {
  display: inline-block;
  height: calc(100vh - 60px);
  width: 150px;
  box-sizing: border-box;
  background-color: #4d5e70;
  color: #b3bcc5;
  /* border: 2px solid; */
}
.left .firstType {
  padding: 15px 9px;
}
.left .title {
  padding: 12px;
  text-align: center;
}
.left .title {
  cursor: pointer;
}
.left .active {
  background: ghostwhite;
}
.left .active span {
  color: #354457;
}
</style>>
