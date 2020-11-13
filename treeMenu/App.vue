<template>
  <div id="app">
    <base-tree :data="data" :defaultProps="dprops"></base-tree>
  </div>
</template>
<script>
import BaseTree from "./BaseTree";
export default {
  components: {
    BaseTree,
  },
  data() {
    return {
      data: [
        {
          flabel: "一级 1",
          fchildren: [
            {
              flabel: "二级 1-1",
              fchildren: [
                {
                  flabel: "三级 1-1-1",
                },
              ],
            },
          ],
        },
        {
          flabel: "一级 2",
          fchildren: [
            {
              flabel: "二级 2-1",
              fchildren: [
                {
                  flabel: "三级 2-1-1",
                },
              ],
            },
            {
              flabel: "二级 2-2",
              fchildren: [
                {
                  flabel: "三级 2-2-1",
                },
              ],
            },
          ],
        },
        {
          flabel: "一级 3",
          fchildren: [
            {
              flabel: "二级 3-1",
              fchildren: [
                {
                  flabel: "三级 3-1-1",
                },
              ],
            },
            {
              flabel: "二级 3-2",
              fchildren: [
                {
                  flabel: "三级 3-2-1",
                },
              ],
            },
          ],
        },
      ],
      dprops: {
        label: "flabel",
        children: "fchildren",
      },
    };
  },
};
</script>
<style scoped>
</style>