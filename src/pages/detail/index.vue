<template>
    <div id="id">
        <BookInfo :info="info" :userInfo="userInfo"></BookInfo>
        <commentsList :comments="comments"></commentsList>
        <div v-if="commentStatus">
        <div class="comment">
            <textarea v-model="comment" class="textarea" :maxlength="100" placeholder="请输入图书短评"></textarea>
        </div>
            <div class="location">
            地理位置:
            <switch color='#EA5A49' :checked="localtion" @change="GetGeo"></switch>
            <span class="text-primary">{{localtion}}</span>
        </div>
        <div class="phone">
            手机型号:
            <switch color='#EA5A49' :checked="phone" @change="GetPhone"></switch>
            <span class="text-primary">{{phone}}</span>
        </div>
        <button class="bth" style="background:#EA5A49;color:white"  @click="addComment">
            评论 
        </button>
        </div>
        <div v-else class="text-footer">
          未登录或者已经评论过了
        </div>
        <button open-type="share"  class="bth bth_info">转发给好友</button>
    </div>
</template>
<script>
import { get, post, ShowModal } from "@/utils/utils";
import BookInfo from "@/components/BookInfo";
import commentsList from "@/components/commentsList";
export default {
  data() {
    return {
      bookid: "",
      info: {},
      userInfo: {},
      comment: "",
      localtion: "",
      phone: "",
      openid: "",
      comments: []
    };
  },
  mounted() {
    this.bookid = this.$root.$mp.query.id;
    this.openid = wx.getStorageSync("userInfo");
    this.getDetail();
    this.getComment();
    console.log(this.userInfo);
    console.log(this.comments);
  },
  computed: {
    commentStatus() {
      // 未登录
      if (!this.openid) {
        return false;
      }
      // 评论列表是否包含openId
      if (this.comments.filter(v => v.openid == this.userInfo.openId).length) {
        return false;
      }
      return true;
    }
  },
  methods: {
    async getDetail() {
      const info = await get("/weapp/bookdetail", { id: this.bookid });
      wx.setNavigationBarTitle({
        title: info.title
      });
      this.info = info;
      this.userInfo = info.user_info;
    },
    async addComment() {
      if (!this.comment) {
        return;
      }
      const data = {
        bookid: this.bookid,
        comment: this.comment,
        phone: this.phone,
        location: this.localtion,
        openid: this.openid.openId
      };
      try {
        await post("/weapp/addcomment", data);
        this.comment = "";
        ShowModal("评论成功");
        this.getComment();
      } catch (error) {
        ShowModal("失败", error.msg);
      }
      console.log(info);
    },
    async getComment() {
      const comments = await get("/weapp/commentlist", { bookid: this.bookid });
      this.comments = comments.list;
    },
    GetGeo(e) {
      let url = "http://api.map.baidu.com/geocoder/v2/";
      const ak = "NoI2cMf2bra8jYYupKgwrcpViaPdO7SX";
      if (e.target.value) {
        wx.getLocation({
          success: geo => {
            console.log(geo);
            wx.request({
              url,
              data: {
                location: `${geo.latitude},${geo.longitude}`,
                output: "json",
                ak
              },
              success: res => {
                console.log(res);
                if (res.data.status === 0) {
                  this.localtion = res.data.result.addressComponent.city;
                } else {
                  this.localtion = "未知地点";
                }
              }
            });
          }
        });
      } else {
        this.localtion = "";
      }
    },
    GetPhone(e) {
      if (e.target.value) {
        const PhoneInfo = wx.getSystemInfoSync();
        this.phone = PhoneInfo.model;
      } else {
        this.phone = "";
      }
    }
  },
  components: {
    BookInfo,
    commentsList
  }
};
</script>
<style scoped lang="scss">
.comment {
  margin-top: 10px;
  .textarea {
    width: 730rpx;
    height: 200rpx;
    background: #eee;
    padding: 10rpx;
  }
}
.location {
  margin-top: 10px;
}
.phone {
  margin-top: 10px;
}
.bth_info {
  color:white;
  background:#EA5A49;
  margin-bottom:10px;
  padding-left:15px;
  padding-right:15px;
  border-radius:2px;
  font-size:16px;
  line-height:40px;
  height:40px;
  width:100%;
  :active{
    background:#FA5A49;
  }
}
</style>


