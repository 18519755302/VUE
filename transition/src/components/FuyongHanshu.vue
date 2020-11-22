<script>
//函数式组件 复用
export default {
  name: "FuyongHanshu",
  functional: true,
  render(h, context) {
    const { slots } = context;
    return (
      <div>
        <transition name="single">{slots().default}</transition>
      </div>
    );
  },
};
</script>
<style >
/* style 里的scoped使用函数式组件需要去除，如果不去除过渡就会不好使 */
.single-enter,
.single-leave-to {
  opacity: 0;
}
.single-enter-active,
.single-leave-active {
  transition: all 3s;
}
.single-enter-to,
.single-leave {
  opacity: 1;
}
</style>