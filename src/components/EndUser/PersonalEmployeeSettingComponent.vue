<template>
  <div class="col-lg-12 flex-col">
    <form @submit.prevent class="form-grid p-3">
      <div class="form-group input-width mb-3">
        <label for="name " class="w-100 d-block text-initial mb-2 text-color">{{
          $t("message.name")
        }}</label>
        <input
          :class="{
            'is-invalid': v$.usedName.$error,
          }"
          type="text"
          v-model.trim="usedName"
          autocomplete="on"
          class="form-control"
          id="name"
          aria-describedby="emailHelp"
          :placeholder="$t('message.name')"
        />
        <div v-if="usedName == '' && v$.usedName.$error" class="feedback-error">
          {{ $t("message.name") }} {{ $t("message.rquired") }}
        </div>
        <div v-if="usedName.length < 2 && usedName !== ''" class="feedback-error">
          {{ $t("message.shortName") }}
        </div>
        <div v-if="usedName.length > 15" class="feedback-error">
          {{ $t("message.longName") }}
        </div>
        <div v-if="employeesNames.includes(this.usedName)" class="feedback-error">
          {{ $t("message.usedName") }}
        </div>
      </div>
      <div class="form-group input-width mb-3">
        <label
          for="phone"
          class="w-100 d-block text-initial mb-2 text-color d-flex align-items-center"
          >{{ $t("message.phoneNumber") }}
          <h6 class="text-color ms-3 me-3 mb-0">({{ usedPhone }})</h6></label
        >
        <input
          :class="{
            'is-invalid': v$.phone.$error,
          }"
          type="number"
          v-model="phone"
          autocomplete="on"
          class="form-control"
          id="phone"
          aria-describedby="emailHelp"
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
      <div class="form-group input-width mb-3">
        <label for="address" class="w-100 d-block text-initial mb-2 text-color">{{
          $t("message.address")
        }}</label>
        <input
          type="text"
          :class="{
            'is-invalid': v$.address.$error,
          }"
          v-model="address"
          autocomplete="on"
          class="form-control"
          id="address"
          aria-describedby="emailHelp"
          :placeholder="$t('message.address')"
        />
        <div v-if="address == '' && v$.address.$error" class="feedback-error">
          {{ $t("message.address") }} {{ $t("message.rquired") }}
        </div>
        <div v-if="address.length < 20 && address !== ''" class="feedback-error">
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
      <div class="form-group input-width mb-3">
        <label for="photoLink" class="w-100 d-block text-initial mb-2 text-color">{{
          $t("message.photo")
        }}</label>
        <input
          :class="{
            'is-invalid': v$.photo.$error,
          }"
          v-model="photo"
          type="url"
          class="form-control"
          id="photoLink"
          aria-describedby="emailHelp"
          :placeholder="$t('message.photoLink')"
        />
        <div v-if="photo == '' && v$.photo.$error" class="feedback-error">
          {{ $t("message.photo") }} {{ $t("message.rquired") }}
        </div>
        <div v-if="v$.photo.$error && photo.length > 0" class="feedback-error">
          {{ $t("message.invalidUrl") }}
        </div>
      </div>
      <button @click="editEmployeeData()" class="btn btn-primary mt-3 signIn-btn">
        {{ $t("message.editNow") }}
      </button>
    </form>
  </div>
</template>
<script>
import useValidate from "@vuelidate/core";
import { url, minLength, maxLength, required } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  setup: () => ({ v$: useValidate() }),
  name: "AboutEmployeeComponent",
  data() {
    return {
      name: "",
      address: "",
      phone: "",
      photo: "",
      type: "",
      usedName: "",
      usedPhone: "",
      userId: "",
      userData: "",
      MangersList: [],
    };
  },
  validations() {
    return {
      usedName: { required, minLength: minLength(3), maxLength: maxLength(15) },
      photo: { required, url },
      phone: { required, minLength: minLength(10), maxLength: maxLength(20) },
      address: {
        required,
        minLength: minLength(20),
        maxLength: maxLength(100),
      },
      type: { required },
    };
  },
  computed: {
    employeesNames() {
      return this.$store.state.allEmployeesData
        .filter((ele) => {
          return ele.Name !== this.name;
        })
        .map((ele) => {
          return ele.Name;
        });
    },
  },
  mounted() {
    this.getUserData();
  },
  methods: {
    getUserData() {
      setTimeout(() => {
        this.usedName = this.$store.state.employeeData.Name;
        this.name = this.$store.state.employeeData.Name;
        this.photo = this.$store.state.employeeData.Photo;
        this.usedPhone = this.$store.state.employeeData.Phone;
        this.address = this.$store.state.employeeData.Address;
        this.type = this.$store.state.employeeData.Type;
      }, 700);
    },
    editEmployeeData() {
      this.v$.$validate();
      if (!this.v$.$error) {
        if (!this.employeesNames.includes(this.usedName)) {
          axios
            .put(
              `Employees/${this.$store.state.employeeId}`,
              this.$store.state.employeeData,
              (this.$store.state.employeeData.Name = this.usedName),
              (this.$store.state.employeeData.Address = this.address),
              (this.$store.state.employeeData.Phone = this.phone),
              (this.$store.state.employeeData.Photo = this.photo),
              (this.$store.state.employeeData.Type = this.type)
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
