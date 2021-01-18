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
      this.$store.commit({
        type: "addCount",
        num: 10,
      });
      this.$store.commit("student/addNum", { num: 1 });
    },
  },
};
</script>