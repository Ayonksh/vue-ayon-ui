import AySwiperItem from "../AySwiper/src/swiper-item";

AySwiperItem.install = function (Vue) {
  Vue.component(AySwiperItem.name, AySwiperItem);
};

export default AySwiperItem;
