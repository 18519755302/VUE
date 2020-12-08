<template>
  <div>
    <add-student />
    <hr />
    <student-list />
  </div>
</template>
<script>
import AddStudent from "@/components/AddStudent";
import StudentList from "@/components/StudentList";
export default {
  components: {
    AddStudent,
    StudentList,
  },
};
</script>