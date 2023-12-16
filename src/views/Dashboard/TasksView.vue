<template>
  <div class="parent">
    <table class="table table-striped">
      <tr class="header">
        <th scope="col">#</th>
        <th scope="col">{{ $t("message.task") }}</th>
        <th class="td-None" scope="col">{{ $t("message.user") }}</th>
        <th>{{ $t("message.status") }}</th>
        <th>{{ $t("message.agree") }}</th>
        <th scope="col">{{ $t("message.action") }}</th>
      </tr>
      <tbody class="content">
        <tr v-for="(task, index) in tasksList" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <p
              @click="getTaskData(task)"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrob2"
            >
              {{ $t("message.show") }}
            </p>
          </td>
          <td
            class="td-None"
            v-for="(employee, index) in employeesList"
            :key="index"
            v-if="employee.id == task.employeeId"
          >
            {{ employee.Name }}
          </td>
          <td :class="task.Status" v-if="task.Status == 'finished'">
            {{ $t("message.finished") }}
          </td>
          <td :class="task.Status" v-else>{{ $t("message.underWaiting") }}</td>
          <td class="pinding text-white w-150" v-if="task.Agree == ''">
            {{ $t("message.underWaiting") }}
          </td>
          <td class="refused text-white w-150" v-if="task.Agree == 'refused'">
            {{ $t("message.refused") }}
          </td>
          <td class="bg-Success w-150" v-else-if="task.Agree == 'acceptance'">
            {{ $t("message.done") }}
          </td>
          <td>
            <button
              @click="(block = true), getTaskData(task, index)"
              class="btn btn-danger ms-2 me-2"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrob1"
            >
              {{ $t("message.delete") }}
              <FontAwesome :icon="['fas', 'trash']" style="margin: 0" />
            </button>
            <button
              v-if="task.Agree == false && task.Status != 'finished'"
              @click="(block = false), getTaskData(task, index)"
              class="btn btn-primary ms-2 me-2"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrob1"
            >
              {{ $t("message.edit") }}
              <FontAwesome :icon="['fas', 'edit']" style="margin: 0" />
            </button>
            <button
              v-if="task.Agree == ''"
              @click="(edit = true), getTaskData(task, index)"
              class="btn btn-success ms-2 me-2"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrob3"
            >
              {{ $t("message.status") }}
              <FontAwesome :icon="['fas', 'eye']" style="margin: 0" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <jw-pagination
      :items="tasksList"
      :pageSize="10"
      @changePage="onChangePage"
      :labels="this.$store.state.customLabels"
    >
    </jw-pagination>
    <div
      class="modal fade"
      id="staticBackdrob1"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdrob1Label"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header flex-row-reverse">
            <button
              type="button"
              id="closed"
              ref="closed"
              class="btn-close m-0"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <h5 class="modal-title" id="staticBackdrob1Label" v-if="block == true">
              {{ $t("message.delete") }}
            </h5>
            <h5 class="modal-title" id="staticBackdrob1Label" v-else>
              {{ $t("message.edit") }}
            </h5>
          </div>
          <div class="modal-body" v-if="block == true">
            <div class="form-group">
              <h4 class="text-danger">
                {{ $t("message.deleteTaskMessage") }}
              </h4>
            </div>
          </div>
          <div class="modal-body" v-else>
            <div class="row mt-4">
              <div class="pb-2">
                <form class="editor">
                  <vue-editor class="edit" v-model="taskContent"></vue-editor>
                </form>
                <div
                  v-if="taskContent == '' && v$.taskContent.$error"
                  class="feedback-error mt-3"
                >
                  {{ $t("message.task") }} {{ $t("message.rquired") }}
                </div>
                <div
                  v-if="taskContent.length < 50 && taskContent !== ''"
                  class="feedback-error mt-3"
                >
                  {{ $t("message.shortTask") }}
                </div>
              </div>
              <div>
                <div class="form-group mb-3">
                  <label for="date " class="w-100 d-block text-initial mb-2 text-color">{{
                    $t("message.date")
                  }}</label>
                  <input
                    :class="{
                      'is-invalid': v$.finalDate.$error,
                    }"
                    v-model="finalDate"
                    type="date"
                    class="form-control"
                    :min="dailyDate"
                    @keydown.prevent
                    id="date"
                    aria-describedby="emailHelp"
                    :placeholder="$t('message.date')"
                  />
                  <div v-if="v$.finalDate.$error" class="feedback-error mt-3">
                    {{ $t("message.date") }} {{ $t("message.rquired") }}
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label
                    for="notice "
                    class="w-100 d-block text-initial mb-2 text-color"
                    >{{ $t("message.notice") }}</label
                  >

                  <textarea
                    class="form-control"
                    v-model="notice"
                    id="notice"
                    rows="3"
                    :placeholder="$t('message.notice')"
                  ></textarea>
                  <div v-if="notice.length > 300" class="feedback-error mt-3">
                    {{ $t("message.longNote") }}
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label for="Type " class="w-100 d-block text-initial mb-2 text-color">{{
                    $t("message.deliveryStatus")
                  }}</label>
                  <select
                    id="Type"
                    v-model="deliveryStatus"
                    class="form-select select-language"
                    :class="{
                      'is-invalid': v$.deliveryStatus.$error,
                    }"
                  >
                    <option :value="true">{{ $t("message.avillableDelivery") }}</option>
                    <option :value="false">
                      {{ $t("message.notDeliveredMessage") }}
                    </option>
                  </select>
                  <div v-if="v$.deliveryStatus.$error" class="feedback-error">
                    {{ $t("message.deliveryStatus") }} {{ $t("message.rquired") }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer flex-row-reverse">
            <button type="button" class="btn btn-secondary close" data-bs-dismiss="modal">
              {{ $t("message.cancel") }}
            </button>
            <button
              class="btn btn-danger ms-2 me-2"
              v-if="block == true"
              @click="deleteTask()"
            >
              {{ $t("message.delete") }}
              <FontAwesome :icon="['fas', 'trash']" style="margin: 0" />
            </button>
            <button class="btn btn-primary ms-2 me-2" v-else @click="editTask()">
              {{ $t("message.edit") }}
              <FontAwesome :icon="['fas', 'edit']" style="margin: 0" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="staticBackdrob2"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdrob1Label"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header flex-row-reverse">
            <button
              type="button"
              id="closed"
              class="btn-close m-0"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <h5 class="modal-title" id="staticBackdrob1Label">
              {{ $t("message.task") }}
            </h5>
          </div>
          <div class="modal-body" v-html="taskContent"></div>

          <div class="modal-footer flex-row-reverse">
            <button type="button" class="btn btn-secondary close" data-bs-dismiss="modal">
              {{ $t("message.cancel") }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="staticBackdrob3"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdrob1Label"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header flex-row-reverse">
            <button
              type="button"
              id="close"
              ref="closeEdit"
              class="btn-close m-0"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <h5 class="modal-title" id="staticBackdrob1Label">
              {{ $t("message.status") }}
            </h5>
          </div>
          <div class="modal-body">
            <h4 class="text-color text-initial">
              {{ $t("message.reciveMessage") }}
            </h4>
            <div class="form-group input-width mt-3">
              <select v-model="agree" id="employee" class="form-select select-language">
                <option value="acceptance">
                  {{ $t("message.acceptance") }}
                </option>
                <option value="refused">{{ $t("message.refused") }}</option>
              </select>
            </div>
          </div>

          <div class="modal-footer flex-row-reverse">
            <button type="button" class="btn btn-secondary close" data-bs-dismiss="modal">
              {{ $t("message.cancel") }}
            </button>
            <button class="btn btn-success ms-2 me-2" @click="editTaskStatus()">
              {{ $t("message.finishNow") }}
              <FontAwesome :icon="['fas', 'check']" style="margin: 0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import useValidate from "@vuelidate/core";
import { required, maxLength, minLength } from "vuelidate/lib/validators";
import JwPagination from "jw-vue-pagination";
import axios from "axios";
let date = new Date();
let dailyDate =
  date.getUTCFullYear() + "-" + Number(date.getMonth() + 1) + "-" + date.getDate();
import { VueEditor } from "vue2-editor";
export default {
  name: "",
  setup: () => ({ v$: useValidate() }),
  data() {
    return {
      date,
      dailyDate,
      taskContent: "",
      finalDate: "",
      notice: "",
      agree: "",
      taskId: "",
      taskIndex: "",
      employeeId: "",
      task: "",
      tasksList: [],
      pageOfItems: [],
      employeesList: [],
      block: false,
      edit: true,
      deliveryStatus: "",
    };
  },
  components: { VueEditor, JwPagination },
  mounted() {
    this.getAllTasks();
    this.getAllEmployees();
  },
  validations() {
    return {
      taskContent: {
        required,
        minLength: minLength(50),
      },
      finalDate: { required },
      notice: { maxLength: maxLength(300) },
      deliveryStatus: { required },
    };
  },
  methods: {
    getAllEmployees() {
      axios.get(`Employees`).then((response) => {
        this.employeesList = response.data;
      });
    },
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    },
    getAllTasks() {
      axios.get(`Tasks`).then((response) => {
        this.tasksList = response.data;
      });
    },
    getTaskData(task, index) {
      if (task.Note) {
        this.notice = task.Note;
      }
      this.task = task;
      this.taskContent = task.TaskContent;
      this.finalDate = task.Date;
      this.taskId = task.id;
      this.taskIndex = index;
    },
    editTask() {
      this.v$.$validate();
      if (!this.v$.$error) {
        axios
          .put(`Tasks/${this.taskId}`, {
            TaskContent: this.taskContent,
            Date: this.finalDate,
            employeeId: this.task.employeeId,
            Note: this.notice,
            Status: 'pinding',
            DeliveryValidaty: this.deliveryStatus,
            Agree: this.task.Agree,
          })
          .then(() => {
            this.$toast.success(this.$store.state.successMessage);
          })
          .catch(() => {
            this.$toast.error(this.$store.state.ErrorMessage);
          });
      }
    },
    deleteTask() {
      axios
        .delete(`Tasks/${this.taskId}`)
        .then(() => {
          this.$toast.success(this.$store.state.successMessage);
          this.tasksList.splice(this.taskIndex, 1);
          this.$refs.closed.click();
        })
        .catch(() => {
          this.$toast.error(this.$store.state.ErrorMessage);
        });
    },
    editTaskStatus() {
      if (this.agree !== "") {
        axios
          .put(
            `Tasks/${this.taskId}`,
            this.tasksList[this.taskIndex],
            (this.tasksList[this.taskIndex].Agree = this.agree)
          )
          .then(() => {
            this.$toast.success(this.$store.state.successMessage);
            this.$refs.closeEdit.click();
          })
          .catch(() => {
            this.$toast.error(this.$store.state.ErrorMessage);
          });
      }
    },
  },
};
</script>
<style>
.w-150 {
  width: 150px;
}
.bg-Success {
  background-color: #23d160 !important;
  color: white !important;
}
</style>
