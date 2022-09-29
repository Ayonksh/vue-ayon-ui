import Vue from "vue";
import Loading2 from "./loading2.vue";

const Mask = Vue.extend(Loading2);

const loadingDirective = {};
loadingDirective.install = (Vue) => {
  const toggleLoading = (el, binding) => {
    if (binding.value) {
      Vue.nextTick(() => {
        if (binding.modifiers.fullscreen) {
          el.originalPosition = document.body.style.position;
          el.originalOverflow = document.body.style.overflow;
          el.mask.className = "ay-loading__mask fullscreen";
          insertDom(document.body, el, binding);
        } else {
          el.originalPosition = el.style.position;
          el.mask.className = "ay-loading__mask";
          insertDom(el, el, binding);
        }
      });
    } else {
      const target = binding.modifiers.fullscreen ? document.body : el;
      target.style.position = "";
      target.style.overflow = "";
      el.instance.visible = false;
    }
  };
  const insertDom = (parent, el, binding) => {
    if (el.style.display !== "none" && el.style.visibility !== "hidden") {
      if (
        el.originalPosition !== "absolute" &&
        el.originalPosition !== "fixed" &&
        el.originalPosition !== "sticky"
      ) {
        parent.style.position = "relative";
      }
      if (binding.modifiers.fullscreen && binding.modifiers.lock) {
        parent.style.overflow = "hidden";
      }

      parent.appendChild(el.mask);
      el.instance.visible = true;
      el.domInserted = true;
    }
  };
  Vue.directive("loading", {
    bind: function (el, binding, vnode) {
      const text = el.getAttribute("ay-loading-text");
      const background = el.getAttribute("ay-loading-background");
      const vm = vnode.context;
      const mask = new Mask({
        el: document.createElement("div"),
        data: {
          text: vm?.textExr || text,
          background: vm?.background || background,
          fullscreen: !!binding.modifiers.fullscreen,
        },
      });
      el.instance = mask;
      el.mask = mask.$el;

      binding.value && toggleLoading(el, binding);
    },
    update: function (el, binding) {
      el.instance.setText(el.getAttribute("ay-loading-text"));
      if (binding.oldValue !== binding.value) {
        toggleLoading(el, binding);
      }
    },
    unbind: function (el, binding) {
      if (el.domInserted) {
        el.mask?.parentNode?.removeChild(el.mask);
        toggleLoading(el, { value: false, modifiers: binding.modifiers });
      }
      el.instance?.$destroy();
    },
  });
};

export default loadingDirective;
