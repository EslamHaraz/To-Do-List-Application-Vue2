<template>
  <div class="parent">
    <table class="table table-striped">
      <tr class="header">
        <th scope="col">#</th>
        <th scope="col">{{ $t("message.name") }}</th>
        <th scope="col" class="td-None">{{ $t("message.email") }}</th>
        <th>{{ $t("message.photo") }}</th>
        <th scope="col">{{ $t("message.action") }}</th>
      </tr>
      <tbody class="content">
        <tr v-for="(manger, index) in mangersList" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ manger.Name }}</td>
          <td class="td-None">{{ manger.Email }}</td>
          <td><img :src="manger.Photo" class="small-img" /></td>
          <td>
            <button
              @click="getMangerData(manger, index)"
              class="btn btn-danger ms-2 me-2"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrob1"
            >
              {{ $t("message.delete") }}
              <FontAwesome :icon="['fas', 'trash']" style="margin: 0" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
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
              ref="colse"
            ></button>
            <h5 class="modal-title" id="staticBackdrob1Label">
              {{ $t("message.delete") }}
            </h5>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <h4 class="text-danger">
                {{ $t("message.deleteMangerMessage") }}
              </h4>
            </div>
          </div>
          <div class="modal-footer flex-row-reverse">
            <button
              type="button"
              class="btn btn-secondary close"
              data-bs-dismiss="modal"
            >
              {{ $t("message.cancel") }}
            </button>
            <button @click="deleteManger()" class="btn btn-danger ms-2 me-2">
              {{ $t("message.delete") }}
              <FontAwesome :icon="['fas', 'trash']" style="margin: 0" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="data-message">
      <h3 class="text-white p-3" v-if="mangersList.length == 0">
        {{ $t("message.noData") }}
      </h3>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "MangersView",
  data() {
    return {
      mangersList: [],
      mangerId: "",
      mangerIndex: "",
    };
  },
  mounted() {
    this.getAllMangers();
  },
  methods: {
    getMangerData(manger, index) {
      this.mangerId = manger.id;
      this.mangerIndex = index;
    },
    getAllMangers() {
      axios
        .get(`Mangers`)
        .then((response) => {
          this.mangersList = response.data;
        })
        .catch((error) => {
          this.$toast.error("Error 404");
        });
    },
    deleteManger() {
      axios
        .delete(`Mangers/${this.mangerId}`)
        .then(() => {
          this.$toast.success(this.$store.state.successMessage);
          this.mangersList.splice(this.mangerIndex, 1);
          this.$refs.colse.click();
        })
        .catch(() => {
          this.$toast.error(this.$store.state.ErrorMessage);
        });
    },
  },
};
</script>
<style scoped>
.small-img {
  width: 60px;
  height: 60px;
}
</style>
