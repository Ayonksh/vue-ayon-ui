import AyProgress from "./src/progress";

AyProgress.install = function (Vue) {
  Vue.component(AyProgress.name, AyProgress);
};

export default AyProgress;
