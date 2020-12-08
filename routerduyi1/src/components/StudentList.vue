<template>
  <div>
    <ul>
      <li :key="student.id" v-for="student in students">
        姓名：{{ student.name }} 年龄：{{ student.age }}
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      students: "studentList",
    }),
  },
};
</script>