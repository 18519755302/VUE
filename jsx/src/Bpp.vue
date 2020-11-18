<template>
  <level-cmp :level="2" @click="count++">
    ok
    <template v-slot:header>头部</template>
  </level-cmp>
</template>
<script>
import LevelCmp from "./components/LevelCmp";
export default {
  name: "Bpp",
  //要先注入，子组件inject才能获取到值
  provide() {
    return {
      name: "我是注入的",
    };
  },
  components: {
    LevelCmp,
  },
  data() {
    return {
      count: 0,
      share: "我是注入的",
    };
  },
};
</script>