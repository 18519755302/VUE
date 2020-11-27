<template>
  <div>
    <ul>
      <li v-for="question in questionList" :key="question.id">
        <router-link :to="{ name: 'question', params: { id: question.id } }">{{
          question.title
        }}</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      questionList: [],
    };
  },
  mounted() {
    this.$axios.get("/question").then((res) => {
      this.questionList = res;
    });
  },
};
</script>
<style scoped>
ul li {
  padding: 13px 0px;
}
ul li:hover {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
</style>