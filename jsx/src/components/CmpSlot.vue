<script>
export default {
  render() {
    return (
      <div>
        {this.$scopedSlots.default({
          text: "~~~HelloWorld~~~~~~~",
        })}
      </div>
    );
  },
};
</script>