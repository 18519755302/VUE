<template>
  <div class="add-student">
    <div class="modal-content">
      <!-- <h2>新增学生</h2> -->
      <form action="#">
        <div>
          <label for="name">姓名</label>
          <input
            type="text"
            id="name"
            v-model="student.name"
            autocomplete="off"
          />
        </div>
        <div>
          <label for="">性别</label>
          <input type="radio" name="sex" v-model="student.sex" value="1" />
          <span>女</span>
          <input type="radio" name="sex" v-model="student.sex" value="0" />
          <span>男</span>
        </div>
        <div>
          <label for="number">学号</label>
          <input type="text" id="number" v-model="student.sNo" />
        </div>
        <div>
          <label for="email">邮箱</label>
          <input type="text" id="email" v-model="student.email" />
        </div>
        <div>
          <label for="birth">出生年</label>
          <input type="text" id="birth" v-model="student.birth" />
        </div>
        <div>
          <label for="tel">手机号</label>
          <input type="text" id="tel" v-model="student.phone" />
        </div>
        <div>
          <label for="address">住址</label>
          <input type="text" id="address" v-model="student.address" />
        </div>
        <div class="btn">
          <input type="button" class="tj" value="提交" @click="addCommit" />
          <input type="button" class="cz" value="重置" @click="reset" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      student: {
        name: "",
        sex: 1,
        sNo: "",
        email: "",
        birth: "",
        phone: "",
        address: "",
      },
    };
  },
  methods: {
    async addCommit() {
      //验证是否有空值
      if (this.checkEmpty()) {
        this.$toast({
          type: "fail",
          msg: "输入有空值，请检查后提交",
        });
        return;
      }
      //保存数据
      let res = await this.$api.add(this.student);
      if (res.status === "success") {
        if (confirm("数据添加成功,是否要继续添加")) {
          this.reset();
        } else {
          this.$router.push("/list");
        }
      } else {
        this.$toast({
          type: "fail",
          msg: res.msg,
        });
      }
    },
    checkEmpty() {
      //验证是否是控制
      return Object.keys(this.student).some((key) => {
        return !this.student[key];
      });
    },
    reset() {
      //置空
      this.student = {
        name: "",
        sex: 1,
        sNo: "",
        email: "",
        birth: "",
        phone: "",
        address: "",
      };
    },
  },
};
</script>

<style scope>
.add-student {
  position: fixed;
  top: 50px;
  left: 150px;
  width: calc(100vw - 150px);
  height: 500px;
}
.modal-content {
  position: fixed;
  top: 360px;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 450px;
}
.modal-content form {
}
.modal-content form div {
  margin: 15px 0px;
  font-size: 20px;
  color: rgb(111, 111, 111);
}

.modal-content form div label {
  display: inline-block;
  width: 60px;
  text-align: end;
  margin: 0 20px;
}

.modal-content form div input[type="text"] {
  font-size: 20px;
  padding: 2px;
  width: 200px;
  outline: none;
  border: 1px solid gray;
}

.modal-content form div input[type="radio"] {
  margin: 0 10px;
}
.modal-content form .btn {
  text-align: center;
  margin: 2px 10px;
}
.modal-content form .btn .tj,
.modal-content form .btn .cz {
  display: inline-block;
  width: 70px;
  height: 45px;
  font-size: 20px;
}
.modal-content form .btn .tj {
  margin-right: 20px;
}
</style>

