<template>
  <div>
    {{ $store.state.count }}
    {{ $store.state.student.num }}
    <button @click="handleClick">点我</button>
  </div>
</template>
<script>
export default {
  methods: {
    handleClick() {
      //this.$store.state.count++;
      //console.log(this.$store._actions);
      this.$store
        .dispatch({
          type: "student/studentAddNum",
          num: 10,
        })
        .then(() => {
          console.log("我是promise");
        });

      //this.$store.dispatch("addCountActionB", { num: 1 });
      //this.$store.dispatch("studentAddNum");
      //this.$store.dispatch("addCountActionSame", { num: 1 });
    },
  },
};
</script>