import AyMenu from "./src/menu";

AyMenu.install = function (Vue) {
  Vue.component(AyMenu.name, AyMenu);
};

export default AyMenu;
