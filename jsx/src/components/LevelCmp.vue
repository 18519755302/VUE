<script>
//子组件
export default {
  //   props: ["level"],
  functional: true,
  //需要再次先数据，context.injections才会有值
  inject: ["name"],
  render(h, context) {
    //提供所有 prop 的对象
    const props = context.props;
    //一个函数，返回了包含所有插槽(非作用域)的对象
    const slot = context.slots().default;
    //一个暴露传入的作用域插槽的对象。也以函数形式暴露普通插槽。
    const header = context.scopedSlots.header()[0];
    //对象data.attrs中会显示prop中的数据，
    //但是如果是props显示声明的数据就不会显示在data.attrs中，
    //只有props隐式声明的才会显示在attrs中
    const levelObj = context.data.attrs;
    //父级 组件
    const parent = context.parent;
    //一个包含了所有父组件为当前组件注册的事件监听器的对象,可把listeners
    //换为data.on也可以
    const listener = context.listeners;
    const listener1 = context.data.on;
    //父级的注入值 父级注入了，自己在收一下，context.injections才有值
    const injections = context.injections;

    const tag = "h" + props.level;
    return <tag></tag>;
  },
};
</script>