<script>
export default {
  name: "AyTabNav",
  inject: ["root"],
  data() {
    return {
      activeBarWidth: 0,
      activeBarOffsetLeft: 0,
    };
  },
  computed: {
    navStyle() {
      const placement = this.root.center ? "center" : "space-between";
      return {
        justifyContent: placement,
      };
    },
    activeNavStyle() {
      const style = {
        fontWeight: "bold",
        color: this.root.activeColor ? this.root.activeColor : "#d33a31",
      };
      return style;
    },
    activeBarStyle() {
      const style = {
        width: this.activeBarWidth,
        transform: `translateX(${this.activeBarOffsetLeft}px)`,
      };
      if (this.root.activeColor) style.backgroundColor = this.root.activeColor;
      return style;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.getActiveBarPosition(`ref_${this.root.currentName}`);
    });
  },
  watch: {
    "root.currentName"(currentName) {
      this.getActiveBarPosition(`ref_${currentName}`);
    },
  },
  methods: {
    changeCurrentName(pane) {
      if (pane.disabled) return;
      this.root.currentName = pane.name;
      this.$emit("selectNav", pane);
    },
    getActiveBarPosition(refName) {
      const ele = this.$refs[refName];
      if (ele) {
        const { width } = window.getComputedStyle(ele);
        this.activeBarWidth = width;
        this.activeBarOffsetLeft = ele.offsetLeft;
      }
    },
  },
  render() {
    return (
      <div class="ay-tab-nav" style={this.navStyle}>
        {this.root.panes.map((pane) => (
          <div
            class={{ "ay-tab-nav__item": true, "is-disabled": pane.disabled }}
            style={
              this.root.currentName === pane.name ? this.activeNavStyle : ""
            }
            onClick={() => {
              this.changeCurrentName(pane);
            }}
            key={pane.name}
            ref={`ref_${pane.name}`}
          >
            {pane.label}
          </div>
        ))}
        <div class="ay-tab-nav__bar" style={this.activeBarStyle}></div>
      </div>
    );
  },
};
</script>

<style lang="scss" scoped>
.ay-tab-nav {
  border-bottom: 1px #ebeef5 solid;
  margin-bottom: 15px;
  position: relative;
  display: flex;
  align-items: center;
  &__item {
    height: 40px;
    margin: 0 12px;
    line-height: 40px;
    cursor: pointer;
  }
  .is-disabled {
    color: #909399;
    cursor: not-allowed;
  }
  &__bar {
    height: 2px;
    background-color: #d33a31;
    position: absolute;
    left: 0;
    bottom: -1.5px;
    transition: 0.3s;
  }
}
</style>
