<template>
    <div id="id">
        {{bookid}}
    </div>
</template>
<script>
export default {
    data(){
        return {
            bookid:'',
        }
    },
    mounted(){
        this.bookid = this.$root.$mp.query.id;
    }
}
</script>
<style scoped lang="scss">

</style>


