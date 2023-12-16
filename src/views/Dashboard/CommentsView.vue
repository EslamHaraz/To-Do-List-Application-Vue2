<template>
  <div class="parent">
    <table class="table table-striped">
      <tr class="header">
        <th scope="col">#</th>
        <th scope="col">{{ $t("message.comment") }}</th>
        <th scope="col">{{ $t("message.user") }}</th>
        <th scope="col">{{ $t("message.action") }}</th>
      </tr>
      <tbody class="content">
        <tr v-for="(comment, index) in commentsList" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ comment.Comment }}</td>
          <td
            v-for="(employee, index) in employeesList"
            :key="index"
            v-if="comment.UserId == employee.id"
          >
            {{ employee.Email }}
          </td>
          <td>
            <button
              @click="(reply = false), getCommentData(comment, index)"
              class="btn btn-danger ms-2 me-2"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrob1"
            >
              {{ $t("message.delete") }}
              <FontAwesome :icon="['fas', 'trash']" style="margin: 0" />
            </button>
            <button
              v-if="comment.Reply == ''"
              @click="(reply = true), getCommentData(comment, index)"
              class="btn btn-primary ms-2 me-2"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrob1"
            >
              {{ $t("message.reply") }}
              <FontAwesome :icon="['fas', 'reply']" style="margin: 0" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <jw-pagination
      :items="commentsList"
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
              ref="close"
              type="button"
              id="closed"
              class="btn-close m-0"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <h5 class="modal-title" id="staticBackdrob1Label" v-if="reply == true">
              {{ $t("message.reply") }}
            </h5>
            <h5 class="modal-title" id="staticBackdrob1Label" v-else>
              {{ $t("message.delete") }}
            </h5>
          </div>
          <div class="modal-body">
            <div class="form-group" v-if="reply == true">
              <label
                for="exampleFormControlTextarea1"
                class="text-color w-100 text-initial mb-3"
                >{{ $t("message.replyToEmployee") }}</label
              >
              <textarea
                :class="{
                  'is-invalid': v$.replyComment.$error,
                }"
                v-model="replyComment"
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
              <div
                v-if="v$.replyComment.$error && replyComment == ''"
                class="feedback-error"
              >
                {{ $t("message.comment") }} {{ $t("message.rquired") }}
              </div>
              <div
                v-if="replyComment.length < 50 && replyComment !== ''"
                class="feedback-error"
              >
                {{ $t("endUser.shortComment") }}
              </div>
              <div v-if="replyComment.length > 300" class="feedback-error">
                {{ $t("endUser.longComment") }}
              </div>
            </div>

            <h4 class="text-danger" v-else>
              {{ $t("message.deleteComment") }}
            </h4>
          </div>
          <div class="modal-footer flex-row-reverse">
            <button type="button" class="btn btn-secondary close" data-bs-dismiss="modal">
              {{ $t("message.cancel") }}
            </button>
            <button
              type="button"
              @click="replyToEmployee()"
              class="btn btn-primary"
              v-if="reply == true"
            >
              {{ $t("message.reply") }}
              <FontAwesome :icon="['fas', 'reply']" style="margin: 0" />
            </button>
            <button type="button" class="btn btn-danger" v-else>
              {{ $t("message.delete") }}
              <FontAwesome :icon="['fas', 'trash']" style="margin: 0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import JwPagination from "jw-vue-pagination";
import axios from "axios";
import useValidate from "@vuelidate/core";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
export default {
  name: "",
  setup: () => ({ v$: useValidate() }),
  data() {
    return {
      reply: false,
      employeesList: [],
      commentsList: [],
      pageOfItems: [],
      commentId: "",
      commentIndex: "",
      replyComment: "",
      commentData: "",
    };
  },
  components: { JwPagination },
  mounted() {
    this.getAllEmployees();
    this.getAllComments();
  },
  validations() {
    return {
      replyComment: { required, minLength: minLength(50), maxLength: maxLength(300) },
    };
  },
  methods: {
    getCommentData(comment, index) {
      this.commentId = comment.id;
      this.commentIndex = index;
      this.commentData = comment;
    },
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    },
    getAllEmployees() {
      axios.get(`Employees`).then((response) => {
        this.employeesList = response.data;
      });
    },
    getAllComments() {
      axios.get(`Comments`).then((response) => {
        this.commentsList = response.data;
      });
    },
    replyToEmployee() {
      this.v$.$validate();
      if (!this.v$.$error) {
        axios
          .put(
            `Comments/${this.commentId}`,
            this.commentData,
            (this.commentData.Reply = this.replyComment)
          )
          .then(() => {
            this.$toast.success(this.$store.state.successMessage);
            this.$refs.close.click();
          })
          .catch(() => {
            this.$toast.error(this.$store.state.ErrorMessage);
          });
      }
    },
  },
};
</script>
