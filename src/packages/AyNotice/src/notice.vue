<template>
  <transition name="ay-notice-fade">
    <div
      :class="['ay-notice', `ay-notice--${horizontalClass}`]"
      :style="positiveStyle"
      v-if="visible"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <div class="ay-notice__header">
        <h1 class="ay-notice__title">{{ title }}</h1>
        <ay-icon class="close" icon="close" @click.stop="handleClose" />
      </div>
      <div class="ay-notice__content" v-if="message">
        {{ message }}
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "AyNotice",
  data() {
    return {
      visible: false,
      title: "",
      message: "",
      duration: 4000,
      position: "top-right",
      verticalOffset: 0,
      closed: false,
      onClose: () => {},
      timer: null,
    };
  },
  computed: {
    horizontalClass() {
      return this.position.indexOf("right") > -1 ? "right" : "left";
    },
    verticalProperty() {
      return /^top-/.test(this.position) ? "top" : "bottom";
    },
    positiveStyle() {
      return {
        [this.verticalProperty]: `${this.verticalOffset}px`,
      };
    },
  },
  mounted() {
    this.startTimer();
    document.addEventListener("keydown", this.keydown);
  },
  methods: {
    handleClose() {
      this.onClose();
      this.visible = false;
      this.closed = true;
    },
    clearTimer() {
      clearTimeout(this.timer);
    },
    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.handleClose();
          }
        }, this.duration);
      }
    },
    keydown(e) {
      if (e.keyCode === 46 || e.keyCode === 8) {
        this.clearTimer(); // detele 取消倒计时
      } else if (e.keyCode === 27) {
        // esc关闭消息
        if (!this.closed) {
          this.handleClose();
        }
      } else {
        this.startTimer(); // 恢复倒计时
      }
    },
    beforeDestroy() {
      document.removeEventListener("keydown", this.keydown);
    },
  },
};
</script>

<style lang="scss" scoped>
.ay-notice {
  width: 250px;
  padding: 14px 20px;
  border-radius: 10px;
  background-color: #fff;
  transition: 0.8s;
  overflow: hidden;
  z-index: 9999;
  position: fixed;
  box-shadow: 0 2px 12px 4px rgba(0, 0, 0, 0.15);
  &--left {
    left: 16px;
  }
  &--right {
    right: 16px;
  }
  .ay-notice__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .ay-notice__title {
      width: 80%;
      font-size: 18px;
      font-weight: bold;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .close {
      font-size: 16px;
      cursor: pointer;
    }
  }
  .ay-notice__content {
    margin-top: 12px;
    font-size: 15px;
    font-weight: 500;
  }
}
.ay-notice-fade-enter {
  &.right {
    right: 0;
    transform: translateX(100%);
  }
  &.left {
    left: 0;
    transform: translateX(-100%);
  }
}
.ay-notice-fade-leave-active {
  opacity: 0;
}
</style>
