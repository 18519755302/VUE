<template>
  <div>
    <div class="title" v-if="question">{{ question.title }}</div>
    <!-- :title 鼠标滑过，显示内容 -->
    <div
      v-for="one in twoTypes"
      :key="one.id"
      :class="one.type"
      @click="handlerClick(one.id)"
      :title="one.title"
    >
      <!-- 可以用声明式导航 -->
      <!-- <router-link :to="{ name: 'question', params: { id: one.id } }">
        {{ one.title }}
      </router-link> -->
      {{ one.title }}
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      question: null,
    };
  },
  methods: {
    //获取问题数据
    getData() {
      const { id } = this.$route.params;
      this.$axios.get(`/question/${id}`).then((res) => {
        this.question = res;
      });
    },
    //编程式导航
    handlerClick(id) {
      const { name } = this.$route;
      this.$router.push({
        name,
        params: {
          id: id,
        },
      });
    },
  },
  computed: {
    twoTypes() {
      let arr = [];
      if (this.question) {
        const { next, nextId } = this.question;
        //后一个信息
        if (nextId) {
          arr.push({
            type: "next",
            id: nextId,
            title: next,
          });
        }
        const { prev, prevId } = this.question;
        //前一个信息
        if (prevId) {
          arr.push({
            type: "prev",
            id: prevId,
            title: prev,
          });
        }
      }
      console.log(arr);
      return arr;
    },
  },
  watch: {
    //不同id 路由信息会改变
    $route: {
      handler() {
        this.getData();
      },
      //页面初始时就会执行方法
      immediate: true,
    },
  },
};
</script>
<style scoped>
.title {
  text-align: center;
}
.next,
.prev {
  margin-top: 200px;
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
.next {
  float: right;
  margin-right: 70px;
}
.prev {
  float: left;
  margin-left: 70px;
}
</style>