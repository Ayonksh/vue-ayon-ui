<template>
  <div class="ay-tab-pane" v-if="!lazy || active" v-show="active">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "AyTabPane",
  inject: ["root"],
  props: {
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    lazy: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    active() {
      return this.root.currentName === this.name;
    },
  },
  mounted() {
    this.root.setPanes(this);
  },
  // 和 template 作用一样
  // render() {
  //   const { lazy, active } = this;
  //   return lazy ? (
  //     <div style={{ display: active ? "block" : "none" }}>
  //       {this.$slots.default}
  //     </div>
  //   ) : active ? (
  //     <div>{this.$slots.default}</div>
  //   ) : null;
  // },
};
</script>

<style lang="scss" scoped></style>
