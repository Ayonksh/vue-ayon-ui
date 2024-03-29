import AyDialog from "./AyDialog/index";
import AyIcon from "./AyIcon/index";
import AyInput from "./AyInput/index";
import AyLoading from "./AyLoading/index";
import AyMenu from "./AyMenu/index";
import AyMenuItem from "./AyMenuItem/index";
import AyMenuItemGroup from "./AyMenuItemGroup/index";
import AySubMenu from "./AySubMenu/index";
import AyNotice from "./AyNotice/index";
import AyPopover from "./AyPopover/index";
import AyProgress from "./AyProgress/index";
import AySelect from "./AySelect/index";
import AySwiper from "./AySwiper/index";
import AySwiperItem from "./AySwiperItem/index";
import AyTab from "./AyTab/index";
import AyTabPane from "./AyTabPane/index";

const components = [
  AyDialog,
  AyIcon,
  AyInput,
  AyLoading,
  AyMenu,
  AyMenuItem,
  AyMenuItemGroup,
  AySubMenu,
  AyPopover,
  AyProgress,
  AySelect,
  AySwiper,
  AySwiperItem,
  AyTab,
  AyTabPane,
];

const ayonui = {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component);
    });

    Vue.use(AyIcon);
    Vue.use(AyLoading);

    Vue.prototype.$notify = AyNotice;
  },
};

export default ayonui;

export {
  AyDialog,
  AyIcon,
  AyInput,
  AyLoading,
  AyMenu,
  AyMenuItem,
  AyMenuItemGroup,
  AySubMenu,
  AyNotice,
  AyPopover,
  AyProgress,
  AySelect,
  AySwiper,
  AySwiperItem,
  AyTab,
  AyTabPane,
};
