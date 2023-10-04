<template>
  <q-page padding>
    <div v-if="EmployeeUser">
      <div class="row justify-center">
        <div class="col-8">
          <q-card class="my-card" bordered flat>
            <q-card-section :class="getBGqStatus(storeCompanyJobs.status)">
              <div class="row justify-between">
                <div class="col col-md-auto">
                  <div class="">
                    <q-icon
                      name="fa-solid fa-user-tie"
                      color="primary2"
                      size="39px"
                      class="q-mb-md q-mr-sm"
                    >
                    </q-icon>
                    <strong class="titleUser text-primary2"
                      >{{ EmployeeUser.name }}
                      {{ EmployeeUser.last_name }}</strong
                    >
                  </div>
                </div>
                <div class="col col-md-auto">
                  <q-btn
                    class="text-primary q-mt-sm"
                    dense
                    outline
                    label="Ver CV"
                    icon-right="fa-solid fa-file-export"
                    @click="SeePdf"
                  >
                  </q-btn>
                </div>
              </div>
            </q-card-section>
            <q-card-section class="bg-grey-2">
              <div class="row justify-between">
                <div class="col-8 q-mt-sm text-black">
                  <q-card class="card bg-grey-2">
                    <q-card-section class="bg-grey-4">
                      <strong style="font-size: 17px">
                        Carrera: {{ EmployeeUser.carrera }}
                      </strong>
                      <br />

                      <strong style="font-size: 17px">
                        Universidad:
                        {{ EmployeeUser.university }}
                      </strong>
                    </q-card-section>
                    <q-separator />
                    <q-card-section>
                      <q-card class="card bg-grey-2">
                        <q-card-section class="bg-grey-3">
                          <strong style="font-size: 17px"
                            >Carta de Presentacion:</strong
                          >
                        </q-card-section>
                        <q-card-section>
                          {{ EmployeeUser.introduction }}
                        </q-card-section>
                      </q-card>
                      <br />

                      <strong class="" style="font-size: 17px"
                        >Habilidades:
                      </strong>

                      <div>
                        <div>
                          <template
                            v-for="(skill, id) in EmployeeUser.skills"
                            :key="id"
                          >
                            <q-chip
                              class="glossy text-white shadow-10"
                              color="primary"
                              :label="skill"
                            />
                          </template>
                        </div>
                      </div>
                      <div class="row justify-end">
                        <div class="col col-md-auto">
                          <q-icon
                            size="11px"
                            name="fa-solid fa-location-dot"
                            class="q-mr-xs q-mb-xs"
                          >
                          </q-icon>
                          <span style="font-size: 11px"
                            >{{ EmployeeUser.location.state }},
                            {{ EmployeeUser.location.city }}.
                          </span>
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </div>

                <div class="col-5 col-md-auto">
                  <div class="container-ImgUE">
                    <q-img
                      :src="EmployeeUser.photo"
                      spinner-color="white"
                      style="height: 200px; width: 200px"
                    />
                  </div>
                  <q-card
                    class="q-mt-xs q-ml-md bg-grey-3"
                    style="max-width: 200px"
                  >
                    <q-card-section class="tertiary">
                      <strong class="text-white" style="font-size: 14px"
                        >Informacion de Contacto:
                      </strong>
                    </q-card-section>
                    <q-card-section>
                      <strong style="font-size: 12px"
                        >Email: {{ EmployeeUser.idUser.mail }}</strong
                      >
                      <br />
                      <strong style="font-size: 12px">
                        Celular:
                        {{ EmployeeUser.phone_number }}</strong
                      >
                    </q-card-section>
                    <q-separator />
                    <q-card-section
                      class="bg-negative text-white"
                      v-if="storeCompanyJobs.status == 'Rechazado'"
                    >
                      <strong style="font-size: 15px"> Rechazado </strong>
                    </q-card-section>
                  </q-card>
                </div>
              </div>
            </q-card-section>
            <q-card-actions align="right" class="bg-grey-3">
              <q-btn
                class="q-mt-md"
                label="volver"
                color="primary"
                icon="fa-solid fa-arrow-left"
                @click="GoBack()"
              >
                <q-tooltip
                  anchor="bottom middle"
                  self="bottom middle"
                  :delay="200"
                  class="bg-primary text-white q-mb-xl"
                  ><strong> Volver </strong></q-tooltip
                >
              </q-btn>
              <q-btn
                v-if="storeCompanyJobs.status != 'Rechazado'"
                class="q-mt-md"
                color="negative"
                icon="fa-solid fa-thumbs-down"
                label="Rechazar"
                @click="RechazarStatus()"
              >
                <q-tooltip
                  anchor="bottom middle"
                  self="bottom middle"
                  :delay="200"
                  class="bg-negative text-white q-mb-xl"
                  ><strong> Rechazar Postulacion </strong></q-tooltip
                >
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
      <div v-if="pdfShow">
        <q-btn
          fill
          color="negative"
          class="exit-button text-white"
          icon="fa-solid fa-x"
          @click="ExitPdf"
        >
          Salir
        </q-btn>
        <embed class="sizePdf" :src="EmployeeUser.CV" type="application/pdf" />
      </div>
    </div>
    <div class="flex flex-center" v-else>
      <div v-if="bandCargando">
        <div class="flex flex-center">
          <strong class="q-ml-lg" style="font-size: 40px">Cargando...</strong>
        </div>
        <div class="flex flex-center">
          <q-spinner color="primary" size="110px" :thickness="5" />
        </div>
      </div>
      <div v-else>
        <q-icon
          size="40px"
          color="negative"
          name="fa-solid fa-circle-exclamation"
        >
          <strong>Hubo un problema</strong>
        </q-icon>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { defineComponent, ref, onMounted, onBeforeMount } from "vue";
import { useQuasar } from "quasar";
import Server from "src/getServer";
import { userE } from "../../stores/userEmployee";
import { companyJobs } from "src/stores/companyJobs.js";
import router from "src/router/index";
const $q = useQuasar();
const userEmployee = userE();
const apiUrl = process.env.VUE_APP_API_URL;
import { useRoute } from "vue-router";
const route = useRoute();
const storeCompanyJobs = companyJobs();
defineComponent({
  name: "PerfilE",
});
onBeforeMount(async () => {
  getUser();
  if (!storeCompanyJobs.status) {
    router.push({ name: "InicioCompany" });
  }
});
const EmployeeUser = ref(null);
const bandCargando = ref(true);
async function getUser() {
  try {
    let response = await fetch(
      `${await Server.GetServer()}/employee/show/${route.params.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    let data = await response.json();
    if (data.error) {
      bandCargando.value = false;
      $q.notify({
        color: "negative",
        textColor: "white",
        icon: "warning",
        message: data.error,
      });
    } else {
      EmployeeUser.value = data;
      EmployeeUser.value.photo = `data:image;base64,${EmployeeUser.value.photo}`;
      EmployeeUser.value.CV = `data:application/pdf;base64,${EmployeeUser.value.CV}`;
      bandCargando.value = false;
    }
  } catch (error) {
    console.log(error);
  }
}
async function RechazarStatus() {
  try {
    const urlParams = new URLSearchParams();
    urlParams.append("idEmployee", EmployeeUser.value._id);
    urlParams.append("idJob", storeCompanyJobs.selectJob._id);
    urlParams.append("status", "Rechazado");

    const response = await fetch(
      `${await Server.GetServer()}/company/changeStatus`,
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
        message: "Postulante Rechazado",
      });
      storeCompanyJobs.setStatus("Rechazado");
    }
  } catch (error) {
    console.log(error);
  }
}
function GoBack() {
  router.push({
    path: `/company/job/aplicantes/${storeCompanyJobs.selectJob._id}`,
  });
}
const pdfShow = ref(false);
function SeePdf() {
  pdfShow.value = true;
}
function ExitPdf() {
  pdfShow.value = false;
}
function getBGqStatus(status) {
  if (status == "Recibido") {
    return "bg-green-1";
  } else if (status == "Visto") {
    return "bg-blue-1";
  } else if (status == "Rechazado") {
    return "bg-red-3 ";
  }
}
</script>
<style lang="scss">
.titleUser {
  font-size: 28px;
}
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
.clickable-icon {
  cursor: pointer;
}
.exit-button {
  position: absolute;
  top: 10px; /* Ajusta la posición vertical según tus necesidades */
  left: 10px; /* Ajusta la posición horizontal según tus necesidades */
  z-index: 1; /* Asegura que el botón esté por encima del embed */
}
.sizePdf {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>