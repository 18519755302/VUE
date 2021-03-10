<template>
  <div class="page">
    <span class="last-page" v-show="page !== 1" @click="toLastPage">
      上一页
    </span>
    <template v-if="total <= 7">
      <span
        v-for="item in total"
        :key="item"
        class="pageNum"
        :class="{ active: page === item }"
        @click="toPage(item)"
      >
        {{ item }}
      </span>
    </template>
    <template v-else>
      <!-- page为选择第几页 total为总页数 -->
      <template v-if="page <= 4">
        <span
          v-for="item in 6"
          :key="item"
          class="pageNum"
          :class="{ active: page === item }"
          @click="toPage(item)"
        >
          {{ item }}
        </span>
      </template>
      <template v-if="page > 4">
        <span class="pageNum" @click="toPage(1)">1</span>
        <span class="pageNum" @click="toPage(page - 5)">...</span>
      </template>
      <template v-if="page > 4 && page < total - 4">
        <span
          v-for="item in 5"
          :key="page - 3 + item"
          class="pageNum"
          :class="{ active: item === 3 }"
          @click="toPage(page - 3 + item)"
        >
          {{ page - 3 + item }}
        </span>
      </template>
      <template v-if="page >= total - 4">
        <span
          v-for="item in 6"
          :key="total - 6 + item"
          class="pageNum"
          :class="{ active: page === total - 6 + item }"
          @click="toPage(total - 6 + item)"
        >
          {{ total - 6 + item }}
        </span>
      </template>
      <template v-if="page < total - 4">
        <span class="pageNum" @click="toPage(page + 5)">...</span>
        <span class="pageNum" @click="toPage(total)">{{ total }}</span>
      </template>
    </template>

    <span class="next-page" v-show="page !== total" @click="toNextPage">
      下一页
    </span>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      //   total: 100,
      //   page: 1,
    };
  },
  computed: {
    ...mapState(["total", "page", "searchWord", "isSearch"]),
    //...mapState(["searchWord", "isSearch"]),
  },
  created() {
    //console.log(this.total);
  },
  methods: {
    ...mapActions(["queryByPage", "searchByPage"]),
    toPage(n) {
      if (n < 1) {
        //当n为5时 按1之后的..., n就会等于0
        n = 1;
      } else if (n > this.total) {
        //n按照此种算法 不可能大于total 但是保险起见 加上了判断
        n = total;
      }
      if (this.isSearch && this.searchWord) {
        //搜索模式
        this.searchByPage({
          search: this.searchWord,
          page: n,
        });
      } else {
        // this.page = n;
        // console.log(n);
        //查询模式
        this.queryByPage(n);
      }
    },
    toLastPage() {
      this.toPage(this.page - 1);
    },
    toNextPage() {
      this.toPage(this.page + 1);
    },
  },
};
</script>

<style scoped>
.page {
  float: right;
  padding: 30px;
}
.page .last-page,
.page .next-page {
  border: 1px solid;
  padding: 3px;
  margin: 10px;
  border: 1px solid #ddd;
  color: #b3bcc5;
  cursor: pointer;
}
.page .pageNum {
  display: inline-block;
  width: 30px;
  height: 31px;
  border: 1px solid;
  text-align: center;
  line-height: 30px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  color: #b3bcc5;
  margin: 0 5px;
  cursor: pointer;
}
.page .pageNum.active {
  background-color: #409eff;
  color: #fff;
  font-weight: 600;
}
</style>>
</style>