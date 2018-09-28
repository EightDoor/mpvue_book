<template>
    <div id="id">
        <BookInfo :info="info" :userInfo="userInfo"></BookInfo>
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
    </div>
</template>
<script>
import { get } from "@/utils/utils";
import BookInfo from "@/components/BookInfo";
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
      commentStatus: false
    };
  },
  mounted() {
    this.bookid = this.$root.$mp.query.id;
    this.openid = wx.getStorageSync("userInfo");
    if (this.openid) {
      this.commentStatus = true;
    }
    this.getDetail();
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
    addComment() {
      const data = {
        bookid: this.bookid,
        comment: this.comment,
        phone: this.phone,
        localtion: this.localtion,
        openid: this.openid.openId,
      };
      console.log(data);
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
    BookInfo
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
</style>


