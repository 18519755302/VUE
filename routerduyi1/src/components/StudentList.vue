<template>
  <div>
    <ul>
      <li>总人数：{{ studentsLength }}</li>
      <hr />
      <li :key="student.id" v-for="student in students">
        姓名：{{ student.name }} 年龄：{{ student.age }}
      </li>
      <hr />
    </ul>
    <ul>
      <li :key="student.id" v-for="student in studentsUnderAge">
        姓名：{{ student.name }} 年龄：{{ student.age }}
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";

export default {
  mounted() {
    mapGetters(["studentsUnderAge"]);
  },
  computed: {
    ...mapState({
      students: "studentList",
    }),
    ...mapGetters({
      studentsLength: "studentsLength",
      studentsUnderAge: "studentsUnderAge",
    }),
  },
};
</script>