import AyPopover from "./src/popover";

AyPopover.install = function (Vue) {
  Vue.component(AyPopover.name, AyPopover);
};

export default AyPopover;
