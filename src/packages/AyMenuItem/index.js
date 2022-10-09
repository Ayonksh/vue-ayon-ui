import AyMenuItem from "../AyMenu/src/menu-item";

AyMenuItem.install = function (Vue) {
  Vue.component(AyMenuItem.name, AyMenuItem);
};

export default AyMenuItem;
