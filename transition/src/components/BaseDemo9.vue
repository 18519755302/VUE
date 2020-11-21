<template>
  <div>
    <button @click="show = !show">click</button>
    <!-- :css="false" 可以直接跳过css -->
    <transition
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @enter-cancelled="enterCancelled"
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
      @leave-cancelled="leaveCancelled"
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
      //在整个动画结束后，下一个动画开始时触发访问enterCancelled方法,
      //但是 done.canceled所在方法里有异步函数就不会执行enterCancelled方法
      //一般不会使用这个方法，因为不太好使
      //done.canceled = true;
      setTimeout(() => {
        done(); //主动调用afterEnter
      }, 5000);
    },
    afterEnter(el) {
      console.log(el, "afterEnter");
      el.style.opacity = 1;
    },
    enterCancelled(el) {
      console.log(el, "enterCancelled");
    },
    beforeLeave(el) {
      el.style.opacity = 1;
    },
    leave(el, done) {
      setTimeout(() => {
        done(); //主动调用afterLeave
      }, 5000);
    },
    afterLeave(el) {
      console.log(el, "afterLeave");
      el.style.opacity = 0;
    },
    leaveCancelled(el) {
      console.log(el, "afterEnter");
    },
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