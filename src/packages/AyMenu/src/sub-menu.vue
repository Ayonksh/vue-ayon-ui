<template>
  <li class="ay-sub-menu">
    <div
      class="ay-sub-menu__title"
      :class="isOpen ? 'ay-sub-menu__title--active' : ''"
      @click="toggleSubMenu"
    >
      {{ title }}
      <ay-icon :class="['icon', isOpen ? 'reverse' : '']" icon="arrow-down" />
    </div>
    <ul v-if="isOpen">
      <slot></slot>
    </ul>
  </li>
</template>

<script>
export default {
  name: "AySubMenu",
  provide: function () {
    return {
      subMenu: this,
    };
  },
  inject: ["rootMenu"],
  props: {
    title: {
      type: String,
      default: "title",
      require: true,
    },
    index: {
      type: String,
      default: "",
      require: true,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  mounted() {
    this.rootMenu.setSubMenus(this.index, this);
  },
  methods: {
    toggleSubMenu() {
      this.isOpen ? this.closeSubMenu() : this.openSubMenu();
    },
    openSubMenu() {
      this.isOpen = true;
    },
    closeSubMenu() {
      this.isOpen = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.ay-sub-menu {
  height: auto;
  transition: all 0.3s;
  &__title {
    padding: 0 20px;
    height: 45px;
    line-height: 45px;
    color: #444;
    font-size: 16px;
    position: relative;
    cursor: pointer;
    .icon {
      font-size: 16px;
      color: #444;
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      transition: 0.3s;
    }
    .reverse {
      transform: translateY(-50%) rotate(180deg);
    }
    &--active {
      color: #1989fa;
      .icon {
        color: #1989fa;
      }
    }
  }
  .ay-menu-item {
    padding: 0 40px;
  }
}
</style>
