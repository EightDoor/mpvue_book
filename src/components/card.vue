<template>
    <div class="book-card">
      <div class="thumb">
        <img mode="aspectFit" class="img" :src="book.image" :alt="book.title">
      </div>
      <div class="detail">
         <div class="row">
           <div class="right">
             {{book.rate}} <Rate :value="book.rate"></Rate>
           </div>
           <div class="letf">
             {{book.title}}
           </div>
         </div>
         <div class="row">
           <div class="right">
             浏览量:
           </div>
           <div class="letf">
             {{book.author}}
           </div>
         </div>
         <div class="row">
           <div class="right">
             添加人
           </div>
           <div class="letf">
             {{book.publisher}}
           </div>
         </div>
      </div>
    </div>
</template>

<script>
import Rate from "@/components/Rate"
export default {
  data(){
    return {

    }
  },
  props:{
    book:[
      {
        type:'String',
        require:true,
      }
    ]
  },
  components:{
    Rate
  }
}
</script>

<style lang="scss" scoped>
  .book-card{
    font-size:28rpx;
    padding:10rpx;
    overflow:hidden;
    margin-top:10rpx;
    margin-bottom:10rpx;
    .thumb{
      width:180rpx;
      height:180rpx;
      float:left;
      overflow:hidden;
      margin:0px auto;
      .img{
        max-width:100%;
        max-height:100%;
      }
    }
    .detail{
      margin-left:200rpx;
      .row{
        line-height:40rpx;
        margin-bottom:6rpx;
      }
      .right{
        float:right
      }
      .left{
        margin-right:160rpx;
      }
    }
  }
</style>
