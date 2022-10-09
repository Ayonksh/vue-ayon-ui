import AyDialog from "./src/dialog";

AyDialog.install = function (Vue) {
  Vue.component(AyDialog.name, AyDialog);
};

export default AyDialog;
