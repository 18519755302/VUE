<template>
  <div class="tips" :class="[type, animate]" v-show="flag">
    {{ msg }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      //   type: "suc",
      //   msg: "",
      flag: false,
      show: false,
    };
  },
  computed: {
    animate() {
      return this.show ? "fadeIn" : "fadeOut";
    },
  },
};
</script>

<style scoped>
.tips {
  position: fixed;
  top: 0;
  margin-top: 15px;
  left: calc(50%);
  transform: translateX(-50%);
  border-radius: 10px;
  padding: 0 15px;
  height: 55px;
  min-width: 150px;
  line-height: 55px;
  text-align: center;
}

.suc {
  background-color: #f0f9eb;
  color: #67c23a;
  border: 2px solid #e6f5dd;
}

.fail {
  background-color: #fef0f0;
  color: #f56c6c;
  border: 2px solid #f9d0d0;
}

.fadeIn {
  animation: fadeIn 1s;
}

.fadeOut {
  animation: fadeOut 3s;
}

@keyframes fadeIn {
  0% {
    top: -100%;
  }

  100% {
    top: 0;
  }
}

@keyframes fadeOut {
  0% {
    top: 0;
  }

  100% {
    top: -100%;
  }
}
</style>