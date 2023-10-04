<template>
  <q-layout class="background-app" view="lHh Lpr fff">
    <q-page-container>
      <div class="">
        <div class="row">
          <div class="col-4 leftBackground window-height">
            <div class="row jusitfy-center flex flex-center">
              <div class="col-12 flex flex-center">
                <q-img
                  src="~assets/img/logo.png"
                  alt="Descripción de la imagen"
                  :contain="true"
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          </div>

          <div class="col-4 loginBack window-height">
            <q-card class="loginBack shadow-4 window-height">
              <q-card-section>
                <div class="row jusitfy-center flex flex-center">
                  <div class="col-8 flex flex-center">
                    <q-img
                      src="~assets/img/logoCompleto.png"
                      alt="Descripción de la imagen"
                      :contain="true"
                      width="70%"
                      height="70%"
                    />
                  </div>
                </div>

                <q-form @submit="onSubmit" class="q-gutter-md q-pt-md">
                  <q-input
                    filled
                    type="email"
                    class="q-px-sm my-custom-error-class"
                    label-color="white"
                    input-class="text-white"
                    standout="bg-primary"
                    v-model="mail"
                    label="Usuario"
                    dense
                    lazy-rules
                    :rules="[
                      (val) => (val && val.length > 0) || 'Ingresa tu Usuario',
                    ]"
                  />
                  <div>
                    <q-input
                      filled
                      class="q-px-sm my-custom-error-class"
                      type="password"
                      label-color="white"
                      input-class="text-white"
                      standout="bg-primary"
                      v-model="password"
                      dense
                      label="Contraseña"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val !== null && val !== '') ||
                          'Ingresa tu Contraseña',
                      ]"
                    />
                    <div class="row justify-end">
                      <div class="col col-md-auto">
                        <q-checkbox
                          v-model="rememberMe"
                          label="Remember Me"
                          size="25px"
                          dense
                          class="q-mr-lg bigText"
                          :class="{
                            miniText: !$q.screen.gt.sm,
                          }"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <q-btn
                      :ripple="false"
                      class="col-11 q-ml-sm q-mt-lg"
                      label="Login"
                      :loading="submitting"
                      type="submit"
                      color="primary"
                      full-width
                      dense
                    />
                  </div>
                </q-form>
              </q-card-section>
              <q-card-section v-if="$q.screen.gt.sm"> </q-card-section>
              <q-card-section v-if="$q.screen.gt.sm"> </q-card-section>
            </q-card>
          </div>
          <div class="col-4 rightBackground window-height text-white">
            <div class="row jusitfy-center flex flex-center">
              <div class="col-12 flex flex-center">
                <q-img
                  src="~assets/img/logo.png"
                  alt="Descripción de la imagen"
                  :contain="true"
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>
<script setup>
import { defineComponent, ref, computed } from "vue";
import useQuasar from "quasar/src/composables/use-quasar.js";
import router from "src/router/index";
import Server from "src/getServer";

import { userE } from "../stores/userEmployee";
const userEmployee = userE();
import { userC } from "../stores/userCompany";
const userCompany = userC();
const apiUrl = process.env.VUE_APP_API_URL;
defineComponent({
  name: "LoginPage",
});
const $q = useQuasar();
const mail = ref(null);
const password = ref(null);
const rememberMe = ref(false);
const showCaption = ref(false);
const submitting = ref(false);
async function onSubmit() {
  try {
    submitting.value = true;
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
      if (data.userEmployee) {
        data.userEmployee.photo = `data:image;base64,${data.userEmployee.photo}`;
        data.userEmployee.CV = `data:application/pdf;base64,${data.userEmployee.CV}`;
        userEmployee.setUserEmployee(data.userEmployee);
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
        router.push({ name: "InicioCompany" });
      }
    }
  } catch (error) {
    console.log(error);
  }
  submitting.value = false;
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
  color: $primary;
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
  color: $primary2;
}
.loginBack {
  background-color: #03192b;
  color: white;
}
.bigText {
  font-size: 12px;
}
.miniText {
  font-size: 8px;
}
.caption {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 24px;
  padding: 10px;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 0;
  overflow: hidden;
}

.transition {
  transition: height 0.5s;
}

.background-app {
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
}
// .q-field__messages {
//   color: rgb(0, 0, 0) !important;
// }
// .q-field__label {
//   color: white !important;
// }
// .text-negative {
//   color: rgb(0, 0, 0) !important;
// }
.my-custom-error-class .q-field__label {
  color: white !important;
}

.my-custom-error-class .text-negative {
  color: rgb(209, 209, 209) !important; /* Cambia el color a tu preferencia */
}
.my-custom-error-class .q-field__messages {
  color: rgb(196, 196, 196) !important; /* Cambia el color a tu preferencia */
}

.leftBackground {
  background-image: linear-gradient(to right, $secondary2, #030416);
}
.rightBackground {
  background-image: linear-gradient(to left, $secondary2, #030416);
}
</style>

