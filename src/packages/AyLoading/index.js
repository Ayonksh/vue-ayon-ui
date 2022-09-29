import AyLoading from "./src/loading";
import directive from "./src/directive";
import service from "./src/service";

AyLoading.install = function (Vue) {
  Vue.component(AyLoading.name, AyLoading);
  Vue.use(directive);
  Vue.prototype.$loading = service;
};

export default AyLoading;
