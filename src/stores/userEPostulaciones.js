import { defineStore } from "pinia";
export const userEPost = defineStore("userEPost", {
  state: () => ({
    StorePost: [],
  }),
  getters: {},
  actions: {
    setPostulaciones(StorePost) {
      this.StorePost = StorePost;
    },
  },
});
