<template>
  <div class="date-picker" v-click-outside>
    <div class="picker-input">
      <span class="input-prefix">
        <i class="iconfont icon-date"></i>
      </span>
      <input type="text" :value="showDate" />
    </div>
    <div class="picker-panel">
      <div class="picker-arrow" v-if="isShow" />
      <div class="picker-body" v-if="isShow">
        <div class="picker-header">
          <span
            class="picker-btn iconfont icon-prev-year"
            @click="changeYear('prev')"
          />
          <span
            class="picker-btn iconfont icon-prev-month"
            @click="changeMonth('prev')"
          />
          <span class="picker-date">
            {{ selectYearMonthDay.year }}年{{ selectYearMonthDay.month + 1 }}月
          </span>
          <span
            class="picker-btn iconfont icon-next-month"
            @click="changeMonth('next')"
          />
          <span
            class="picker-btn iconfont icon-next-year"
            @click="changeYear('next')"
          />
        </div>
        <div class="picker-content">
          <div class="picker-weeks">
            <div
              v-for="week in ['日', '一', '二', '三', '四', '五', '六']"
              :key="week"
            >
              {{ week }}
            </div>
          </div>

          <div class="picker-days">
            <div
              :class="{
                'is-today': isCur(date),
                'is-select': isSelect(date),
                'other-month': !isShowMonth(date),
              }"
              v-for="date in calendar"
              :key="date.getTime()"
              @click="changeDate(date)"
            >
              {{ date.getDate() }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    dateP: {
      type: Date,
      //默认值为数据或对象时 用函数返回
      //default: () => new Date(),
    },
  },
  model: {
    //model 为 v-model使用
    //变量名
    prop: "dateP",
    //事件名 自己定义事件名
    event: "date-choose",
  },
  data() {
    return {
      //日期面板是否显示
      isShow: false,
      //用于储存改变的月和年
      selectYearMonthDay: {
        year: 0,
        month: 0,
        day: 0,
      },
    };
  },
  methods: {
    //获取 年月日
    getYearMonthDay(date) {
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      return {
        year: year,
        month: month,
        day: day,
      };
    },
    //改变日历是否显示状态
    changeShow(show) {
      this.isShow = show;
    },
    //判断日期是否是今天
    isCur(date) {
      return this.judgeDateEqual(date, new Date()).isSameDay;
    },
    //判断是否是已选日期
    isSelect(date) {
      return this.judgeDateEqual(date, this.dateP).isSameDay;
    },
    //判断是否是显示月份
    isShowMonth(date) {
      const showDate = new Date(
        this.selectYearMonthDay.year,
        this.selectYearMonthDay.month,
        1
      );
      return this.judgeDateEqual(date, showDate).isSameMonth;
    },
    //判断两个日期是否相等 或 年份月份是否相等
    judgeDateEqual(dateOne, dateTwo) {
      const {
        year: yearOne,
        month: monthOne,
        day: dayOne,
      } = this.getYearMonthDay(dateOne);
      const {
        year: yearTwo,
        month: monthTwo,
        day: dayTwo,
      } = this.getYearMonthDay(dateTwo);
      //判断是否是同一月
      let isSameMonth = false;
      //判断是否是同一天
      let isSameDay = false;
      if (yearOne === yearTwo && monthOne === monthTwo) {
        isSameMonth = true;
        if (dayOne === dayTwo) {
          isSameDay = true;
        }
      }
      return {
        isSameDay: isSameDay,
        isSameMonth: isSameMonth,
      };
    },
    //选择日期
    changeDate(date) {
      //输入框 赋值 调用主组件方法
      this.$emit("date-choose", date);
      //日历控制面板 关闭
      this.isShow = false;
      //储存改变的月和年
      this.selectYearMonthDay = this.getYearMonthDay(date);
    },
    //改变 月
    changeMonth(type) {
      type = type === "prev" ? -1 : 1;
      const { year, month, day } = this.selectYearMonthDay;
      const usedate = new Date(year, month, day);
      usedate.setMonth(month + type);
      const { year: finalYear, month: finaMonth } = this.getYearMonthDay(
        usedate
      );
      this.selectYearMonthDay.year = finalYear;
      this.selectYearMonthDay.month = finaMonth;
    },
    //改变 年
    changeYear(type) {
      type = type === "prev" ? -1 : 1;
      this.selectYearMonthDay.year = this.selectYearMonthDay.year + type;
    },
  },
  created() {
    //日历面板头部初始年月赋值
    this.selectYearMonthDay = this.getYearMonthDay(this.dateP);
  },
  computed: {
    //当前日期
    showDate() {
      const { year, month, day } = this.getYearMonthDay(this.dateP);
      return `${year}-${month + 1}-${day}`;
    },
    //日历面板
    calendar() {
      const { year, month } = this.selectYearMonthDay;
      const firstDay = new Date(year, month, 1);
      const weekDay = firstDay.getDay();
      const startTime = firstDay.getTime() - weekDay * 24 * 60 * 60 * 1000;
      let arr = [];
      for (let i = 0; i < 42; i++) {
        arr.push(new Date(startTime + i * 24 * 60 * 60 * 1000));
      }
      return arr;
    },
  },
  directives: {
    //控制面板隐藏或显示
    clickOutside(el, binding, vnode) {
      const vm = vnode.context;
      document.onclick = function (e) {
        const isSon = el.contains(e.target);
        if (isSon && !vm.isShow) {
          //显示日历面板
          vm.changeShow(true);
        } else if (!isSon && vm.isShow) {
          //隐藏日历面板
          vm.changeShow(false);
        }
      };
    },
  },
};
</script>
<style  scoped>
@import "./assets/font.css";
/* 上部 */
.date-picker {
  display: inline-block;
}
.date-picker .picker-input {
  position: relative;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #fff;
}
.date-picker .picker-input input {
  width: 180px;
  padding: 10px 40px;
  cursor: pointer;
}
.date-picker .picker-input .input-prefix {
  position: absolute;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.date-picker .picker-input .input-prefix i {
  font-size: 24px;
  color: #c0c4cc;
}
/* 下部 */
.date-picker .picker-panel {
  position: absolute;
}
/* 三角形 */
.date-picker .picker-panel .picker-arrow {
  position: absolute;
  top: -10px;
  left: 25px;
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-bottom: 10px solid #ebeef5;
}
.date-picker .picker-panel .picker-arrow::after {
  content: "";
  position: absolute;
  top: -8px;
  left: -10px;
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-bottom: 10px solid #fff;
  z-index: 10;
}
/* 日历部分 */
.date-picker .picker-panel .picker-body {
  position: absolute;
  left: 0;
  top: 10px;
  width: 322px;
  height: 329px;
  border: 1px solid #e4e7ed;
  border-radius: 6px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
}
.date-picker .picker-panel .picker-body .picker-header {
  display: flex;
  flex-wrap: nowrap;
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 16px;
}
.date-picker .picker-panel .picker-body .picker-header .picker-btn {
  display: inline-block;
  width: 55px;
  font-size: 18px;
  color: #999;
}
.date-picker .picker-panel .picker-body .picker-header .picker-date {
  display: inline-block;
  width: 130px;
}
.date-picker .picker-panel .picker-body .picker-content {
  margin: 6px 10px;
  color: #606266;
}
.date-picker .picker-panel .picker-body .picker-content .picker-weeks {
  display: flex;
  justify-content: space-around;
  border-bottom: 2px solid #e4e7ed;
  padding-bottom: 12px;
}
.date-picker .picker-panel .picker-body .picker-content .picker-days {
  display: flex;
  flex-wrap: wrap;
}
.date-picker .picker-panel .picker-body .picker-content .picker-days div {
  width: 29px;
  height: 28px;
  margin: 5px 7px;
  line-height: 28px;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
}
.date-picker .picker-panel .picker-body .picker-content .picker-days div:hover {
  color: #409eff;
}
.date-picker
  .picker-panel
  .picker-body
  .picker-content
  .picker-days
  div.is-today {
  color: #409eff;
  font-weight: 700;
}
.date-picker
  .picker-panel
  .picker-body
  .picker-content
  .picker-days
  div.other-month {
  color: #c0c4cc;
}
.date-picker
  .picker-panel
  .picker-body
  .picker-content
  .picker-days
  div.is-select {
  border-radius: 50%;
  background-color: #409eff;
  color: #fff;
}
</style>