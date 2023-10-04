<template>
  <q-page padding>
    <div v-if="userCompany.CompanyUser._id">
      <div class="row justify-between">
        <div class="col-8">
          <q-form class="" ref="SettingsEForm" @submit="GuardarCompany">
            <div>
              <q-card class="my-card" bordered flat>
                <q-card-section class="quinary">
                  <div class="row justify-between">
                    <div class="col-8">
                      <div class="row">
                        <div class="col-7">
                          <strong class="q-ml-md">Nombre de la Empresa:</strong>
                          <q-input
                            filled
                            class="q-px-sm"
                            input-class="text-black"
                            standout="bg-blue-3"
                            v-model="CompanyUser.nameCompany"
                            lazy-rules
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Ingresa tu Nombre',
                            ]"
                          >
                            <template v-slot:append>
                              <q-icon
                                class="text-primary"
                                name="fa-solid fa-briefcase"
                              />
                            </template>
                          </q-input>
                        </div>
                      </div>
                    </div>
                    <div class="col col-md-auto">
                      <q-btn
                        class="bg-blue-1 text-primary q-mt-md q-ml-md"
                        dense
                        push
                        size="20px"
                        ripple="false"
                        to="/company"
                        icon="fa-solid fa-house"
                      >
                        <q-tooltip
                          anchor="top middle"
                          self="top middle"
                          :delay="200"
                          class="bg-blue-1 text-primary q-mb-xl"
                          ><strong> Inicio </strong></q-tooltip
                        >
                      </q-btn>
                    </div>
                  </div>
                </q-card-section>
                <q-card-section class="bg-grey-2">
                  <strong class="q-ml-md">Descripción:</strong>
                  <q-input
                    filled
                    type="textarea"
                    dense
                    class="q-px-sm"
                    input-class="text-black"
                    standout="bg-grey-2"
                    v-model="CompanyUser.description"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length > 0) ||
                        'Ingresa la Descripcion del trabajo ',
                    ]"
                    :rows="8"
                  >
                    <template v-slot:append>
                      <q-icon
                        class="text-primary"
                        name="fa-solid fa-rectangle-list"
                      />
                    </template>
                  </q-input>
                  <div class="row justify-between">
                    <div class="col-8 q-mt-sm text-black">
                      <q-card class="card bg-grey-2">
                        <q-card-section class="card bg-grey-4">
                          <strong> Ubicacion </strong>
                        </q-card-section>
                        <q-card-section>
                          <q-card-section>
                            <div class="row">
                              <div class="col">
                                <strong class="q-ml-md">Estado:</strong>
                                <q-select
                                  filled
                                  dense
                                  v-model="CompanyUser.location.state"
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
                                    (val) =>
                                      (val && val.length > 0) ||
                                      'Selecciona un Estado',
                                  ]"
                                >
                                  <template v-slot:no-option>
                                    <q-item>
                                      <q-item-section class="text-grey">
                                        No results
                                      </q-item-section>
                                    </q-item>
                                  </template>
                                  <template v-slot:append>
                                    <q-icon
                                      class="text-primary"
                                      name="fa-solid fa-location-dot"
                                    />
                                  </template>
                                </q-select>
                              </div>
                              <div class="col q-ml-sm">
                                <strong class="q-ml-md">Ciudad:</strong>
                                <q-select
                                  filled
                                  dense
                                  v-model="CompanyUser.location.city"
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
                                    (val) =>
                                      (val && val.length > 0) ||
                                      'Selecciona una Ciudad',
                                  ]"
                                >
                                  <template v-slot:no-option>
                                    <q-item>
                                      <q-item-section class="text-grey">
                                        No results
                                      </q-item-section>
                                    </q-item>
                                  </template>
                                  <template v-slot:append>
                                    <q-icon
                                      class="text-primary"
                                      name="fa-solid fa-location-dot"
                                    />
                                  </template>
                                </q-select>
                              </div>
                            </div>
                          </q-card-section>
                        </q-card-section>
                        <q-separator />
                      </q-card>
                    </div>

                    <div class="col-5 col-md-auto">
                      <div class="container-ImgUE">
                        <q-img
                          :src="CompanyUser.logo"
                          spinner-color="white"
                          style="height: 200px; width: 200px"
                        />
                      </div>
                    </div>
                  </div>
                </q-card-section>
                <q-card-actions align="right" class="bg-grey-3">
                  <q-btn
                    class="q-ml-md"
                    dense
                    push
                    color="primary"
                    text-color="white"
                    size="20px"
                    ripple="false"
                    type="sumbit"
                    icon="fa-solid fa-floppy-disk"
                    label="Guardar"
                  >
                  </q-btn>
                </q-card-actions>
              </q-card>
            </div>
          </q-form>
        </div>
        <div class="col-3 col-md-auto">
          <q-card>
            <q-card-section class="secondary2">
              <strong class="q-ml-md text-registerE text-white"
                >Cambia el Logo de la Empresa:</strong
              >
            </q-card-section>
            <q-card-section class="bg-grey-2">
              <q-uploader
                style="width: 250px; height: 270px"
                accept=".jpg, image/*"
                :auto-upload="false"
                v-model="photo"
                color="secondary"
                class="uploader-custom"
                @input="updatePhoto"
                hide-upload-btn
                ref="uploaderPhoto"
              />
            </q-card-section>

            <q-card-actions class="bg-grey-3">
              <q-btn
                class="bg-grey-4 text-primary q-ml-md"
                dense
                push
                size="20px"
                ripple="false"
                @click="GuardarFoto"
                icon="fa-solid fa-floppy-disk"
                label="Guardar"
              >
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { defineComponent, ref, onMounted, onBeforeMount } from "vue";
import { useQuasar } from "quasar";
import Server from "src/getServer";
import { userC } from "src/stores/userCompany.js";
import { companyJobs } from "src/stores/companyJobs.js";
import { formatDistanceToNow } from "date-fns";
import router from "src/router/index";
const apiUrl = process.env.VUE_APP_API_URL;
const userCompany = userC();
const $q = useQuasar();
const CompanyUser = ref(null);
CompanyUser.value = JSON.parse(JSON.stringify(userCompany.getUserCompany()));
defineComponent({
  name: "CompanySettings",
});

onBeforeMount(async () => {
  userCompany.setActiveView("ajustes");
  GetLocations();
});

//#region Configuracion Location
const locations = ref(null);

const estadoFilterOptions = ref([]);
const ciudades = ref([]);

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
    console.log(error);
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
    if (location.state === CompanyUser.value.location.state) {
      ciudades.value = location.cities;
      ciudadFilterOptions.value = ciudades.value;
      CompanyUser.value.location.city = null;
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
async function GuardarCompany() {
  try {
    const urlParams = new URLSearchParams();
    urlParams.append("nameCompany", CompanyUser.value.nameCompany);
    urlParams.append("description", CompanyUser.value.description);
    urlParams.append("rfc", "1");
    urlParams.append("sat", "1");
    urlParams.append("country", "Mexico");
    urlParams.append("state", CompanyUser.value.location.state);
    urlParams.append("city", CompanyUser.value.location.city);

    const response = await fetch(
      `${await Server.GetServer()}/company/edit/${CompanyUser.value._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: urlParams,
      }
    );
    const data = await response.json();
    if (data.error) {
      $q.notify({
        color: "negative",
        textColor: "white",
        icon: "warning",
        message: data.error,
      });
    } else {
      $q.notify({
        color: "positive",
        textColor: "white",
        icon: "fa-solid fa-check",
        message: "Guardado Correctamente",
      });
      userCompany.setUserCompany(CompanyUser.value);
    }
  } catch (error) {
    console.log(error);
  }
}
//#region logo
const logo = ref(null);
const uploaderPhoto = ref(null);
function updatePhoto(newPhoto) {
  logo.value = newPhoto.target.files[0];
}
async function GuardarFoto() {
  if (logo.value != null) {
    try {
      const formData = new FormData();
      formData.append("logo", logo.value);
      let response = await fetch(
        `${await Server.GetServer()}/company/editLogo/${CompanyUser.value._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      let data = await response.json();
      if (data.error) {
        $q.notify({
          color: "negative",
          textColor: "white",
          icon: "fa-solid fa-triangle-exclamation",
          message: data.error,
        });
      } else {
        userCompany.CompanyUser.logo = `data:image;base64,${data.logo}`;
        CompanyUser.value.logo = userCompany.CompanyUser.logo;
        logo.value = null;
        uploaderPhoto.value.reset();
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Foto Actualizada",
        });
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    $q.notify({
      color: "Grey-2",
      textColor: "white",
      icon: "fa-solid fa-circle-exclamation",
      message: "No has seleccionado una foto",
    });
  }
}
//#endregion
</script>
<style lang="scss">
.container-ImgUE {
  background-color: #ebedf2;
  padding: 10px;
  border: 1px solid #d0d1d6;
  border-radius: 10px;
}

.container-ImgUE::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: lightgray;
  z-index: -1;
}
</style>