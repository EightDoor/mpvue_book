<template>
    <div class="comment-list">
        <div class="page-title">
            评论
        </div>
        <div class="comment" @click="handleClick(comment)" v-for="(comment,index) in comments" :key="index">
            <div class="user">
                <div class="inline">
                    <img :src="comment.image" class="avatar" mode="aspecyFit">
                </div>
                {{comment.title}}
            </div>
            <div class="right">
                {{comment.location || "未知地点" }}
                <span class="text-primary">
                    --
                </span>
                {{comment.phone || "未知型号" }}
            </div>
            <div class="clear"></div>
            <div class="content">
                {{comment.comment}}
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["comments",'type'],
  methods:{
      handleClick(item){
          if(this.type === 'user'){
              wx.navigateTo({
                  url:"/pages/detail/main?id="+item.bookid,
              })
          } 
      }
  }
};
</script>
<style scoped lang="scss">
.comment-list {
  background: #eee;
  font-size: 14px;
  .comment {
    background: white;
    margin-bottom: 10px;
    padding: 5px 20px;
    .content {
      margin: 10px;
    }
  }
  .right{
      float:right;
      padding:0px;
      margin:0px;
  }
  .user {
      float: left;
    .inline {
      display: inline;
      img {
        vertical-align: middle;
      }
      .avatar {
        width: 20px;
        height: 20px;
        border-radius: 50%;
      }
    }
  }
}
.clear{
    clear:both;
}
</style>


