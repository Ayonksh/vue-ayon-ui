<template>
  <div class="ay-tab">
    <div class="ay-tab__header">
      <ay-tab-nav @selectNav="handleNavClick">
        <slot name="header"></slot>
      </ay-tab-nav>
    </div>
    <div class="ay-tab__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import AyTabNav from "./tab-nav";
export default {
  name: "AyTab",
  components: { AyTabNav },
  provide: function () {
    return {
      root: this,
    };
  },
  model: {
    prop: "activeName",
    event: "activeChange",
  },
  props: {
    activeName: {
      type: String,
    },
    activeColor: String,
    center: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      currentName: this.activeName,
      panes: [],
    };
  },
  watch: {
    currentName(currentName) {
      this.$emit("activeChange", currentName);
    },
    activeName(activeName) {
      this.currentName = activeName;
    },
  },
  methods: {
    handleNavClick(pane) {
      if (pane.disabled) return;
      this.$emit("changeTab", pane.name);
    },
    setPanes(pane) {
      this.panes.push(pane);
    },
  },
};
</script>

<style lang="scss" scoped></style>
