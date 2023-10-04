<template>
  <q-page padding>
    <section class="row justify-center">
      <div class="col-3 column fondoVeJA flex justify-center q-mr-md">
        <div class="row justify-center">
          <div class="col col-md-auto BackWhite q-mb-md">
            <q-avatar size="100px" square>
              <img
                alt="Quasar logo"
                class="col imgVerd"
                :src="userCompany.CompanyUser.logo"
              />
            </q-avatar>
          </div>
        </div>
        <div class="row justify-center text-white">
          <strong style="font-size: 20px"
            >{{ storeCompanyJobs.selectJob.title }}
          </strong>
        </div>
      </div>
      <div class="col-6 row justify-center fondoAzJA">
        <div class="col-10 col-md-auto self-center">
          <q-icon
            class="q-mb-md q-mr-md"
            color="white"
            size="60px"
            name="fa-solid fa-user-tie"
          >
          </q-icon>
          <strong class="text-white" style="font-size: 25px"
            >Encuentra al Mejor Aplicante</strong
          >
        </div>
      </div>
    </section>

    <div v-if="applicants">
      <div class="row justify-center q-mt-md">
        <div class="col-8 container-busqueda q-mt-xs">
          <div class="row justify-center">
            <div class="col q-ml-lg">
              <q-input
                label="Buscador"
                label-color="primary"
                input-class="text-primary"
                v-model="buscarApplicante"
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
          </div>
        </div>
      </div>
      <div class="row justify-center">
        <div class="col-12">
          <q-table
            class=""
            row-key="name"
            :rows="Applicantefilter"
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
                        <div class="col-2 col-md-auto q-mr-md">
                          <div
                            class="container-ImgJA"
                            @click="SeeStatus(props.row, props.pageIndex)"
                          >
                            <q-img
                              :src="props.row.photo"
                              spinner-color="white"
                              width="130px"
                              height="130px"
                            />
                          </div>
                        </div>
                        <div class="col-5">
                          <q-card class="card bg-grey-1">
                            <q-card-section>
                              <div class="row">
                                <div class="col col-md-auto">
                                  <strong class="" style="font-size: 20px"
                                    >{{ props.row.name }}
                                    {{ props.row.last_name }}</strong
                                  >
                                </div>
                              </div>
                              <div class="row justify-center">
                                <div
                                  class="col col-md-auto q-mt-sm text-black q-mt-md"
                                >
                                  <strong class="" style="font-size: 17px"
                                    >Habilidades:
                                  </strong>

                                  <div>
                                    <div>
                                      <template
                                        v-for="(skill, id) in props.row.skills"
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

                        <div cass="col col-md-auto ">
                          <div>
                            <q-btn
                              round
                              text-color="primary"
                              color="blue-1"
                              icon="fa-solid fa-eye"
                              @click="SeeStatus(props.row, props.pageIndex)"
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
                          <div v-if="props.row.status != 'Rechazado'">
                            <q-btn
                              class="q-mt-md"
                              round
                              color="negative"
                              icon="fa-solid fa-thumbs-down"
                              @click="
                                ChangueRechazar(props.row, props.pageIndex)
                              "
                            >
                              <q-tooltip
                                anchor="bottom middle"
                                self="bottom middle"
                                :delay="200"
                                class="bg-negative text-white q-mb-xl"
                                ><strong>
                                  Rechazar Postulacion
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
    <div v-else>
      <div v-if="bandApplicant">
        <div class="flex flex-center q-mt-lg">
          <q-card class="card">
            <q-card-section class="bg-primary text-white">
              <strong class="q-ml-lg" style="font-size: 30px"
                >No Hay Aplicantes</strong
              >
            </q-card-section>
            <q-card-actions class="" align="center">
              <q-btn
                size="20px"
                push
                label="Volver"
                color="primary"
                text-color="white"
                icon="fa-solid fa-arrow-left"
                to="/company"
              >
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
      <div v-else>
        <div class="flex flex-center">
          <strong class="q-ml-lg" style="font-size: 40px">Cargando...</strong>
        </div>
        <div class="flex flex-center">
          <q-spinner color="primary" size="110px" :thickness="5" />
        </div>
      </div>
    </div>

    <q-dialog
      v-model="bandRechazar"
      persistent
      v-if="bandRechazar"
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
                >¿Quieres Rechazar a {{ employee.name }}
                {{ employee.last_name }}?</strong
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
            @click="RechazarStatus"
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
import { userC } from "src/stores/userCompany.js";
import { companyJobs } from "src/stores/companyJobs.js";
import { formatDistanceToNow } from "date-fns";
import Server from "src/getServer";
import router from "src/router/index";
import { useRoute } from "vue-router";
const route = useRoute();
const apiUrl = process.env.VUE_APP_API_URL;
const userCompany = userC();
const storeCompanyJobs = companyJobs();
const $q = useQuasar();

defineComponent({
  name: "JobAplicants",
});
onBeforeMount(async () => {
  getApplicants();
  if (!storeCompanyJobs.selectJob._id) {
    router.push({ name: "InicioCompany" });
  }
});
const applicants = ref(null);
const bandApplicant = ref(false);
async function getApplicants() {
  try {
    let response = await fetch(
      `${await Server.GetServer()}/postulaciones/show/${route.params.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let data = await response.json();
    if (data.error) {
      $q.notify({
        color: "negative",
        textColor: "white",
        icon: "warning",
        message: data.error,
      });
      if (data.error == "No hay aplicantes") {
        bandApplicant.value = true;
      } else {
        router.push({ name: "InicioCompany" });
      }
    } else {
      applicants.value = data;
      applicants.value.forEach((employee) => {
        employee.photo = `data:image;base64,${employee.photo}`;
        employee.CV = `data:application/pdf;base64,${employee.CV}`;
      });
      applicants.value.reverse();
      Applicantefilter.value = applicants.value;
      storeCompanyJobs.setPostulantes(applicants.value);
    }
  } catch (error) {
    console.log(error);
  }
}

//#region Changue Status
const bandRechazar = ref(false);
const employee = ref(null);
const employeeIndex = ref(null);
function ChangueRechazar(Employee, index) {
  employee.value = Employee;
  bandRechazar.value = true;
  employeeIndex.value = index;
}
async function RechazarStatus() {
  try {
    const urlParams = new URLSearchParams();
    urlParams.append("idEmployee", employee.value._id);
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
        message: "Modificado Correctamente",
      });
      console.log(Applicantefilter.value[employeeIndex.value].status);
      Applicantefilter.value[employeeIndex.value].status = "Rechazado";
      console.log(Applicantefilter.value[employeeIndex.value].status);
      bandRechazar.value = false;
    }
  } catch (error) {
    console.log(error);
  }
}
async function SeeStatus(Employee, index) {
  if (Employee.status == "Recibido") {
    try {
      const urlParams = new URLSearchParams();
      urlParams.append("idEmployee", Employee._id);
      urlParams.append("idJob", storeCompanyJobs.selectJob._id);
      urlParams.append("status", "Visto");

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
        // $q.notify({
        //   color: "positive",
        //   textColor: "white",
        //   icon: "fa-solid fa-check",
        //   message: "Modificado Correctamente",
        // });

        Applicantefilter.value[index].status = "Visto";
        router.push({ path: `/company/perfilPostulante/${Employee._id}` });
        storeCompanyJobs.setStatus(Employee.status);
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    router.push({ path: `/company/perfilPostulante/${Employee._id}` });
    storeCompanyJobs.setStatus(Employee.status);
  }
}
//#endregion

//#region Mejora Vista
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
  if (status == "Recibido") {
    return "bg-green-1";
  } else if (status == "Visto") {
    return "bg-blue-1";
  } else if (status == "Rechazado") {
    return "bg-red-1";
  }
}
function getColorStatus(status) {
  if (status == "Recibido") {
    return "positive";
  } else if (status == "Visto") {
    return "primary";
  } else if (status == "Rechazado") {
    return "negative";
  }
}
//#endregion
//#region Buscador
const buscarApplicante = ref(null);
const Applicantefilter = ref([]);
function OnBusquedaJob() {
  Applicantefilter.value = applicants.value;
  Applicantefilter.value = applicants.value.filter((row) => {
    let auxFilter;

    auxFilter = Object.keys(row).some((key) => {
      return (
        String(row[key])
          .toLowerCase()
          .indexOf(buscarApplicante.value.toLowerCase()) > -1
      );
    });
    if (auxFilter == true) {
      return true;
    } else {
      return false;
    }
  });
}
//#endregion
// getApplicants();
</script>
<style lang="scss">
.container-ImgJA {
  // background-image: linear-gradient(to right, #f0f1f6, #e2e4eb);
  background-color: rgb(249, 249, 249);
  cursor: pointer;
  border: 4px solid rgb(230, 230, 230);
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.container-ImgJA::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(182, 181, 255);
  z-index: -1;
}
.animated-cardSP {
  transition: transform 0.3s ease; /* Agrega una transición */
}

.animated-cardSP:hover {
  transform: scale(1.02); /* Aplica la animación en el hover */
}
.fondoVeJA {
  position: relative;
  background-color: $tertiary;
  border-radius: 10px;
  margin-top: 25px;
  margin-left: 10px;
  padding: 25px 10px;
}

.fondoAzJA {
  background-color: $primary;
  border-radius: 10px;
  margin-top: 25px;
}
.BackWhite {
  // background-image: linear-gradient(to right, #f0f1f6, #e2e4eb);
  background-color: #ebedf2;
  padding: 10px;
  border: 1px solid #d0d1d6;
  border-radius: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
.clickable-icon {
  cursor: pointer;
}
</style>