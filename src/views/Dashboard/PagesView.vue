<template>
  <div class="parent">
    <table class="table table-striped">
      <tr class="header">
        <th scope="col">#</th>
        <th scope="col">{{ $t("message.name") }}</th>
        <th scope="col">{{ $t("message.action") }}</th>
      </tr>
      <tbody class="content">
        <tr v-for="(page, index) in pagesList" :key="index">
          <td>{{ index + 1 }}</td>
          <td v-if="language == 'ar'">{{ page.ArabicName }}</td>
          <td v-else>{{ page.EnglishName }}</td>
          <td>
            <button
              @click="(edit = true), getPageData(page, index)"
              class="btn btn-primary ms-2 me-2"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrob1"
            >
              {{ $t("message.edit") }}
              <FontAwesome :icon="['fas', 'edit']" style="margin: 0" />
            </button>
            <button
              @click="(edit = false), getPageData(page, index)"
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
              ref="close"
            ></button>
            <h5 v-if="edit == false" class="modal-title" id="staticBackdrob1Label">
              {{ $t("message.delete") }}
            </h5>
            <h5 v-else class="modal-title" id="staticBackdrob1Label">
              {{ $t("message.edit") }}
            </h5>
          </div>
          <div class="modal-body" v-if="edit == false">
            <div class="form-group">
              <h4 class="text-danger">
                {{ $t("message.deleteMangerMessage") }}
              </h4>
            </div>
          </div>
          <div class="modal-body" v-else>
            <div class="row m-auto">
              <label
                for="contentAr "
                class="w-100 d-block text-initial mb-2 text-color"
                >{{ $t("message.pageContentAr") }}</label
              >
              <form class="editor">
                <vue-editor
                  class="edit"
                  id="contentAr"
                  v-model.trim="pageContentAr"
                ></vue-editor>
              </form>
              <div
                v-if="pageContentAr == '' && v$.pageContentAr.$error"
                class="feedback-error mt-3"
              >
                {{ $t("message.pageContentAr") }} {{ $t("message.rquired") }}
              </div>
              <div
                v-if="pageContentAr.length < 350 && pageContentAr !== ''"
                class="feedback-error mt-3"
              >
                {{ $t("message.shortContent") }}
              </div>
              <div v-if="pageContentAr.length > 2000" class="feedback-error mt-3">
                {{ $t("message.longContent") }}
              </div>
              <label
                for="contentEn "
                class="w-100 d-block text-initial mb-2 text-color mt-3"
                >{{ $t("message.pageContentEn") }}</label
              >
              <form class="editor">
                <vue-editor
                  class="edit"
                  id="contentEn"
                  v-model.trim="pageContentEn"
                ></vue-editor>
              </form>
              <div
                v-if="pageContentEn == '' && v$.pageContentEn.$error"
                class="feedback-error mt-3"
              >
                {{ $t("message.pageContentEn") }} {{ $t("message.rquired") }}
              </div>
              <div
                v-if="pageContentEn.length < 350 && pageContentEn !== ''"
                class="feedback-error mt-3"
              >
                {{ $t("message.shortContent") }}
              </div>
              <div v-if="pageContentEn.length > 2000" class="feedback-error mt-3">
                {{ $t("message.longContent") }}
              </div>
              <div>
                <div class="form-group mt-3 col-lg-8">
                  <label
                    for="nameAr "
                    class="w-100 d-block text-initial mb-2 text-color"
                    >{{ $t("message.pageNameAr") }}</label
                  >
                  <input
                    type="text"
                    :class="{
                      'is-invalid': v$.pageNameAr.$error,
                    }"
                    class="form-control"
                    id="nameAr"
                    aria-describedby="emailHelp"
                    v-model.trim="pageNameAr"
                    :placeholder="$t('message.pageNameAr')"
                  />
                  <div
                    v-if="pageNameAr == '' && v$.pageNameAr.$error"
                    class="feedback-error mt-3"
                  >
                    {{ $t("message.pageNameAr") }} {{ $t("message.rquired") }}
                  </div>
                  <div
                    v-if="pageNameAr.length < 5 && pageNameAr !== ''"
                    class="feedback-error mt-3"
                  >
                    {{ $t("message.shortName") }}
                  </div>
                  <div v-if="pageNameAr.length > 30" class="feedback-error mt-3">
                    {{ $t("message.longName") }}
                  </div>
                  <div
                    v-if="filterPagesArabicNames.includes(pageNameAr)"
                    class="feedback-error mt-3"
                  >
                    {{ $t("message.usedName") }}
                  </div>
                </div>
                <div class="form-group mt-3 col-lg-8">
                  <label
                    for="nameEn"
                    class="w-100 d-block text-initial mb-2 text-color"
                    >{{ $t("message.pageNameEn") }}</label
                  >
                  <input
                    :class="{
                      'is-invalid': v$.pageNameEn.$error,
                    }"
                    type="text"
                    class="form-control"
                    id="nameEn"
                    aria-describedby="emailHelp"
                    v-model.trim="pageNameEn"
                    :placeholder="$t('message.pageNameEn')"
                  />
                  <div
                    v-if="pageNameEn == '' && v$.pageNameEn.$error"
                    class="feedback-error mt-3"
                  >
                    {{ $t("message.pageNameAr") }} {{ $t("message.rquired") }}
                  </div>
                  <div
                    v-if="pageNameEn.length < 5 && pageNameEn !== ''"
                    class="feedback-error mt-3"
                  >
                    {{ $t("message.shortName") }}
                  </div>
                  <div v-if="pageNameEn.length > 30" class="feedback-error mt-3">
                    {{ $t("message.longName") }}
                  </div>
                  <div
                    v-if="filterPagesEnglishNames.includes(pageNameEn)"
                    class="feedback-error mt-3"
                  >
                    {{ $t("message.usedName") }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer flex-row-reverse">
            <button type="button" class="btn btn-secondary close" data-bs-dismiss="modal">
              {{ $t("message.cancel") }}
            </button>
            <button class="btn btn-danger ms-2 me-2" v-if="edit == false">
              {{ $t("message.delete") }}
              <FontAwesome :icon="['fas', 'trash']" style="margin: 0" />
            </button>
            <button @click="editPage()" class="btn btn-primary ms-2 me-2" v-else>
              {{ $t("message.edit") }}
              <FontAwesome :icon="['fas', 'edit']" style="margin: 0" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <jw-pagination
      :items="pagesList"
      :pageSize="10"
      @changePage="onChangePage"
      :labels="this.$store.state.customLabels"
    >
    </jw-pagination>
  </div>
</template>
<script>
import useValidate from "@vuelidate/core";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import JwPagination from "jw-vue-pagination";
import axios from "axios";
import { mapState } from "vuex";
import { VueEditor } from "vue2-editor";
export default {
  setup: () => ({ v$: useValidate() }),
  name: "PagesView",
  data() {
    return {
      edit: false,
      pagesList: [],
      pageOfItems: [],
      pageContentAr: "",
      pageContentEn: "",
      pageNameAr: "",
      pageNameEn: "",
      pageIndex: "",
      pageId: "",
    };
  },
  validations() {
    return {
      pageContentAr: { required, minLength: minLength(350), maxLength: maxLength(2000) },
      pageContentEn: { required, minLength: minLength(350), maxLength: maxLength(2000) },
      pageNameAr: { required, minLength: minLength(5), maxLength: maxLength(30) },
      pageNameEn: { required, minLength: minLength(5), maxLength: maxLength(30) },
    };
  },
  computed: {
    ...mapState({
      language: (state) => state.language,
    }),
    filterPagesEnglishNames() {
      return this.pagesList
        .filter((page) => {
          return page.EnglishName !== this.pageNameEn;
        })
        .map((page) => {
          return page.EnglishName;
        });
    },
    filterPagesArabicNames() {
      return this.pagesList
        .filter((page) => {
          return page.ArabicName !== this.pageNameAr;
        })
        .map((page) => {
          page.ArabicName;
        });
    },
  },
  components: { JwPagination, VueEditor },
  mounted() {
    this.getAllPages();
  },
  methods: {
    getPageData(page, index) {
      this.pageNameAr = page.ArabicName;
      this.pageNameEn = page.EnglishName;
      this.pageContentAr = page.ArabicContent;
      this.pageContentEn = page.EnglishContent;
      this.pageIndex = index;
      this.pageId = page.id;
    },
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    },
    getAllPages() {
      axios
        .get(`Pages`)
        .then((response) => {
          this.pagesList = response.data;
        })
        .catch(() => {
          this.$toast.error("Error In Get Pages");
        });
    },
    editPage() {
      this.v$.$validate();
      if (!this.v$.$error) {
        axios
          .put(`Pages/${this.pageId}`, {
            ArabicName: this.pageNameAr,
            EnglishName: this.pageNameEn,
            ArabicContent: this.pageContentAr,
            EnglishContent: this.pageContentEn,
          })
          .then(() => {
            this.$toast.success(this.$store.state.successMessage);
            this.$refs.close.click();
          })
          .catch(() => {
            this.$toast.error(this.$store.state.ErrorMessage);
          });
      }
    },
    deletePage() {
      axios
        .delete(`Pages/${this.pageId}`)
        .then(() => {
          this.$toast.success(this.$store.state.successMessage);
          this.pagesList.splice(this.pageIndex, 1);
          this.$refs.close.click();
        })
        .catch(() => {
          this.$toast.error(this.$store.state.ErrorMessage);
        });
    },
  },
};
</script>
<style scoped></style>
