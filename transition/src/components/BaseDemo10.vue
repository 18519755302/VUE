<template>
  <div>
    <button @click="show = !show">click</button>
    <!-- :css="false" 可以直接跳过css -->
    <!--  @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
      @leave-cancelled="leaveCancelled" -->
    <transition
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @enter-cancelled="enterCancelled"
    >
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
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0;
    },
    enter(el, done) {
      // 具有过渡效果 Velocity(元素，{变化状态},{时间duration,完成状态（可填）})
      Velocity(el, { opacity: 1 }, { duration: 1000 });
      Velocity(el, { rotateZ: 10 }, { duration: 300 });
      Velocity(el, { rotateZ: -10 }, { duration: 300 });
      // complete: done 这句可以在访问enter方法之后直接访问afterEnter方法
      Velocity(el, { rotateZ: 0 }, { duration: 300, complete: done });
    },
    afterEnter(el) {
      console.log("afterEnter");
    },
    enterCancelled(el) {},
    beforeLeave(el) {},
    leave(el, done) {},
    afterLeave(el) {},
    leaveCancelled(el) {},
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