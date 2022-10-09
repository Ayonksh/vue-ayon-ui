<template>
  <transition name="fade">
    <div class="ay-dialog__wrapper" v-if="visible">
      <transition name="dialog">
        <div class="ay-dialog" v-show="visible" :style="dialogStyle">
          <div class="ay-dialog__header">
            <slot name="header">
              <div>{{ title }}</div>
            </slot>
            <ay-icon class="close" icon="close" @click.stop="closeDialog" />
          </div>
          <div class="ay-dialog__body">
            <slot></slot>
          </div>
          <div class="ay-dialog__footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: "AyDialog",
  model: {
    prop: "visible",
    event: "visibleChange",
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    width: {
      type: String,
      default: "50%",
    },
    title: {
      type: String,
      default: "",
    },
    close: Function,
  },
  computed: {
    dialogStyle() {
      const { width } = this;
      return {
        width,
      };
    },
  },
  methods: {
    closeDialog() {
      this.close ? this.close() : this.$emit("visibleChange", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.ay-dialog__wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  .ay-dialog {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 5px 5px rgba(0, 0, 0, 0.15);
    &__header {
      padding: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .close {
        font-size: 16px;
        cursor: pointer;
      }
    }
    &__body {
      padding: 20px;
    }
    &__footer {
      padding: 20px;
    }
  }
}
</style>
