<template>
    <div id="id">
        <BookInfo :info="info"></BookInfo>
    </div>
</template>
<script>
import  { get } from "@/utils/utils";
import BookInfo from "@/components/BookInfo";
export default {
    data(){
        return {
            bookid:'',
            info:{},
        }
    },
    mounted(){
        this.bookid = this.$root.$mp.query.id;
        this.getDetail();
    },
    methods:{
        async getDetail(){
            const info = await get('/weapp/bookdetail',{id:this.bookid});
            wx.setNavigationBarTitle({
                title:info.title,
            })
            this.info = info;
        }
    },
    components:{
        BookInfo
    }
}
</script>
<style scoped lang="scss">

</style>


