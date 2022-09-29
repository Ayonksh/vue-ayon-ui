import AyIcon from "./AyIcon/index";
import AyInput from "./AyInput/index";
import AyLoading from "./AyLoading/index";
import AyNotification from "./AyNotification/index";
import AyPopover from "./AyPopover/index";
import AyProgress from "./AyProgress/index";
import AySelect from "./AySelect/index";
import AySwiper from "./AySwiper/index";
import AySwiperItem from "./AySwiperItem/index";

const components = [
  AyIcon,
  AyInput,
  AyLoading,
  AyPopover,
  AyProgress,
  AySelect,
  AySwiper,
  AySwiperItem,
];

const ayonui = {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component);
    });

    Vue.use(AyIcon);
    Vue.use(AyLoading);

    Vue.prototype.$notify = AyNotification;
  },
};

export default ayonui;

export {
  AyIcon,
  AyInput,
  AyLoading,
  AyNotification,
  AyPopover,
  AyProgress,
  AySelect,
  AySwiper,
  AySwiperItem,
};
