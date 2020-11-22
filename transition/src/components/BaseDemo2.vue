<template>
  <div>
    <button @click="handle()">click</button>
    <!-- 多个div 过渡 -->
    <transition>
      <div :key="keyName">hello {{ keyName }}</div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return { keyName: "world" };
  },
  methods: {
    handle() {
      this.keyName = this.keyName === "world" ? "shanshan" : "world";
    },
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