<template>
  <div class="edit-student">
    <div class="hide-model" @click="hideModel"></div>
    <!-- <transition> -->
    <div class="model-content">
      <h2>编辑学生</h2>
      <form action="#" class="edit">
        <div>
          <label for="name">姓名</label>
          <input
            type="text"
            id="name"
            autocomplete="off"
            @change="edit('name', $event.target.value)"
            :value="student.name"
          />
        </div>
        <div>
          <label for="">性别</label>
          <input
            type="radio"
            name="sex"
            :checked="student.sex === 1"
            @change="edit('sex', 1)"
          />
          <span>女</span>
          <input
            type="radio"
            name="sex"
            :checked="student.sex === 0"
            @change="edit('sex', 0)"
          />
          <span>男</span>
        </div>
        <div>
          <label for="sNo">学号</label>
          <input type="text" id="sNo" :value="student.sNo" readonly />
        </div>
        <div>
          <label for="email">邮箱</label>
          <input
            type="text"
            id="email"
            :value="student.email"
            @change="edit('email', $event.target.value)"
          />
        </div>
        <div>
          <label for="birth">出生年</label>
          <input
            type="text"
            id="birth"
            :value="student.birth"
            @change="edit('birth', $event.target.value)"
          />
        </div>
        <div>
          <label for="tel">手机号</label>
          <input
            type="text"
            id="tel"
            :value="student.phone"
            @change="edit('phone', $event.target.value)"
          />
        </div>
        <div>
          <label for="address">住址</label>
          <input
            type="text"
            id="address"
            :value="student.address"
            @change="edit('address', $event.target.value)"
          />
        </div>
        <div class="btn">
          <button class="tj" @click="updateCommit">提交</button>
        </div>
      </form>
    </div>
    <!-- </transition> -->
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["student", "showModel"]),
  },
  data() {
    return {
      //储存修改信息
      editStudent: {},
    };
  },
  created() {
    //console.log(this.$set);
  },
  methods: {
    ...mapMutations(["isShowModel", "updateStu"]),
    ...mapActions(["queryByPage"]),
    //隐藏模块
    hideModel() {
      this.isShowModel(false);
    },
    //修改暂时存储数据
    edit(key, value) {
      //保存学生数据
      this.$set(this.editStudent, key, value);
    },
    //修改保存
    async updateCommit() {
      let stu = Object.assign({}, this.student, this.editStudent);
      let result = await this.$api.update(stu);
      if (result.status == "success") {
        //重新刷新列表数据
        this.queryByPage(1);
        this.isShowModel(false);
        //隐藏成功后，提示用户
        this.$toast({
          msg: result.msg,
          type: "suc",
        });
      } else {
        this.$toast({
          msg: result.msg,
          type: "fail",
        });
      }
    },
    //延迟alert
    delay(msg) {
      setTimeout(() => {
        alert(msg);
      }, 200);
    },
  },
};
</script>

<style scoped>
.edit-student {
  /* display: none; */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.edit-student .hide-model {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* min-height: 700px; */
  background: rgba(154, 153, 153, 0.5);
}
.edit-student h2 {
  display: block;
  padding: 5px;
  color: rgb(143, 141, 141);
  background-color: rgba(238, 234, 234, 0.5);
}
.edit-student .model-content {
  background-color: #fff;
  border: 2px solid #ddd;
  border-radius: 5px;
}

.edit-student .model-content form {
  margin-top: 35px;
  margin-left: 30px;
}

.edit-student form #sNo {
  color: rgb(154, 153, 153);
}

.edit-student .model-content form .btn .tj {
  margin-left: -60px;
  width: 160px;
  height: 40px;
}

/* 公共代码 */
.model-content {
  position: absolute;
  top: 360px;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 450px;
}
.model-content form {
  width: 400px;
}
.model-content form div {
  margin: 15px 0px;
  font-size: 20px;
  color: rgb(111, 111, 111);
}

.model-content form div label {
  display: inline-block;
  width: 60px;
  text-align: end;
  margin: 0 20px;
}

.model-content form div input[type="text"] {
  font-size: 20px;
  padding: 2px;
  width: 200px;
  outline: none;
  border: 1px solid gray;
}

.model-content form div input[type="radio"] {
  margin: 0 10px;
}
.model-content form .btn {
  text-align: center;
  margin: 25px 10px;
}
.model-content form .btn .tj,
.model-content form .btn .cz {
  width: 70px;
  height: 45px;
  font-size: 20px;
}
.model-content form .btn .tj {
  margin-right: 5px;
}
/* 代码结束 */

.model-content form.edit {
  /* padding: 30px 15px;
  border: 2px solid #ddd;

  border-radius: 5px; */
}
</style>>
