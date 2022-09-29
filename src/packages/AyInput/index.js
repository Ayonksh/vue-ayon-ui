import AyInput from "./src/input";

AyInput.install = function (Vue) {
  Vue.component(AyInput.name, AyInput);
};

export default AyInput;
