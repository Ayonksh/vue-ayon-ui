<template>
  <ul class="ay-menu">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: "AyMenu",
  provide: function () {
    return {
      rootMenu: this,
    };
  },
  props: {
    defaultActive: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      activeIndex: this.defaultActive,
      menuItems: {},
      subMenus: {},
    };
  },
  watch: {
    activeIndex(index) {
      this.$emit("activeIndex", index);
    },
  },
  methods: {
    updateActiveIndex(val) {
      this.activeIndex = val;
    },
    // 初始化 menuItems，在 menuItem 组件 mounted 阶段调用
    setItems(key, menuItem) {
      this.menuItems[key] = menuItem;
      menuItem.$on("activeIndexChange", this.updateActiveIndex);
    },
    // 初始化 subMenus，在 subMenu 组件 mounted 阶段调用
    setSubMenus(key, subMenu) {
      this.subMenus[key] = subMenu;
    },
  },
};
</script>

<style lang="scss" scoped>
.ay-menu {
  height: 100%;
  border-right: 1px #ebeef5 solid;
  overflow: auto;
}
</style>
