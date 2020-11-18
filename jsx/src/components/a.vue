<template>
  <div>
    <b-com>测试</b-com>
    <b-cop>
      <template v-slot:header>header</template>
      <template v-slot:footer>
        <p>底部</p>
      </template>
    </b-cop>
    <b-com v-slot="slotProps">
      {{ slotProps.text }}
    </b-com>
  </div>
</template> 
<script>
import BCom from "./BCom.vue";
import BCop from "./BCop.vue";
export default {
  components: {
    BCom,
    BCop,
  },
  data() {
    return {
      msg: "11111",
    };
  },
};
</script>