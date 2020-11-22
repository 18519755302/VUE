<template>
  <div>
    <button @click="show = !show">click</button>
    <!-- 多个div 过渡 -->
    <transition>
      <div v-if="show" key="world">hello world</div>
      <div else key="shanshan">hello shanshan</div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return { show: true };
  },
};
</script>
<style scoped>
div {
  margin-top: 15px;
}
.v-enter,
.v-leave-to {
  opacity: 0;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s;
}
.v-enter-to,
.v-leave {
  opacity: 1;
}
</style>