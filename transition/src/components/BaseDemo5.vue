<template>
  <div>
    <button @click="handle()">click</button>
    <!-- 动态组件 -->
    <transition mode="out-in">
      <component :is="cmpName"></component>
    </transition>
  </div>
</template>
<script>
import Demo1 from "./BaseDemo5-1";
import Demo2 from "./BaseDemo5-2";
export default {
  components: {
    Demo1,
    Demo2,
  },
  data() {
    return { cmpName: "demo1" };
  },
  methods: {
    handle() {
      this.cmpName = this.cmpName === "demo1" ? "demo2" : "demo1";
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