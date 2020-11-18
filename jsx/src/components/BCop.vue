<template>
  <div>哈哈哈<slot name="footer"></slot></div>
</template>
<script>
export default {
  props: {
    msg: String,
  },
};
</script>