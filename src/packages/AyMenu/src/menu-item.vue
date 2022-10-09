<template>
  <li
    class="ay-menu-item"
    :class="[
      rootMenu.activeIndex === index ? 'ay-menu-item--active' : '',
      disable ? 'ay-menu-item--disable' : '',
    ]"
    @click.stop="selectMenu"
  >
    <slot></slot>
  </li>
</template>

<script>
export default {
  name: "AyMenuItem",
  inject: ["rootMenu"],
  props: {
    index: {
      type: String,
      default: "",
      required: true,
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.rootMenu.setItems(this.index, this);
  },
  methods: {
    selectMenu() {
      if (!this.disable) this.$emit("activeIndexChange", this.index);
    },
  },
};
</script>

<style lang="scss" scoped>
.ay-menu-item {
  // padding: 0 20px;
  height: 40px;
  line-height: 40px;
  color: #444;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  &--active {
    color: #1989fa;
    background-color: #c9e4fa;
    position: relative;
    &::after {
      content: "";
      width: 3px;
      height: 40px;
      background-color: #d33a31;
      position: absolute;
      right: 0;
    }
  }
  &--disable {
    cursor: wait;
    opacity: 0.4;
  }
}
</style>
