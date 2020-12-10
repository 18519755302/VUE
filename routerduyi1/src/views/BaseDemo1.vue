<template>
  <div>
    demo1
    <button @click="plus">+1</button>
    <button @click="countPlusTwo">+2</button>
    <button @click="plusTen">+10</button>
    <button @click="changeObj">changeObj</button>
    <hr />
    {{ storeCount }}
    {{ addCount(3) }}
    {{ this.obj }}
    <!-- <hr />
    <input type="text" :value="msg" @input="input" />
    {{ msg }} -->
    <hr />
    <input type="text" v-model="msg" />
    {{ msg }}
    <div class="buttom">
      <router-link to="/demo2">demo2</router-link>
      <router-link to="/demo2#a">此处可跳到demo2的a</router-link>
    </div>
  </div>
</template>
<script>
//获取mapMutations
import { mapState, mapGetters, mapMutations } from "vuex";
import { COUNT_PLUS } from "../store/mutation-types";
export default {
  mounted() {},
  computed: {
    ...mapState({
      //语法糖 自己起的名字："分享名"
      storeCount: "count",
      //用于验证
      obj: "obj",
      //msg: "msg",
    }),
    ...mapGetters({
      addCount: "addCount",
    }),
    msg: {
      get() {
        return this.$store.state.msg;
      },
      set(value) {
        this.$store.commit("input", value);
      },
    },
  },
  methods: {
    //多个方法可以在数组里加入，也可以单独写一个mapMutations放入方法名
    ...mapMutations(["countPlus", "countPlusTwo"]),
    // ...mapMutations(["countPlusTwo"]),
    //也可单独写法方法，放入vuex定义好的Mutation名
    plus() {
      //this.$store.commit("countPlus");
      this.$store.commit(COUNT_PLUS);
    },
    //Mutation中方法加参数
    plusTen() {
      //第①种方法
      //this.$store.commit("countPlusN", 10);
      //第②种方法
      //this.$store.commit("countPlusPayload", { n: 10 });
      this.$store.commit({
        type: "countPlusPayload",
        n: 10,
      });
    },
    changeObj() {
      this.$store.state.obj = { ...this.$store.state.obj, b: 123 };
    },
    input(e) {
      this.$store.commit("input", e.target.value);
    },
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