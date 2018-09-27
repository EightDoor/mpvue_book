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
    </div>
</template>
<script>
export default {
  data() {
    return {
        info:{},
    };
  },
  props: ["info"],
};
</script>
<style scoped lang="scss">
.bookinfo {
  .thumb {
    width: 750rpx;
    height: 500rpx;
    overflow: hidden;
    position:relative;
    .back {
      width: 100%;
      filter: blur(15px);
    }
    .img{
        position: absolute;
        height:300rpx;
        left:50rpx;
        top:30rpx;
    }
    .info{
        color:white;
        position:absolute;
        width:100%;
        left:0;
        margin-top:20rpx;
        top:330rpx;
        text-align:center;
        .title{
            font-size:20px;
        }
        .author{
            font-size:14px;
        }
    }
  }
}
</style>


