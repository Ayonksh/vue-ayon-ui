<template>
  <transition name="ay-fade">
    <div class="ay-loading" @click.stop="onClickLoading">
      <slot></slot>
      <div
        class="ay-loading__mask"
        :style="{ 'background-color': background }"
        v-if="loading"
      >
        <div class="ay-loading__loader"></div>
        <span class="ay-loading__title" v-if="title">{{ title }}</span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "AyLoading",
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
    // 遮罩背景色
    background: String,
    // 显示在加载图标下方的加载文案
    title: String,
  },
  methods: {
    onClickLoading() {
      this.$emit("click");
    },
  },
};
</script>

<style lang="scss" scoped>
.ay-loading {
  position: relative;
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
    z-index: 2000;
    .ay-loading__loader {
      width: 30px;
      height: 30px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #409eff;
      border-radius: 50%;
      animation: rotate 1.2s infinite linear;
    }
    .ay-loading__title {
      margin: 4px 0;
      color: #409eff;
      font-size: 14px;
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
