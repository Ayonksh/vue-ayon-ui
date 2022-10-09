<template>
  <li class="ay-menu-item-group">
    <div class="ay-menu-item-group__title">{{ title }}</div>
    <ul>
      <slot></slot>
    </ul>
  </li>
</template>

<script>
export default {
  name: "AyMenuItemGroup",
  provide: function () {
    return {
      menuItemGroup: this,
    };
  },
  inject: ["rootMenu"],
  props: {
    title: {
      type: String,
      default: "group-title",
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.ay-menu-item-group {
  &__title {
    padding: 0 12px;
    height: 45px;
    line-height: 45px;
    color: #909399;
    font-size: 12px;
  }
  .ay-menu-item {
    padding: 0 20px;
  }
}
</style>
