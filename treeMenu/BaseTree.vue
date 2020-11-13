<template>
  <div>
    <ul>
      <!-- 显示第一级 -->
      <li v-for="(node, index) in data" :key="node[defaultProps.label]">
        <i
          v-if="node[defaultProps.children]"
          class="iconfont"
          :class="{
            'icon-right': showChildren[index],
            'icon-down': !showChildren[index],
          }"
        ></i>
        <span @click="handle(index)">{{ node[defaultProps.label] }}</span>
        <!-- 利用了keep-alive缓存功能 -->
        <keep-alive>
          <!-- 再次嵌套了自己，注意这时应该给自己起个名字 -->
          <base-tree
            :data="node.fchildren"
            :defaultProps="defaultProps"
            v-if="showChildren[index] && node.fchildren"
          ></base-tree>
        </keep-alive>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  //给自己起的名字 用于循环
  name: "base-tree",
  props: {
    //父级传来菜单数据
    data: {
      type: Array,
      required: true,
    },
    defaultProps: {
      //有了这个 不管父级传来什么 都可以配套
      type: Object,
      default() {
        return {
          label: "label",
          children: "children",
        };
      },
    },
  },
  data() {
    return {
      //是否显示下一级
      showChildren: [],
    };
  },
  methods: {
    handle(index) {
      //控制下级是否显示
      this.$set(this.showChildren, index, !this.showChildren[index]);
    },
  },
};
</script>
<style scoped>
@import "./assets/font.css";
li {
  list-style: none;
  padding: 6px;
}
i {
  padding: 0 5px;
}
</style>