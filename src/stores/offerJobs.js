import { defineStore } from "pinia";
export const offerJobs = defineStore("offerJobs", {
  state: () => ({
    jobs: [],
    selectJob: {},
    tabView: "Empleado",
    recommendedJobs: [],
  }),
  getters: {},
  actions: {
    setJobs(jobs) {
      this.jobs = jobs;
    },
    setrecommendedJobs(recommendedJobs) {
      this.recommendedJobs = recommendedJobs;
    },
    setJobSelect(job) {
      this.selectJob = job;
    },
    setTabView(view) {
      this.tabView = view;
    },
    getJobs() {
      return this.jobs;
    },
    getJobSelect() {
      return this.selectJob;
    },
  },
});
