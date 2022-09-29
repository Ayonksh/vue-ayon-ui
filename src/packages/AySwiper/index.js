import AySwiper from "./src/swiper";

AySwiper.install = function (Vue) {
  Vue.component(AySwiper.name, AySwiper);
};

export default AySwiper;
