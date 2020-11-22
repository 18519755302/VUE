<template>
  <div>
    <transition>
      <slot></slot>
    </transition>
  </div>
</template>
<script>
export default {
  name: "FuYong",
};
</script>
<style scoped>
.v-enter,
.v-leave-to {
  opacity: 0;
}
.v-enter-active,
.v-leave-active {
  transition: all 3s;
}
.v-enter-to,
.v-leave {
  opacity: 1;
}
</style>