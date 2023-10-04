<template>
  <q-page class="q-pa-xs color-panel">
    <q-tab-panels v-model="piniaJobs.tabView" animated class="color-panel">
      <q-tab-panel name="Empleado">
        <div class="row justify-center q-mb-lg">
          <div class="col-12">
            <div class="row container-ImgIE">
              <div class="col-6">
                <q-img
                  alt=""
                  class="col q-mt-md"
                  src="~assets/img/trabajo.png"
                  width="50%"
                  height="95%"
                />
              </div>
              <div class="col-3 col-md-auto text-white q-mt-xl">
                <strong style="font-size: 50px"> GetJobTing!! </strong>
                <br />
                <br />

                <div class="q-ml-xs">
                  <strong style="font-size: 20px">
                    Encuentra las mejores pasantias
                  </strong>
                  <br />
                  <strong style="font-size: 20px">
                    con las mejores empresas
                  </strong>
                </div>
                <div class="q-ml-md q-mt-xl">
                  <q-btn
                    size="20px"
                    color="primary"
                    text-color="white"
                    push
                    label="Crea tu Cuenta"
                    icon="fa-solid fa-user-tie"
                    to="/register/employee"
                  >
                  </q-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="jobs">
          <div class="container-busqueda q-mt-xs">
            <div class="row justify-center">
              <div class="col q-ml-lg">
                <q-input
                  label="Buscador"
                  label-color="primary"
                  input-class="text-primary"
                  v-model="buscarJob"
                  bg-color="grey-3"
                  @update:model-value="OnBusquedaJob"
                >
                  <template v-slot:prepend>
                    <q-avatar>
                      <q-icon
                        size="25px"
                        class="text-primary"
                        name="fa-solid fa-magnifying-glass"
                      />
                    </q-avatar>
                  </template>
                </q-input>
              </div>
              <div class="col q-mr-lg">
                <q-input
                  label="Ubicacion"
                  label-color="primary"
                  input-class="text-primary"
                  v-model="buscarUbi"
                  bg-color="grey-3"
                  @update:model-value="OnBusquedaJob"
                >
                  <template v-slot:prepend>
                    <q-avatar>
                      <q-icon
                        size="25px"
                        class="text-primary"
                        name="fa-solid fa-magnifying-glass-location"
                      />
                    </q-avatar>
                  </template>
                </q-input>
              </div>
            </div>
          </div>
          <q-table
            row-key="name"
            :columns="columnJobs"
            :rows="jobsfilter"
            grid
            hide-header
            hide-bottom
            dense
            virtual-scroll
            :pagination="perPagination"
            :rows-per-page-options="[0]"
          >
            <template v-slot:item="props">
              <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
                <!-- <q-intersection transition="scale"> -->
                <q-card
                  class="animated-card"
                  bordered
                  flat
                  @mouseenter="showCardAction[props.pageIndex] = true"
                  @mouseleave="showCardAction[props.pageIndex] = false"
                >
                  <q-separator />
                  <q-card-section class="bg-grey-2">
                    <div class="q-mb-sm">
                      <div class="row justify-between">
                        <div class="col col-md-auto q-mt-sm text-black">
                          <strong style="font-size: 20px"
                            >{{ props.row.idUserCompany.nameCompany }}
                          </strong>
                        </div>
                        <div class="col col-md-auto">
                          <q-avatar size="40px" square>
                            <img
                              alt="Quasar logo"
                              :src="props.row.idUserCompany.logo"
                              style="width: 100%; height: 100%"
                            />
                          </q-avatar>
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                  <q-card-section class="bg-grey-1">
                    <strong class="titleJob">{{ props.row.title }} </strong>

                    <q-separator />
                    <div class="row justify-end">
                      <div class="col col-md-auto">
                        <q-icon
                          size="11px"
                          name="fa-solid fa-location-dot"
                          class="q-mr-xs q-mb-xs"
                        >
                        </q-icon>
                        <span style="font-size: 11px">
                          {{ props.row.location.state }},
                          {{ props.row.location.city }}.
                        </span>
                      </div>
                    </div>

                    <strong class="descriptionJob"
                      >{{
                        shortenDescription(props.row.about_job[0].description)
                      }}
                    </strong>

                    <div class="row justify-end q-mt-md">
                      <div class="col col-md-auto">
                        <q-badge
                          rounded
                          color="grey-2 text-black "
                          class="etiqueta"
                        >
                          <strong class=""
                            >{{ props.row.about_job[0].modality }}
                          </strong>
                        </q-badge>
                      </div>
                      <div class="col col-md-auto q-mx-sm">
                        <q-badge
                          rounded
                          color="grey-2 text-black "
                          class="etiqueta"
                        >
                          <strong class=""
                            >${{ formattedAmount(props.row.pay) }}
                          </strong>
                        </q-badge>
                      </div>
                      <div class="col col-md-auto">
                        <q-badge
                          rounded
                          color="grey-2 text-black "
                          class="etiqueta"
                        >
                          <strong class=""
                            >Vacantes:{{ props.row.vacancies }}
                          </strong>
                        </q-badge>
                      </div>
                    </div>
                    <div class="q-mt-sm">
                      <span style="font-size: 11px">
                        {{ FormatUpdatedAt(props.row.updatedAt) }}
                      </span>
                    </div>
                  </q-card-section>
                  <q-slide-transition>
                    <q-card-action
                      class="slide-content"
                      v-show="showCardAction[props.pageIndex]"
                    >
                      <q-slide-transition>
                        <div
                          class="row justify-center bg-grey-3"
                          v-show="showCardAction[props.pageIndex]"
                        >
                          <div class="col col-md-auto">
                            <div class="col col-md-auto">
                              <q-btn
                                class="q-ma-sm"
                                push
                                label="Postulate"
                                color="blue"
                                icon="fa-solid fa-paper-plane"
                                to="/login"
                              >
                                <q-tooltip
                                  anchor="top middle"
                                  self="top middle"
                                  :delay="200"
                                  class="bg-light-dark-10 text-white q-mb-xl"
                                  ><strong> Postulate </strong></q-tooltip
                                >
                              </q-btn>
                            </div>
                          </div>
                        </div>
                      </q-slide-transition>
                    </q-card-action>
                  </q-slide-transition>
                </q-card>
                <!-- </q-intersection> -->
              </div>
            </template>
          </q-table>
        </div>
        <div v-else>
          <div class="flex flex-center">
            <strong class="q-ml-lg" style="font-size: 40px">Cargando...</strong>
          </div>
          <div class="flex flex-center">
            <q-spinner color="primary" size="60px" :thickness="5" />
          </div>
        </div>
      </q-tab-panel>
      <q-tab-panel name="Empresa">
        <div class="container-titleCompany text-white">
          <div class="row">
            <div class="col q-ml-md q-mt-sm">
              <strong style="font-size: 70px">GetJobTing!! </strong>
              <br />
              <span style="font-size: 15px">
                Esta especializada en el reclutamniento de estudiantes.
              </span>
              <br />

              <br />
              <span style="font-size: 40px">Registra tu Empresa</span>
              <br />
              <q-btn
                class="q-ma-xl secondary"
                size="25px"
                push
                label="Registrate!"
                icon="fa-solid fa-briefcase"
                @click="toCompany"
              />
            </div>
            <div class="col">
              <q-img
                src="~assets/img/Company.png"
                alt="Descripción de la imagen"
                :cover="true"
              />
            </div>
          </div>
        </div>

        <div v-if="companys">
          <q-table
            row-key="name"
            :columns="columnCompany"
            :rows="companys"
            grid
            hide-header
            hide-bottom
            dense
            :rows-per-page-options="[12]"
          >
            <template v-slot:item="props">
              <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
                <!-- <q-intersection transition="scale"> -->
                <q-card class="animated-card" bordered flat>
                  <q-card-section class="bg-grey-2">
                    <div class="q-mb-sm">
                      <div class="row justify-between">
                        <div class="col col-md-auto q-mt-sm text-black">
                          <strong style="font-size: 20px"
                            >{{ props.row.nameCompany }}
                          </strong>
                        </div>
                        <div class="col col-md-auto">
                          <q-avatar size="40px" square>
                            <img
                              alt="Quasar logo"
                              :src="props.row.logo"
                              style="width: 100%; height: 100%"
                            />
                          </q-avatar>
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
                <!-- </q-intersection> -->
              </div>
            </template>
          </q-table>
        </div>
        <div v-else>
          <div class="flex flex-center">
            <strong class="q-ml-lg" style="font-size: 40px">Cargando...</strong>
          </div>
          <div class="flex flex-center">
            <q-spinner color="primary" size="60px" :thickness="5" />
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import { defineComponent, ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { offerJobs } from "../../stores/offerJobs";
import { noLogin } from "../../stores/noLogin";
import { formatDistanceToNow } from "date-fns";
import router from "src/router/index";
import Server from "src/getServer";

const storeNoLogin = noLogin();
storeNoLogin.bandDrawer = true;
const piniaJobs = offerJobs();

defineComponent({
  name: "InicioOfert",
});
const apiUrl = process.env.VUE_APP_API_URL;
const jobs = ref(null);
const showCardAction = ref([]);
const showCardActionBand = ref(false);
onMounted(async () => {
  await getJobs();
  await getCompanys();
});
//#region Jobs
async function getJobs() {
  let auxJobs = piniaJobs.getJobs();
  if (auxJobs.length != 0) {
    jobs.value = auxJobs;
    jobsfilter.value = auxJobs;
  } else {
    try {
      let response = await fetch(`${await Server.GetServer()}/Jobs/oferta`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      jobs.value = await response.json();

      jobs.value.forEach((job) => {
        job.idUserCompany.logo = `data:image;base64,${job.idUserCompany.logo}`;
      });
      jobs.value.reverse();
      piniaJobs.setJobs(jobs.value);
      jobsfilter.value = jobs.value.slice(0, 21);
    } catch (error) {
      console.log(error);
    }
  }
}
//#region Buscador Trabajo
const buscarJob = ref(null);
const buscarUbi = ref(null);
const jobsfilter = ref([]);

function OnBusquedaJob() {
  jobsfilter.value = jobs.value;
  if (buscarJob.value) {
    jobsfilter.value = jobs.value.filter((row) => {
      let auxFilter;
      let auxDesciption;
      let auxTittle;
      auxFilter = Object.keys(row).some((key) => {
        return (
          String(row[key])
            .toLowerCase()
            .indexOf(buscarJob.value.toLowerCase()) > -1
        );
      });

      auxTittle = Object.keys(row.about_job[0]).some((key) => {
        return (
          String(row.about_job[0][key])
            .toLowerCase()
            .indexOf(buscarJob.value.toLowerCase()) > -1
        );
      });
      auxDesciption = Object.keys(row.idUserCompany).some((key) => {
        return (
          String(row.idUserCompany[key])
            .toLowerCase()
            .indexOf(buscarJob.value.toLowerCase()) > -1
        );
      });
      if (auxFilter == true || auxDesciption == true || auxTittle == true) {
        return true;
      } else {
        return false;
      }
    });
    if (buscarUbi.value) {
      jobsfilter.value = jobsfilter.value.filter((row) => {
        return Object.keys(row.location).some((key) => {
          return (
            String(row.location[key])
              .toLowerCase()
              .indexOf(buscarUbi.value.toLowerCase()) > -1
          );
        });
      });
    }
  } else {
    jobsfilter.value = jobs.value.filter((row) => {
      return Object.keys(row.location).some((key) => {
        return (
          String(row.location[key])
            .toLowerCase()
            .indexOf(buscarUbi.value.toLowerCase()) > -1
        );
      });
    });
  }
}
//#endregion
//#region Estica Trabajos
//Limita palabras jobs.description
function shortenDescription(description) {
  const maxLength = 140;
  if (description.length <= maxLength) {
    return description;
  } else {
    return description.slice(0, maxLength) + "...";
  }
}
function FormatUpdatedAt(updatedAt) {
  const updatedAtDate = new Date(updatedAt);
  return formatTimeAgo(updatedAtDate);
}
function formatTimeAgo(date) {
  // Calcula la diferencia entre la fecha actual y la fecha dada
  const timeAgo = formatDistanceToNow(date, { addSuffix: true });
  return timeAgo;
}
function formattedAmount(paga) {
  const amount = parseFloat(paga);
  const formatted = amount.toLocaleString("es-CO");
  const formattedWithoutCurrency = formatted.replace("COP", "");
  return formattedWithoutCurrency;
}

//#endregion
//#region Actions
function SaveID(_id) {
  piniaJobs.setJobSelect(_id);
}
//#endregion

//#endregion
//#region Companys
const companys = ref(null);
async function getCompanys() {
  try {
    let response = await fetch(`${await Server.GetServer()}/Company/show`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    companys.value = await response.json();

    companys.value.forEach((company) => {
      company.logo = `data:image;base64,${company.logo}`;
    });
  } catch (error) {
    console.log(error);
  }
}
//#endregion
//#region
const columnJobs = ref([
  {
    name: "title",
    label: "Titulo",
    align: "left",
    field: "title",
  },
  // {
  //   name: "about_job",
  //   label: "Acerca del Trabajo",
  //   align: "left",
  //   field: "about_job",
  // },
  // {
  //   name: "schedule",
  //   label: "Horario",
  //   align: "left",
  //   field: "schedule",
  // },
  // {
  //   name: "modality",
  //   label: "Modalidad",
  //   align: "left",
  //   field: "modality"
  // },
  {
    name: "pay",
    label: "Sueldo",
    align: "left",
    field: "pay",
  },
  {
    name: "vacancies",
    label: "Vacantes",
    align: "left",
    field: "vacancies",
  },
  {
    name: "createdAt",
    label: "Fecha de Cracion",
    align: "left",
    field: "createdAt",
  },
]);
const columnCompany = ref([
  {
    name: "nameCompany",
    label: "nameCompany",
    align: "left",
    field: "nameCompany",
  },
]);
//#endregion
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
.titleJob {
  font-size: 18px;
}
.color-panel {
  background-color: rgb(213, 213, 213);
}

.container-busqueda {
  // background-image: linear-gradient(to right, #f0f1f6, #e2e4eb);
  background-color: #ebedf2;
  padding: 10px;
  border: 1px solid #d0d1d6;
  border-radius: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.container-busqueda::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: lightgray;
  z-index: -1;
}
.container-titleCompany {
  // background-image: linear-gradient(to right, #f0f1f6, #e2e4eb);
  background-color: $primary;

  border: 5px solid rgb(37, 37, 60);
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.container-titleCompany::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(182, 181, 255);
  z-index: -1;
}
.descriptionJob {
  font-size: 12px;
  color: rgb(63, 59, 59);
}
.etiqueta {
  font-size: 12px;
  border: 2px solid rgb(217, 202, 202);
}
/* Estilo para el contenido que se desliza */
.slide-content {
  min-height: 0; /* Asegura que el contenido tenga una altura mínima */
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
}

/* Muestra el contenido cuando la clase .slide-enter-active está presente */
.q-slide-up-enter-active,
.q-slide-down-leave-active {
  max-height: 200px; /* Ajusta esta altura según tus necesidades */
}

/* Ajusta el deslizamiento de entrada */
.q-slide-up-enter,
.q-slide-down-leave-to {
  max-height: 0;
}
.animated-card {
  transition: transform 0.3s ease; /* Agrega una transición */
}

.animated-card:hover {
  transform: scale(1.05); /* Aplica la animación en el hover */
}
.container-ImgIE {
  background-color: #506ac1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 3px solid #395db9;
  border-radius: 10px;
}

.container-ImgIE::before {
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

