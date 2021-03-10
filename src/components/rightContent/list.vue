<template>
  <div class="list">
    <search></search>
    <div class="dataTable">
      <table border="0">
        <!-- 表头区域 -->
        <thead>
          <th>学号</th>
          <th>姓名</th>
          <th>性别</th>
          <th>邮箱</th>
          <th>年龄</th>
          <th>手机号</th>
          <th>住址</th>
          <th>操作</th>
        </thead>
        <!-- 表格区域 -->
        <tbody>
          <tr v-for="person in list" :key="person.id">
            <td>{{ person.sNo }}</td>
            <td>{{ person.name }}</td>
            <td>{{ person.sex == "1" ? "女" : "男" }}</td>
            <td>{{ person.email }}</td>
            <td>{{ new Date().getFullYear() - person.birth }}</td>
            <td>{{ person.phone }}</td>
            <td>{{ person.address }}</td>
            <td>
              <button class="edit" @click="edit(person)">编辑</button>
              <button class="del" @click="del(person.sNo)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <page></page>
      <transition>
        <model v-show="isShow"></model>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from "@/api/index.js";
import search from "./search.vue";
import page from "./page.vue";
import model from "./model";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  components: {
    search,
    page,
    model,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      //语法糖 isShow: (state)=>{return state.showModel}
      isShow: "showModel",
      list: "list",
      nowPage: "page",
      pageSize: "pageSize",
      queryCount: "queryCount",
      searchCount: "searchCount",
    }),
    ...mapState(["searchWord", "isSearch"]),
  },
  created() {
    this.queryByPage(1);
  },
  methods: {
    ...mapMutations(["isShowModel", "getStu"]),
    ...mapActions(["queryByPage", "searchByPage"]),
    //编辑数据
    edit(person) {
      //弹出编辑窗
      this.isShowModel(true);
      //传出学生数据
      this.getStu(person);
    },
    //删除数据
    async del(sNo) {
      if (!confirm("是否确定删除数据")) {
        return;
      }
      //调用接口删除数据
      let result = await this.$api.del(sNo);
      if (result.status === "success") {
        if (this.isSearch && this.searchWord) {
          //console.log("搜索");
          //搜索模式
          let pageNum = this.findPage(this.searchCount - 1, this.nowPage);
          this.searchByPage({ page: pageNum });
        } else {
          //console.log("查询");
          //查询模式
          let pageNum = this.findPage(this.queryCount - 1, this.nowPage);
          this.queryByPage(pageNum);
        }
        //提示用户,删除成功
        this.$toast({
          msg: result.msg,
          type: "suc",
        });
      } else {
        //提示用户,删除失败
        this.$toast({
          msg: result.msg,
          type: "fail",
        });
      }
    },
    //求得删除后显示哪页
    findPage(totalCount, page) {
      //totalCount 目前总数据条数 page为删除数据的所在页
      let nowTotalPage = Math.ceil(totalCount / this.pageSize);
      let nowPage;
      if (page > nowTotalPage) {
        nowPage = page - 1;
      } else {
        nowPage = page;
      }
      if (nowPage === 0) {
        nowPage = 1;
      }
      return nowPage;
    },
  },
};
</script>

<style scope>
.list .dataTable .v-enter {
  top: -100%;
  opacity: 0;
}
.list .dataTable .v-enter-to {
  top: 0;
  opacity: 1;
}
.list .dataTable .v-leave {
  top: 0;
  opacity: 1;
}
.list .dataTable .v-leave-to {
  top: -100%;
  opacity: 0;
}
.list .dataTable .v-enter-active {
  transition: all 0.5s;
}
.list .dataTable .v-leave-active {
  transition: all 0.5s;
}

.list {
  width: 100%;
}
table {
  width: 100%;
}

table thead {
  background-color: #e3e8ee;
}
table tbody {
  background-color: #fff;
}

table th,
table td {
  font-size: 14px;
  text-align: center;
  padding: 10px 0;
  min-width: 100px;
}

table th {
  color: #646987;
}

table td {
  color: #354457;
  min-width: 100px;
}
table button {
  padding: 3px 10px;
  border: none;
  color: #fff;
  cursor: pointer;
  margin-right: 10px;
}
table .edit {
  background-color: #5cb85c;
}
table .del {
  background-color: #d9534f;
}
table .edit:hover {
  background-color: #398439;
  border-color: #255625;
}
table .del:hover {
  background-color: #c9302c;
}
</style>