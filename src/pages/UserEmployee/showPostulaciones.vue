<template>
  <q-page class="" padding>
    <div v-if="bandCargando" class="q-mt-xl">
      <div class="flex flex-center">
        <strong class="q-ml-lg" style="font-size: 40px">Cargando...</strong>
      </div>
      <div class="flex flex-center">
        <q-spinner color="primary" size="110px" :thickness="5" />
      </div>
    </div>
    <div v-else>
      <div class="container-titleSP text-white">
        <div class="q-mt-sm">
          <q-icon
            class="q-mb-md"
            name="schedule_send"
            size="60px"
            color="white"
          >
          </q-icon>

          <strong class="q-ml-sm" style="font-size: 30px">
            Postulaciones:
          </strong>
        </div>
      </div>
      <div v-if="bandVacio" class="">
        <div>
          <strong class="flex flex-center q-mt-xl" style="font-size: 30px"
            >No tienes postulaciones</strong
          >
        </div>
        <div class="flex flex-center q-mt-xl">
          <q-btn
            class=""
            color="primary"
            text-color="white"
            icon="fa-solid fa-paper-plane"
            size="25px"
            label="Ver Ofertas"
            @click="toOffers"
          >
          </q-btn>
        </div>
      </div>

      <div v-else>
        <div class="row justify-center q-mt-md">
          <div class="col-8 container-busqueda q-mt-xs">
            <div class="row justify-center">
              <div class="col q-ml-lg">
                <q-input
                  label="Buscador"
                  label-color="primary"
                  input-class="text-primary"
                  v-model="buscarPost"
                  bg-color="grey-3"
                  @update:model-value="OnBusquedaPost"
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
            </div>
          </div>
        </div>
        <div class="row justify-center">
          <div class="col-12">
            <q-table
              class=""
              row-key="name"
              :rows="Postfilter"
              grid
              hide-header
              hide-bottom
              dense
              :rows-per-page-options="[0]"
            >
              <template v-slot:item="props">
                <div class="q-pa-xs col-xs-12 col-sm-12 col-md-12">
                  <!-- <q-intersection transition="scale"> -->
                  <q-card class="animated-cardSP" bordered flat>
                    <q-card-section class="bg-grey-2">
                      <div class="q-mb-sm">
                        <div class="row">
                          <div class="col-6">
                            <q-card class="card bg-grey-1">
                              <q-card-section>
                                <div class="row">
                                  <div class="col-2 col-md-auto q-mr-lg">
                                    <div
                                      class="container-ImgSP"
                                      @click="
                                        ToCompany(props.row.idUserCompany)
                                      "
                                    >
                                      <q-avatar size="40px" square>
                                        <img
                                          alt="Quasar logo"
                                          :src="props.row.idUserCompany.logo"
                                          style="width: 100%; height: 100%"
                                        />
                                      </q-avatar>
                                    </div>
                                  </div>
                                  <div
                                    class="col col-md-auto q-mt-sm text-black q-mt-md"
                                  >
                                    <strong style="font-size: 20px"
                                      >{{ props.row.title }}
                                    </strong>
                                    <div class="row">
                                      <div class="col col-md-auto">
                                        <q-badge
                                          rounded
                                          color="grey-2 text-black "
                                          class="etiqueta glossy"
                                        >
                                          <strong class=""
                                            >{{
                                              props.row.about_job[0].modality
                                            }}
                                          </strong>
                                        </q-badge>
                                      </div>
                                      <div class="col col-md-auto q-mx-sm">
                                        <q-badge
                                          rounded
                                          color="grey-2 text-black "
                                          class="etiqueta glossy"
                                        >
                                          <strong class=""
                                            >${{
                                              formattedAmount(props.row.pay)
                                            }}
                                          </strong>
                                        </q-badge>
                                      </div>
                                      <div class="col col-md-auto">
                                        <q-badge
                                          rounded
                                          color="grey-2 text-black "
                                          class="etiqueta glossy"
                                        >
                                          <strong class=""
                                            >Vacantes:{{ props.row.vacancies }}
                                          </strong>
                                        </q-badge>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </q-card-section>
                            </q-card>
                          </div>

                          <div class="q-ml-lg col-2 col-md-auto">
                            <q-card style="width: 120px">
                              <q-card-section
                                :class="getBGqStatus(props.row.status)"
                              >
                                <strong> Estado: </strong>
                                <br />
                                <q-chip
                                  class="glossy text-white q-mt-sm q-ml-sm"
                                  :color="getColorStatus(props.row.status)"
                                >
                                  <strong>
                                    {{ props.row.status }}
                                  </strong>
                                </q-chip>
                              </q-card-section>
                            </q-card>
                          </div>
                          <div class="col-2 q-ml-xl">
                            <strong> Ultima Actualizacion: </strong>
                            <span> </span>
                            <br />
                            <br />
                            <q-icon
                              color="grey-7"
                              class="q-mr-sm q-mb-xs"
                              name="fa-solid fa-clock"
                              size="20px"
                            >
                            </q-icon>
                            <span>
                              {{ FormatUpdatedAt(props.row.fecha) }}
                            </span>
                          </div>
                          <div class="col-1" v-if="$q.screen.gt.md"></div>
                          <div cass="col col-md-auto ">
                            <div>
                              <q-btn
                                round
                                text-color="primary"
                                color="blue-1"
                                icon="fa-solid fa-eye"
                                @click="SaveID(props.row)"
                              >
                                <q-tooltip
                                  anchor="top middle"
                                  self="top middle"
                                  :delay="200"
                                  class="bg-blue-1 text-primary q-mb-xl"
                                  ><strong> Ver Postulacion </strong></q-tooltip
                                >
                              </q-btn>
                            </div>
                            <div>
                              <q-btn
                                class="q-mt-md"
                                round
                                color="negative"
                                icon="fa-solid fa-trash-can"
                                @click="ChangueBandDelete(props.row)"
                              >
                                <q-tooltip
                                  anchor="bottom middle"
                                  self="bottom middle"
                                  :delay="200"
                                  class="bg-negative text-white q-mb-xl"
                                  ><strong>
                                    Borrar Postulacion
                                  </strong></q-tooltip
                                >
                              </q-btn>
                            </div>
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
        </div>
      </div>
    </div>
    <q-dialog
      v-model="bandDelete"
      persistent
      v-if="bandDelete"
      transition-show="rotate"
      transition-hide="rotate"
    >
      <q-card style="width: 500px; max-width: 80vw">
        <q-card-section class="bg-primary">
          <div class="row justify-between">
            <div class="col col-md-auto">
              <q-icon
                class="q-mr-sm q-mb-xs text-white"
                name="fa-solid fa-trash"
                size="20px"
              ></q-icon>

              <strong class="text-white"
                >¿Quieres eliminar {{ jobDelete.title }}?</strong
              >
            </div>
            <div class="col col-md-auto">
              <q-icon
                name="fa-solid fa-square-xmark"
                color="white"
                v-close-popup
                size="26px"
                class="clickable-icon"
              >
              </q-icon>
            </div>
          </div>
        </q-card-section>
        <q-separator />

        <q-card-section class="bg-grey-2"> </q-card-section>
        <q-card-actions class="bg-grey-2" align="between">
          <q-btn
            icon="fa-solid fa-trash"
            color="green-7"
            label="Aceptar"
            @click="DeletePostulacion"
          />
          <q-btn
            icon="fa-solid fa-xmark"
            color="negative"
            label="Cancelar"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { defineComponent, ref, onMounted, onBeforeMount } from "vue";
import { useQuasar } from "quasar";
import { userE } from "../../stores/userEmployee";
import { userEPost } from "../../stores/userEPostulaciones";
import { formatDistanceToNow } from "date-fns";
import { offerJobs } from "../../stores/offerJobs";
import Server from "src/getServer";
import router from "src/router/index";
const apiUrl = process.env.VUE_APP_API_URL;
const $q = useQuasar();
const userEmployee = userE();
const userPostulaciones = userEPost();
const piniaJobs = offerJobs();
defineComponent({
  name: "ShowPostulaciones",
});
onBeforeMount(async () => {
  getPostulaciones();
  userEmployee.setActiveView("postulaciones");
});
const postulacionJobs = ref([]);
const bandVacio = ref(false);
const bandCargando = ref(true);
async function getPostulaciones() {
  if (userPostulaciones.StorePost.length > 0) {
    postulacionJobs.value = userPostulaciones.StorePost;
    Postfilter.value = postulacionJobs.value;
    bandCargando.value = false;
  } else {
    try {
      let response = await fetch(
        `${await Server.GetServer()}/employee/postulaciones/${
          userEmployee.EmployeeUser._id
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      postulacionJobs.value = await response.json();
      postulacionJobs.value.forEach((postulacion) => {
        postulacion.idUserCompany.logo = `data:image;base64,${postulacion.idUserCompany.logo}`;
      });
      postulacionJobs.value.reverse();
      userPostulaciones.setPostulaciones(postulacionJobs.value);
      Postfilter.value = postulacionJobs.value;
      bandCargando.value = false;
      if (postulacionJobs.value.length == 0) {
        bandVacio.value = true;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

//#region  Actions
function ToCompany(company) {
  router.push({ path: `/employee/ShowCompany/${company._id}` });
}
function toOffers() {
  router.push({ name: "InicioEmployee" });
}

function SaveID(job) {
  piniaJobs.setJobSelect(job);
  router.push({ name: "offerJob" });
}
const bandDelete = ref(false);
const jobDelete = ref(null);
function ChangueBandDelete(job) {
  jobDelete.value = job;
  bandDelete.value = true;
}
async function DeletePostulacion() {
  try {
    const urlParams = new URLSearchParams();
    urlParams.append("idJob", jobDelete.value._id);
    urlParams.append("idEmployee", userEmployee.EmployeeUser._id);
    const response = await fetch(
      `${await Server.GetServer()}/employee/postulaciones/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: urlParams.toString(),
      }
    );

    postulacionJobs.value = postulacionJobs.value.filter((postulacion) => {
      return postulacion._id != jobDelete.value._id;
    });
    userPostulaciones.setPostulaciones(postulacionJobs.value);
    Postfilter.value = postulacionJobs.value;
    bandDelete.value = false;
    $q.notify({
      color: "positive",
      textColor: "white",
      icon: "fa-solid fa-check",
      message: "Se Elimino Correctamente",
    });
    bandDelete.value = false;
  } catch (error) {
    console.log(error);
  }
}
//#endregion
//#region Mejora de Visualizacion
function formattedAmount(paga) {
  const amount = parseFloat(paga);
  const formatted = amount.toLocaleString("es-CO");
  const formattedWithoutCurrency = formatted.replace("COP", "");
  return formattedWithoutCurrency;
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
function getBGqStatus(status) {
  if (status == "Enviado") {
    return "bg-blue-1";
  } else if (status == "Visto") {
    return "bg-green-1";
  } else if (status == "Rechazado") {
    return "bg-red-1";
  }
}
function getColorStatus(status) {
  if (status == "Enviado") {
    return "primary";
  } else if (status == "Visto") {
    return "positive";
  } else if (status == "Rechazado") {
    return "negative";
  }
}
//#endregion
//#region Buscador
const buscarPost = ref(null);
const Postfilter = ref([]);
function OnBusquedaPost() {
  Postfilter.value = postulacionJobs.value;
  Postfilter.value = postulacionJobs.value.filter((row) => {
    let auxFilter;
    let auxAboutJob;
    let auxTittleCompany;
    auxFilter = Object.keys(row).some((key) => {
      return (
        String(row[key]).toLowerCase().indexOf(buscarPost.value.toLowerCase()) >
        -1
      );
    });
    auxTittleCompany = Object.keys(row.about_job[0]).some((key) => {
      return (
        String(row.about_job[0][key])
          .toLowerCase()
          .indexOf(buscarPost.value.toLowerCase()) > -1
      );
    });
    auxAboutJob = Object.keys(row.idUserCompany).some((key) => {
      return (
        String(row.idUserCompany[key])
          .toLowerCase()
          .indexOf(buscarPost.value.toLowerCase()) > -1
      );
    });
    if (auxFilter == true || auxAboutJob == true || auxTittleCompany == true) {
      return true;
    } else {
      return false;
    }
  });
}
//#endregion
</script>
<style lang="scss">
.animated-cardSP {
  transition: transform 0.3s ease; /* Agrega una transición */
}

.animated-cardSP:hover {
  transform: scale(1.02); /* Aplica la animación en el hover */
}
.container-ImgSP {
  // background-image: linear-gradient(to right, #f0f1f6, #e2e4eb);
  background-color: rgb(233, 232, 232);
  cursor: pointer;
  border: 4px solid rgb(201, 201, 201);
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.container-ImgSP::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(182, 181, 255);
  z-index: -1;
}
.container-statusSP {
  // background-image: linear-gradient(to right, #f0f1f6, #e2e4eb);
  background-color: rgb(233, 232, 232);
  cursor: pointer;
  border: 4px solid rgb(201, 201, 201);
  border-radius: 10px;
  padding: 1px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.container-statusSP::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(182, 181, 255);
  z-index: -1;
}
.etiqueta {
  font-size: 12px;
  border: 2px solid rgb(217, 202, 202);
}
.container-titleSP {
  background-color: $tertiary;
  width: 100%;
  border: 5px solid $primary;
  border-radius: 5px;
  margin: 0 auto; /* Centra horizontalmente */
  position: relative;
  padding: 10px;
}

.container-titleSP::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(237, 237, 237);
  z-index: -1;
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
</style>