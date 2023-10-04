<template>
  <div class="container-titleRE q-mt-md">
    <div class="row justify-between">
      <div class="col-1" v-if="$q.screen.gt.sm"></div>
      <div class="col flex items-center body">
        <q-icon
          size="60px"
          name="group"
          class="text-primary q-mb-lg q-ml-xl q-mr-md"
          color="transparent"
        >
        </q-icon>
        <strong class="border size">Registrar Empresa</strong>
        <strong class="wave size">Registrar Empresa</strong>
      </div>
    </div>
  </div>
  <div class="container-FormE">
    <q-form class="" ref="registerEForm" @submit="CreateUser">
      <div class="row justify-between q-mt-md">
        <div class="col-5 q-ml-xs q-mr-xs">
          <strong class="q-ml-md text-registerE">Email:</strong>
          <q-input
            filled
            type="email"
            class="q-px-sm"
            input-class="text-black"
            standout="bg-grey-3"
            v-model="mail"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Ingresa tu Correo']"
          >
            <template v-slot:append>
              <q-icon class="text-primary" name="fa-solid fa-envelope" />
            </template>
          </q-input>
        </div>

        <div class="col-3">
          <strong class="q-ml-md text-registerE">Contraseña:</strong>
          <q-input
            filled
            class="q-px-sm"
            type="password"
            input-class="text-black"
            standout="bg-grey-3"
            v-model="password"
            lazy-rules
            :rules="[
              (val) => (val !== null && val !== '') || 'Ingresa tu Contraseña',
              (val) => val.length > 7 || 'Debe tener al menos 8 digitos',
            ]"
          >
            <template v-slot:append>
              <q-icon class="text-primary" name="fa-solid fa-lock" />
            </template>
          </q-input>
        </div>
        <div class="col-3 q-mr-xs q-ml-xs">
          <strong class="q-ml-md text-registerE">Nombre:</strong>
          <q-input
            filled
            class="q-px-sm"
            input-class="text-black"
            standout="bg-grey-3"
            v-model="name"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Ingresa tus Nombres']"
          >
            <template v-slot:append>
              <q-icon class="text-primary" name="fa-solid fa-circle-user" />
            </template>
          </q-input>
        </div>
      </div>
      <div class="row justify-around items-center q-mt-md">
        <div class="col-3 q-mr-xs">
          <strong class="q-ml-md text-registerE">Descripcion:</strong>
          <q-input
            filled
            class="q-px-sm"
            type="textarea"
            input-class="text-black"
            standout="bg-grey-3"
            v-model="desc"
            lazy-rules
            :rules="[
              (val) => (val !== null && val !== '') || 'Ingresa tu Descripcion',
            ]"
          >
            <template v-slot:append>
              <q-icon class="text-primary" name="fa-solid fa-note-sticky" />
            </template>
          </q-input>
        </div>

        <div class="col-2 q-mr-xs">
          <strong class="q-ml-md text-registerE">Estado:</strong>
          <q-select
            filled
            v-model="estadoSelect"
            use-input
            transition-show="scale"
            transition-hide="scale"
            hide-selected
            hide-dropdown-icon
            fill-input
            input-debounce="0"
            :options="estadoFilterOptions"
            @filter="EstadoFilter"
            @update:model-value="EstadoSet"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Selecciona un Estado',
            ]"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
            <template v-slot:append>
              <q-icon class="text-primary" name="fa-solid fa-location-dot" />
            </template>
          </q-select>
        </div>
        <div class="col-2 q-mr-xs">
          <strong class="q-ml-md text-registerE">Ciudad:</strong>
          <q-select
            filled
            v-model="ciudadSelect"
            use-input
            transition-show="scale"
            transition-hide="scale"
            hide-selected
            hide-dropdown-icon
            fill-input
            input-debounce="0"
            :options="ciudadFilterOptions"
            @filter="CiudadFilter"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Selecciona una Ciudad',
            ]"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
            <template v-slot:append>
              <q-icon class="text-primary" name="fa-solid fa-location-dot" />
            </template>
          </q-select>
        </div>
      </div>
      <div class="row justify-around q-mt-md">
        <div class="col-5 col-md-auto">
          <strong class="q-ml-md text-registerE">Logotipo:</strong>
          <q-uploader
            style="width: 350px; height: 270px"
            accept=".jpg, image/*"
            :auto-upload="false"
            v-model="logo"
            hide-upload-btn
            class="uploader-custom"
            @input="updateLogo"
          />
        </div>
        <div class="col-2 col-md-auto self-center">
          <q-btn
            class="q-ma-xl tertiary text-white"
            size="20px"
            push
            label="Enviar"
            type="submit"
          >
            <q-icon
              name="fa-solid fa-paper-plane"
              size="20px"
              class="q-ml-md"
            />
          </q-btn>
        </div>
      </div>
    </q-form>
  </div>
  {{ logo }}
</template>
<script setup>
import { defineComponent, ref, computed, onMounted } from "vue";
import useQuasar from "quasar/src/composables/use-quasar.js";
import router from "src/router/index";
import Server from "src/getServer";
import { noLogin } from "../../stores/noLogin";

const apiUrl = process.env.VUE_APP_API_URL;
const storeNoLogin = noLogin();
storeNoLogin.bandDrawer = false;
const $q = useQuasar();
defineComponent({
  name: "RegisterE",
});
onMounted(async () => {
  GetLocations();
});
//#region Files
const imgNormal = ref(null);
const imgUp = ref(null);

//#endregion
//#region Formulario
const mail = ref(null);
const password = ref(null);
const name = ref(null);
const desc = ref(null);
const logo = ref(null);
//#region Ajustes formulario

function handleFileSelection(event) {
  imgUp.value = event.target.files[0];
  // console.log("Imagina", imgUp.value);
}
//#endregion
//#region Configuracion Location
const locations = ref(null);
const estadoSelect = ref(null);
const estadoFilterOptions = ref([]);
const ciudades = ref([]);
const ciudadSelect = ref(null);
const ciudadFilterOptions = ref([]);

async function GetLocations() {
  try {
    let response = await fetch(`${await Server.GetServer()}/location`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    locations.value = await response.json();
    EstadoOptionsSet();
  } catch (error) {
    console.error(error);
  }
}
function EstadoFilter(val, update) {
  update(() => {
    const needle = val.toLocaleLowerCase();
    const localFilterAux = [];
    locations.value
      .filter((v) => v.state.toLocaleLowerCase().indexOf(needle) > -1)
      .forEach((ubi) => {
        localFilterAux.push(ubi.state);
      });
    estadoFilterOptions.value = localFilterAux;
  });
}
function EstadoSet() {
  locations.value.forEach((location) => {
    if (location.state === estadoSelect.value) {
      ciudades.value = location.cities;
      ciudadFilterOptions.value = ciudades.value;
      ciudadSelect.value = null;
      return 0;
    }
  });
}
function EstadoOptionsSet() {
  locations.value.forEach((ubi) => {
    estadoFilterOptions.value.push(ubi.state);
  });
}
function CiudadFilter(val, update) {
  update(() => {
    const needle = val.toLocaleLowerCase();
    const localFilterAux = [];
    ciudades.value
      .filter((v) => v.toLocaleLowerCase().indexOf(needle) > -1)
      .forEach((ubi) => {
        localFilterAux.push(ubi);
      });
    ciudadFilterOptions.value = localFilterAux;
  });
}
//#endregion
//#region Envio de Formulario
let registerEForm = ref(null);
async function CreateUser() {
  if (logo.value) {
    try {
      const formData = new FormData();
      formData.append("logo", logo.value); // Assuming you have an input element for the PDF file
      formData.append("mail", mail.value);
      formData.append("password", password.value);
      formData.append("type_user", "company");
      formData.append("nameCompany", name.value);
      formData.append("description", desc.value);
      formData.append("rfc", "0");
      formData.append("sat", "0");
      formData.append("country", "Mexico");
      formData.append("state", estadoSelect.value);
      formData.append("city", ciudadSelect.value);
      let response = await fetch(`${await Server.GetServer()}/company`, {
        method: "POST",
        body: formData,
      });
      let aux = await response.json();
      if (aux.error) {
        $q.notify({
          color: "negative",
          textColor: "white",
          icon: "fa-solid fa-triangle-exclamation",
          message: aux.error,
        });
      } else {
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Guardado",
        });
        router.push({ name: "login" });
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    $q.notify({
      color: "negative",
      textColor: "white",
      icon: "fa-solid fa-triangle-exclamation",
      message: "Agregue una Foto",
    });
  }

  registerEForm.value.resetValidation();
}

function updateLogo(newLogo) {
  // console.log(logo.value);
  logo.value = newLogo.target.files[0];
}
function updatePdf(newPdf) {
  CV.value = newPdf.target.files[0];
  // console.log(CV.value);
}
//#endregion
//#endregion
</script>
<style lang="scss">
.container-FormE {
  // background-image: linear-gradient(to right, #f0f1f6, #e2e4eb);
  background-color: rgb(246, 246, 246);
  width: 90%;
  border: 5px solid rgb(234, 234, 234);
  border-radius: 10px;
  box-shadow: 0 12px 4px rgba(0, 0, 0, 0.1);
  margin: 0 auto; /* Centra horizontalmente */
  position: relative;
}

.container-FormE::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(237, 237, 237);
  z-index: -1;
}
.container-titleRE {
  background-color: rgb(246, 246, 246);
  width: 90%;
  border: 5px solid rgb(234, 234, 234);
  border-radius: 5px;
  margin: 0 auto; /* Centra horizontalmente */
  position: relative;
  padding: 20px;
}

.container-titleRE ::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(237, 237, 237);
  z-index: -1;
}
.text-registerE {
  font-size: 18px;
  color: $primary;
}
.title-decorative {
  font-family: Georgia, "Times New Roman", Times, serif;
  font-size: 40px;
  color: $primary;
  text-shadow: 3px 3px 1px rgba(0, 0, 0, 0.2);
}

.size {
  font-size: 15vmin;
  position: absolute;
}

@media (max-width: 1400px) {
  .size {
    font-size: 12vmin;
    position: absolute;
  }
}

@media (max-width: 1200px) {
  .size {
    font-size: 11vmin;
    position: absolute;
  }
}

@media (max-width: 991px) {
  .size {
    font-size: 9vmin;
    position: absolute;
  }
}

@media (max-width: 767px) {
  .size {
    font-size: 8vmin;
    position: absolute;
  }
}

@media (max-width: 576px) {
  .size {
    font-size: 8vmin;
    position: absolute;
  }
}

.body {
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: "Work Sans", sans-serif;
}

.border {
  color: rgb(255, 255, 255);
  text-shadow: -1px -1px 0 $tertiary, 1px -1px 0 $tertiary, -1px 1px 0 $tertiary,
    1px 1px 0 $tertiary;
}

.wave {
  color: $tertiary;
  animation: shift 3s ease-in-out infinite;
}

@keyframes shift {
  0%,
  100% {
    clip-path: polygon(
      0% 47%,
      10% 48%,
      33% 54%,
      54% 60%,
      70% 61%,
      84% 59%,
      100% 52%,
      100% 100%,
      0% 100%
    );
  }
  50% {
    clip-path: polygon(
      0% 60%,
      15% 65%,
      34% 66%,
      51% 62%,
      67% 50%,
      84% 45%,
      100% 46%,
      100% 100%,
      0% 100%
    );
  }
}
</style>

