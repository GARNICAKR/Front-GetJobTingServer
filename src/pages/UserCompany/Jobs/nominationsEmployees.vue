<template>
  <section class="bodyPage">
    <q-page>
      <div v-if="userCompany.CompanyUser._id">
        <section class="row">
          <div class="row col-8 fondoAz">
            <div class="flex items-center justify-center column col-4 col-sm-2">
              <span class="textoBlanco margenesImagen"
                >Consigue los mejores trabajadores</span
              >
              <q-btn
                class=""
                outline
                rounded
                padding="10px 10px"
                color="white"
                icon-right="fa-regular fa-circle-check"
                label="Crear"
                to="/company/job/create"
              />
            </div>
            <q-img
              alt="Quasar logo"
              class="col imgPosition q-mt-md"
              style="height: 383px; max-width: 221px"
              src="~assets/img/chicosonr.png"
            />
          </div>

          <div class="col column fondoVe flex justify-center">
            <div class="flex items-center justify-center q-mb-xl">
              <span class="textoBlanco margenesVerd" style="font-size: 30px">{{
                storeCompany.CompanyUser.nameCompany
              }}</span>
            </div>

            <div class="row justify-center">
              <div class="col col-md-auto BackWhite q-mb-xl">
                <q-avatar size="100px" square>
                  <img
                    alt="Quasar logo"
                    class="col imgVerd"
                    :src="storeCompany.CompanyUser.logo"
                  />
                </q-avatar>
              </div>
            </div>

            <div class="flex items-center justify-center column col-4 col-sm-2">
              <span class="textoBlanco margenesVerd">Edita tu Perfil</span>
              <q-btn
                class=""
                outline
                rounded
                padding="10px 10px"
                color="white"
                icon-right="fa-regular fa-pen-to-square"
                label="EDITAR"
                to="/company/ajustes"
              />
            </div>
          </div>
        </section>

        <q-card class="card" style="margin-top: 10px">
          <q-card-section class="bg-blue-10 flex items-center justify-between">
            <strong class="titleDesc text-white">Descripción</strong>

            <div class="flex justify-center items-center">
              <q-icon
                size="11px"
                name="fa-solid fa-location-dot"
                class="q-mr-xs q-mb-xs text-white"
              >
              </q-icon>
              <span class="text-white" style="font-size: 11px">
                {{ storeCompany.CompanyUser.location.state }},
                {{ storeCompany.CompanyUser.location.city }}.
              </span>
            </div>
          </q-card-section>
          <q-card-section class="bg-blue-2">
            <span style="white-space: pre-line" class="descripcionComp">{{
              storeCompany.CompanyUser.description
            }}</span>
          </q-card-section>
          <br />
        </q-card>

        <section>
          <div v-if="jobs.length > 0">
            <div class="row q-mt-md">
              <div class="col">
                <q-input
                  label="Buscador"
                  label-color="primary"
                  input-class="text-primary"
                  v-model="buscarJob"
                  bg-color=""
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
                  bg-color=""
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

            <h2 class="tituloMediano">Tus Ofertas</h2>
            <q-card-section>
              <q-table
                row-key="name"
                :columns="columnJobs"
                :rows="jobsfilter"
                grid
                hide-header
                dense
                virtual-scroll
                :pagination="perPagination"
                :rows-per-page-options="[9]"
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
                            <div class="col col-md-auto">
                              <q-avatar size="40px" square>
                                <img
                                  alt="Quasar logo"
                                  :src="storeCompany.CompanyUser.logo"
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
                            shortenDescription(
                              props.row.about_job[0].description
                            )
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
                                >Vacantes: {{ props.row.vacancies }}
                              </strong>
                            </q-badge>
                          </div>
                        </div>
                        <div class="q-mt-sm">
                          <span style="font-size: 11px">
                            {{ FormatUpdatedAt(props.row.createdAt) }}
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
                              <div class="col col-md-auto q-ml-sm">
                                <q-btn
                                  flat
                                  round
                                  push
                                  color="dark"
                                  icon="fa-solid fa-eye"
                                  @click="ShowOfert(props.row)"
                                >
                                  <q-tooltip
                                    anchor="top middle"
                                    self="top middle"
                                    :delay="200"
                                    class="bg-light-dark-10 text-white q-mb-xl"
                                    ><strong>
                                      Mostrar Oferta
                                    </strong></q-tooltip
                                  >
                                </q-btn>
                              </div>

                              <div class="col col-md-auto">
                                <q-btn
                                  flat
                                  round
                                  push
                                  color="dark"
                                  icon="fa-solid fa-pencil"
                                  @click="ToEdit(props.row)"
                                >
                                  <q-tooltip
                                    anchor="top middle"
                                    self="top middle"
                                    :delay="200"
                                    class="bg-light-dark-10 text-white q-mb-xl"
                                    ><strong> Editar Oferta </strong></q-tooltip
                                  >
                                </q-btn>
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
            </q-card-section>
          </div>
          <div v-else>
            <q-card-section>
              <div v-if="bandCargando">
                <div class="flex flex-center">
                  <strong class="q-ml-lg" style="font-size: 40px"
                    >Cargando...</strong
                  >
                </div>
                <div class="flex flex-center">
                  <q-spinner color="primary" size="110px" :thickness="5" />
                </div>
              </div>
              <div v-else>
                <div class="row justify-center">
                  <div class="col-6 col-md-autoqqq">
                    <q-card class="card">
                      <q-card-section class="bg-blue-2 text-primary">
                        <strong style="font-size: 20px">
                          No Ha Publicado Ofertas
                        </strong>
                      </q-card-section>
                      <q-card-actions align="center">
                        <q-btn
                          size="18px"
                          label="Crear Oferta"
                          color="primary"
                          text-color="white"
                          push
                          icon="fa-solid fa-house-laptop"
                          to="company/job/create"
                        >
                        </q-btn>
                      </q-card-actions>
                    </q-card>
                  </div>
                </div>
              </div>
            </q-card-section>
          </div>
        </section>
      </div>
    </q-page>
  </section>
</template>

<script setup>
import { defineComponent, ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import Server from "src/getServer";
import { userC } from "src/stores/userCompany.js";
import { companyJobs } from "src/stores/companyJobs.js";
import { formatDistanceToNow } from "date-fns";
import router from "src/router/index";
const apiUrl = process.env.VUE_APP_API_URL;
const userCompany = userC();
onMounted(async () => {
  userCompany.setActiveView("home");
});
//#region columnas
const columnJobs = ref([
  {
    name: "title",
    label: "Titulo",
    align: "left",
    field: "title",
  },
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

//#endregion

//#region Limita palabras jobs.description
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
const buscarJob = ref(null);
const storeCompany = userC();
const storeCompanyJobs = companyJobs();
const buscarUbi = ref(null);
const jobsfilter = ref([]);
const jobs = ref([]);
const showCardAction = ref([]);
const visible = ref(true);
const bandCargando = ref(true);

function onVisible() {
  visible.value = !visible.value;
}

const data = async () => {
  try {
    const response = await fetch(
      `${await Server.GetServer()}/company/jobs/${
        storeCompany.CompanyUser._id
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    jobs.value = await response.json();

    // jobs.value.forEach((job) => {
    //   job.idUserCompany.logo = `data:image;base64,${job.idUserCompany.logo}`;
    // });

    jobsfilter.value = jobs.value;
    bandCargando.value = false;
  } catch (error) {
    console.log(error);
  }
};

data();

//#region Buscador Trabajo
// jobsfilter.value = jobs.value;
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
    if (buscarUbi.value) {
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
}
//#endregion
function ToEdit(job) {
  storeCompanyJobs.setSelectJob(job);
  router.push({ name: "jobEdit" });
}
function ShowOfert(job) {
  storeCompanyJobs.setSelectJob(job);
  router.push({ path: `/company/job/aplicantes/${job._id}` });
}
defineComponent({
  name: "CreateJ",
});
</script>

<style lang="scss">
.bodyPage {
  margin: auto;
  padding: 0 15vw;
}

.titleDesc {
  font-size: 30px;
  color: rgb(63, 59, 59);
  font-weight: 700;
}

.descripcionComp {
  font-size: 15px;
  color: rgb(63, 59, 59);
  font-weight: 500;
  text-align: justify;
}

.BackWhite {
  // background-image: linear-gradient(to right, #f0f1f6, #e2e4eb);
  background-color: #ebedf2;
  padding: 10px;
  border: 1px solid #d0d1d6;
  border-radius: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.BackWhite::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(255, 255, 255);
  z-index: -1;
}

.etiqueta {
  font-size: 12px;
  border: 2px solid rgb(217, 202, 202);
}

.descriptionJob {
  font-size: 12px;
  color: rgb(63, 59, 59);
}

.imgVerd {
  margin-bottom: 20px;
}

.fondoVe {
  position: relative;
  background-color: #21b18d;
  height: 400px;
  border-radius: 10px;
  margin-top: 25px;
  margin-left: 10px;
  padding: 10px 10px;
}

.fondoNa {
  background-color: #f58762;
  border-radius: 10px;
  margin-top: 10px;
}

.fondoAz {
  height: 460px;
  background-color: #007ce8;
  border-radius: 10px;
  margin-top: 25px;
}

.textoBlanco {
  color: white;
}

.tituloMediano {
  font-size: 40px;
  font-weight: 900;
}

.margenesVerd {
  font-size: 20px;
  font-weight: 700;
}

.margenesImagen {
  font-size: 30px;
  font-weight: 900;
  margin-left: 40px;
  margin-bottom: 30px;
  width: 300px;
}

.imgPosition {
  position: relative;
  left: 260px;
}

@media (max-width: 1280px) {
  .margenesImagen {
    font-size: 28px;
    font-weight: 900;
    margin-left: 25px;
    margin-bottom: 25px;
    width: 250px;
  }

  .imgPosition {
    left: 180px;
  }
}

@media (max-width: 1080px) {
  .margenesImagen {
    font-size: 25px;
    font-weight: 900;
    margin-left: 40px;
    margin-bottom: 20px;
    width: 150px;
  }
  .imgPosition {
    left: 120px;
  }
}

@media (max-width: 920px) {
  .margenesImagen {
    font-size: 25px;
    font-weight: 900;
    margin-left: 40px;
    margin-bottom: 5px;
    width: 250px;
  }
  .imgPosition {
    display: none;
  }
}

@media (max-width: 710px) {
  .margenesImagen {
    font-size: 20px;
    font-weight: 900;
    margin-left: 10px;
    margin-bottom: 5px;
    width: 165px;
  }
  .imgPosition {
    display: none;
  }
}

.tamanio {
  width: 50px;
}
</style>
