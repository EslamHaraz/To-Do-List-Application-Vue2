<template>
  <div class="parent p-2">
    <h3 class="text-color text-initial mb-4">
      {{ $t("message.addEmployee") }}
    </h3>
    <form @submit.prevent class="form-grid">
      <div class="form-group input-width mb-3">
        <label for="name " class="w-100 d-block text-initial mb-2 text-color">{{
          $t("message.name")
        }}</label>
        <input
          :class="{
            'is-invalid': v$.name.$error,
          }"
          type="text"
          class="form-control"
          id="name"
          aria-describedby="emailHelp"
          v-model.trim="name"
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
        <div v-if="employeesNames.includes(this.name)" class="feedback-error">
          {{ $t("message.usedName") }}
        </div>
      </div>
      <div class="form-group input-width mb-3">
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
          aria-describedby="emailHelp"
          v-model.trim="email"
          :placeholder="$t('message.email')"
        />
        <div v-if="email == '' && v$.email.$error" class="feedback-error">
          {{ $t("message.email") }} {{ $t("message.rquired") }}
        </div>
        <div v-if="v$.email.$error && email.length > 0" class="feedback-error">
          {{ $t("message.invalidEmail") }}
        </div>
        <div v-if="employeesEmails.includes(this.email)" class="feedback-error">
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
          type="password"
          class="form-control"
          id="password"
          aria-describedby="emailHelp"
          :placeholder="$t('message.password')"
          v-model="password"
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
          type="password"
          class="form-control"
          id="confirm-password"
          aria-describedby="emailHelp"
          :placeholder="$t('message.confirmPassword')"
          v-model="confirmPassword"
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
        <label for="phone" class="w-100 d-block text-initial mb-2 text-color">{{
          $t("message.phoneNumber")
        }}</label>
        <input
          type="number"
          :class="{
            'is-invalid': v$.phone.$error,
          }"
          class="form-control"
          id="phone"
          aria-describedby="emailHelp"
          :placeholder="$t('message.phoneNumber')"
          v-model="phone"
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
      <div class="form-group input-width mb-3">
        <label
          for="address"
          class="w-100 d-block text-initial mb-2 text-color"
          >{{ $t("message.address") }}</label
        >
        <input
          :class="{
            'is-invalid': v$.address.$error,
          }"
          type="text"
          class="form-control"
          id="address"
          aria-describedby="emailHelp"
          v-model="address"
          :placeholder="$t('message.address')"
        />
        <div v-if="address == '' && v$.address.$error" class="feedback-error">
          {{ $t("message.address") }} {{ $t("message.rquired") }}
        </div>
        <div
          v-if="address.length < 20 && address !== ''"
          class="feedback-error"
        >
          {{ $t("message.shortAddress") }}
        </div>
        <div v-if="address.length > 100" class="feedback-error">
          {{ $t("message.longAddress") }}
        </div>
      </div>
      <div class="form-group input-width mb-3">
        <label for="Type " class="w-100 d-block text-initial mb-2 text-color">{{
          $t("message.type")
        }}</label>
        <select
          id="Type"
          v-model="type"
          class="form-select select-language"
          :class="{
            'is-invalid': v$.type.$error,
          }"
        >
          <option value="male">{{ $t("message.male") }}</option>
          <option value="Female">{{ $t("message.feMale") }}</option>
        </select>
        <div v-if="v$.type.$error" class="feedback-error">
          {{ $t("message.type") }} {{ $t("message.rquired") }}
        </div>
      </div>
      <div class="form-group input-width mb-3">
        <label
          for="Languge "
          class="w-100 d-block text-initial mb-2 text-color"
          >{{ $t("message.language") }}</label
        >
        <select
          :class="{
            'is-invalid': v$.language.$error,
          }"
          id="Languge"
          v-model="language"
          class="form-select select-language"
        >
          <option value="ar">{{ $t("message.arabic") }}</option>
          <option value="en">{{ $t("message.english") }}</option>
        </select>
        <div v-if="v$.language.$error" class="feedback-error">
          {{ $t("message.language") }} {{ $t("message.rquired") }}
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
          type="text"
          class="form-control"
          id="asnwer"
          aria-describedby="emailHelp"
          v-model="answer"
          :placeholder="$t('message.answer')"
        />
        <div v-if="v$.answer.$error && answer == ''" class="feedback-error">
          {{ $t("message.answer") }} {{ $t("message.rquired") }}
        </div>
      </div>
      <div class="form-group input-width mb-3">
        <label
          for="photoLink"
          class="w-100 d-block text-initial mb-2 text-color"
          >{{ $t("message.photo") }}</label
        >
        <input
          :class="{
            'is-invalid': v$.photo.$error,
          }"
          type="text"
          class="form-control"
          id="photoLink"
          aria-describedby="emailHelp"
          v-model="photo"
          :placeholder="$t('message.photoLink')"
        />
        <div v-if="photo == '' && v$.photo.$error" class="feedback-error">
          {{ $t("message.photo") }} {{ $t("message.rquired") }}
        </div>
        <div v-if="v$.photo.$error && photo.length > 0" class="feedback-error">
          {{ $t("message.invalidUrl") }}
        </div>
      </div>
      <div class="input-width mb-md-3">
        <label
          for="asnwer"
          class="w-100 d-block text-initial mb-2 text-color"
          >{{ $t("message.mode") }}</label
        >
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
              value="light"
              v-model="mode"
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              checked
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
      <button @click="addNewEmployee()" class="btn btn-primary mt-3 signIn-btn">
        {{ $t("message.addManger") }}
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
  url,
  email,
} from "vuelidate/lib/validators";
import axios from "axios";
export default {
  setup: () => ({ v$: useValidate() }),
  name: "AddEmployeeComponent",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      photo: "",
      type: "",
      address: "",
      language: "",
      mode: "",
      securityQuestion: "",
      answer: "",
      strLanguage: "",
      emloyeesList: [],
      sameAs: false,
    };
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
      address: {
        required,
        minLength: minLength(20),
        maxLength: maxLength(100),
      },
      type: { required },
      language: { required },
      securityQuestion: { required },
      answer: { required },
      mode: { required },
    };
  },
  computed: {
    employeesEmails() {
      return this.emloyeesList.map((ele) => {
        return ele.Email;
      });
    },
    employeesNames() {
      return this.emloyeesList.map((ele) => {
        return ele.Name;
      });
    },
  },
  mounted() {
    this.getAllEmployees();
  },
  methods: {
    getAllEmployees() {
      axios
        .get(`Employees`)
        .then((response) => {
          this.emloyeesList = response.data;
        })
        .catch(() => {
          this.$toast.error("Error In Get Employees");
        });
    },
    addNewEmployee() {
      this.v$.$validate();
      if (this.password == this.confirmPassword) {
        if (
          !this.v$.$error &&
          !this.employeesEmails.includes(this.emeil) &&
          !this.employeesNames.includes(this.name)
        ) {
          axios
            .post(`Employees`, {
              Name: this.name,
              Email: this.email,
              Password: this.password,
              Phone: this.phone,
              Photo: this.photo,
              Address: this.address,
              Type: this.type,
              Language: this.language,
              securityQuestion: this.securityQuestion,
              Answer: this.answer,
              Mode: this.mode,
              Status: "Good",
            })
            .then(() => {
              this.$toast.success(this.$store.state.successMessage);
              setTimeout(() => {
                this.$router.push({ name: "EmployeesView" });
              }, 1500);
            })
            .catch(() => {
              this.$toast.error(this.$store.state.ErrorMessage);
            });
        }
      } else this.sameAs = true;
    },
  },
};
</script>
<style>
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(390px, 1fr));
  gap: 10px;
}
.input-width {
  width: 80%;
}
</style>
