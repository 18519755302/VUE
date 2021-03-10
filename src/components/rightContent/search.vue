<template>
  <div class="search">
    <label for="search-word">搜索关键字</label>
    <input
      type="text"
      id="search-word"
      v-model="searchWord"
      placeholder="请输入学号或邮箱"
    />
    <button class="search-btn" @click="search">搜索</button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      searchWord: "",
    };
  },
  methods: {
    ...mapActions(["searchByPage", "queryByPage"]),
    search() {
      if (!this.searchWord) {
        this.queryByPage(1);
      } else {
        this.searchByPage({
          search: this.searchWord,
          page: 1,
        });
      }
    },
  },
};
</script>

<style scoped>
.search {
  padding: 20px;
  width: 400px;
}
.search label {
  vertical-align: middle;
  margin-right: 10px;
  font-size: 16px;
  color: #646987;
  font-weight: 800;
}
.search input {
  padding: 5px;
  font-size: 16px;
  margin-right: 10px;
}
.search .search-btn {
  width: 50px;
  height: 30px;
  border: none;
  font-size: 16px;
  color: #fff;
  background-color: #354457;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
}
</style>>
