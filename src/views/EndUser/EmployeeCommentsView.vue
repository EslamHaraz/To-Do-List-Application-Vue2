<template>
  <div class="parent">
    <table class="table table-striped">
      <tr class="header">
        <th scope="col">#</th>
        <th scope="col">{{ $t("message.reply") }}</th>
        <th scope="col">{{ $t("message.comment") }}</th>
      </tr>
      <tbody class="content">
        <tr v-for="(comment, index) in commentsList" :key="index">
          <td>{{ index + 1 }}</td>
          <td v-if="comment.Reply != ''">{{ comment.Reply }}</td>
          <td v-else>{{ $t("endUser.waitingForReply") }}</td>
          <td>{{ comment.Comment }}</td>
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
  </div>
</template>
<script>
import JwPagination from "jw-vue-pagination";
import axios from "axios";
import useValidate from "@vuelidate/core";
// let employeeId = JSON.parse(localStorage.getItem("employee-detail")).id;
export default {
  name: "",
  setup: () => ({ v$: useValidate() }),
  data() {
    return {
      employeesList: [],
      commentsList: [],
      pageOfItems: [],
    };
  },
  components: { JwPagination },
  mounted() {
    this.getEmployeeComments();
  },
  methods: {
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    },
    getEmployeeComments() {
      axios.get(`Comments?UserId=${this.$store.state.employeeId}`).then((response) => {
        this.commentsList = response.data;
      });
    },
  },
};
</script>
