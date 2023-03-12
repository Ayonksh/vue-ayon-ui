<template>
  <div class="app">
    <div class="menu">
      <ay-menu :defaultActive="activeMenuIdx" @activeIndex="activeMenuChange">
        <ay-menu-item-group title="分组1">
          <ay-menu-item index="1">菜单1</ay-menu-item>
          <ay-menu-item index="2" :disable="true">菜单2</ay-menu-item>
          <ay-menu-item index="3">菜单3</ay-menu-item>
        </ay-menu-item-group>
        <ay-sub-menu title="菜单4" index="4">
          <ay-menu-item index="4-1">子菜单1</ay-menu-item>
          <ay-menu-item index="4-2">子菜单2</ay-menu-item>
        </ay-sub-menu>
      </ay-menu>
    </div>
    <div class="content">
      <div class="tab">
        <ay-tab v-model="activeTabName">
          <ay-tab-pane name="走马灯" label="走马灯">
            <ay-swiper height="250px" type="card">
              <ay-swiper-item v-for="banner in banners" :key="banner.url">
                <img
                  class="swiper"
                  :src="require('@/assets/img/' + banner.url)"
                />
              </ay-swiper-item>
            </ay-swiper>
          </ay-tab-pane>
          <ay-tab-pane name="加载" label="加载">
            <ay-loading :loading="loading" text="拼命加载中">
              <div class="loading">
                <span v-if="loading">加载中...需要2秒</span>
                <span v-else>加载完成</span>
              </div>
            </ay-loading>
            <button
              class="button"
              @click="openFullScreen1"
              v-loading.fullscreen="fullscreenLoading"
              ay-loading-text="拼命加载中"
            >
              指令方式
            </button>
            <button class="button" @click="openFullScreen2">服务方式</button>
          </ay-tab-pane>
          <ay-tab-pane name="进度条" label="进度条">
            <h1>线性进度条</h1>
            <div class="progress">
              <h3>水平</h3>
              <ay-progress
                v-model="linePercentage"
                :disable="progressDisable1"
                :showProgress="showProgress1"
              />
              <button class="button" @click="hideProgress1">
                <span v-if="showProgress1">隐藏百分比</span>
                <span v-else>显示百分比</span>
              </button>
              <button class="button" @click="disableProgress1">
                <span v-if="!progressDisable1">禁止拖动</span>
                <span v-else>开启拖动</span>
              </button>
            </div>
            <div class="progress">
              <h3>垂直</h3>
              <ay-progress
                :percentage="0.8"
                strokeWidth="6px"
                barMode="vertical"
                barLength="100px"
                color="green"
              />
            </div>
            <h1>圆形进度条</h1>
            <div class="progress" style="display: flex; align-items: center">
              <ay-progress
                v-model="circlePercentage"
                type="circle"
                strokeWidth="5px"
                :color="color"
                :showProgress="showProgress2"
              ></ay-progress>
              <button class="button" @click="hideProgress2">
                <span v-if="showProgress2">隐藏百分比</span>
                <span v-else>显示百分比</span>
              </button>
              <button
                class="button"
                @click="
                  () => {
                    this.color = 'red';
                  }
                "
              >
                <span>红色</span>
              </button>
              <button
                class="button"
                @click="
                  () => {
                    this.color = 'green';
                  }
                "
              >
                <span>绿色</span>
              </button>
            </div>
          </ay-tab-pane>
          <ay-tab-pane name="弹出框" label="弹出框">
            <ay-popover trigger="click" placement="bottom-start">
              <button class="button">朝下左 click</button>
              <template slot="content">
                <div style="height: 100px">
                  <span>气泡卡片内容</span>
                </div>
              </template>
            </ay-popover>
            <ay-popover trigger="click" placement="bottom">
              <button class="button">朝下 click</button>
              <template slot="content">
                <div style="height: 100px">
                  <span>气泡卡片内容</span>
                </div>
              </template>
            </ay-popover>
            <ay-popover trigger="click" placement="bottom-end">
              <button class="button">朝下右 click</button>
              <template slot="content">
                <div style="height: 100px">
                  <span>气泡卡片内容</span>
                </div>
              </template>
            </ay-popover>
            <ay-popover trigger="hover" placement="right">
              <button class="button">朝右 hover</button>
              <template slot="content">
                <div style="height: 100px">
                  <span>气泡卡片内容</span>
                </div>
              </template>
            </ay-popover>
            <ay-popover trigger="manual" placement="left">
              <button class="button">朝左 manual</button>
              <template slot="content">
                <div style="height: 100px">
                  <span>气泡卡片内容</span>
                </div>
              </template>
            </ay-popover>
          </ay-tab-pane>
          <ay-tab-pane name="选择器" label="选择器">
            <ay-select
              v-model="selected"
              placeholder="自定义placeholder"
              :list="selectListData"
              :multiple="multiple"
              clearable
            />
            <button class="button" @click="changeMultiple">
              <span v-if="multiple">设为单选</span>
              <span v-else>设为多选</span>
            </button>
          </ay-tab-pane>
          <!-- <ay-tab-pane name="对话框" label="对话框">
            <button
              class="button"
              @click="
                () => {
                  this.dialogVisible = true;
                }
              "
            >
              <span>打开 dialog</span>
            </button>
          </ay-tab-pane> -->
        </ay-tab>
      </div>
    </div>
    <ay-dialog v-model="dialogVisible" :handleClose="(dialogVisible = false)">
      <template slot="header">
        <div>标题插槽</div>
      </template>
      <h1>这是内容区域</h1>
      <template slot="footer">这是Footer</template>
    </ay-dialog>
  </div>
</template>

<script>
import { AyNotice } from "./packages";
export default {
  name: "",
  data() {
    return {
      activeMenuIdx: "1",
      activeTabName: "走马灯",
      banners: [{ url: "1.jpg" }, { url: "2.jpg" }, { url: "3.jpg" }],
      loading: true,
      fullscreenLoading: false,
      linePercentage: 0.2,
      progressDisable1: false,
      showProgress1: true,
      circlePercentage: 0.5,
      color: "red",
      showProgress2: true,
      selected: "",
      selectListData: [
        { label: "Item 1", value: "1" },
        { label: "Item 2", value: "2" },
        { label: "Item 3", value: "3" },
        { label: "Item 4", value: "4" },
        { label: "Item 5", value: "5" },
      ],
      multiple: false,
      dialogVisible: false,
    };
  },
  mounted() {
    AyNotice({
      duration: 0,
      title: "这是不会消失的一个通知框",
      message: "AyNotice()调用",
    });
    this.$notify({ title: "这是一个通知框", message: "this.$notify()调用" });
  },
  watch: {
    activeTabName(name) {
      if (name === "加载") {
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      } else {
        this.loading = true;
      }
    },
  },
  methods: {
    activeMenuChange(idx) {
      this.activeMenuIdx = idx;
    },
    openFullScreen1() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 2000);
    },
    openFullScreen2() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        loading.close();
      }, 2000);
    },
    disableProgress1() {
      this.progressDisable1 = !this.progressDisable1;
    },
    hideProgress1() {
      this.showProgress1 = !this.showProgress1;
    },
    hideProgress2() {
      this.showProgress2 = !this.showProgress2;
    },
    changeMultiple() {
      this.multiple = !this.multiple;
    },
  },
};
</script>

<style lang="scss" scoped>
.app {
  height: 100vh;
  display: flex;
  .menu {
    width: 20%;
    height: 100%;
  }
  .content {
    width: 100%;
    height: 100%;
    padding: 0 60px;
    overflow: auto;
    .tab {
      margin: 20px 0;
      .swiper {
        height: 100%;
        border-radius: 10px;
      }
      .loading {
        height: 200px;
        background-color: #1989fa;
      }
      .progress {
        margin: 10px 0;
      }
      .button {
        width: 100px;
        height: 40px;
        margin: 10px;
        border: 1px solid #dcdfe6;
        border-radius: 6px;
        background-color: white; // 白色
        cursor: pointer;
        vertical-align: middle; // 中对齐, 为了以后的icon准备的
        display: inline-flex;
        justify-content: center;
        align-items: center;
        outline: none;
      }
    }
  }
}
</style>
