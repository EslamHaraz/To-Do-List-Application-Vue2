<template>
  <div class="parent mt-5">
    <Transition name="fade">
      <div v-if="checkedEmail">
        <h5 class="text-color text-initial mb-4">{{ $t("message.writeYourEmail") }}</h5>
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
        <button @click="checkEmail()" class="btn btn-primary mt-4 signIn-btn">
          {{ $t("message.check") }}
        </button>
      </div>
    </Transition>
    <Transition name="fade">
      <div v-if="question">
        <div class="form-group input-width">
          <label
            for="securityQuestion "
            class="w-100 d-block text-initial mb-2 text-color"
            >{{ $t("message.securityQuestion") }}</label
          >
          <input
            type="text"
            class="form-control"
            id="securityQuestion"
            disabled
            aria-describedby="emailHelp"
            :placeholder="data[0].securityQuestion"
          />
        </div>
        <div class="form-group input-width mt-4">
          <label for="answer " class="w-100 d-block text-initial mb-2 text-color">{{
            $t("message.answer")
          }}</label>
          <input
            type="text"
            class="form-control"
            id="answer"
            v-model="answer"
            aria-describedby="emailHelp"
            :placeholder="$t('message.answer')"
          />
          <div v-if="answerValid" class="feedback-error">
            {{ $t("message.answer") }} {{ $t("message.rquired") }}
          </div>
        </div>
        <button @click="checkAnswer()" class="btn btn-primary mt-4 signIn-btn">
          {{ $t("message.check") }}
        </button>
      </div>
    </Transition>
    <Transition name="fade">
      <div v-if="reset">
        <div class="form-group input-width mb-3">
          <label for="password " class="w-100 d-block text-initial mb-2 text-color">{{
            $t("message.password")
          }}</label>
          <input
            type="password"
            :class="{
              'is-invalid': passwordValid,
            }"
            class="form-control"
            id="password"
            aria-describedby="emailHelp"
            :placeholder="$t('message.password')"
            v-model="password"
          />
          <!-- <div v-if="password == '' && v$.password.$error" class="feedback-error">
          {{ $t("message.password") }} {{ $t("message.rquired") }}
        </div> -->
          <div v-if="password.length < 8 && password != ''" class="feedback-error">
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
            type="password"
            :class="{
              'is-invalid': passwordValid,
            }"
            class="form-control"
            id="confirm-password"
            aria-describedby="emailHelp"
            :placeholder="$t('message.confirmPassword')"
            v-model="confirmPassword"
          />
          <!-- <div
          v-if="confirmPassword == '' && v$.confirmPassword.$error"
          class="feedback-error"
        >
          {{ $t("message.confirmRequired") }}
        </div> -->
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
        <button @click="resetPassword()" class="btn btn-primary mt-4 signIn-btn">
          {{ $t("message.resetPassword") }}
        </button>
      </div>
    </Transition>
  </div>
</template>
<script>
import useValidate from "@vuelidate/core";
import { required, email } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  setup: () => ({ v$: useValidate() }),
  name: "ForgetPassowordView",
  data() {
    return {
      manger: false,
      employee: false,
      checkedEmail: true,
      question: false,
      reset: false,
      answerValid: false,
      sameAs: false,
      passwordValid: false,
      email: "",
      data: "",
      answer: "",
      password: "",
      confirmPassword: "",
    };
  },
  computed: {
    filterAllMangersEmails() {
      return this.$store.state.allMangersData.map((manger) => {
        return manger.Email;
      });
    },
    filterAllEmployeesEmails() {
      return this.$store.state.allEmployeesData.map((employee) => {
        return employee.Email;
      });
    },
  },
  validations() {
    return {
      email: { required, email },
    };
  },
  methods: {
    checkEmail() {
      this.v$.$validate();
      if (!this.v$.$error) {
        if (
          !this.filterAllEmployeesEmails.includes(this.email) &&
          !this.filterAllMangersEmails.includes(this.email)
        ) {
          this.$toast.error("No Data Found");
        }
        if (this.filterAllEmployeesEmails.includes(this.email)) {
          axios.get(`Employees?Email=${this.email}`).then((response) => {
            this.data = response.data;
            if (response.data.length > 0) {
              console.log(response.data);
              this.employee = true;
              this.manger = false;
              this.checkedEmail = false;
              setTimeout(() => {
                this.question = true;
              }, 500);
            }
          });
        }
        if (this.filterAllMangersEmails.includes(this.email)) {
          axios.get(`Mangers?Email=${this.email}`).then((response) => {
            this.data = response.data;
            if (response.data.length > 0) {
              console.log(response.data);
              this.manger = true;
              this.employee = false;
              this.checkedEmail = false;
              setTimeout(() => {
                this.question = true;
              }, 500);
            }
          });
        }
      }
    },
    checkAnswer() {
      if (this.answer !== "") {
        axios
          .get(`Mangers?Email=${this.email}&&Answer=${this.answer}`)
          .then((response) => {
            if (response.data.length > 0) {
              this.question = false;
              this.employee = false;
              setTimeout(() => {
                this.reset = true;
              }, 500);
              this.$toast.success(`The Answer Is Correct`);
            } else {
              axios
                .get(`Employees?Email=${this.email}&&Answer=${this.answer}`)
                .then((response) => {
                  if (response.data.length > 0) {
                    this.question = false;
                    this.employee = true;
                    setTimeout(() => {
                      this.reset = true;
                    }, 500);
                    this.$toast.success(`The Answer Is Correct`);
                  } else this.$toast.error(`The Answer Is Not Correct`);
                });
            }
          });
      } else {
        this.answerValid = true;
      }
    },
    resetPassword() {
      if (
        this.password.length <= 20 &&
        this.password == this.confirmPassword &&
        this.password !== ""
      ) {
        this.passwordValid = false;
        if (this.employee == false) {
          console.log(`employee is ${this.employee}`);
          axios
            .put(
              `Mangers/${this.data[0].id}`,
              this.data[0],
              (this.data[0].Password = this.password)
            )
            .then(() => {
              this.$toast.success(this.$store.state.successMessage);

              setTimeout(() => {
                this.$router.push({ name: "SignInAdminView" });
              }, 1400);
            })
            .catch(() => {
              this.$toast.error(this.$store.state.ErrorMessage);
            });
        } else {
          axios
            .put(
              `Employees/${this.data[0].id}`,
              this.data[0],
              (this.data[0].Password = this.password)
            )

            .then(() => {
              this.$toast.success(this.$store.state.successMessage);

              setTimeout(() => {
                this.$router.push({ name: "SignInUserView" });
              }, 1400);
            })
            .catch(() => {
              this.$toast.error(this.$store.state.ErrorMessage);
            });
        }
      } else this.passwordValid = true;
    },
  },
};
</script>
