<template>
  <q-page padding>
    <div v-if="piniaJobs.selectJob._id">
      <div class="row justify-between">
        <div class="col-4">
          <q-card class="card" bordered flat>
            <q-separator />
            <q-card-section class="primary text-white">
              <div class="q-mb-sm">
                <div class="row justify-between">
                  <div class="col col-md-auto q-mt-sm text-black">
                    <strong class="text-white" style="font-size: 20px"
                      >{{ piniaJobs.selectJob.idUserCompany.nameCompany }}
                    </strong>
                  </div>
                  <div class="col col-md-auto container-ImgUE">
                    <q-avatar size="40px" square>
                      <img
                        alt="Quasar logo"
                        :src="piniaJobs.selectJob.idUserCompany.logo"
                        style="width: 100%; height: 100%"
                      />
                    </q-avatar>
                  </div>
                </div>
              </div>
            </q-card-section>
            <q-card-section class="bg-grey-2 text-primary">
              <strong class="q-ml-md" style="font-size: 20px">
                Descripción:
              </strong>
              <br />
              <strong style="white-space: pre-line">
                {{ piniaJobs.selectJob.idUserCompany.description }}
              </strong>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-7">
          <q-card class="card" bordered flat>
            <q-separator />
            <q-card-section class="bg-primary text-white">
              <div class="row justify-between">
                <div class="col col-md-auto">
                  <strong class="titleJob"
                    >{{ piniaJobs.selectJob.title }}
                  </strong>
                </div>
                <div class="col col-md-auto">
                  <q-icon
                    size="11px"
                    name="fa-solid fa-location-dot"
                    class="q-mr-xs q-mb-xs"
                  >
                  </q-icon>
                  <span style="font-size: 11px">
                    {{ piniaJobs.selectJob.location.state }},
                    {{ piniaJobs.selectJob.location.city }}.
                  </span>
                </div>
              </div>
            </q-card-section>

            <q-card-section>
              <div class="row justify-around">
                <div class="col-1" v-if="bandPostulado">
                  <q-btn
                    class="q-mr-xl"
                    icon="fa-solid fa-arrow-left-long"
                    size="20px"
                    color="primary"
                    text-color="white"
                    push
                    @click="GoBack"
                  >
                    <q-tooltip
                      anchor="top middle"
                      self="top middle"
                      :delay="200"
                      class="bg-light-blue-10 text-white q-mb-xl"
                      ><strong> Volver </strong></q-tooltip
                    >
                  </q-btn>
                </div>
                <div class="col-1" v-if="$q.screen.gt.sm"></div>

                <div class="col-5 self-center">
                  <div v-if="bandPostulado">
                    <q-icon
                      class="q-ml-xl"
                      name="fa-solid fa-circle-check"
                      color="positive"
                      size="80px"
                    >
                    </q-icon>
                  </div>
                  <div v-else>
                    <q-btn
                      class="text-white"
                      label="Postularse"
                      icon="fa-solid fa-paper-plane"
                      color="primary"
                      size="20px"
                      @click="Postularse"
                    >
                    </q-btn>
                  </div>
                </div>
                <div class="col-5">
                  <q-card class="card">
                    <q-card-section class="bg-blue-2">
                      <strong> Informacion de la oferta: </strong>
                    </q-card-section>
                    <div class="q-pa-sm">
                      <div class="q-mt-sm">
                        <strong> Horario: </strong>
                        <span>
                          {{ piniaJobs.selectJob.about_job[0].schedule }}
                        </span>
                      </div>
                      <div class="q-mt-sm">
                        <strong> Modalidad: </strong>
                        <span>
                          {{ piniaJobs.selectJob.about_job[0].modality }}
                        </span>
                      </div>

                      <div class="q-mt-sm">
                        <strong> Salario: </strong>
                        <span>
                          ${{ formattedAmount(piniaJobs.selectJob.pay) }}
                        </span>
                      </div>
                    </div>
                  </q-card>
                </div>
              </div>
            </q-card-section>
            <q-card-section>
              <q-card class="card">
                <q-card-section class="bg-blue-1">
                  <strong> Descripción del Trabajo: </strong>
                </q-card-section>
                <q-card-section style="white-space: pre-line">
                  {{ piniaJobs.selectJob.about_job[0].description }}
                </q-card-section>
              </q-card>
            </q-card-section>

            <q-card-section>
              <q-card class="card">
                <q-card-section class="bg-blue-1">
                  <strong> Responsabilidades </strong>
                </q-card-section>
                <q-card-section style="white-space: pre-line">
                  {{ piniaJobs.selectJob.about_job[0].responsabilidades }}
                </q-card-section>
              </q-card>
            </q-card-section>
            <q-card-section>
              <q-card class="card">
                <q-card-section class="bg-blue-1">
                  <strong> Requerimientos </strong>
                </q-card-section>
                <div class="row justify-between q-pb-sm q-mx-sm q-mt-sm">
                  <div class="col-5">
                    <q-card>
                      <q-card-section class="bg-grey-1">
                        <strong> Requisitos: </strong>
                      </q-card-section>
                      <div
                        class="q-mx-md q-pb-sm"
                        style="white-space: pre-line"
                      >
                        {{ piniaJobs.selectJob.about_job[0].requisitos }}
                      </div>
                    </q-card>
                  </div>
                  <div class="col-5">
                    <q-card>
                      <q-card-section class="bg-grey-1">
                        <strong> Conocimientos: </strong>
                      </q-card-section>
                      <div
                        class="q-mx-md q-pb-sm"
                        style="white-space: pre-line"
                      >
                        {{ piniaJobs.selectJob.about_job[0].conocimientos }}
                      </div>
                    </q-card>
                  </div>
                </div>
              </q-card>
              <div class="row justify-between q-mt-md">
                <div class="col col-md-auto self-end">
                  <div class="q-mt-sm">
                    <span style="font-size: 11px">
                      {{ FormatUpdatedAt(piniaJobs.selectJob.updatedAt) }}
                    </span>
                  </div>
                </div>
                <div class="col col-md-auto">
                  <div v-if="bandPostulado">
                    <q-btn
                      class="q-mr-md"
                      icon="fa-solid fa-arrow-left-long"
                      size="20px"
                      color="primary"
                      text-color="white"
                      push
                      @click="GoBack"
                    >
                      <q-tooltip
                        anchor="top middle"
                        self="top middle"
                        :delay="200"
                        class="bg-light-blue-10 text-white q-mb-xl"
                        ><strong> Volver </strong></q-tooltip
                      >
                    </q-btn>
                    <q-icon
                      class="q-ml-xl"
                      name="fa-solid fa-circle-check"
                      color="positive"
                      size="40px"
                    >
                    </q-icon>
                  </div>
                  <div v-else>
                    <q-btn
                      class="text-white"
                      label="Postularse"
                      icon="fa-solid fa-paper-plane"
                      color="primary"
                      size="20px"
                      @click="Postularse"
                    >
                    </q-btn>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <q-dialog
        v-model="bandPost"
        persistent
        v-if="bandPost"
        transition-show="rotate"
        transition-hide="rotate"
      >
        <q-card style="width: 400px; max-width: 80vw">
          <q-card-section class="bg-primary">
            <div class="row justify-between">
              <div class="col col-md-auto">
                <q-icon
                  class="q-mr-sm q-mb-xs text-white"
                  name="fa-solid fa-paper-plane"
                  size="20px"
                ></q-icon>

                <strong class="text-white">Envia tu Postulacion</strong>
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

          <q-card-section class="bg-grey-2">
            <div class="row justify-center q-py-md">
              <div class="col col-md-auto q-pr-sm">
                <q-btn
                  label="Ver CV"
                  color="primary"
                  class="text-white q-ml-md q-mt-md"
                  push
                  icon="fa-solid fa-file-lines"
                  @click="ShowCV"
                >
                </q-btn>
              </div>
            </div>
          </q-card-section>
          <q-card-actions class="bg-grey-2" align="right">
            <q-btn
              icon="fa-solid fa-paper-plane"
              color="green-7"
              label="Enviar"
              @click="SendPostulacion"
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
        <embed
          class="sizePdf"
          :src="userEmployee.EmployeeUser.CV"
          type="application/pdf"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { defineComponent, ref, onMounted, onBeforeMount } from "vue";
import { useQuasar } from "quasar";
import { offerJobs } from "../../../stores/offerJobs";
import router from "src/router/index";
import Server from "src/getServer";
import { formatDistanceToNow } from "date-fns";
import { userE } from "../../../stores/userEmployee";
const apiUrl = process.env.VUE_APP_API_URL;

const userEmployee = userE();
const piniaJobs = offerJobs();
defineComponent({
  name: "JobOffer",
});
onBeforeMount(async () => {
  if (!piniaJobs.selectJob._id) {
    router.push({ name: "InicioEmployee" });
  }
});
const $q = useQuasar();

//#region Send Postulacion
const bandPost = ref(false);
const bandPostulado = ref(false);
function Postularse() {
  bandPost.value = true;
}
async function SendPostulacion() {
  try {
    let SendJob = {
      title: piniaJobs.selectJob.title,
      //description: piniaJobs.selectJob.about_job[0].description,
      sector: piniaJobs.selectJob.about_job[0].sector,
      conocimientos: piniaJobs.selectJob.about_job[0].conocimientos,
    };
    console.log(SendJob);
    const urlParams = new URLSearchParams();
    urlParams.append("idJob", piniaJobs.selectJob._id);
    urlParams.append("idEmployee", userEmployee.EmployeeUser._id);
    urlParams.append("sendJob", JSON.stringify(SendJob));
    const response = await fetch(`${await Server.GetServer()}/postulaciones`, {
      method: "PUT",
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
      if (data.error === "Ya te has Postulado") {
        bandPostulado.value = true;
      }
    } else {
      $q.notify({
        color: "positive",
        textColor: "white",
        icon: "fa-solid fa-check",
        message: "Postulado Correctamente",
      });
      bandPostulado.value = true;
    }
  } catch (error) {
    console.log(error);
  }
  bandPost.value = false;
}
//#endregion
//#region Mejora View
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
const pdfShow = ref(false);
function ShowCV() {
  pdfShow.value = true;
  bandPost.value = false;
}
function ExitPdf() {
  pdfShow.value = false;
  bandPost.value = true;
}
function GoBack() {
  router.push({ name: "InicioEmployee" });
}
</script>
<style lang="scss">
.sizePdf {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.exit-button {
  position: absolute;
  top: 10px; /* Ajusta la posición vertical según tus necesidades */
  left: 10px; /* Ajusta la posición horizontal según tus necesidades */
  z-index: 1; /* Asegura que el botón esté por encima del embed */
}
.container-ImgUE {
  background-color: #ebedf2;
  padding: 10px;
  border: 3px solid #d0d1d6;
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
