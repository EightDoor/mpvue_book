<template>
    <div class="bookinfo">
        <div class="thumb">
        <img mode="aspectFill" class="back" :src="info.image" alt="info.title">
        <img mode="aspectFit" class="img" :src="info.image">
        <div class="info">
            <div class="title">
                {{info.title}}
            </div>
            <div class="author">
                {{info.author}}
            </div>
        </div>
        </div>
        <div class="detail">
            <img :src="userInfo.image" class="avatar" mode="aspectFit">
            {{userInfo.name}}
            <div class="right text-primary">
                {{info.rate}}分
                <Rate :value='info.rate'></Rate>
            </div>
        </div>
        <div class="detail">
            {{info.publisher}}
            <div class="right">
                {{info.price}}
            </div>
        </div>
        <div class="tags">
            <div class="baged" v-for="(tag,index) in info.tags" :key="index">
                {{tag}}
            </div>
        </div>
        <div class="summary">
            <p v-for="(sum,index) in info.summary" :key="index">{{sum}}</p>
        </div>
    </div>
</template>
<script>
import Rate from "@/components/Rate";
export default {
  components: {
    Rate
  },
  data() {
    return {
      info: {}
    };
  },
  props: ["info", "userInfo"],
  computed: {}
};
</script>
<style scoped lang="scss">
.bookinfo {
  .baged{
      display: inline-block;
      margin:5px;
      border-radius:10px;
      padding:5px;
      border:1px solid #EA5A49;
      color:#EA5A49;
  }
  .summary{
      padding:0 15px;
      margin-top:10px;
      p{
          text-indent:2em;
          font-size:14px;
      }
  }
  font-size: 14px;
  .right {
    float: right;
  }
  .detail {
    padding: 10rpx 20rpx;
    .avatar {
      width: 40rpx;
      height: 40rpx;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
  .thumb {
    width: 750rpx;
    height: 500rpx;
    overflow: hidden;
    position: relative;
    .back {
      width: 100%;
      filter: blur(15px);
    }
    .img {
      position: absolute;
      height: 300rpx;
      left: 50rpx;
      top: 30rpx;
    }
    .info {
      color: white;
      position: absolute;
      width: 100%;
      left: 0;
      margin-top: 20rpx;
      top: 330rpx;
      text-align: center;
      .title {
        font-size: 20px;
      }
      .author {
        font-size: 14px;
      }
    }
  }
}
</style>


