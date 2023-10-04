import { defineStore } from "pinia";

export const companyJobs = defineStore("companyJobs", {
  state: () => ({
    companyJobs: {},
    selectJob: {},
    status: "",
    postulantes: [],
  }),
  getters: {},
  actions: {
    setcompanyJobs(companyJobs) {
      this.companyJobs = companyJobs;
    },
    setSelectJob(selectJob) {
      this.selectJob = selectJob;
    },
    setStatus(status) {
      this.status = status;
    },
    setPostulantes(postulantes) {
      this.postulantes = postulantes;
    },
    getSelectJob() {
      return this.selectJob;
    },
  },
});
