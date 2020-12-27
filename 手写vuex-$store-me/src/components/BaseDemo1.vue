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
      this.$store.state.count++;
      this.$store.state.student.num++;
    },
  },
};
</script>