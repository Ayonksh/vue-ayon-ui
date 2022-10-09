import AyTabPane from "../AyTab/src/tab-pane";

AyTabPane.install = function (Vue) {
  Vue.component(AyTabPane.name, AyTabPane);
};

export default AyTabPane;
