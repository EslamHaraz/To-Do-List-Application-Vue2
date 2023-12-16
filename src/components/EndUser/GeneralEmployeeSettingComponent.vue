<template>
  <div class="col-lg-12 flex-col">
    <form @submit.prevent class="form-grid p-3">
      <div class="form-group input-width mb-3">
        <label for="Languge " class="w-100 d-block text-initial mb-2 text-color">{{
          $t("message.language")
        }}</label>
        <select
          :class="{
            'is-invalid': v$.language.$error,
          }"
          v-model="language"
          id="Languge"
          class="form-select select-language"
        >
          <option value="ar">{{ $t("message.arabic") }}</option>
          <option value="en">{{ $t("message.english") }}</option>
        </select>
        <div v-if="v$.language.$error" class="feedback-error">
          {{ $t("message.language") }} {{ $t("message.rquired") }}
        </div>
      </div>

      <div class="input-width mb-md-3">
        <label for="asnwer" class="w-100 d-block text-initial mb-2 text-color">{{
          $t("message.mode")
        }}</label>
        <div class="modes d-flex justify-content-evenly align-items-center">
          <div class="form-check">
            <input
              :class="{
                'is-invalid': v$.mode.$error,
              }"
              v-model="mode"
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value="dark"
            />
            <label class="form-check-label text-color" for="flexRadioDefault1">
              {{ $t("message.dark") }}
            </label>
          </div>
          <div class="form-check">
            <input
              :class="{
                'is-invalid': v$.mode.$error,
              }"
              v-model="mode"
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              value="light"
            />
            <label class="form-check-label text-color" for="flexRadioDefault2">
              {{ $t("message.light") }}
            </label>
          </div>
          <div v-if="v$.mode.$error" class="feedback-error">
            {{ $t("message.mode") }} {{ $t("message.rquired") }}
          </div>
        </div>
      </div>
      <button @click="editGenralSettings()" class="btn btn-primary mt-3 signIn-btn">
        {{ $t("message.editNow") }}
      </button>
    </form>
  </div>
</template>
<script>
import axios from "axios";
import useValidate from "@vuelidate/core";
import { required } from "vuelidate/lib/validators";
export default {
  name: "GeneralEmployeeSettingComponent",
  setup: () => ({ v$: useValidate() }),
  data() {
    return {
      mode: "",
      language: "",
    };
  },
  mounted() {
    this.getUserData();
  },
  validations() {
    return {
      mode: { required },
      language: { required },
    };
  },
  methods: {
    getUserData() {
      setTimeout(() => {
        this.mode = this.$store.state.employeeData.Mode;
        this.language = this.$store.state.employeeData.Language;
      }, 270);
    },
    editGenralSettings() {
      this.v$.$validate();
      if (!this.v$.$error) {
        axios
          .put(
            `Employees/${this.$store.state.employeeId}`,
            this.$store.state.employeeData,
            (this.$store.state.employeeData.Language = this.language),
            (this.$store.state.employeeData.Mode = this.mode)
          )
          .then(() => {
            this.$toast.success(this.$store.state.successMessage);
            setTimeout(() => {
              this.$toast.success(this.$store.state.signInMessage, {
                position: "top-center",
              });
            }, 3000);
          });
      }
    },
  },
};
</script>
<style scoped>
@media (max-width: 767px) {
  .input-width {
    width: 250px;
  }
  .flex-col {
    display: flex;
    justify-content: center;
  }
}
</style>
