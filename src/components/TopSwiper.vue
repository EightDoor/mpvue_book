<template>
    <div id="id">
        <swiper
        :indicator-dots	="true"
        indicator-color	= "#EA5A49"
        :autoplay="true"
        :interval="6000"
        :duration="1000"
        :circular="true"
        >
        <div v-for="(val,imageIndex) in imgUrl" :key="imageIndex">
            <swiper-item>
                <img @click="bookDetail(top)" v-for="top in val" :key="top.id" mode="aspectFit" class="swiper-image" :src="top.image" alt="">
            </swiper-item>
        </div>
        </swiper>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    console.log(this.imgUrl);
  },
  props: ["tops"],
  computed: {
    imgUrl() {
      //chunk函数
      let res = this.tops;
      return [res.slice(0, 3), res.slice(3, 6), res.slice(6, 9)];
    }
  },
  methods:{
      bookDetail(item){
          wx.navigateTo({
              url:"/pages/detail/main?id="+item.id,
          })
      }
  }
};
</script>
<style scoped lang="scss">
#id {
  margin-top: 5px;
  .swiper-image {
    width: 33%;
    height: 250rpx;
  }
}
</style>

