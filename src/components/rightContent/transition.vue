<template>
  <div class="context box">
    <div>transition事例</div>
    <div class="one" @click="hide"></div>
    <div class="two"></div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations(["isShowModel"]),
    hide() {
      this.isShowModel(false);
    },
  },
};
</script>
<style scoped>
.box {
  top: 100px;
}
.context {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  /* background-color: azure; */
}

.one {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: azure;
}
.two {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  background-color: blue;
}
</style>