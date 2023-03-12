<template>
  <transition name="ay-fade">
    <div
      class="ay-loading__mask"
      :style="{ 'background-color': background || '' }"
      v-show="visible"
    >
      <div class="ay-loading__loader"></div>
      <span class="ay-loading__text" v-if="text">{{ text }}</span>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      background: null,
      text: "Loading...",
    };
  },
  methods: {
    setText(text) {
      this.text = text;
    },
  },
};
</script>

<style lang="scss" scoped>
.ay-loading__mask {
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  margin: auto;
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s;
  z-index: 5000;
  .ay-loading__loader {
    width: 30px;
    height: 30px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #1989fa;
    border-radius: 50%;
    animation: rotate 1.2s infinite linear;
  }
  .ay-loading__text {
    margin: 4px 0;
    color: #409eff;
    font-size: 14px;
  }
  &.fullscreen {
    position: fixed;
    .ay-loading__loader {
      width: 50px;
      height: 50px;
    }
    .ay-loading__text {
      margin: 6px 0;
      font-size: 15px;
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(1turn);
  }
}

.ay-fade-enter,
.ay-fade-leave-active {
  opacity: 0;
}
</style>
