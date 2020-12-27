<template>
  <div class="home">
    {{ $store.state.count }}
    {{ $store.state.student.num }}
    {{ $store.state.studentTwo.num }}

    <button @click="handleClick">click</button>
  </div>
</template>

<script>
export default {
  mounted() {
    // console.log(this.$store);
  },
  methods: {
    handleClick() {
      this.$store.state.count++;
      this.$store.state.student.num++;
      this.$store.state.studentTwo.num++;
    },
  },
};
</script>