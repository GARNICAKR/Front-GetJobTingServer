import { defineStore } from "pinia";
export const userE = defineStore("userE", {
  state: () => ({
    EmployeeUser: {},
    activeView: "",
  }),
  getters: {},
  actions: {
    setUserEmployee(userEmployee) {
      this.EmployeeUser = userEmployee;
    },
    setActiveView(activeView) {
      this.activeView = activeView;
    },
    getUserEmployee() {
      //let aux = JSON.parse(JSON.stringify(this.EmployeeUser));
      //console.log("AUX", aux);
      return this.EmployeeUser;
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
