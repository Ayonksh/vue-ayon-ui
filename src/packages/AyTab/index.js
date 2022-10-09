import AyTab from "./src/tab";

AyTab.install = function (Vue) {
  Vue.component(AyTab.name, AyTab);
};

export default AyTab;
