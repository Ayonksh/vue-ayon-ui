import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

import ayonui from "./packages";
Vue.use(ayonui);

import "@/assets/scss/index.scss";

new Vue({
  render: (h) => h(App),
}).$mount("#app");
