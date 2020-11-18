
<script>
//import HelloWorld from "./components/HelloWorld.vue";
import CmpButton from "./components/CmpButton";
import CmpSlot from "./components/CmpSlot.vue";
export default {
  name: "App",
  data() {
    return {
      show: false,
      //控制if
      num: 2,
      content: "v-bind",
      value: "111",
    };
  },
  components: {
    CmpButton,
    CmpSlot,
  },
  methods: {
    vif() {
      if (this.num === 1) {
        return "<div>if</div>";
      } else if (this.num === 2) {
        return "<div> else if</div>";
      } else {
        return "<div> else</div>";
      }
    },
    handlerClick(num) {
      console.log(num);
    },
  },
  filters: {
    //过滤器
    myfilter(val) {
      console.log(val);
      return "我是内部的，比全局更先执行";
    },
  },
  render() {
    const scopedSlots = {
      scopedSlots: {
        default: (props) => <span>{props.text}</span>,
      },
    };

    return (
      <h1>
        <div domPropsInnerHTML="<a>href</a>"></div>
        <div domPropsTextContent="<p>i am a p</p>"></div>
        <div v-show={this.show}>我是v-show</div>
        v-if {false && <div>v-if</div>}
        v-if.. else ..{true ? <div>v-if</div> : <div>else</div>}
        v-if.. else if ..else..{this.vif()}
        {[1, 2, 3].map((item) => (
          <div key={item}>{item}</div>
        ))}
        <button onClick={this.handlerClick}>onClick</button>
        <button on-click={this.handlerClick}>on-click</button>
        <button onClick={(e) => this.handlerClick(2)}>click传参</button>
        <cmp-button nativeOnClick={this.handlerClick}></cmp-button>
        <input value={this.content} />
        <div class="a b" style={{ fontSize: "14px", color: "red" }}>
          v-bind
        </div>
        <input type="text" v-model={this.content} />
        <div ref="ourref">ref</div>
        {[4, 5, 6].map((item) => (
          <div ref="xx" refInFor={true} key={item}>
            {item}
          </div>
        ))}
        <div>{this.$options.filters["myfilter"](this.value)}</div>
        <cmp-slot>
          default
          <template slot="header">header</template>
        </cmp-slot>
        <cmp-slot
          {...{
            scopedSlots: {
              default: (props) => props.text,
            },
          }}
        ></cmp-slot>
        <cmp-slot {...scopedSlots}></cmp-slot>
      </h1>
    );
  },
  mounted() {
    console.log(this.$refs.ourref);
    console.log(this.$refs.xx);
    console.log(this.$options.filters["myfilter"]);
  },
};
</script>

