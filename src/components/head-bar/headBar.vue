<template>
  <div class="header">
    <div class="nav">
      <div class="back" :class="backClass" @click="back"></div>
      <div class="title" :class="titleClass">{{title}}</div>
      <div class="nav-btn" :class="btnClass" @click="navTo">{{navBtnText}}</div>
    </div>
  </div>
</template>

<script>
 
export default {
  props: {
    title: {
      type: String,
      default: "我的标题"
    },
    navBtnText: {
      type: String,
      default: ""
    },
    backClass: {
      type: String,
      default: ""
    },
    titleClass: {
      type: String,
      default: ""
    },
    btnClass: {
      type: String,
      default: ""
    }
  },
  methods: {
    navTo() {
      this.$emit("nav");
    },
    back(){
      this.$router.go(-1)
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 100px;
  padding-top: 88px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: transparent;

  .nav {
    position: relative;
    height: 100px;
    padding: 0px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .back {
      width: 68px;
      height: 68px;
      border-radius: 50%;
      background-repeat: no-repeat;
      background-position: center center;
    }

    .orange {
      background-color: rgba(255, 255, 255, 0.1);
      background-image: url("../../assets/images/white-back.png");
      background-size: 36px 36px;
    }

    .white {
      background-image: url("../../assets/images/white-back.png");
      background-size: 36px 36px;
    }

    .deep {
      background-color: #fff;
      background-image: url("../../assets/images/deep-back.png");
      background-size: 36px 36px;
    }

    .close {
      background-color: #fff;
      background-image: url("../../assets/images/close.png");
      background-size: 36px 36px;
    }

    .title {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      text-align: center;
      font-size: 36px;
      line-height: 100px;
      z-index: -1;
    }

    .light {
      color: #fff;
    }

    .dark {
      color: #121050;
    }

    .nav-btn {
      width: 110px;
      height: 68px;
      line-height: 68px;
      text-align: center;
      border-radius: 34px;
      font-size: 28px;
      font-weight: 500;
    }

    .yellow {
      background: rgba(255, 255, 255, 1);
      color: #FCB42D;
    }
  }
}
</style>