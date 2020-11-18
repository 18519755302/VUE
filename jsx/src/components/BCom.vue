<template>
  <div>
    1111
    <slot :text="'HelloWorld'"></slot>
  </div>
</template>

<script>
export default {
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
