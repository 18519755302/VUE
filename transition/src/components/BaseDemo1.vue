<template>
  <div>
    <button @click="show = !show">点我</button>
    <fu-yong>
      <div v-if="show">hello world</div>
    </fu-yong>
  </div>
</template>
<script>
//组件  过渡复用
//import FuYong from "./FuYong";
//函数式组件 过渡复用
//import FuYong from "./FuyongHanshu";
export default {
  components: {
    FuYong,
  },
  data() {
    return {
      show: true,
    };
  },
};
</script>
<style scoped>
button {
  margin-bottom: 30px;
}
</style>