import Vue from "vue";
import Loading2 from "./loading2.vue";

const LoadingConstructor = Vue.extend(Loading2);

const defaults = {
  fullscreen: true,
  lock: false,
};

let fullscreenLoading; // 用来保存 loading 实例

LoadingConstructor.prototype.close = function () {
  if (this.fullscreen) {
    fullscreenLoading = undefined;
  }
  const target = this.fullscreen ? document.body : this.target;
  target.style.position = "";
  target.style.overflow = "";
  this.$el?.parentNode?.removeChild(this.$el);
  this.visible = false;
};

const loadingService = (options = {}) => {
  options = { ...defaults, ...options };
  if (typeof options.target === "string") {
    options.target = document.querySelector(options.target);
  }
  options.target = options.target || document.body;
  if (options.target === document.body) {
    options.fullscreen = true;
  } else {
    options.fullscreen = false;
  }
  // 覆盖整个 body 的 loading 只能有一个
  if (options.fullscreen && fullscreenLoading) {
    return fullscreenLoading;
  }
  let parent = options.fullscreen ? document.body : options.target;

  let instance = new LoadingConstructor({
    el: document.createElement("div"),
    data: options,
  });

  if (options.fullscreen) {
    instance.originalPosition = document.body.style.position;
    instance.originalOverflow = document.body.style.overflow;
  } else {
    instance.originalPosition = parent.style.position;
  }
  if (
    instance.originalPosition !== "absolute" &&
    instance.originalPosition !== "fixed" &&
    instance.originalPosition !== "sticky"
  ) {
    parent.style.position = "relative";
  }
  if (options.fullscreen && options.lock) {
    parent.style.overflow = "hidden";
  }

  parent.appendChild(instance.$el);
  Vue.nextTick(() => {
    instance.visible = true;
  });
  if (options.fullscreen) {
    fullscreenLoading = instance;
  }
  return instance;
};

export default loadingService;
