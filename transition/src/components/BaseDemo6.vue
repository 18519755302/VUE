<template>
  <div>
    <button @click="show = !show">click4</button>
    <!-- duration 过渡时间，如果有了它，其他定义时间就不好使 -->
    <transition
      :duration="1000"
      enter-active-class="animated tada enter"
      leave-active-class="animated tada leave"
    >
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
.v-enter,
.v-leave-to {
  opacity: 0;
}

.leave {
  transition: all 13s;
}
.enter {
  transition: all 10s;
}
.v-enter-to,
.v-leave {
  opacity: 1;
}
</style>