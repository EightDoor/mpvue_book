<template>
  <div id="id">
      <card v-for="(val,index) in list" :key="index" :book = "val">
      </card>
  </div>
</template>

<script>
import { get, request } from "@/utils/utils";
import config from "../../config";
import card from "@/components/card";
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    async getList() {
      const res = await get("/weapp/booklist");
      this.list = res.list;
    }
  },
  created() {
    this.getList();
  },
  components: {
    card
  }
};
</script>

<style>
</style>
