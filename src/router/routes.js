const routes = [
  {
    path: "/",
    name: "noLoginInicio",
    component: () => import("src/layouts/Inicio.vue"),
    props: true,
    children: [
      {
        path: "",
        name: "noLoginoffert",
        component: () => import("pages/Nologin/InicioOffert.vue"),
      },
      {
        path: "register/employee",
        name: "registerEmployee",
        component: () => import("pages/Nologin/registerE.vue"),
      },
      {
        path: "register/company",
        name: "registerCompany",
        component: () => import("pages/Nologin/register.vue"),
      },
    ],
  },
  {
    path: "/InfoGetJobTing",
    name: "InfoGetJobTing",
    component: () => import("src/layouts/MyCV.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("src/layouts/loginPage.vue"),
  },

  {
    path: "/employee",
    name: "employee",
    component: () => import("layouts/Employee.vue"),
    children: [
      {
        path: "",
        name: "InicioEmployee",
        component: () => import("pages/UserEmployee/inicioEmployee.vue"),
      },
      {
        path: "recomendaciones",
        name: "RecommendedJobs",
        component: () => import("pages/UserEmployee/jobs/recomendedJobs.vue"),
      },
      {
        path: "user",
        name: "userEPerfil",
        component: () => import("pages/UserEmployee/perfilUserE.vue"),
      },
      {
        path: "ajustes",
        name: "settingsE",
        component: () => import("pages/UserEmployee/settingsE.vue"),
      },
      {
        path: "job",
        name: "offerJob",
        component: () => import("pages/UserEmployee/jobs/jobOffer.vue"),
      },
      {
        path: "postulaciones",
        name: "ShowPostulaciones",
        component: () => import("pages/UserEmployee/showPostulaciones.vue"),
      },
      {
        path: "ShowCompany/:id",
        name: "ShowCompany",
        component: () => import("pages/UserEmployee/showCompany.vue"),
      },
    ],
  },
  {
    path: "/company",
    name: "company",
    component: () => import("layouts/Company.vue"),
    children: [
      {
        path: "",
        name: "InicioCompany",
        component: () =>
          import("src/pages/UserCompany/Jobs/nominationsEmployees.vue"),
      },

      {
        path: "job/create",
        name: "jobCreate",
        component: () => import("src/pages/UserCompany/Jobs/jobCreate.vue"),
      },
      {
        path: "job/edit",
        name: "jobEdit",
        component: () => import("src/pages/UserCompany/Jobs/jobEdit.vue"),
      },
      {
        path: "ajustes",
        name: "companySettings",
        component: () => import("src/pages/UserCompany/companySettings.vue"),
      },
      {
        path: "job/aplicantes/:id",
        name: "ApplicantsJob",
        component: () =>
          import("src/pages/UserCompany/Jobs/jobApplicationList.vue"),
      },
      {
        path: "perfilPostulante/:id",
        name: "userEPerfilCompany",
        component: () => import("pages/UserCompany/perfilUserECompany.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
