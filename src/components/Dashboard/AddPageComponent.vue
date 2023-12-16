<template>
  <div class="parent">
    <div class="container">
      <div class="row">
        <div class="col-lg-7 pb-2">
          <label for="contentAr " class="w-100 d-block text-initial mb-2 text-color">{{
            $t("message.pageContentAr")
          }}</label>
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
        </div>
        <div class="col-lg-4">
          <div class="form-group input-width mb-5">
            <label for="nameAr " class="w-100 d-block text-initial mb-2 text-color">{{
              $t("message.pageNameAr")
            }}</label>
            <input
              type="text"
              :class="{
                'is-invalid':v$.pageNameAr.$error
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
            v-if="pageNameAr.length < 5 && pageNameAr !==''"
            class="feedback-error mt-3"
          >
            {{ $t("message.shortName") }}
          </div>
            <div
            v-if="pageNameAr.length >30 "
            class="feedback-error mt-3"
          >
            {{ $t("message.longName") }}
          </div>
          <div
            v-if="filterPagesArabicNames.includes(pageNameAr)"
            class="feedback-error mt-3"
          >
            {{ $t("message.usedName") }}
          </div>
          </div>
          <div class="form-group input-width mb-3">
            <label for="nameEn" class="w-100 d-block text-initial mb-2 text-color">{{
              $t("message.pageNameEn")
            }}</label>
            <input
            :class="{
                'is-invalid':v$.pageNameEn.$error
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
            v-if="pageNameEn.length < 5 && pageNameEn !==''"
            class="feedback-error mt-3"
          >
            {{ $t("message.shortName") }}
          </div>
            <div
            v-if="pageNameEn.length >30 "
            class="feedback-error mt-3"
          >
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
        <div class="col-lg-7 pb-2">
          <label for="contentEn " class="w-100 d-block text-initial mb-2 text-color">{{
            $t("message.pageContentEn")
          }}</label>
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
        </div>
        </div>
      </div>
      <div class="w-100 text-initial">
        <button
          @click="addNewPage()"
          class="btn btn-primary mt-3 signIn-btn width-250"
        >
          {{ $t("message.addPage") }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
import useValidate from "@vuelidate/core";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  setup: () => ({ v$: useValidate() }),
  name: "addPageComponent",
  data() {
    return {
      pageContentAr: "",
      pageContentEn: "",
      pageNameAr: "",
      pageNameEn: "",
      pagesList:[]
    };
  },
  components: { VueEditor },
  computed:{
    filterPagesEnglishNames(){
      return this.pagesList.map((page)=>{
        return  (page.EnglishName) 
      })
    },
    filterPagesArabicNames(){
      return this.pagesList.map((page)=>{
        return  (page.ArabicName) 
      })
    }
  },
  validations() {
    return {
      pageContentAr: { required, minLength: minLength(350), maxLength: maxLength(2000) },
      pageContentEn: { required, minLength: minLength(350), maxLength: maxLength(2000) },
      pageNameAr: { required, minLength: minLength(5), maxLength: maxLength(30) },
      pageNameEn: { required, minLength: minLength(5), maxLength: maxLength(30) },
    };
  },
  mounted(){
    this.getAllPages()
  },
  methods: {
    getAllPages(){
      axios.get(`Pages`).then((response)=>{
        this.pagesList = response.data
      })
    },  
    addNewPage() {
      this.v$.$validate();
      if (!this.v$.$error&&!this.filterPagesEnglishNames.includes(this.pageNameEn)
      &&!this.filterPagesArabicNames.includes(this.pageNameAr)) {
        axios
          .post(`Pages`, {
            ArabicName: this.pageNameAr,
            EnglishName: this.pageNameEn,
            ArabicContent: this.pageContentAr,
            EnglishContent: this.pageContentEn,
          })
          .then(() => {
            this.$toast.success(this.$store.state.successMessage);
            setTimeout(() => {
              this.$router.push({ name: "PagesView" });
            }, 1400);
          })
          .catch(() => {
            this.$toast.error(this.$store.state.ErrorMessage);
          });
      }
    },
  },
};
</script>
<style scoped>
.width-250 {
  width: 250px;
}
</style>
