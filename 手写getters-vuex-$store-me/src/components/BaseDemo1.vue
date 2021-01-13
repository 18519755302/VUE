<template>
  <div>
    <!-- {{ $store.state.count }} -->
    <!-- <hr /> -->
    {{ $store.getters.doubleCount }}
    <!-- {{ $store.getters }} -->
    {{ $store.getters["student/doubleNum"] }}
    {{ $store.getters["student/twoB"] }}
    <!-- <hr /> -->
    <!-- {{ $store.state.student.num }} -->
    <button @click="handleClick">点我</button>
  </div>
</template>
<script>
export default {
  methods: {
    handleClick() {
      console.log(this.$store);
      this.$store.state.count++;
      this.$store.state.student.num++;
    },
  },
};
</script>