<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
        <q-toolbar-title>
          <q-avatar class="primary" size="70px">
            <img class="" src="~assets/img/logo.png" />
          </q-avatar>
          <text-h6 class="text-grey-3 colors"> GetJobTing </text-h6>
        </q-toolbar-title>
        <div v-if="bandBadge">
          <q-badge
            class="q-my-md q-mr-lg notifybadge"
            color="red"
            text-color="white"
            floating
          >
            <q-icon size="10px" name="fa-solid fa-bell"> </q-icon>
          </q-badge>
        </div>
        <q-btn-dropdown
          dense
          round
          flat
          no-caret
          dropdown-icon="fa-solid fa-gear"
          class="q-py-md"
          @click="SeeNotify"
        >
          <div v-if="notifications">
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6 q-mb-md">
                  <q-icon class="q-mb-xs" name="fa-solid fa-bell"> </q-icon>
                  Notificaciones
                </div>
                <div class="notification-list">
                  <q-list padding bordered>
                    <template
                      v-for="(notify, id) in notifications.groupNotifyUnSee"
                      :key="id"
                    >
                      <q-item clickable to="/employee/postulaciones">
                        <q-badge
                          class=""
                          color="red"
                          text-color="white"
                          floating
                        >
                          {{ notify.numNotify }}
                        </q-badge>
                        <q-card class="card">
                          <q-card-section class="bg-blue-2">
                            <strong
                              >{{ notify.notificacion }} a
                              {{ notify.job }}</strong
                            >
                          </q-card-section>
                        </q-card>
                      </q-item>
                    </template>
                    <q-separator class="q-my-md" />

                    <div>
                      <template
                        v-for="(notify, id) in notifications.groupNotifySee"
                        :key="id"
                      >
                        <q-item clickable to="/employee/postulaciones">
                          <q-badge
                            class=""
                            color="grey"
                            text-color="white"
                            floating
                          >
                            {{ notify.numNotify }}
                          </q-badge>
                          <q-card class="card">
                            <q-card-section class="bg-grey-3">
                              <strong
                                >{{ notify.notificacion }} a
                                {{ notify.job }}</strong
                              >
                            </q-card-section>
                          </q-card>
                        </q-item>
                      </template>
                    </div>
                  </q-list>
                </div>
              </div>

              <q-separator vertical inset class="q-mx-lg" />

              <div class="column items-center">
                <q-avatar size="140px">
                  <q-img :src="userEmployee.EmployeeUser.photo" fit="cover" />
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">
                  {{ userEmployee.EmployeeUser.name }}
                </div>
                <q-btn
                  color="negative"
                  label="Cerrar Sesion"
                  push
                  size="md"
                  @click="LogOut"
                  icon="fa-solid fa-right-from-bracket"
                />
              </div>
            </div>
          </div>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      class="drawer"
      elevated
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :breakpoint="500"
      :width="260"
    >
      <q-list style="color: #ffffff">
        <q-item
          clickable
          :active="userEmployee.activeView === 'home'"
          @click="userEmployee.activeView = 'home'"
          active-class="my-menu-link"
          to="/employee"
        >
          <q-item-section avatar>
            <q-btn push icon="fa-solid fa-house"> </q-btn>
          </q-item-section>
          <q-item-section class="text-subtitle2"> Inicio </q-item-section>
        </q-item>
        <q-separator class="" />
        <q-item
          clickable
          :active="userEmployee.activeView === 'recomendaciones'"
          @click="userEmployee.activeView = 'recomendaciones'"
          active-class="my-menu-link"
          to="/employee/recomendaciones"
        >
          <q-item-section avatar>
            <q-btn push icon="fa-solid fa-magnifying-glass-plus"> </q-btn>
          </q-item-section>
          <q-item-section class="text-subtitle2">
            Recomendaciones
          </q-item-section>
        </q-item>
        <q-separator class="" />
        <q-item
          clickable
          :active="userEmployee.activeView === 'perfil'"
          @click="userEmployee.activeView = 'perfil'"
          active-class="my-menu-link"
          :to="`/employee/user`"
        >
          <q-item-section avatar>
            <q-btn push icon="fa-solid fa-user"> </q-btn>
          </q-item-section>
          <q-item-section class="text-subtitle2"> Mi Perfil </q-item-section>
        </q-item>

        <q-separator class="" />
        <q-item
          clickable
          :active="userEmployee.activeView === 'ajustes'"
          @click="userEmployee.activeView = 'ajustes'"
          active-class="my-menu-link"
          to="/employee/ajustes"
        >
          <q-item-section avatar>
            <q-btn push icon="fa-solid fa-user-gear"> </q-btn>
          </q-item-section>
          <q-item-section class="text-subtitle2"> Ajustes </q-item-section>
        </q-item>
        <q-separator class="" />
        <q-item
          clickable
          :active="userEmployee.activeView === 'postulaciones'"
          @click="userEmployee.activeView = 'postulaciones'"
          active-class="my-menu-link"
          to="/employee/postulaciones"
        >
          <q-item-section avatar>
            <q-btn push icon="fa-solid fa-paper-plane"> </q-btn>
          </q-item-section>
          <q-item-section class="text-subtitle2">
            Postulaciones
          </q-item-section>
        </q-item>

        <q-separator class="" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import router from "src/router";
import { defineComponent, ref, onBeforeMount } from "vue";
import { userE } from "../stores/userEmployee";
import { userEPost } from "../stores/userEPostulaciones";
import { useQuasar } from "quasar";
import { offerJobs } from "../stores/offerJobs";
import Server from "src/getServer";
const piniaJobs = offerJobs();
const apiUrl = process.env.VUE_APP_API_URL;
const userEmployee = userE();
const userPostulaciones = userEPost();
const $q = useQuasar();
defineComponent({
  name: "PageLayout",
});
onBeforeMount(async () => {
  getNotify();
});
const notifications = ref(null);
async function getNotify() {
  try {
    let response = await fetch(
      `${await Server.GetServer()}/employee/notify/${
        userEmployee.EmployeeUser._id
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    notifications.value = await response.json();
    if (notifications.value.groupNotifyUnSee.length == 0) {
      bandBadge.value = false;
    } else {
      bandBadge.value = true;
    }
    console.log(notifications.value);
  } catch (error) {
    console.log(error);
    router.push({ name: "login" });
    userEmployee.setUserEmployee({});
    userPostulaciones.setPostulaciones([]);
    piniaJobs.setrecommendedJobs([]);
    Server.ResetServers();
  }
}
async function SeeNotify() {
  if (bandBadge.value != false) {
    try {
      let response = await fetch(
        `${await Server.GetServer()}/employee/notify/${
          userEmployee.EmployeeUser._id
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  bandBadge.value = false;
}
const leftDrawerOpen = ref(false);
let drawer = ref(false);
let miniState = ref(true);
let link = ref("home");
function toggleRightDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
function LogOut() {
  router.push({ name: "login" });
  userEmployee.setUserEmployee({});
  userPostulaciones.setPostulaciones([]);
  piniaJobs.setrecommendedJobs([]);
  Server.ResetServers();
}
const bandBadge = ref(false);
</script>


<style lang="scss">
.drawer {
  background-color: $secondary;
}
.drawerRight {
  background-color: $quaternary;
}
.text-quaternary {
  color: $quaternary;
}
.text-icon {
  color: #5e9188 !important;
}
.p {
  color: #ffffff;
}
.my-menu-link {
  background: $quinary;
}
.scrollnone {
  overflow-x: none;
  overflow-x: hidden;
}
.q-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
}
.notification-list {
  max-height: 400px; /* Ajusta la altura máxima según tus necesidades */
  overflow-y: auto; /* Habilita el desplazamiento vertical */
  overflow-x: hidden; /* Oculta la barra de desplazamiento horizontal */
}
.notifybadge {
  z-index: 3;
}

.colors {
  color: hsla(0, 0%, 0%, 0.9);
  font: normal 14px Varela Round, sans-serif;
  height: 14px;
  left: 0;
  letter-spacing: 5px;
  margin: -80px 0 0 0;
  position: relative;
  text-align: center;
  text-transform: uppercase;
  animation: move linear 2000ms infinite;
}

@keyframes move {
  0% {
    text-shadow: 1px -1px 0 hsla(0, 100%, 50%, 1),
      -1px 1px 0 hsla(180, 100%, 50%, 1);
  }
  25% {
    text-shadow: -1px -1px 0 hsla(180, 100%, 50%, 1),
      1px 1px 0 hsla(0, 100%, 50%, 1);
  }
  50% {
    text-shadow: -1px 1px 0 hsla(0, 100%, 50%, 1),
      1px -1px 0 hsla(180, 100%, 50%, 1);
  }
  75% {
    text-shadow: 1px 1px 0 hsla(180, 100%, 50%, 1),
      -1px -1px 0 hsla(0, 100%, 50%, 1);
  }
  100% {
    text-shadow: 1px -1px 0 hsla(0, 100%, 50%, 1),
      -1px 1px 0 hsla(180, 100%, 50%, 1);
  }
}
</style>