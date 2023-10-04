import { defineStore } from "pinia";

export const userC = defineStore("userC", {
  state: () => ({
    CompanyUser: {},
    activeView: "",
  }),
  getters: {},
  actions: {
    setUserCompany(userCompany) {
      this.CompanyUser = userCompany;
    },
    setActiveView(activeView) {
      this.activeView = activeView;
    },
    getUserCompany() {
      return this.CompanyUser;
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
