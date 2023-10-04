import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import { userE } from "../stores/userEmployee";
import { userC } from "../stores/userCompany";
const createHistory = process.env.SERVER
  ? createMemoryHistory
  : process.env.VUE_ROUTER_MODE === "history"
  ? createWebHistory
  : createWebHashHistory;

const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes,
  history: createHistory(process.env.VUE_ROUTER_BASE),
});

router.beforeEach((to, from, next) => {
  const userCompany = userC();
  const userEmployee = userE();
  console.log(to);
  if (/^\/InfoGetJobTing/i.test(to.path)) {
    userCompany.setUserCompany({});
    userEmployee.setUserEmployee({});
  }
  if (/^\/employee/i.test(to.path)) {
    if (userEmployee.EmployeeUser._id) {
      next();
    } else {
      next({ name: "login" });
    }
  } else if (/^\/company/i.test(to.path)) {
    console.log("trueC");
    if (userCompany.CompanyUser._id) {
      next();
    } else {
      next({ name: "login" });
    }
  } else {
    if (userCompany.CompanyUser._id) {
      next({ name: "InicioCompany" });
    } else if (userEmployee.EmployeeUser._id) {
      next({ name: "InicioEmployee" });
    } else {
      next();
    }
  }
});
export default router;
