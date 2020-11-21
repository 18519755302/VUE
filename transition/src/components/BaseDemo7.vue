<template>
  <div>
    <button @click="show = !show">click4</button>
    <!-- duration 过渡时间， -->
    <transition :duration="{ enter: 2000, leave: 6000 }">
      <div class="box" v-show="show">
        <transition name="span">
          <span v-if="show">hello world</span>
        </transition>
      </div>
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

.v-leave-active {
  transition: all 13s;
}
.v-enter-active {
  transition: all 10s;
}
.v-enter-to,
.v-leave {
  opacity: 1;
}
.span-enter,
.span-leave-to {
  font-size: 12px;
}

.span-enter-active,
.span-leave-active {
  transition: all 2s;
}

.span-enter-to,
.span-leave {
  font-size: 20px;
}
</style>