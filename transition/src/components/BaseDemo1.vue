<template>
  <div>
    <button @click="show = !show">click</button>
    <transition>
      <div class="box" v-if="show">i am ok</div>
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

.v-enter {
  opacity: 0;
}

.v-enter-active {
  transition: opacity 1s;
}

.v-enter-to {
  opacity: 1;
}

.v-leave {
  opacity: 1;
}

.v-leave-active {
  transition: opacity 3s;
}

.v-leave-to {
  opacity: 0;
}
</style>