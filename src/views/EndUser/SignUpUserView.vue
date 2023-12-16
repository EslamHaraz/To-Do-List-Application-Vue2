<template>
  <div class="parent">
    <form @submit.prevent class="mt-3">
      <div class="form-group input-width">
        <label for="Name" class="w-100 d-block text-initial mb-2 text-color">{{
          $t("message.name")
        }}</label>
        <input
          type="text"
          class="form-control"
          :class="{
            'is-invalid': v$.name.$error,
          }"
          id="Name"
          aria-describedby="emailHelp"
          v-model="name"
          :placeholder="$t('message.name')"
        />
        <div v-if="name == '' && v$.name.$error" class="feedback-error">
          {{ $t("message.name") }} {{ $t("message.rquired") }}
        </div>
        <div v-if="name.length < 2 && name !== ''" class="feedback-error">
          {{ $t("message.shortName") }}
        </div>
        <div v-if="name.length > 15" class="feedback-error">
          {{ $t("message.longName") }}
        </div>
        <div v-if="filterUsersNames.includes(this.name)" class="feedback-error">
          {{ $t("message.usedName") }}
        </div>
      </div>
      <div class="form-group mt-4 input-width">
        <label
          for="email "
          class="w-100 d-block text-initial mb-2 text-color"
          >{{ $t("message.email") }}</label
        >
        <input
          :class="{
            'is-invalid': v$.email.$error,
          }"
          type="email"
          class="form-control"
          id="email"
          v-model="email"
          :placeholder="$t('message.email')"
        />
        <div v-if="email == '' && v$.email.$error" class="feedback-error">
          {{ $t("message.email") }} {{ $t("message.rquired") }}
        </div>
        <div v-if="v$.email.$error && email.length > 0" class="feedback-error">
          {{ $t("message.invalidEmail") }}
        </div>
        <div
          v-if="filterUsersEmails.includes(this.email)"
          class="feedback-error"
        >
          {{ $t("message.usedEmail") }}
        </div>
      </div>
      <div class="form-group mt-4 input-width">
        <label
          for="photo "
          class="w-100 d-block text-initial mb-2 text-color"
          >{{ $t("message.photoLink") }}</label
        >
        <input
          :class="{
            'is-invalid': v$.photo.$error,
          }"
          type="url"
          class="form-control"
          id="photo"
          v-model="photo"
          :placeholder="$t('message.photo')"
        />
        <div v-if="photo == '' && v$.photo.$error" class="feedback-error">
          {{ $t("message.photo") }} {{ $t("message.rquired") }}
        </div>
        <div v-if="v$.photo.$error && photo.length > 0" class="feedback-error">
          {{ $t("message.invalidUrl") }}
        </div>
      </div>
      <div class="form-group mt-4 input-width">
        <label
          for="password "
          class="w-100 d-block text-initial mb-2 text-color"
          >{{ $t("message.password") }}</label
        >
        <input
          :class="{
            'is-invalid': v$.password.$error,
          }"
          type="password"
          class="form-control"
          id="password"
          v-model="password"
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
      <div class="form-group mt-4 input-width">
        <label
          for="confirm-password "
          class="w-100 d-block text-initial mb-2 text-color"
          >{{ $t("message.confirmPassword") }}</label
        >
        <input
          :class="{
            'is-invalid': v$.confirmPassword.$error,
          }"
          type="password"
          class="form-control"
          id="confirm-password"
          v-model="confirmPassword"
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
      </div>
      <div class="form-group mt-4 input-width">
        <label
          for="Number "
          class="w-100 d-block text-initial mb-2 text-color"
          >{{ $t("message.phoneNumber") }}</label
        >
        <input
          :class="{
            'is-invalid': v$.phone.$error,
          }"
          type="number"
          class="form-control"
          id="Number"
          v-model="phone"
          :placeholder="$t('message.phoneNumber')"
        />
        <div v-if="phone == '' && v$.phone.$error" class="feedback-error">
          {{ $t("message.phoneNumber") }} {{ $t("message.rquired") }}
        </div>
        <div v-if="phone.length < 10 && phone !== ''" class="feedback-error">
          {{ $t("message.shortPhone") }}
        </div>
        <div v-if="phone.length > 20" class="feedback-error">
          {{ $t("message.longPhone") }}
        </div>
      </div>
      <div class="form-group mt-4 input-width">
        <label for="Type " class="w-100 d-block text-initial mb-2 text-color">{{
          $t("message.type")
        }}</label>
        <select
          :class="{
            'is-invalid': v$.type.$error,
          }"
          v-model="type"
          id="Type"
          class="form-select select-language"
        >
          <option value="male">{{ $t("message.male") }}</option>
          <option value="Female">{{ $t("message.feMale") }}</option>
        </select>
        <div v-if="v$.type.$error" class="feedback-error">
          {{ $t("message.type") }} {{ $t("message.rquired") }}
        </div>
      </div>
      <div class="form-group mt-4 input-width">
        <label
          for="Languge "
          class="w-100 d-block text-initial mb-2 text-color"
          >{{ $t("message.language") }}</label
        >
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
      <div class="form-group mt-4 input-width">
        <label for="Mode " class="w-100 d-block text-initial mb-2 text-color">{{
          $t("message.mode")
        }}</label>
        <select
          :class="{
            'is-invalid': v$.mode.$error,
          }"
          v-model="mode"
          id="Mode"
          class="form-select select-language"
        >
          <option value="dark">{{ $t("message.dark") }}</option>
          <option value="light">{{ $t("message.light") }}</option>
        </select>
        <div v-if="v$.mode.$error" class="feedback-error">
          {{ $t("message.mode") }} {{ $t("message.rquired") }}
        </div>
      </div>
      <div class="form-group input-width mb-3">
        <label
          for="securityQuestion "
          class="w-100 d-block text-initial mb-2 text-color"
          >{{ $t("message.securityQuestion") }}</label
        >
        <select
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
          type="text"
          class="form-control"
          id="asnwer"
          v-model="answer"
          aria-describedby="emailHelp"
          :placeholder="$t('message.answer')"
        />
        <div v-if="v$.answer.$error && answer == ''" class="feedback-error">
          {{ $t("message.answer") }} {{ $t("message.rquired") }}
        </div>
      </div>
      <button @click="createUser()" class="btn btn-primary mt-3 signIn-btn">
        {{ $t("message.signIn") }}
      </button>
      <router-link
        :to="{ name: 'SignInUserView' }"
        class="btn btn-link mt-3 w-100 fs-5 text-end"
      >
        {{ $t("message.backToSignUp") }}
      </router-link>
    </form>
  </div>
</template>
<script>
let root = document.querySelector(":root");
import useValidate from "@vuelidate/core";
import {
  required,
  minLength,
  maxLength,
  url,
  email,
} from "vuelidate/lib/validators";
import axios from "axios";
export default {
  name: "SignUpUserView",
  setup: () => ({ v$: useValidate() }),
  data() {
    return {
      root,
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      photo: "",
      type: "",
      language: "",
      mode: "",
      strMode: "",
      securityQuestion: "",
      answer: "",
      strLanguage: "",
      usersList: [],
    };
  },
  computed: {
    filterUsersNames() {
      return this.usersList.map((ele) => {
        return ele.Name;
      });
    },
    filterUsersEmails() {
      return this.usersList.map((ele) => {
        return ele.Email;
      });
    },
  },
  validations() {
    return {
      name: { required, minLength: minLength(3), maxLength: maxLength(15) },
      email: { required, email },
      photo: { required, url },
      password: { required, minLength: minLength(8), maxLength: maxLength(20) },
      confirmPassword: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(20),
      },
      phone: { required, minLength: minLength(10), maxLength: maxLength(20) },
      type: { required },
      language: { required },
      securityQuestion: { required },
      answer: { required },
      mode: { required },
    };
  },
  mounted() {
    this.getAllUsers();
  },
  methods: {
    getAllUsers() {
      axios
        .get("/Users")
        .then((response) => {
          this.usersList = response.data;
        })
        .catch((error) => {
          this.$toast.error("Error In Get Users");
        });
    },
    createUser() {
      this.v$.$validate();
      if (
        !this.v$.$error &&
        this.password == this.confirmPassword &&
        !this.filterUsersEmails.includes(this.email) &&
        !this.filterUsersNames.includes(this.name)
      ) {
        axios
          .post(`Users`, {
            Name: this.name,
            Email: this.email,
            Photo: this.photo,
            Password: this.password,
            Phone: this.phone,
            Type: this.type,
            Language: this.language,
            SecurityQuestion: this.securityQuestion,
            Answer: this.answer,
            Mode: this.mode,
            Status: "Good",
          })
          .then((response) => {
            this.$toast.success(this.$store.state.successMessage);
            this.strMode = JSON.stringify(response.data[0].Mode).replaceAll(
              '"',
              ""
            );
            this.strLanguage = JSON.stringify(
              response.data[0].Language
            ).replaceAll('"', "");
            window.localStorage.setItem(
              "user-detail",
              JSON.stringify(response.data[0])
            );
            window.localStorage.setItem("mode", this.strMode);
            window.localStorage.setItem("language", this.strLanguage);

            setTimeout(() => {
              this.$router.push({ name: "home" });
              root.setAttribute("data-theme-mode", this.strMode);
            }, 2400);
          })
          .catch((error) => {
            this.$toast.error(this.$store.state.ErrorMessage);
          });
      }
    },
  },
};
</script>
