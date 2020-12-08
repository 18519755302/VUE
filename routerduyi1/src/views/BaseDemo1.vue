<template>
  <div>
    demo1
    <button @click="$store.state.count++">+1</button>
    <hr />
    {{ storeCount }}
    <div class="buttom">
      <router-link to="/demo2">demo2</router-link>
      <router-link to="/demo2#a">此处可跳到demo2的a</router-link>
    </div>
  </div>
</template>
<script>
//获取mapState，以便从中找到count值
import { mapState } from "vuex";
export default {
  mounted() {
    console.log(mapState(["count"]));
    console.log(this.$store.state.count);
  },
  //分享名和自己起的名相同，可这样写
  //computed: mapState(["count"]),
  //也可以这样写
  // computed: {
  //   ...mapState(["count"]),
  // },
  //如果分享名和自己起的名不相同
  computed: {
    ...mapState({
      //自己起的名：函数
      //storeCount: (state) => state.count,
      //语法糖 自己起的名字："分享名"
      storeCount: "count",
    }),
  },
};
</script>
<style scoped>
.buttom {
  margin-top: 1000px;
}
a {
  margin-left: 20px;
}
</style>