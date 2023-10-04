<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="topbarra text-white weight">
      <q-toolbar class="flex items-center">
        <q-toolbar-title>
          <q-avatar class="primary" size="70px">
            <img src="~assets/img/logo.png" />
          </q-avatar>
          <text-h4 class="text-grey-3 colors"> GETJOBTING </text-h4>
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
    </q-header>
    <q-page-container>
      <q-page padding class="bg-grey-1">
        <div class="row justify-between">
          <div class="col-5 container-front">
            <div class="flex flex-center primary text-white">
              <strong style="font-size: 30px" class=""> FRONT-END </strong>
            </div>
            <br />
            <div class="row justify-between">
              <div class="col-5">
                <q-img
                  src="~assets/img/quasar.png"
                  spinner-color="white"
                  style="max-width: 220px; max-height: 220px"
                />
              </div>
              <div class="col-5">
                <q-img
                  src="~assets/img/vue.png"
                  spinner-color="white"
                  style="max-width: 150px; max-height: 150px"
                />
              </div>
            </div>
            <div class="row justify-center q-mb-xl q-mt-lg">
              <div class="col-10">
                <strong style="font-size: 16px">
                  El front fue elaborado en el framework Quasar con ayuda de
                  Vue3 y pinia se logro una interacción fluida y dinámica.
                </strong>
              </div>
            </div>
            <div class="">
              <q-card class="card q-mx-xl">
                <q-card-section class="bg-grey-3">
                  <div class="flex flex-center">
                    <strong style="font-size: 25px">
                      Ver el funcionamiento
                    </strong>
                  </div>
                </q-card-section>
                <q-card-actions align="between" class="bg-grey-1 q-my-xl">
                  <q-btn
                    label="Empleado"
                    color="primary"
                    icon="fa-solid fa-user-tie"
                    push
                    size="lg"
                    :loading="bandCargandoE"
                    @click="ToEmpleado"
                    class="q-mb-xl"
                  >
                  </q-btn>
                  <q-btn
                    label="Compañia"
                    color="primary"
                    icon="fa-solid fa-building"
                    push
                    size="lg"
                    :loading="bandCargandoC"
                    @click="ToCompany"
                    class="q-mb-xl"
                  >
                  </q-btn>
                </q-card-actions>
              </q-card>
            </div>
            <div class="flex flex-center">
              <q-btn
                label="Ver Repositorio"
                color="black"
                icon="fa-brands fa-github"
                push
                size="lg"
                class="q-mt-sm"
                href="https://github.com/GARNICAKR/GetJobTingServer"
                target="_blank"
              >
              </q-btn>
            </div>
          </div>
          <div class="col-6 container-front">
            <div class="flex flex-center primary text-white">
              <strong style="font-size: 30px" class=""> BACK-END </strong>
            </div>
            <br />
            <div class="row justify-between">
              <div class="col-5 q-ml-md">
                <q-img
                  src="~assets/img/node.png"
                  spinner-color="white"
                  style="max-width: 220px; max-height: 220px"
                />
              </div>
              <div class="col-5">
                <q-img
                  src="~assets/img/mongo.png"
                  spinner-color="white"
                  style="max-width: 220px; max-height: 220px"
                />
              </div>
            </div>
            <div class="row justify-center q-mb-xl q-mt-lg">
              <div class="col-10">
                <strong style="font-size: 16px">
                  El backen fue desarrollado utilizando Node.js en conjunto con
                  Express.js. Como base de datos, hemos optado por MongoDB.
                  Ademas se implemento la herramienta de RabbitMqtt para
                  distribuir las peticiones
                </strong>
                <br />
              </div>
            </div>
            <div class="q-mx-md">
              <div class="row justify-between">
                <div class="col">
                  <q-card class="card">
                    <q-card-section class="bg-grey-3">
                      <strong style="font-size: 23px">
                        Arbol de decision</strong
                      >
                    </q-card-section>
                    <q-card-section class="bg-grey-1">
                      <strong style="font-size: 16px">
                        Un algoritmo destacable fue un arbol de decision que
                        recomendaban trabajo para los postulantes
                      </strong>
                      <br />

                      <q-btn
                        label="ver algoritmo"
                        icon="fa-brands fa-github"
                        push
                        color="primary flex flex-center"
                        class="q-my-md q-mt-lg"
                        href="https://github.com/GARNICAKR/GetJobTing/blob/main/src/helpers/treeCART.js"
                        target="_blank"
                      >
                      </q-btn>
                    </q-card-section>
                  </q-card>
                </div>

                <div class="col q-ml-md">
                  <q-card class="card">
                    <q-card-section class="bg-grey-3">
                      <div class="row justify-between">
                        <div class="col col-md-auto">
                          <strong style="font-size: 23px"> RabbitMqtt</strong>
                        </div>
                        <div class="col col-md-auto">
                          <q-avatar size="40px">
                            <q-img src="~assets/img/rabit.png" fit="cover" />
                          </q-avatar>
                        </div>
                      </div>
                    </q-card-section>
                    <q-card-section class="bg-grey-1">
                      <strong style="font-size: 16px">
                        Una herramienta para distribuir la carga de las
                        peticiones en los servidores
                      </strong>
                      <br />

                      <q-btn
                        label="ver algoritmo"
                        icon="fa-brands fa-github"
                        push
                        color="orange-10 flex flex-center"
                        class="q-my-md"
                        href="https://github.com/GARNICAKR/GetJobTing/blob/main/src/helpers/rabbitMQ.js"
                        target="_blank"
                      >
                      </q-btn>
                    </q-card-section>
                  </q-card>
                </div>
              </div>
            </div>
            <div class="flex flex-center q-my-md">
              <q-btn
                label="Ver Repositorio"
                color="black"
                icon="fa-brands fa-github"
                push
                size="lg"
                class="q-mt-md"
                href="https://github.com/GARNICAKR/GetJobTing"
                target="_blank"
              >
              </q-btn>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { defineComponent, ref, onBeforeMount } from "vue";
import { useQuasar } from "quasar";
import router from "src/router/index";
import Server from "src/getServer";
import { userE } from "../stores/userEmployee";
const userEmployee = userE();
import { userC } from "../stores/userCompany";

const $q = useQuasar();
const userCompany = userC();
defineComponent({
  name: "MyCV",
});
onBeforeMount(async () => {
  Server.GetWorkingServers();
});
const mail = ref(null);
const password = ref("12345678");
const bandCargandoE = ref(false);
const bandCargandoC = ref(false);
function ToEmpleado() {
  mail.value = "jesusgarnica@gmail.com";
  bandCargandoE.value = true;
  onSubmit();
}
function ToCompany() {
  mail.value = "jesuscompany@gmail.com";
  bandCargandoC.value = true;
  onSubmit();
}
async function onSubmit() {
  try {
    const urlParams = new URLSearchParams();
    urlParams.append("mail", mail.value);
    urlParams.append("password", password.value);
    const response = await fetch(`${await Server.GetServer()}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: urlParams.toString(),
    });
    const data = await response.json();
    if (data.error) {
      $q.notify({
        color: "negative",
        textColor: "white",
        icon: "warning",
        message: data.error,
      });
      password.value = "";
    } else {
      $q.notify({
        color: "positive",
        textColor: "white",
        icon: "fa-solid fa-check",
        message: "Iniciaste Sesion Correctamente",
      });
      bandCargandoC.value = false;
      bandCargandoE.value = false;
      if (data.userEmployee) {
        data.userEmployee.photo = `data:image;base64,${data.userEmployee.photo}`;
        data.userEmployee.CV = `data:application/pdf;base64,${data.userEmployee.CV}`;
        userEmployee.setUserEmployee(data.userEmployee);
        userCompany.setUserCompany({});
        if (
          data.userEmployee.university == "" ||
          data.userEmployee.carrera == "" ||
          data.userEmployee.introduction == "" ||
          data.userEmployee.skills.length == 0
        ) {
          $q.notify({
            color: "orange",
            textColor: "white",
            icon: "warning",
            message: "Completa tu Informacion",
          });
          router.push({ name: "settingsE" });
        } else {
          router.push({ name: "InicioEmployee" });
        }
      } else {
        data.userCompany.logo = `data:image;base64,${data.userCompany.logo}`;
        userCompany.setUserCompany(data.userCompany);
        userEmployee.setUserEmployee({});
        bandCargandoC.value = false;
        router.push({ name: "InicioCompany" });
      }
    }
  } catch (error) {
    console.log(error);
  }
}
</script>
<style lang="scss">
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
.container-front {
  // background-image: linear-gradient(to right, #f0f1f6, #e2e4eb);
  background-color: rgb(236, 239, 242);

  border: 5px solid rgb(10, 33, 124);
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.container-front::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(182, 181, 255);
  z-index: -1;
}
.container-funcionamiento {
  // background-image: linear-gradient(to right, #f0f1f6, #e2e4eb);
  background-color: rgb(236, 239, 242);
  border: 2px solid rgb(234, 234, 234);
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 10px;
}

.container-funcionamiento::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(182, 181, 255);
  z-index: -1;
}
</style>