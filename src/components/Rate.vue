<template>
        <div class="rate">
        <span>☆☆☆☆☆</span>
        <div :style="style" class="hollow">
            ★★★★★
        </div>
   </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    value: {
      type: [Number, String],
      default: "0"
    }
  },
  computed: {
    style() {
      return `width:${this.value / 2}em`;
    }
  }
};
</script>
<style lang="scss" scoped>
.rate {
  position: relative;
  display: inline-block;
  .hollow {
    position: absolute;
    display: inline-block;
    top: 0;
    left: 0;
    width: 2.5em;
    overflow: hidden;
  }
}
</style>

