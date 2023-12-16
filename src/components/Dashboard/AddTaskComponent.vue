<template>
  <div class="container p-2">
    <h3 class="text-color text-initial mb-4">{{ $t("message.addTask") }}</h3>
    <div class="row mt-4">
      <div class="col-lg-8 pb-2">
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
      <div class="col-lg-4">
        <div class="form-group input-width mb-3">
          <label for="employee " class="w-100 d-block text-initial mb-2 text-color">{{
            $t("message.employee")
          }}</label>
          <select
            id="employee"
            class="form-select select-language"
            v-model="employee"
            :class="{
              'is-invalid': v$.employee.$error,
            }"
          >
            <option
              v-for="(employee, index) in employeesList"
              :key="index"
              :value="employee.id"
            >
              {{ employee.Name }}
            </option>
          </select>
          <div v-if="v$.employee.$error" class="feedback-error mt-3">
            {{ $t("message.employeeName") }} {{ $t("message.rquired") }}
          </div>
        </div>
        <div class="form-group input-width mb-3">
          <label for="date " class="w-100 d-block text-initial mb-2 text-color">{{
            $t("message.date")
          }}</label>
          <input
            :class="{
              'is-invalid': v$.finalDate.$error,
            }"
            type="date"
            class="form-control"
            id="date"
            :min="dailyDate"
            v-model="finalDate"
            aria-describedby="emailHelp"
            :placeholder="$t('message.date')"
            @keydown.prevent
          />
          <div v-if="v$.finalDate.$error" class="feedback-error mt-3">
            {{ $t("message.date") }} {{ $t("message.rquired") }}
          </div>
        </div>
        <div class="form-group input-width mb-3">
          <label for="notice " class="w-100 d-block text-initial mb-2 text-color">{{
            $t("message.notice")
          }}</label>
          <textarea
            v-model="note"
            class="form-control"
            id="notice"
            rows="3"
            :placeholder="$t('message.notice')"
          ></textarea>
          <div v-if="note.length > 300" class="feedback-error mt-3">
            {{ $t("message.longNote") }}
          </div>
        </div>
        <button @click="addTask()" class="btn btn-primary mt-3 signIn-btn">
          {{ $t("message.addTask") }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
let date = new Date();

import axios from "axios";
import { VueEditor } from "vue2-editor";
import useValidate from "@vuelidate/core";
import { required, maxLength, minLength } from "vuelidate/lib/validators";
export default {
  name: "AddTaskComponent",
  setup: () => ({ v$: useValidate() }),
  data() {
    return {
      date,
      dailyDate: "",
      day: "",
      taskContent: "",
      finalDate: "",
      employee: "",
      note: "",
      employeesList: [],
    };
  },
  mounted() {
    this.getEmployees();
    this.checkDate();
  },
  validations() {
    return {
      taskContent: {
        required,
        minLength: minLength(50),
      },
      finalDate: { required },
      employee: { required },
      note: { maxLength: maxLength(300) },
    };
  },
  components: { VueEditor },
  methods: {
    getEmployees() {
      axios
        .get(`Employees?Status=Good`)
        .then((response) => {
          this.employeesList = response.data;
        })
        .catch(() => {
          this.$toast.error("Error 404");
        });
    },
    addTask() {
      this.v$.$validate();
      if (!this.v$.$error) {
        axios
          .post(`Tasks`, {
            TaskContent: this.taskContent,
            Date: this.finalDate,
            employeeId: this.employee,
            Note: this.note,
            Agree: "",
            Status: "pinding",
            DeliveryValidaty: true,
          })
          .then(() => {
            this.$toast.success(this.$store.state.successMessage);
            setTimeout(() => {
              this.$router.push({ name: "TasksView" });
            }, 1400);
          })
          .catch(() => {
            this.$toast.error(this.$store.state.ErrorMessage);
          });
      }
    },
    checkDate() {
      if (date.getDate() < 10) {
        this.day = "0" + date.getDate();
      } else {
        this.day = date.getDate();
      }
      this.dailyDate =
        date.getUTCFullYear() + "-" + Number(date.getMonth() + 1) + "-" + this.day;
    },
  },
};
</script>
<style>
.editor {
  background-color: white;
}
</style>
