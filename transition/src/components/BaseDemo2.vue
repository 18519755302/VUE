<template>
  <div>
    <button @click="show = !show">click</button>
    <transition name="box1">
      <div class="box" v-show="show">i am ok</div>
    </transition>
    <transition name="box2">
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
.box1-leave,
.box1-enter-to {
  opacity: 1;
}
.box1-leave-active,
.box1-enter-active {
  transition: opacity 3s;
}
.box1-leave-to,
.box1-enter {
  opacity: 0;
}

.box2-leave,
.box2-enter-to {
  opacity: 1;
}
.box2-leave-active,
.box2-enter-active {
  transition: opacity 3s;
}
.box2-leave-to,
.box2-enter {
  opacity: 0;
}
</style>