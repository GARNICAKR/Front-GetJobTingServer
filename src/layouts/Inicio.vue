<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="topbarra text-white weight">
      <q-toolbar class="flex items-center">
        <q-toolbar-title>
          <q-avatar class="primary2" size="70px">
            <img src="~assets/img/logo.png" />
          </q-avatar>
          <text-h6 class="text-grey-3 colors"> GETJOBTING </text-h6>
        </q-toolbar-title>
        <div class="row items-center">
          <div class="">
            <q-btn
              outline
              push
              :ripple="false"
              glossy
              rounded
              class="shadow-12"
              icon="fa-solid fa-user"
              color="white"
              label="Inicia Sesion"
              to="/login"
            >
            </q-btn>
          </div>
        </div>
      </q-toolbar>
      <!-- <q-tabs align="right">
        <q-route-tab to="/page1" label="Page One" />
        <q-route-tab to="/page2" label="Page Two" />
        <q-route-tab to="/page3" label="Page Three" />
      </q-tabs> -->
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      class="bg-grey-3"
      elevated
      :width="350"
      v-if="storeNoLogin.bandDrawer"
    >
      <q-card class="bg-grey-3">
        <q-card-section class="bg-grey-4 text-primary">
          <q-icon name="fa-solid fa-users" size="27px" class="q-pr-md q-mb-sm">
          </q-icon>
          <strong style="font-size: 25px">Registrate !</strong>
        </q-card-section>

        <q-tabs v-model="tab" class="text-secondary">
          <q-tab
            label="Empleado"
            name="Empleado"
            @click="piniaJobs.setTabView(tab)"
          />
          <q-tab
            label="Empresa"
            name="Empresa"
            @click="piniaJobs.setTabView(tab)"
          />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated class="bg-grey-3">
          <q-tab-panel name="Empleado">
            <q-card class="square">
              <q-card-section class="bg-blue-2 text-primary">
                <q-icon name="fa-solid fa-user-tie" size="20px" class="q-pr-sm">
                </q-icon>
                <strong style="font-size: 18px"
                  >¿Quieres Encontrar Empleo?</strong
                >
              </q-card-section>
              <q-card-section class="bg-grey-2">
                <strong>
                  Registrate para poder enviar solicitudes a distintas empresas.
                </strong>
              </q-card-section>
              <q-separator />
              <q-card-actions class="bg-grey-2">
                <q-btn
                  push
                  dense
                  :ripple="false"
                  text-color="grey-3"
                  class="shadow-29"
                  color="secondary"
                  label="Crea Tu Cuenta"
                  @click="toEmployee"
                >
                </q-btn>

                <q-space />
              </q-card-actions>
            </q-card>
          </q-tab-panel>

          <q-tab-panel name="Empresa">
            <q-card class="square">
              <q-card-section class="bg-indigo-2 text-primary">
                <q-icon
                  name="fa-solid fa-building"
                  color="primary2"
                  size="20px"
                  class="q-pr-sm"
                >
                </q-icon>
                <strong style="font-size: 18px"
                  >¿Buscas Nuevos Empleados?</strong
                >
              </q-card-section>
              <q-card-section class="bg-grey-2">
                <strong>
                  Registrate para poder publicar tus diferentes ofertas de
                  trabajo
                </strong>
              </q-card-section>
              <q-separator />
              <q-card-actions align="right" class="bg-grey-2">
                <div class="row justify-end">
                  <div class="col-col-md-auto">
                    <q-btn
                      push
                      dense
                      :ripple="false"
                      text-color="grey-3"
                      class="shadow-29"
                      color="secondary"
                      label="Crea Tu Cuenta"
                      @click="toCompany"
                    >
                    </q-btn>
                  </div>
                </div>
              </q-card-actions>
            </q-card>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { defineComponent, ref } from "vue";
import { offerJobs } from "../stores/offerJobs";
import { noLogin } from "../stores/noLogin";
import router from "src/router/index";
const piniaJobs = offerJobs();
const storeNoLogin = noLogin();

defineComponent({
  name: "StartPage",
});
const prueba = ref("hola");
const expanded = ref(false);
const tab = ref("Empleado");
const leftDrawerOpen = ref(true);
function toEmployee() {
  router.push({ name: "registerEmployee" });
}
function toCompany() {
  router.push({ name: "registerCompany" });
}
</script>


<style lang="scss">
.primary {
  background-color: $primary;
}
.secondary {
  background-color: $secondary;
}
.tertiary {
  background-color: $tertiary;
}
.quaternary {
  background-color: $quaternary;
}
.quinary {
  background-color: $quinary;
}
.primary2 {
  background-color: $primary2;
}
.secondary2 {
  background-color: $secondary2;
}
.tertiary2 {
  background-color: $tertiary2;
}
.quaternary2 {
  background-color: $quaternary2;
}
.quinary2 {
  background-color: $quinary2;
}
.topbarra {
  background-image: radial-gradient(circle, $primary, $primary2);
}
.colordrawer {
  background-color: rgb(255, 255, 255);
}
.q-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
}
.weight {
  padding: 3vh;
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
