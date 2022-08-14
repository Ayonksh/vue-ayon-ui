<template>
  <div class="ay-progress">
    <div
      class="ay-progress-bar"
      :style="{ width: barWidth, height: barHeight }"
      v-if="type === 'line'"
      ref="bar"
      @click="handleClick"
    >
      <div
        class="ay-progress-bar__inner"
        :class="
          barMode === 'horizontal'
            ? 'ay-progress-bar__inner--horizontal'
            : 'ay-progress-bar__inner--vertical'
        "
        :style="barInnerStyle"
      ></div>
      <div
        class="ay-progress-bar__btn"
        :style="barBtnStyle"
        v-if="!disable"
        ref="btn"
        @mousedown="onMousedown"
      ></div>
    </div>
    <div
      class="ay-progress-circle"
      :style="{ width: groundWidth, height: groundWidth }"
      v-else
    >
      <svg viewBox="0 0 100 100">
        <path
          :d="trackPath"
          stroke="#e5e9f2"
          :stroke-width="relativeStrokeWidth"
          fill="none"
          :style="trailPathStyle"
        ></path>
        <path
          :d="trackPath"
          :stroke="stroke"
          :stroke-width="percentage ? relativeStrokeWidth : 0"
          :stroke-linecap="strokeLinecap"
          fill="none"
          :style="circlePathStyle"
        ></path>
      </svg>
    </div>
    <div
      class="ay-progress-text"
      :style="textStyle"
      v-if="showProgress"
      ref="text"
    >
      <template>{{ content }}</template>
    </div>
  </div>
</template>

<script>
import { on, off } from "@/utils/dom";

export default {
  name: "AyProgress",
  model: {
    prop: "percentage",
    event: "percentageChange",
  },
  props: {
    // 当前进度，值为 0 - 1
    percentage: Number,
    // 种类
    type: {
      type: String,
      default: "line",
      validator: (value) => ["line", "circle", "dashboard"].indexOf(value) > -1,
    },
    // 是否允许调整进度
    disable: Boolean,
    // 颜色
    color: {
      type: [String, Array, Function],
      default: "",
    },
    // 是否显示进度文字内容
    showProgress: {
      type: Boolean,
      default: true,
    },
    // 指定进度文字内容
    format: Function,

    // 当 type 为 line 的时候
    // 进度条的方向
    barMode: {
      type: String,
      default: "horizontal",
      validator: (value) => ["horizontal", "vertical"].indexOf(value) > -1,
    },
    // 进度条宽度
    barWidth: {
      type: String,
      default: "500px",
    },
    // 进度条高度
    barHeight: {
      type: String,
      default: "4px",
    },
    // 进度条的小球大小计算系数
    coefficient: {
      type: Number,
      default: 2,
    },

    // 当 type 为 circle 或者 dashboard 的时候
    // 进度环的画布宽度
    groundWidth: {
      type: String,
      default: "126px",
    },
    // 进度环的线条宽度
    strokeWidth: {
      type: String,
      default: "6px",
    },
    // 进度环的线条路径两端的形状
    strokeLinecap: {
      type: String,
      default: "round",
      validator: (value) => ["butt", "round", "square"].indexOf(value) > -1,
    },
  },
  data() {
    return {
      barWidth_: Number(this.barWidth.split("px")[0]),
      barHeight_: Number(this.barHeight.split("px")[0]),
      movingStartX: 0,
      movingStartY: 0,
      moving: false,
      groundWidth_: Number(this.groundWidth.split("px")[0]),
      strokeWidth_: Number(this.strokeWidth.split("px")[0]),
    };
  },
  computed: {
    barInnerStyle() {
      if (this.barMode === "horizontal") {
        return {
          width: `${this.percentage * this.barWidth_}px`,
          backgroundColor: this.stroke,
        };
      } else {
        return {
          height: `${this.percentage * this.barHeight_}px`,
          backgroundColor: this.stroke,
        };
      }
    },
    barBtnStyle() {
      const { btnPos, btnWidth } = this;
      if (this.barMode === "horizontal") {
        return {
          width: `${btnWidth}px`,
          height: `${btnWidth}px`,
          left: btnPos,
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: this.stroke,
        };
      } else {
        return {
          width: `${btnWidth}px`,
          height: `${btnWidth}px`,
          // left: "50%",
          // transform: "translateX(-50%)",
          left: `calc(50% - ${btnWidth / 2}px)`, // 也可以用 calc 定位
          bottom: btnPos,
          backgroundColor: this.stroke,
        };
      }
    },
    btnPos() {
      const { btnWidth } = this;
      if (this.barMode === "horizontal") {
        const currentPos = this.percentage * this.barWidth_ - btnWidth / 2;
        return `${currentPos}px`;
      } else {
        const currentPos = this.percentage * this.barHeight_ - btnWidth / 2;
        return `${currentPos}px`;
      }
    },
    btnWidth() {
      if (this.barMode === "horizontal") {
        return this.barHeight_ * this.coefficient;
      } else {
        return this.barWidth_ * this.coefficient;
      }
    },
    relativeStrokeWidth() {
      return ((this.strokeWidth_ / this.groundWidth_) * 100).toFixed(1);
    },
    radius() {
      if (this.type === "circle" || this.type === "dashboard") {
        return parseInt(50 - parseFloat(this.relativeStrokeWidth) / 2, 10);
      } else {
        return 0;
      }
    },
    trackPath() {
      const radius = this.radius;
      const isDashboard = this.type === "dashboard";
      return `
          M 50 50
          m 0 ${isDashboard ? "" : "-"}${radius}
          a ${radius} ${radius} 0 1 1 0 ${isDashboard ? "-" : ""}${radius * 2}
          a ${radius} ${radius} 0 1 1 0 ${isDashboard ? "" : "-"}${radius * 2}
          `;
    },
    perimeter() {
      return 2 * Math.PI * this.radius;
    },
    rate() {
      return this.type === "dashboard" ? 0.75 : 1;
    },
    strokeDashoffset() {
      const offset = (-1 * this.perimeter * (1 - this.rate)) / 2;
      return `${offset}px`;
    },
    trailPathStyle() {
      return {
        strokeDasharray: `${this.perimeter * this.rate}px, ${this.perimeter}px`,
        strokeDashoffset: this.strokeDashoffset,
      };
    },
    circlePathStyle() {
      return {
        strokeDasharray: `${this.perimeter * this.rate * this.percentage}px,
          ${this.perimeter}px`,
        strokeDashoffset: this.strokeDashoffset,
        transition: "stroke-dasharray 0.6s ease 0s, stroke 0.6s ease",
      };
    },
    status() {
      if (this.percentage >= 0.75) {
        return "success";
      } else if (this.percentage >= 0.5 && this.percentage < 0.75) {
        return "inspiring";
      } else if (this.percentage >= 0.25 && this.percentage < 0.5) {
        return "warning";
      } else {
        return "danger";
      }
    },
    stroke() {
      let ret;
      if (this.color) {
        ret = this.getCurrentColor(this.percentage);
      } else {
        switch (this.status) {
          case "success":
            ret = "#13ce66";
            break;
          case "inspiring":
            ret = "#409eff";
            break;
          case "warning":
            ret = "#e6a23c";
            break;
          case "danger":
            ret = "#f56c6c";
        }
      }
      return ret;
    },
    textStyle() {
      const style = {};
      style.fontSize = this.progressTextSize + "px";
      style.color = this.stroke;
      if (this.type === "line") {
        if (this.barMode === "horizontal") {
          style.marginLeft = "10px";
        } else {
          style.marginBottom = "5px";
        }
      } else {
        style.width = this.groundWidth;
        style.position = "absolute";
        style.left = 0;
        style.top = "50%";
        style.transform = "translateY(-50%)";
      }
      return style;
    },
    progressTextSize() {
      if (this.type === "line") {
        if (this.barMode === "horizontal") {
          return 12 + this.barHeight_ * 0.1;
        } else {
          return 12 + this.barWidth_ * 0.1;
        }
      } else {
        return this.groundWidth_ * 0.1 + 2;
      }
    },
    content() {
      if (typeof this.format === "function") {
        return this.format(this.percentage) || "";
      } else {
        return `${(this.percentage * 100).toFixed(1)}%`;
      }
    },
  },
  mounted() {
    on(document, "mouseup", this.stopMove);
    this.$nextTick(() => {
      if (this.type === "line" && this.barMode === "vertical") {
        let node = this.$refs.text;
        let refNode = this.$refs.bar;
        this.$el.insertBefore(node, refNode);
        this.$el.style.display = "flex";
        this.$el.style.justifyContent = "center";
        this.$el.style.alignItems = "center";
        this.$el.style.flexDirection = "column";
      }
    });
  },
  methods: {
    formatPercentage(percentage) {
      return Math.max(Math.min(percentage, 1), 0);
    },
    handleClick(e) {
      if (this.disable) return;
      // 点击小球时跳过
      if (e.target === this.$refs.btn) {
        return;
      }
      let percent;
      if (this.barMode === "horizontal") {
        percent = this.formatPercentage(e.offsetX / this.barWidth_);
      } else {
        percent = this.formatPercentage(
          (this.barHeight_ - e.offsetY) / this.barHeight_
        );
      }
      this.$emit("percentageChange", percent);
      this.$emit("bar-click", percent);
    },
    onMousedown(e) {
      if (this.disable) return;
      this.moving = true;
      const btn = this.$refs.btn;
      if (this.barMode === "horizontal") {
        this.movingStartX = e.clientX - btn.offsetLeft;
      } else {
        this.movingStartY = e.clientY - btn.offsetTop;
      }
      on(document, "mousemove", this.onMousemove);
    },
    onMousemove(e) {
      if (this.disable) return;
      if (this.moving) {
        let percent;
        if (this.barMode === "horizontal") {
          percent = this.formatPercentage(
            (e.clientX - this.movingStartX) / this.barWidth_
          );
        } else {
          percent = this.formatPercentage(
            (this.barHeight_ - (e.clientY - this.movingStartY)) /
              this.barHeight_
          );
        }
        this.$emit("percentageChange", percent);
        this.$emit("moving");
      }
    },
    stopMove() {
      this.moving = false;
      this.$emit("moving-stop");
      off(document, "mousemove", this.onMousemove);
    },
    getCurrentColor(percentage) {
      if (typeof this.color === "string") {
        return this.color;
      } else if (typeof this.color === "function") {
        return this.color(percentage);
      } else {
        return this.getLevelColor(percentage);
      }
    },
    getLevelColor(percentage) {
      const colorArray = this.getColorArray().sort(
        (a, b) => a.percentage - b.percentage
      );

      for (let i = 0; i < colorArray.length; i++) {
        if (colorArray[i].percentage > percentage) {
          return colorArray[i].color;
        }
      }
      return colorArray[colorArray.length - 1].color;
    },
    getColorArray() {
      const color = this.color;
      const span = 1 / color.length;
      return color.map((seriesColor, index) => {
        if (typeof seriesColor === "string") {
          return {
            color: seriesColor,
            percentage: (index + 1) * span,
          };
        }
        return seriesColor;
      });
    },
  },
  beforeDestroy() {
    off(document, "mouseup", this.stopMove);
    off(document, "mousemove", this.onMousemove);
  },
};
</script>

<style lang="scss" scoped>
.ay-progress {
  position: relative;
  .ay-progress-bar {
    background-color: #ebeef5;
    border-radius: 5px;
    position: relative;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
    &__inner {
      border-radius: 5px;
      position: absolute;
      &--horizontal {
        height: inherit;
        left: 0;
      }
      &--vertical {
        width: inherit;
        bottom: 0;
      }
    }
    &__btn {
      border-radius: 50%;
      position: absolute;
      cursor: pointer;
    }
  }
  .ay-progress-text {
    display: inline-block;
    vertical-align: middle;
    text-align: center;
  }
}
</style>
