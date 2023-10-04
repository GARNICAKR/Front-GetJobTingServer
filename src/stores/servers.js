import { defineStore } from "pinia";
export const WorkingServers = defineStore("WorkingServers", {
  state: () => ({
    Servers: [],
  }),
  getters: {},
  actions: {
    setServers(Servers) {
      this.Servers = Servers;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
      },
    ],
  },
});
