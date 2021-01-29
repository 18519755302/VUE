<template>
  <div>
    mapState
    <br />
    <br />
    {{ count }} {{ countNamed }} {{ num }} {{ numNamed }} {{ numPlus }}
    <br />
    <br />
    mapGetters
    <br />
    <br />
    {{ doubleCount }} {{ doubleCountNamed }} {{ doubleNum }}
    {{ doubleNumNamed }}
    <br />
    <br />
    <button @click="handleClick">Mutation</button>
    <br /><br />
    <button @click="handle">Action</button>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from "../vuex";
export default {
  mounted() {
    console.log(mapState, mapGetters, mapActions, mapMutations);
  },
  computed: {
    ...mapState(["count"]),
    ...mapState({ countNamed: "count" }),
    ...mapState("student", ["num"]),
    ...mapState("student", {
      numNamed: "num",
      numPlus(state, getters) {
        return state.num + getters.doubleNum;
      },
    }),
    ...mapGetters(["doubleCount"]),
    ...mapGetters({
      doubleCountNamed: "doubleCount",
    }),
    ...mapGetters("student", ["doubleNum"]),
    ...mapGetters("student", {
      doubleNumNamed: "doubleNum",
    }),
  },
  methods: {
    ...mapMutations(["addCount"]),
    ...mapMutations({ addCountNamed: "addCount" }),
    ...mapMutations("student", ["addNum"]),
    ...mapMutations("student", { addNumNamed: "addNum" }),
    handleClick() {
      //this.addCount({ num: 10 });
      //this.addCountNamed({ num: 5 });
      //this.addNum({ num: 3 });
      this.addNumNamed({ num: 6 });
    },
    ...mapActions(["addCountAction"]),
    ...mapActions({ addCountActionNamed: "addCountAction" }),
    ...mapActions("student", ["studentAddNum"]),
    ...mapActions("student", { studentAddNumNamed: "studentAddNum" }),
    handle() {
      //this.addCountAction({ num: 10 });
      //this.addCountActionNamed({ num: 5 });
      //this.studentAddNum({ num: 3 });
      this.studentAddNumNamed({ num: 6 });
    },
  },
};
</script>