<template>
    <div class="container">
        <commentsList v-if="userinfo.openId" type="user" :comments="comments"></commentsList>
        <div v-if="userinfo.openId">
            <div class="page-title">我的图书</div>
            <Card v-for="book in books" :key="book.id" :book="book"></Card>
            <div v-if="!books.length">暂时还没有添加过书籍,快去添加几本吧</div>
        </div>
    </div>
</template>
<script>
import commentsList from "@/components/commentsList";
import Card from "@/components/card";
import { get } from "@/utils/utils";
export default {
  data() {
    return {
      comments: [],
      openId: {},
      userinfo: [],
      books: []
    };
  },
  components: {
    commentsList,
    Card
  },
  methods: {
    async getComments() {
      const comments = await get("/weapp/commentlist", {
        openid: this.userinfo.openId
      });
      this.comments = comments.list;
      wx.hideNavigationBarLoading();
    },
    async getBooks() {
      const books = await get("/weapp/booklist", {
        openid: this.userinfo.openId
      });
      this.books = books.list;
    },
    init() {
      this.getComments();
      this.getBooks();
      wx.showNavigationBarLoading();
    }
  },
  onPullDownRefresh() {
    this.init();
    wx.stopPullDownRefresh();
  },
  onShow() {
    //每次显示的时候加载
    if (!this.userinfo.openId) {
      let userinfo = wx.getStorageSync("userInfo");
      if (userinfo) {
        this.userinfo = userinfo;
        this.init();
      }
    }
  }
};
</script>
<style>
</style>

