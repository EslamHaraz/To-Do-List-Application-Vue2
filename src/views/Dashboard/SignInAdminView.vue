<template>
  <div class="parent">
    <form @submit.prevent class="mt-3">
      <div class="form-group input-width">
        <label for="email " class="w-100 d-block text-initial mb-2 text-color">{{
          $t("message.email")
        }}</label>
        <input
          :class="{
            'is-invalid': v$.email.$error,
          }"
          type="email"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          :placeholder="$t('message.email')"
          v-model="email"
        />
        <div v-if="email == '' && this.v$.email.$error" class="feedback-error">
          {{ $t("message.email") }} {{ $t("message.rquired") }}
        </div>
      </div>
      <div class="form-group mt-4 input-width">
        <label
          for="exampleInputpassword1 "
          class="w-100 d-block text-initial mb-2 text-color"
          >{{ $t("message.password") }}</label
        >
        <input
          :class="{
            'is-invalid': v$.password.$error,
          }"
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          :placeholder="$t('message.password')"
          v-model="password"
        />
        <div v-if="password == '' && v$.password.$error" class="feedback-error">
          {{ $t("message.password") }} {{ $t("message.rquired") }}
        </div>
      </div>

      <button @click="loginManger()" class="btn btn-primary mt-3 signIn-btn">
        {{ $t("message.signIn") }}
      </button>

      <div class="action-button d-flex justify-content-between">
        <router-link
          :to="{ name: 'ForgetPassowordView' }"
          class="btn btn-link mt-3 w-100 fs-5 text-danger"
        >
          {{ $t("message.forgetPassword") }}
        </router-link>
      </div>
    </form>
  </div>
</template>
<script>
let root = document.querySelector(":root");
let manger = localStorage.getItem("manger-detail");
import useValidate from "@vuelidate/core";
import { required, email } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  name: "SignInAdminView",
  setup: () => ({ v$: useValidate() }),
  data() {
    return {
      manger,
      root,
      email: "",
      password: "",
      mode: "",
      language: "",
    };
  },
  validations() {
    return {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    };
  },
  mounted() {
    this.chackeIfManger();
  },
  methods: {
    chackeIfManger() {
      if (manger) {
        this.$router.push({ name: "DashboardLayout" });
      }
    },
    loginManger() {
      this.v$.$validate();
      if (!this.v$.$error) {
        axios
          .get(`Mangers?Email=${this.email}&&Password=${this.password}`)
          .then((response) => {
            if (response.data.length > 0) {
              this.$toast.success(this.$store.state.successMessage);
              this.mode = JSON.stringify(response.data[0].Mode).replaceAll('"', "");
              this.language = JSON.stringify(response.data[0].Language).replaceAll(
                '"',
                ""
              );
              window.localStorage.setItem(
                "manger-detail",
                JSON.stringify(response.data[0])
              );
              window.localStorage.setItem("mode", this.mode);
              window.localStorage.setItem("language", this.language);
              root.setAttribute("data-theme-mode", this.mode);
              setTimeout(() => {
                location.reload();
              }, 2400);
            } else {
              this.$toast.error(this.$store.state.ErrorMessage);
            }
          });
      }
    },
  },
};
</script>
