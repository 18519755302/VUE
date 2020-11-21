<template>
  <div>
    <button @click="show = !show">click4</button>
    <!-- https://daneden.github.io/animate.css/ -->
    <!-- 用这个网址样式，样式里必须用 animated -->
    <!-- bounceInRight rubberBand 网址里所选样式 -->
    <transition
      enter-active-class="animated bounceInRight"
      leave-active-class="animated rubberBand"
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
</style>