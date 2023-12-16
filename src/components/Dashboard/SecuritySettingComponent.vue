<template>
  <div class="col-lg-12 flex-col">
    <form @submit.prevent class="form-grid p-3">
      <div class="form-group input-width mb-3">
        <label
          for="email "
          class="w-100 d-block text-initial mb-2 text-color"
          >{{ $t("message.email") }}</label
        >
        <input
          type="email"
          v-model="usedEmail"
          :class="{
            'is-invalid': v$.usedEmail.$error,
          }"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          :placeholder="$t('message.email')"
        />
        <div
          v-if="usedEmail == '' && v$.usedEmail.$error"
          class="feedback-error"
        >
          {{ $t("message.email") }} {{ $t("message.rquired") }}
        </div>
        <div
          v-if="v$.usedEmail.$error && usedEmail.length > 0"
          class="feedback-error"
        >
          {{ $t("message.invalidEmail") }}
        </div>
        <div
          v-if="
            mangersEmails.includes(this.email) && this.usedEmail !== this.email
          "
          class="feedback-error"
        >
          {{ $t("message.usedEmail") }}
        </div>
      </div>
      <div class="form-group input-width mb-3">
        <label
          for="password "
          class="w-100 d-block text-initial mb-2 text-color"
          >{{ $t("message.password") }}</label
        >
        <input
          :class="{
            'is-invalid': v$.password.$error,
          }"
          v-model="password"
          type="password"
          class="form-control"
          id="password"
          aria-describedby="emailHelp"
          :placeholder="$t('message.password')"
        />
        <div v-if="password == '' && v$.password.$error" class="feedback-error">
          {{ $t("message.password") }} {{ $t("message.rquired") }}
        </div>
        <div
          v-if="password.length < 8 && password != ''"
          class="feedback-error"
        >
          {{ $t("message.shortPassword") }}
        </div>
        <div v-if="password.length > 20" class="feedback-error">
          {{ $t("message.longPassword") }}
        </div>
      </div>
      <div class="form-group input-width mb-3">
        <label
          for="confirm-password"
          class="w-100 d-block text-initial mb-2 text-color"
          >{{ $t("message.confirmPassword") }}</label
        >
        <input
          :class="{
            'is-invalid': v$.confirmPassword.$error,
          }"
          v-model="confirmPassword"
          type="password"
          class="form-control"
          id="confirm-password"
          aria-describedby="emailHelp"
          :placeholder="$t('message.confirmPassword')"
        />
        <div
          v-if="confirmPassword == '' && v$.confirmPassword.$error"
          class="feedback-error"
        >
          {{ $t("message.confirmRequired") }}
        </div>
        <div
          v-if="confirmPassword !== password && confirmPassword.length > 0"
          class="feedback-error"
        >
          {{ $t("message.smaePassordMessage") }}
        </div>
        <div v-if="sameAs == true" class="feedback-error">
          {{ $t("message.smaePassordMessage") }}
        </div>
      </div>
      <div class="form-group input-width mb-3">
        <label
          for="securityQuestion "
          class="w-100 d-block text-initial mb-2 text-color"
          >{{ $t("message.securityQuestion") }}</label
        >
        <select
          :class="{
            'is-invalid': v$.securityQuestion.$error,
          }"
          v-model="securityQuestion"
          id="securityQuestion"
          class="form-select select-language"
        >
          <option>{{ $t("message.bestFriend") }}</option>
          <option>{{ $t("message.bestAnimal") }}</option>
          <option>{{ $t("message.bestSport") }}</option>
          <option>{{ $t("message.securityNumber") }}</option>
        </select>
        <div v-if="v$.securityQuestion.$error" class="feedback-error">
          {{ $t("message.securityQuestion") }} {{ $t("message.rquired") }}
        </div>
      </div>
      <div class="form-group input-width mb-3">
        <label
          for="asnwer"
          class="w-100 d-block text-initial mb-2 text-color"
          >{{ $t("message.answer") }}</label
        >
        <input
          :class="{
            'is-invalid': v$.answer.$error,
          }"
          v-model="answer"
          type="text"
          class="form-control"
          id="asnwer"
          aria-describedby="emailHelp"
          :placeholder="$t('message.answer')"
        />
        <div v-if="v$.answer.$error && answer == ''" class="feedback-error">
          {{ $t("message.answer") }} {{ $t("message.rquired") }}
        </div>
      </div>
      <button @click="editMangerData()" class="btn btn-primary mt-3 signIn-btn">
        {{ $t("message.editNow") }}
      </button>
    </form>
  </div>
</template>
<script>
import useValidate from "@vuelidate/core";
import {
  required,
  minLength,
  maxLength,
  email,
} from "vuelidate/lib/validators";
import axios from "axios";
export default {
  name: "SecuritySettingComponent",
  setup: () => ({ v$: useValidate() }),
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      securityQuestion: "",
      answer: "",
      usedEmail: "",
      MangersList: [],
      sameAs: false,
    };
  },
  validations() {
    return {
      usedEmail: { required, email },
      password: { required, minLength: minLength(8), maxLength: maxLength(20) },
      confirmPassword: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(20),
      },
      securityQuestion: { required },
      answer: { required },
    };
  },
  mounted() {
    this.getUserData();
  },
  computed: {
    mangersEmails() {
      return this.$store.state.allMangersData.map((ele) => {
        return ele.Email;
      });
    },
  },
  methods: {
    getUserData() {
      setTimeout(() => {
        this.email = this.$store.state.mangerData.Email;
        this.usedEmail = this.$store.state.mangerData.Email;
      }, 700);
    },
    editMangerData() {
      this.v$.$validate();
      if (!this.v$.$error) {
        if (this.password == this.confirmPassword) {
          axios
            .put(
              `Mangers/${this.$store.state.mangerId}`,
              this.$store.state.mangerData,
              (this.$store.state.mangerData.Email = this.usedEmail),
              (this.$store.state.mangerData.Password = this.password),
              (this.$store.state.mangerData.securityQuestion =
                this.securityQuestion),
              (this.$store.state.mangerData.Answer = this.answer)
            )

            .then(() => {
              this.$toast.success(this.$store.state.successMessage);
              setTimeout(() => {
                this.$toast.success(this.$store.state.signInMessage, {
                  position: "top-center",
                });
              }, 1500);
            })
            .catch(() => {
              this.$toast.error(this.$store.state.ErrorMessage);
            });
        } else this.sameAs = true;
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
