<template>
  <div>
    <button @click="show = !show">click</button>
    <transition>
      <div class="box" v-show="show">i am ok</div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true,
    };
  },
};
</script>
<style scoped>
.box {
  margin-top: 30px;
  width: 150px;
  height: 150px;
  border: 1px solid red;
  text-align: center;
  line-height: 150px;
}
/* .v-leave,
.v-enter-to {
  opacity: 1;
} */
.v-leave-active {
  animation: animate 1s reverse;
}

.v-enter-active {
  animation: animate 1s;
}

/* .v-leave-to,
.v-enter {
  opacity: 0;
} */
@keyframes animate {
  0% {
    opacity: 0;
    transform: translateX(400px) scale(1);
  }
  50% {
    opacity: 0.5;
    transform: translateX(200px) scale(1.5);
  }
  100% {
    opacity: 1;
    transform: translateX(0px) scale(1);
  }
}
</style>