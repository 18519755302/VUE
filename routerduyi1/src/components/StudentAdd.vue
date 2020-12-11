<template>
  <div class="student-add">
    <div>添加学生：</div>
    <div>姓名：<input type="text" v-model="name" /></div>
    <div>年龄：<input type="text" v-model="age" /></div>
    <div>
      <button @click="handleClick">添加</button>
    </div>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      name: "",
      age: null,
    };
  },
  methods: {
    handleClick() {
      // 严格模式下 会报没用matation提交，但是功能好使
      // 非严格模式下 ok
      this.$store.state.student.studentList.push({
        name: this.name,
        age: this.age,
        id: +new Date(),
      });
    },
  },
};
</script>
<style scoped>
div {
  margin-top: 15px;
}
</style>