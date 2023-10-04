<template>
  <q-page padding>
    <div v-if="storeCompanyJobs.selectJob._id">
      <div class="col-8" v-if="!editMode">
        <div class="row justify-center">
          <div class="col-10">
            <q-card class="card" bordered flat>
              <q-separator />
              <q-card-section class="primary text-white">
                <div class="row justify-between">
                  <div class="col col-md-auto">
                    <q-icon
                      color="white"
                      size="35px"
                      name="fa-solid fa-briefcase"
                      class="q-mb-sm q-mr-sm"
                    >
                    </q-icon>
                    <strong style="font-size: 25px"
                      >{{ storeCompanyJobs.selectJob.title }}
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
                      {{ storeCompanyJobs.selectJob.location.state }},
                      {{ storeCompanyJobs.selectJob.location.city }}.
                    </span>
                    <q-icon
                      size="30px"
                      class="q-ml-lg text-quinary q-mt-xs clickable-icon"
                      name="fa-solid fa-pen-to-square"
                      @click="EditMode"
                    >
                    </q-icon>
                  </div>
                </div>
              </q-card-section>

              <q-card-section>
                <div class="row justify-around">
                  <div class="col-1" v-if="$q.screen.gt.sm"></div>

                  <div class="col-5">
                    <q-card class="card">
                      <q-card-section class="bg-blue-2">
                        <strong> Informacion de la oferta: </strong>
                      </q-card-section>
                      <div class="q-pa-sm">
                        <div class="q-mt-sm">
                          <strong> Horario: </strong>
                          <span>
                            {{
                              storeCompanyJobs.selectJob.about_job[0].schedule
                            }}
                          </span>
                        </div>
                        <div class="q-mt-sm">
                          <strong> Modalidad: </strong>
                          <span>
                            {{
                              storeCompanyJobs.selectJob.about_job[0].modality
                            }}
                          </span>
                        </div>

                        <div class="q-mt-sm">
                          <strong> Salario: </strong>
                          <span>
                            ${{
                              formattedAmount(storeCompanyJobs.selectJob.pay)
                            }}
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
                    {{ storeCompanyJobs.selectJob.about_job[0].description }}
                  </q-card-section>
                </q-card>
              </q-card-section>

              <q-card-section>
                <q-card class="card">
                  <q-card-section class="bg-blue-1">
                    <strong> Responsabilidades </strong>
                  </q-card-section>
                  <q-card-section style="white-space: pre-line">
                    {{
                      storeCompanyJobs.selectJob.about_job[0].responsabilidades
                    }}
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
                          {{
                            storeCompanyJobs.selectJob.about_job[0].requisitos
                          }}
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
                          {{
                            storeCompanyJobs.selectJob.about_job[0]
                              .conocimientos
                          }}
                        </div>
                      </q-card>
                    </div>
                  </div>
                </q-card>
                <div class="row justify-between q-mt-md">
                  <div class="col col-md-auto self-end">
                    <div class="q-mt-sm">
                      <span style="font-size: 11px">
                        {{
                          FormatUpdatedAt(storeCompanyJobs.selectJob.updatedAt)
                        }}
                      </span>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="row justify-center">
          <div class="col-10">
            <q-form class="" ref="jobCreateForm" @submit="GuardarJob">
              <q-card class="card" bordered flat>
                <q-card-section class="bg-primary text-white">
                  <div class="row justify-between">
                    <div class="col col-md-auto">
                      <q-icon size="30px" name="fa-solid fa-briefcase">
                      </q-icon>
                      <strong class="q-ml-xl" style="font-size: 30px"
                        >Edita tu Oferta:</strong
                      >
                    </div>
                    <div class="col col-md-auto">
                      <q-btn
                        class="quinary text-primary q-ml-md"
                        dense
                        push
                        size="20px"
                        ripple="false"
                        type="sumbit"
                        icon="fa-solid fa-floppy-disk"
                      >
                      </q-btn>
                      <q-btn
                        class="quinary text-negative q-ml-md"
                        dense
                        push
                        size="20px"
                        ripple="false"
                        @click="CancelarJob"
                        icon="fa-solid fa-square-xmark"
                      >
                      </q-btn>
                    </div>
                  </div>
                </q-card-section>

                <q-card-section>
                  <div class="row justify-around">
                    <div class="col-5">
                      <div class="row justify-center">
                        <div class="col-8">
                          <q-card class="card">
                            <q-card-section class="bg-blue-2">
                              <strong> Titulo de la Oferta: </strong>
                            </q-card-section>
                            <div class="q-pa-sm">
                              <div class="q-mt-sm">
                                <strong> Titulo: </strong>
                                <q-input
                                  filled
                                  class="q-px-sm"
                                  input-class="text-black"
                                  v-model="JobSelect.title"
                                  lazy-rules
                                  :rules="[
                                    (val) =>
                                      (val && val.length > 0) ||
                                      'Ingresa el Titulo de la Oferta',
                                  ]"
                                >
                                  <template v-slot:append>
                                    <q-icon
                                      class="text-primary"
                                      name="fa-solid fa-earth-americas"
                                    />
                                  </template>
                                </q-input>
                              </div>
                            </div>
                          </q-card>
                        </div>
                      </div>

                      <div class="q-mt-lg row justify-between">
                        <div class="col-5 q-mr-xs">
                          <strong class="q-ml-md text-registerE"
                            >Estado:</strong
                          >
                          <q-select
                            filled
                            v-model="JobSelect.location.state"
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
                        <div class="col-5 q-mr-xs">
                          <strong class="q-ml-md text-registerE"
                            >Ciudad:</strong
                          >
                          <q-select
                            filled
                            v-model="JobSelect.location.city"
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
                      <div class="row justify-center">
                        <div class="col-11">
                          <q-card class="card">
                            <div class="q-pa-sm">
                              <div class="q-mt-sm">
                                <div class="row justify-between">
                                  <div class="col col-md-auto self-center">
                                    <strong> Sector: </strong>
                                  </div>
                                  <div class="col col-md-auto">
                                    <q-icon
                                      color="orange-8"
                                      class="q-mr-xs"
                                      name="fa-solid fa-circle-exclamation"
                                    >
                                    </q-icon>
                                    <strong
                                      class="text-orange-8"
                                      style="font-size: 11px"
                                      >Importante:</strong
                                    >
                                    <br />
                                    <span
                                      class="text-grey-7"
                                      style="font-size: 12px"
                                      >Para mejorar la recomendaciones
                                    </span>
                                    <br />
                                    <span
                                      class="text-grey-7"
                                      style="font-size: 12px"
                                    >
                                      del trabajo eliga el sector al que
                                    </span>
                                    <br />
                                    <span
                                      class="text-grey-7"
                                      style="font-size: 12px"
                                      >pertenece su oferta
                                    </span>
                                  </div>
                                </div>
                                <q-select
                                  filled
                                  dense
                                  class="q-px-sm"
                                  transition-show="scale"
                                  transition-hide="scale"
                                  hide-dropdown-icon
                                  v-model="JobSelect.about_job[0].sector"
                                  :options="optionsSector"
                                  lazy-rules
                                  :rules="[
                                    (val) =>
                                      (val && val.length > 0) ||
                                      'Selecciona un Sector',
                                  ]"
                                >
                                  <template v-slot:append>
                                    <q-icon
                                      class="text-primary"
                                      name="fa-solid fa-hospital-user"
                                    />
                                  </template>
                                </q-select>
                              </div>
                            </div>
                          </q-card>
                        </div>
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
                            <q-input
                              filled
                              dense
                              class="q-px-sm"
                              input-class="text-black"
                              v-model="JobSelect.about_job[0].schedule"
                              lazy-rules
                              :rules="[
                                (val) =>
                                  (val && val.length > 0) ||
                                  'Ingresa el Horario',
                              ]"
                            >
                              <template v-slot:append>
                                <q-icon
                                  class="text-primary"
                                  name="fa-regular fa-calendar-days"
                                />
                              </template>
                            </q-input>
                          </div>
                          <div class="q-mt-sm">
                            <strong> Modalidad: </strong>
                            <q-select
                              filled
                              dense
                              class="q-px-sm"
                              transition-show="scale"
                              transition-hide="scale"
                              hide-dropdown-icon
                              v-model="JobSelect.about_job[0].modality"
                              :options="optionsModality"
                              lazy-rules
                              :rules="[
                                (val) =>
                                  (val && val.length > 0) ||
                                  'Selecciona una Modalidad',
                              ]"
                            >
                              <template v-slot:append>
                                <q-icon
                                  class="text-primary"
                                  name="fa-solid fa-house-laptop"
                                />
                              </template>
                            </q-select>
                          </div>

                          <div class="row justify-between q-mt-sm">
                            <div class="col-5">
                              <strong> Salario: </strong>
                              <q-input
                                dense
                                filled
                                type="number"
                                class="q-px-sm"
                                input-class="text-black"
                                :rules="[
                                  (val) =>
                                    val >= 0 ||
                                    'El monto no puede ser menor a 0',
                                  (val) =>
                                    (val && val.length > 0) ||
                                    'Ingrese un monto',
                                ]"
                                v-model="JobSelect.pay"
                                lazy-rules
                              >
                                <template v-slot:append>
                                  <q-icon
                                    class="text-primary"
                                    name="fa-solid fa-money-bill"
                                  />
                                </template>
                              </q-input>
                            </div>
                            <div class="col-5">
                              <strong> Vacantes: </strong>
                              <q-input
                                dense
                                filled
                                type="number"
                                class="q-px-sm"
                                input-class="text-black"
                                :rules="[
                                  (val) =>
                                    val > 0 ||
                                    'Las vacantes deben de ser mayor a  0',
                                  (val) =>
                                    (val && val.length > 0) ||
                                    'Ingresa las vacantes',
                                ]"
                                v-model="JobSelect.vacancies"
                                lazy-rules
                              >
                                <template v-slot:append>
                                  <q-icon
                                    class="text-primary"
                                    name="fa-solid fa-user"
                                  />
                                </template>
                              </q-input>
                            </div>
                          </div>
                        </div>
                      </q-card>
                    </div>
                  </div>
                </q-card-section>
                <q-card-section>
                  <q-card class="card">
                    <q-card-section class="bg-blue-1">
                      <div class="row justify-between">
                        <div class="col col-md-auto">
                          <strong> Descripción del Trabajo: </strong>
                        </div>
                        <div class="col col-md-auto">
                          <strong>Nota:</strong>
                          <br />
                          <span class="text-grey-7" style="font-size: 12px"
                            >Describe el trabajo y las aportaciones a la
                            empresa</span
                          >
                        </div>
                      </div>
                    </q-card-section>
                    <q-card-section>
                      <q-input
                        filled
                        type="textarea"
                        dense
                        class="q-px-sm"
                        input-class="text-black"
                        standout="bg-grey-2"
                        v-model="JobSelect.about_job[0].description"
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
                    </q-card-section>
                  </q-card>
                </q-card-section>

                <q-card-section>
                  <q-card class="card">
                    <q-card-section class="bg-blue-1">
                      <div class="row justify-between">
                        <div class="col col-md-auto self-center">
                          <strong> Responsabilidades: </strong>
                        </div>
                        <div class="col col-md-auto">
                          <strong>Nota:</strong>
                          <br />
                          <span class="text-grey-7" style="font-size: 12px"
                            >Describe las tareas con las que tendra</span
                          >
                          <br />
                          <span class="text-grey-7" style="font-size: 12px"
                            >que cumplir el nuevo trabajador</span
                          >
                        </div>
                      </div>
                    </q-card-section>
                    <q-card-section style="">
                      <q-input
                        filled
                        type="textarea"
                        dense
                        class="q-px-sm"
                        input-class="text-black"
                        standout="bg-grey-2"
                        v-model="JobSelect.about_job[0].responsabilidades"
                        lazy-rules
                        :rows="8"
                      >
                        <template v-slot:append>
                          <q-icon
                            class="text-primary"
                            name="fa-solid fa-align-justify"
                          />
                        </template>
                      </q-input>
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
                            <div class="row justify-between">
                              <div class="col col-md-auto self-center">
                                <strong> Requisitos: </strong>
                              </div>
                              <div class="col col-md-auto">
                                <strong style="font-size: 10px">Nota:</strong>
                                <br />
                                <span
                                  class="text-grey-7"
                                  style="font-size: 12px"
                                  >Caracteristicas que debe
                                </span>
                                <br />
                                <span
                                  class="text-grey-7"
                                  style="font-size: 12px"
                                  >tener el Empleado</span
                                >
                              </div>
                            </div>
                          </q-card-section>
                          <div class="q-mx-md q-pb-sm">
                            <q-input
                              filled
                              type="textarea"
                              dense
                              class="q-mt-sm q-px-sm"
                              input-class="text-black"
                              standout="bg-grey-2"
                              v-model="JobSelect.about_job[0].requisitos"
                              lazy-rules
                              :rows="13"
                            >
                              <template v-slot:append>
                                <q-icon
                                  class="text-primary"
                                  name="fa-solid fa-file-contract"
                                />
                              </template>
                            </q-input>
                          </div>
                        </q-card>
                      </div>
                      <div class="col-5">
                        <q-card>
                          <q-card-section class="bg-grey-1">
                            <div class="row justify-between">
                              <div class="col col-md-auto self-center">
                                <strong> Conocimientos: </strong>
                              </div>
                              <div class="col col-md-auto">
                                <q-icon
                                  color="orange-8"
                                  class="q-mr-xs"
                                  name="fa-solid fa-circle-exclamation"
                                >
                                </q-icon>
                                <strong
                                  class="text-orange-8"
                                  style="font-size: 11px"
                                  >Importante:</strong
                                >
                                <br />
                                <span
                                  class="text-grey-7"
                                  style="font-size: 12px"
                                  >Para mejorar la recomendaciones del
                                </span>
                                <br />
                                <span
                                  class="text-grey-7"
                                  style="font-size: 12px"
                                  >trabajo separe cada conocimiento
                                </span>
                                <br />
                                <span
                                  class="text-grey-7"
                                  style="font-size: 12px"
                                  >por una coma "," o un salto de linea</span
                                >
                              </div>
                            </div>
                          </q-card-section>
                          <div class="q-mx-md q-pb-sm">
                            <q-input
                              filled
                              type="textarea"
                              dense
                              class="q-mt-sm q-px-sm"
                              input-class="text-black"
                              standout="bg-grey-2"
                              v-model="JobSelect.about_job[0].conocimientos"
                              lazy-rules
                              :rows="12"
                            >
                              <template v-slot:append>
                                <q-icon
                                  class="text-primary"
                                  name="fa-solid fa-book"
                                />
                              </template>
                            </q-input>
                          </div>
                        </q-card>
                      </div>
                    </div>
                  </q-card>
                  <div class="row justify-between q-mt-md">
                    <div class="col col-md-auto">
                      <q-btn
                        class="text-white"
                        label="Guardar"
                        icon="fa-solid fa-floppy-disk"
                        color="primary"
                        size="20px"
                        type="sumbit"
                      >
                      </q-btn>
                      <q-btn
                        class="text-white q-ml-lg"
                        label="Cancelar"
                        icon="fa-solid fa-x"
                        color="negative"
                        size="20px"
                        @click="CancelarJob"
                      >
                      </q-btn>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </q-form>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { defineComponent, ref, onMounted, onBeforeMount } from "vue";
import { useQuasar } from "quasar";
import { companyJobs } from "src/stores/companyJobs.js";
import Server from "src/getServer";
import { userC } from "../../../stores/userCompany";
import { formatDistanceToNow } from "date-fns";
import router from "src/router/index";
const userCompany = userC();
const apiUrl = process.env.VUE_APP_API_URL;
const $q = useQuasar();
const storeCompanyJobs = companyJobs();
defineComponent({
  name: "CreateJ",
});
onBeforeMount(async () => {
  if (!storeCompanyJobs.selectJob._id) {
    router.push({ name: "InicioCompany" });
  }
});
const JobSelect = ref(null);
JobSelect.value = JSON.parse(JSON.stringify(storeCompanyJobs.getSelectJob()));
const editMode = ref(false);
function EditMode() {
  if (estadoFilterOptions.value.length == 0) {
    GetLocations();
  }

  editMode.value = true;
}
const optionsModality = ref(["Presencial", "Remoto", "Hibrido"]);
const optionsSector = ref([
  "Salud",
  "Economia y Finanzas",
  "Tecnología e Informatica",
  "Educacion",
  "Ingenieria",
  "Arte y Cultura",
  "Servicios al Cliente",
  "Construccion y Oficios",
  "Ciencias Naturales",
  "Comunicacion y Medios",
]);
const jobCreateForm = ref(null);
const title = ref(null);
const description = ref(null);
const sector = ref(null);
const schedule = ref(null);
const modality = ref(null);
const conocimientos = ref(null);
const requisitos = ref(null);
const responsabilidades = ref(null);
const pay = ref(null);
const vacancies = ref(null);

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
    if (location.state === JobSelect.value.location.state) {
      ciudades.value = location.cities;
      ciudadFilterOptions.value = ciudades.value;
      JobSelect.value.location.city = null;
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
//#region Mejora Visualizacion
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
async function GuardarJob() {
  try {
    const urlParams = new URLSearchParams();
    urlParams.append("title", JobSelect.value.title);
    urlParams.append("description", JobSelect.value.about_job[0].description);
    urlParams.append("sector", JobSelect.value.about_job[0].sector);
    urlParams.append("schedule", JobSelect.value.about_job[0].schedule);
    urlParams.append("modality", JobSelect.value.about_job[0].modality);
    urlParams.append("pay", JobSelect.value.pay);
    urlParams.append(
      "conocimientos",
      JobSelect.value.about_job[0].conocimientos
    );
    urlParams.append("requisitos", JobSelect.value.about_job[0].requisitos);
    urlParams.append(
      "responsabilidades",
      JobSelect.value.about_job[0].responsabilidades
    );
    urlParams.append("vacancies", JobSelect.value.vacancies);
    urlParams.append("country", "Mexico");
    urlParams.append("state", JobSelect.value.location.state);
    urlParams.append("city", JobSelect.value.location.city);

    const response = await fetch(
      `${await Server.GetServer()}/Jobs/${JobSelect.value._id}`,
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
      storeCompanyJobs.setSelectJob(JobSelect.value);
      editMode.value = false;
    }
  } catch (error) {
    console.log(error);
  }
}
function CancelarJob() {
  editMode.value = false;
  JobSelect.value = JSON.parse(JSON.stringify(storeCompanyJobs.getSelectJob()));
}
</script>
<style lang="scss">
.clickable-icon {
  cursor: pointer;
}
</style>