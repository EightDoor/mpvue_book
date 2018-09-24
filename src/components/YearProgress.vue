<template>
    <div id="id">
        <progress active :percent="percent" activeColor="#EA5A49" />
        <p>{{year}}已经过去了{{days}}天 {{percent}}%</p>
    </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    isLeapYear () {
      const year = new Date().getFullYear()
      if (year % 400 === 0) {
        return true
      } else if (year % 4 === 0 && year % 100 !== 0) {
        return true
      } else {
        return false
      }
    },
    getDaOfYear () {
      return this.isLeapYear() ? 366 : 365
    }
  },
  computed: {
    year () {
      return new Date().getFullYear()
    },
    days () {
      let start = new Date()
      start.setMonth(0)
      start.setDate(1)
      // start就是今年第一天
      let longTime = new Date().getTime() - start.getTime()
      return parseInt(longTime / 1000 / 60 / 60 / 24 + 1)
    },
    percent () {
      return (this.days * 100 / this.getDaOfYear()).toFixed(1)
    }
  }
}
</script>
<style lang="scss">
#id{
    margin-top:20rpx;
    width:100%;
    text-align: center;
    p{
        margin-top:20rpx;
    }
}
</style>

