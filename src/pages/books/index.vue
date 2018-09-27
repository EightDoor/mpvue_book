<template>
  <div id="id">
      <TopSwiper :tops="tops"></TopSwiper>
      <card v-for="(val,index) in list" :key="index" :book = "val">
      </card>
      <p class="text-footer" v-if="!more">
        没有更多数据
      </p>
  </div>
</template>

<script>
import { get, request } from "@/utils/utils";
import config from "../../config";
import card from "@/components/card";
import TopSwiper from "@/components/TopSwiper";
export default {
  data() {
    return {
      list: [],
      page: 0,
      more: true,
      tops:[],
    };
  },
  methods: {
    async getList(init) {
      if (init) {
        this.page = 0;
        this.more = true;
      }
      wx.showNavigationBarLoading();
      const res = await get("/weapp/booklist", { page: this.page });
      if (res.list.length < 10 && this.page > 0) {
        this.more = false;
      }
      if(init){
        this.list = res.list;
         wx.stopPullDownRefresh();
      }else{
        //下拉刷新,不能直接覆盖list,而是累加
        this.list = this.list.concat(res.list);
      }
      wx.hideNavigationBarLoading();
    },
    async getTop(){
      const tops = await get('/weapp/top');
      this.tops = tops.list;
    }
  },
  created() {
    this.getList(true);
    this.getTop();
  },
  onPullDownRefresh() {
    this.getList(true);
    console.log("下拉");
    this.getTop();
  },
  onReachBottom(){
    //没有更多了
    if(!this.more){
      //没有更多了
      return false;
    }
    this.page = this.page+1;
    this.getList();
  },
  components: {
    card,
    TopSwiper
  }
};
</script>

<style>
</style>
