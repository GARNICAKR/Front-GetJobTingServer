<template>
  <q-page padding>
    <!-- Inicia Edit -->
    <div v-if="userEmployee.EmployeeUser._id">
      <div class="row justify-between">
        <div class="col-8" v-if="editMode">
          <q-form class="" ref="SettingsEForm" @submit="GuardarEmployee">
            <div>
              <q-card class="my-card" bordered flat>
                <q-card-section class="quinary">
                  <div class="row justify-between">
                    <div class="col-8">
                      <div class="row">
                        <div class="col">
                          <strong class="q-ml-md">Nombres:</strong>
                          <q-input
                            filled
                            class="q-px-sm"
                            input-class="text-black"
                            standout="bg-blue-3"
                            v-model="EmployeeUser.name"
                            lazy-rules
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Ingresa tu Nombre',
                            ]"
                          >
                            <template v-slot:append>
                              <q-icon
                                class="text-primary"
                                name="fa-solid fa-circle-user"
                              />
                            </template>
                          </q-input>
                        </div>
                        <div class="col">
                          <strong class="q-ml-md">Apellidos:</strong>
                          <q-input
                            filled
                            class="q-px-sm"
                            input-class="text-black"
                            standout="bg-blue-3"
                            v-model="EmployeeUser.last_name"
                            lazy-rules
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Ingresa tu Apeido',
                            ]"
                          >
                            <template v-slot:append>
                              <q-icon
                                class="text-primary"
                                name="fa-solid fa-circle-user"
                              />
                            </template>
                          </q-input>
                        </div>
                      </div>
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
                        @click="CancelarEmployee"
                        icon="fa-solid fa-square-xmark"
                      >
                      </q-btn>
                    </div>
                  </div>
                </q-card-section>
                <q-card-section class="bg-grey-2">
                  <div class="row justify-between">
                    <div class="col-8 q-mt-sm text-black">
                      <q-card class="card bg-grey-2">
                        <q-card-section class="bg-grey-2">
                          <strong style="font-size: 17px"> Carrera: </strong>
                          <q-input
                            filled
                            dense
                            class="q-px-sm"
                            input-class="text-black"
                            standout="bg-grey-3"
                            v-model="EmployeeUser.carrera"
                            lazy-rules
                          >
                            <template v-slot:append>
                              <q-icon
                                class="text-primary"
                                name="fa-solid fa-user-doctor"
                              />
                            </template>
                          </q-input>
                          <br />

                          <strong style="font-size: 17px">
                            Universidad:
                          </strong>
                          <q-input
                            filled
                            dense
                            class="q-px-sm"
                            input-class="text-black"
                            standout="bg-grey-3"
                            v-model="EmployeeUser.university"
                            lazy-rules
                          >
                            <template v-slot:append>
                              <q-icon
                                class="text-primary"
                                name="fa-solid fa-building-columns"
                              />
                            </template>
                          </q-input>
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
                              <div>
                                <q-input
                                  filled
                                  type="textarea"
                                  dense
                                  class="q-px-sm"
                                  input-class="text-black"
                                  standout="bg-grey-2"
                                  v-model="EmployeeUser.introduction"
                                  lazy-rules
                                >
                                  <template v-slot:append>
                                    <q-icon
                                      class="text-primary"
                                      name="fa-solid fa-envelope-open"
                                    />
                                  </template>
                                </q-input>
                              </div>
                            </q-card-section>
                          </q-card>
                          <br />
                          <q-card-section>
                            <div class="row">
                              <div class="col">
                                <strong class="q-ml-md">Telefono:</strong>
                                <q-input
                                  filled
                                  dense
                                  class="q-px-sm"
                                  input-class="text-black"
                                  standout="bg-grey-3"
                                  v-model="EmployeeUser.phone_number"
                                  lazy-rules
                                  @update:model-value="formatPhoneNumber"
                                  :rules="[
                                    (val) =>
                                      (val !== null && val !== '') ||
                                      'Ingresa tu Telefono',
                                    (val) =>
                                      val.length > 13 ||
                                      'Ingresa un telefono valido ',
                                  ]"
                                  maxlength="14"
                                >
                                  <template v-slot:append>
                                    <q-icon
                                      class="text-primary"
                                      name="fa-solid fa-phone"
                                    />
                                  </template>
                                </q-input>
                              </div>
                              <div class="col">
                                <strong class="q-ml-md">Estado:</strong>
                                <q-select
                                  filled
                                  dense
                                  v-model="EmployeeUser.location.state"
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
                                  v-model="EmployeeUser.location.city"
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
                              <div class="col-6">
                                <strong> Sector: </strong>
                                <q-select
                                  filled
                                  class="q-px-sm"
                                  transition-show="scale"
                                  transition-hide="scale"
                                  hide-dropdown-icon
                                  v-model="EmployeeUser.sector"
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
                          </q-card-section>

                          <strong class="" style="font-size: 17px"
                            >Habilidades:
                          </strong>
                          <div class="row">
                            <div class="col col-md-auto"></div>
                          </div>
                          <div>
                            <template
                              v-for="(skill, id) in EmployeeUser.skills"
                              :key="id"
                            >
                              <q-chip class="glossy text-white" color="primary">
                                {{ skill }}
                                <q-icon
                                  size="15px"
                                  class="text-red-6 q-mt-xs clickable-icon q-ml-sm q-mb-sm"
                                  name="fa-solid fa-xmark"
                                  @click="DeleteSkill(id)"
                                >
                                </q-icon>
                              </q-chip>
                            </template>
                            <q-btn
                              class="bg-grey-2 text-primary q-ml-md glossy"
                              dense
                              rounded
                              push
                              ripple="false"
                              @click="AgregateSkill"
                              icon="fa-solid fa-plus"
                            >
                            </q-btn>
                          </div>
                        </q-card-section>
                        <q-separator />
                        <q-card-actions align="right" class="bg-grey-3">
                          <q-btn
                            class="bg-grey-4 text-primary q-ml-md"
                            dense
                            push
                            size="20px"
                            ripple="false"
                            type="sumbit"
                            icon="fa-solid fa-floppy-disk"
                            label="Guardar"
                          >
                          </q-btn>
                          <q-btn
                            class="bg-grey-4 text-negative q-ml-md"
                            dense
                            push
                            size="20px"
                            ripple="false"
                            @click="CancelarEmployee"
                            icon="fa-solid fa-square-xmark"
                            label="Cancelar"
                          >
                          </q-btn>
                        </q-card-actions>
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
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </q-form>
        </div>
        <!-- Termina Edit -->
        <!-- Inicia Show -->
        <div class="col-8" v-else>
          <div>
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
                    <q-icon
                      size="30px"
                      class="text-secondary q-mt-xs clickable-icon"
                      name="fa-solid fa-pen-to-square"
                      @click="EditMode"
                    >
                    </q-icon>
                  </div>
                </div>
              </q-card-section>
              <q-card-section class="bg-grey-2">
                <strong style="font-size: 25px"
                  >Sector: {{ userEmployee.EmployeeUser.sector }}</strong
                >
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
                        <div class="row">
                          <div class="col col-md-auto"></div>
                        </div>
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
          <q-btn
            color="primary"
            class="text-white q-mt-md q-ml-xl"
            size="20px"
            @click="SeePdf"
            label="Ver CV"
            icon-right="fa-solid fa-file-export"
          >
          </q-btn>
        </div>
        <div class="col-3 col-md-auto">
          <q-card class="card q-mb-md">
            <q-card-section class="secondary2">
              <strong class="q-ml-md text-registerE text-white"
                >Cambia tu Curriculum:</strong
              >
            </q-card-section>
            <q-card-section class="bg-grey-2">
              <q-uploader
                style="width: 250px; height: 130px"
                accept=".pdf"
                :auto-upload="false"
                v-model="CV"
                color="secondary"
                class="uploader-custom q-mb-lg bg-grey-2"
                @input="updatePdf"
                ref="uploaderPdf"
              />
            </q-card-section>

            <q-card-actions class="bg-grey-3">
              <q-btn
                class="bg-grey-4 text-primary q-ml-md"
                dense
                push
                size="20px"
                ripple="false"
                @click="GuardarPdf"
                icon="fa-solid fa-floppy-disk"
                label="Guardar"
              >
              </q-btn>
            </q-card-actions>
          </q-card>
          <q-card>
            <q-card-section class="secondary2">
              <strong class="q-ml-md text-registerE text-white"
                >Cambia tu Foto de Perfil:</strong
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
      <!-- Termina Show -->
      <q-dialog
        v-model="bandSkill"
        persistent
        v-if="bandSkill"
        transition-show="rotate"
        transition-hide="rotate"
      >
        <q-card style="width: 400px; max-width: 80vw">
          <q-form @submit="SaveSkill">
            <q-card-section class="bg-primary">
              <div class="row justify-between">
                <div class="col col-md-auto">
                  <q-icon
                    class="q-mr-sm q-mb-xs text-white"
                    name="fa-solid fa-layer-group"
                    size="20px"
                  ></q-icon>

                  <strong class="text-white">Agrega Habilidades</strong>
                </div>
                <div class="col col-md-auto">
                  <q-icon
                    name="fa-solid fa-square-xmark"
                    color="white"
                    v-close-popup
                    @click="skill = ''"
                    size="26px"
                    class="clickable-icon"
                  >
                  </q-icon>
                </div>
              </div>
            </q-card-section>
            <q-separator />

            <q-card-section class="bg-grey-2">
              <div class="row q-py-md">
                <div class="col q-pr-sm">
                  <strong>Escribe tu Habilidad:</strong>
                  <q-input fill outlined v-model="skill" dense> </q-input>
                </div>
              </div>
            </q-card-section>
            <q-card-actions class="bg-grey-2" align="right">
              <q-btn
                icon="fa-solid fa-plus"
                color="green-7"
                label="Agregar"
                type="sumbit"
              />
              <q-btn
                icon="fa-solid fa-xmark"
                color="negative"
                label="Terminar"
                @click="skill = ''"
                v-close-popup
              />
            </q-card-actions>
          </q-form>
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
import { defineComponent, ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { userE } from "../../stores/userEmployee";
import { storeToRefs } from "pinia";
import Server from "src/getServer";
const apiUrl = process.env.VUE_APP_API_URL;
const $q = useQuasar();
const userEmployee = userE();

defineComponent({
  name: "PerfilE",
});
onMounted(async () => {
  userEmployee.setActiveView("ajustes");
});
const editMode = ref(false);
function EditMode() {
  if (estadoFilterOptions.value.length == 0) {
    GetLocations();
  }

  editMode.value = true;
}
const EmployeeUser = ref(null);
EmployeeUser.value = JSON.parse(JSON.stringify(userEmployee.getUserEmployee()));
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

//#region Agregate Skills
const bandSkill = ref(false);
const skill = ref(null);
const auxSkills = ref([]);
function AgregateSkill() {
  bandSkill.value = true;
}
function SaveSkill() {
  if (skill.value.length > 0) {
    EmployeeUser.value.skills.push(skill.value);
    skill.value = "";
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "fa-solid fa-thumbs-up",
      message: "Agregado",
    });
  }
}
function DeleteSkill(id) {
  EmployeeUser.value.skills.splice(id, 1);
}
//#endregion
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
    if (location.state === EmployeeUser.value.location.state) {
      ciudades.value = location.cities;
      ciudadFilterOptions.value = ciudades.value;
      EmployeeUser.value.location.city = null;
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
//#region phoneNumber
function formatPhoneNumber() {
  if (EmployeeUser.value.phone_number.length < 15) {
    EmployeeUser.value.phone_number = EmployeeUser.value.phone_number.replace(
      /\D/g,
      ""
    ); // Elimina caracteres no numéricos
    if (EmployeeUser.value.phone_number.length > 2) {
      EmployeeUser.value.phone_number = EmployeeUser.value.phone_number.replace(
        /(\d{2})(?=\d)/g,
        "$1-"
      );
    }
  } else {
    EmployeeUser.value.phone_number = EmployeeUser.value.phone_number.substring(
      0,
      15
    );
  }
}
//#endregion
//#region sendFormulario
const SettingsEForm = ref(null);
async function GuardarEmployee() {
  try {
    const urlParams = new URLSearchParams();

    urlParams.append("name", EmployeeUser.value.name);
    urlParams.append("last_name", EmployeeUser.value.last_name);
    urlParams.append("phone_number", EmployeeUser.value.phone_number);
    urlParams.append("country", "Mexico");
    urlParams.append("state", EmployeeUser.value.location.state);
    urlParams.append("city", EmployeeUser.value.location.city);
    urlParams.append("university", EmployeeUser.value.university);
    urlParams.append("carrera", EmployeeUser.value.carrera);

    urlParams.append("introduction", EmployeeUser.value.introduction);
    urlParams.append("skills", JSON.stringify(EmployeeUser.value.skills));
    urlParams.append("sector", EmployeeUser.value.sector);
    const response = await fetch(
      `${await Server.GetServer()}/employee/edit/${
        userEmployee.EmployeeUser._id
      }`,
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
      editMode.value = false;

      userEmployee.setUserEmployee(EmployeeUser.value);
    }
  } catch (error) {
    console.log(error);
  }
}
function CancelarEmployee() {
  editMode.value = false;
  EmployeeUser.value = JSON.parse(
    JSON.stringify(userEmployee.getUserEmployee())
  );
}
//#endregion
//#region sendFiles
const CV = ref(null);
const photo = ref(null);
const uploaderPhoto = ref(null);
const uploaderPdf = ref(null);
const PDF = ref(null);
const pdfShow = ref(false);
function updatePdf(newPdf) {
  CV.value = newPdf.target.files[0];
}
async function GuardarPdf() {
  if (CV.value != null) {
    try {
      const formData = new FormData();
      formData.append("CV", CV.value);
      let response = await fetch(
        `${await Server.GetServer()}/employee/editCV/${
          userEmployee.EmployeeUser._id
        }`,
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
        userEmployee.EmployeeUser.CV = `data:application/pdf;base64,${data.CV}`;

        CV.value = null;
        uploaderPdf.value.reset();
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "CV Actualizado",
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
      message: "No has seleccionado un CV",
    });
  }
}
function SeePdf() {
  pdfShow.value = true;
}
function ExitPdf() {
  pdfShow.value = false;
}
function updatePhoto(newPhoto) {
  photo.value = newPhoto.target.files[0];
}
async function GuardarFoto() {
  if (photo.value != null) {
    try {
      const formData = new FormData();
      formData.append("photo", photo.value);
      let response = await fetch(
        `${await Server.GetServer()}/employee/editPhoto/${
          userEmployee.EmployeeUser._id
        }`,
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
        userEmployee.EmployeeUser.photo = `data:image;base64,${data.photo}`;
        photo.value = null;
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
</style>