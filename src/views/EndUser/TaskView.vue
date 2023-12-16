<template>
  <div class="parent">
    <h3 class="text-color text-initial ms-3 me-3">{{ $t("endUser.taskContent") }}</h3>
    <div v-html="task.TaskContent" class="text-color content"></div>
    <div class="text-initial mt-5 parent d-Flex flex-wrap justify-content-evenly">
      <div class="send-comment" v-if="task.Status != 'finished'">
        <div class="form-group mb-3">
          <label for="email " class="d-block input-width w-100 mb-2 text-color">{{
            $t("message.comment")
          }}</label>
          <textarea
            :class="{
              'is-invalid': v$.comment.$error,
            }"
            class="form-control input-width margin-initial"
            id="email"
            aria-describedby="emailHelp"
            v-model.trim="comment"
            :placeholder="$t('message.comment')"
          >
          </textarea>
          <div v-if="v$.comment.$error && comment == ''" class="feedback-error">
            {{ $t("message.comment") }} {{ $t("message.rquired") }}
          </div>
          <div v-if="comment.length < 50 && comment !== ''" class="feedback-error">
            {{ $t("endUser.shortComment") }}
          </div>
          <div v-if="comment.length > 150" class="feedback-error">
            {{ $t("endUser.longComment") }}
          </div>
        </div>
        <button @click="sendComment()" class="btn btn-warning mt-3 input-width">
          {{ $t("endUser.sendComment") }}
          <FontAwesome :icon="['fas', 'reply']" class="ms-2 me-2" />
        </button>
      </div>
      <div class="send-task mt-4" v-if="task.Status != 'finished'">
        <button
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrob1"
          class="btn btn-primary signIn-btn input-width"
        >
          {{ $t("endUser.finishTask") }}

          <FontAwesome :icon="['fas', 'list-check']" />
        </button>
      </div>
    </div>
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
              class="btn-close m-0"
              data-bs-dismiss="modal"
              aria-label="Close"
              ref="close"
            ></button>
            <h5 class="modal-title" id="staticBackdrob1Label">
              {{ $t("message.block") }}
            </h5>
          </div>
          <div class="modal-body p-3">
            <h4 class="text-color">
              {{ $t("endUser.finishTaskMessage") }}
            </h4>
            <div class="modal-footer flex-row-reverse">
              <button
                type="button"
                class="btn btn-secondary close"
                data-bs-dismiss="modal"
              >
                {{ $t("message.cancel") }}
              </button>
              <button
                @click="finishTask()"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrob1"
                class="btn btn-primary signIn-btn width-fit-content"
              >
                {{ $t("endUser.finishTask") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
let date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
import useValidate from "@vuelidate/core";
import { minLength, maxLength, required } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  name: "TaskView",
  setup: () => ({ v$: useValidate() }),
  data() {
    return {
      day,
      month,
      taskId: this.$route.params.taskId,
      task: "",
      comment: "",
    };
  },
  mounted() {
    this.getTask();
  },
  validations() {
    return {
      comment: { required, minLength: minLength(50), maxLength: maxLength(150) },
    };
  },
  methods: {
    getTask() {
      axios.get(`Tasks/${this.taskId}`).then((response) => {
        this.task = response.data;
      });
    },
    finishTask() {
      if (this.task.DeliveryValidaty == false) {
        this.$toast.error(this.$store.state.notDeliveredMessage);
      } else {
        axios
          .put(`Tasks/${this.taskId}`, this.task, (this.task.Status = "finished"))
          .then(() => {
            this.$toast.success(this.$store.state.successMessage);
          })
          .catch(() => {
            this.$toast.error(this.$store.state.ErrorMessage);
          });
      }
    },
    sendComment() {
      if (this.task.DeliveryValidaty == false) {
        this.$toast.error(this.$store.state.notDeliveredMessage);
      } else {
        this.v$.$validate();
        if (!this.v$.$error) {
          axios
            .post(`Comments`, {
              TaskId: this.task.id,
              UserId: this.$store.state.employeeId,
              Reply: "",
              Comment: this.comment,
            })
            .then(() => {
              this.$toast.success(this.$store.state.successMessage);
              this.comment = "";
            })
            .catch(() => {
              this.$toast.error(this.$store.state.ErrorMessage);
            });
        }
      }
    },
  },
};
</script>
<style scoped>
.content {
  padding: 40px;
  margin-top: 50px;
  background-color: var(--header-color);
  min-height: 70vh;
  font-family: "Cairo", sans-serif;
}
.input-width {
  width: 350px;
}
.margin-initial {
  margin: initial;
}
textarea {
  max-height: 250px;
}
.width-fit-content {
  width: fit-content;
}
</style>
