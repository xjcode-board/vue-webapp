<template >
  <div class="page">
    <head-bar backClass="orange" titleClass="light" title="我的钱包"></head-bar>
    <div class="display-box">
      <div class="statics">
        <p class="total">{{balanceAmount}}</p>
        <p class="label">可提现金额（元）</p>
      </div>
      <div class="withdraw-box">
        <div class="withdraw" @click="toCash">提现</div>
        <p class="label">
          累计提现
          <span>{{totalAmount}}</span>元
        </p>
      </div>
    </div>
    <div class="show-list">
      <div class="top-row">
        <p class="box-title">收支明细</p>
        <p class="box-link" @click="toFilter">筛选</p>
      </div>
      <div class="main-box">
        <van-empty v-show="none" image="search" description />
        <van-list
          v-model="loading"
          :finished="finished"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          :finished-text="finishText"
          @load="onLoad"
        >
          <div class="item" v-for="(item, index) in list" :key="index">
            <div class="info">
              <p class="type">{{item.incomeText}}</p>
              <p class="date">{{item.incomeTime}}</p>
            </div>
            <div
              class="amount"
              :class="item.incomeType === 3 ? 'mitus' : 'plus'"
            >{{item.incomeType === 3 ? `-${item.amount}` :`+${item.amount}`}}</div>
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import headBar from "../../components/head-bar/headBar";
import { List, Empty } from "vant";
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import { queryShareData } from "../../api";
Vue.use(List);
Vue.use(Empty);
export default {
  components: {
    headBar
  },
  data() {
    return {
      contentHeight: 0,
      balanceAmount: "",
      totalAmount: "",
      list: [],
      none: false,
      loading: false,
      finished: false,
      error: false,
      finishText: "",
      hasMore: true,
      page: 1
    };
  },
  computed: {
    ...mapState({
      filterData: "filter"
    })
  },
  created() {
    console.log(this.getUrlParams());
    this.setBaseParms(this.getUrlParams());
  },
  methods: {
    onLoad() {
      if (this.hasMore) {
        queryShareData({
          page: this.page,
          ...this.filterData
        })
          .then(res => {
            let result = res.data.result;
            let list = result.incomeList;
            let page = this.page;
            if (this.balanceAmount === "" || this.totalAmount === "") {
              this.balanceAmount = result.balanceAmount;
              this.totalAmount = result.totalAmount;
            }
            this.loading = false;
            console.log(1, list);
            if (this.list.length === 0) {
              if (!list || list.length === 0) {
                this.none = true;
                this.finished = true;
                this.finishText = "暂无数据";
              } else {
                if (list.length < 10) {
                  this.hasMore = false;
                  this.finished = true;
                  this.finishText = "没有更多了";
                } else {
                  this.page = ++page;
                }
                this.list.push(...list);
              }
            } else {
              if (list.length < 10) {
                this.hasMore = false;
                this.finished = true;
                this.finishText = "没有更多了";
              } else {
                this.page = ++page;
              }
              this.list.push(...list);
            }
          })
          .catch(() => {
            this.loading = false;
            this.error = true;
          });
      }
    },
    toCash() {
      this.$router.push("cash");
    },
    toFilter() {
      this.$router.push("filter");
    },
    getUrlParams() {
      let uri = window.location.href;
      let match = uri && uri.match(/([^?=&]+)=([^?&]+)/g);
      return (
        match &&
        match.reduce(function(a, b) {
          let val = b.split(/([^?=&]+)=([^?&]+)/g);
          a[val[1]] = val[2];
          return a;
        }, {})
      );
    },
    ...mapActions({
      setBaseParms: "setBaseParams"
    })
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/_util.scss";
$img: "../../assets/images/";

.page {
  background-image: url($img+"bg.png");
  background-size: 100% auto;
  background-repeat: no-repeat;
  padding-top: 200px;
  background-color: #fff;

  .display-box {
    height: 130px;
    display: flex;
    padding: 0 40px 40px;
    justify-content: space-between;
    align-items: center;
    color: #fff;

    .statics {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      .total {
        font-size: 80px;
        font-weight: bold;
        line-height: 80px;
      }
      .label {
        font-size: 28px;
      }
    }
    .withdraw-box {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: space-between;

      .withdraw {
        width: 140px;
        height: 60px;
        background: rgba(255, 255, 255, 0);
        border: 2px solid rgba(255, 255, 255, 1);
        border-radius: 30px;
        text-align: center;
        line-height: 60px;
        font-size: 28px;
      }
      .label {
        font-size: 28px;

        span {
          font-size: 40px;
          font-weight: bold;
          margin: 0 8px 0 5px;
        }
      }
    }
  }

  .show-list {
    background: rgba(243, 245, 251, 1);
    border-radius: 40px 40px 0px 0px;

    .top-row {
      height: 111px;
      line-height: 111px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 40px;
      .box-title {
        background: url($img+"list.png") no-repeat;
        background-size: 8px auto;
        background-position: left center;
        padding-left: 20px;
        color: #121050;
        font-size: 28px;
      }

      .box-link {
        background: url($img+"arraw.png") no-repeat;
        background-size: 10px auto;
        background-position: right center;
        padding-right: 20px;
        color: #707096;
        font-size: 24px;
      }
    }
    .main-box {
      background: rgba(255, 255, 255, 1);
      border-radius: 40px 40px 0px 0px;
      padding: 0 40px;
      height: 850px;
      overflow-y: scroll;

      .vant-list {
        flex-direction: column;
      }

      .item {
        height: 160px;
        background: rgba(255, 255, 255, 0);
        display: flex;
        justify-content: space-between;
        align-items: center;
        @include border-1px(#eee, bottom);

        .info {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;

          .type {
            color: #121050;
            font-size: 32px;
            line-height: 45px;
            margin-bottom: 5px;
          }

          .date {
            color: #ccccd4;
            font-size: 26px;
          }
        }

        .amount {
          font-size: 36px;
          font-weight: bold;
        }

        .plus {
          color: #fcb42d;
        }
        .mitus {
          color: #121050;
        }
      }
    }
  }
}
</style>