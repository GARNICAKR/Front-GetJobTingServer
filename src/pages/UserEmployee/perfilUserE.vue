<template>
  <q-page padding>
    <div v-if="userEmployee.EmployeeUser._id">
      <div class="row justify-center">
        <div class="col-8">
          <q-card class="my-card" bordered flat>
            <q-card-section class="quinary">
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
                      >{{ userEmployee.EmployeeUser.name }}
                      {{ userEmployee.EmployeeUser.last_name }}</strong
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
                        Carrera: {{ userEmployee.EmployeeUser.carrera }}
                      </strong>
                      <br />

                      <strong style="font-size: 17px">
                        Universidad:
                        {{ userEmployee.EmployeeUser.university }}
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
                        <q-card-section style="white-space: pre-line">
                          {{ userEmployee.EmployeeUser.introduction }}
                        </q-card-section>
                      </q-card>
                      <br />

                      <strong class="" style="font-size: 17px"
                        >Habilidades:
                      </strong>

                      <div>
                        <div>
                          <template
                            v-for="(skill, id) in userEmployee.EmployeeUser
                              .skills"
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
                            >{{ userEmployee.EmployeeUser.location.state }},
                            {{ userEmployee.EmployeeUser.location.city }}.
                          </span>
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </div>

                <div class="col-5 col-md-auto">
                  <div class="container-ImgUE">
                    <q-img
                      :src="userEmployee.EmployeeUser.photo"
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
                        >Email: {{ userEmployee.EmployeeUser.mail }}</strong
                      >
                      <br />
                      <strong style="font-size: 12px">
                        Celular:
                        {{ userEmployee.EmployeeUser.phone_number }}</strong
                      >
                    </q-card-section>
                  </q-card>
                </div>
              </div>
            </q-card-section>
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
import { defineComponent, ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { userE } from "../../stores/userEmployee";
const $q = useQuasar();
const userEmployee = userE();

defineComponent({
  name: "PerfilE",
});
onMounted(async () => {
  userEmployee.setActiveView("perfil");
});
const pdfShow = ref(false);
function SeePdf() {
  pdfShow.value = true;
}
function ExitPdf() {
  pdfShow.value = false;
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