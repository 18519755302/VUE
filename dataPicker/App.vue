<template>
  <div>
    <!-- :dateP 为子组件定义的值  后面的dateP为父组件定义的值-->
    <!-- <data-picker :dateP="dateP" @date-choose="changeValue"></data-picker> -->
    <data-picker v-model="dateP"></data-picker>
  </div>
</template>
<script>
import datePicker from "./DatePicker.vue";
export default {
  components: {
    DataPicker: datePicker,
  },
  data() {
    return {
      //给:dateP=dateP中后面的dateP赋值
      dateP: new Date(),
    };
  },
  // methods: {
  //   //不用v-model时 datePicker会调用 给输入框赋值
  //   changeValue(date) {
  //     this.dateP = date;
  //   },
  // },
};
</script>
<style scoped>
</style>