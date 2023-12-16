<template>
  <div class="parent">
    <h3 class="text-color text-initial mb-4">
      {{ $t("message.editSiteSettings") }}
    </h3>
    <form @submit.prevent class="form-grid">
      <div class="form-group input-width mb-3">
        <label
          for="siteNameAr "
          class="w-100 d-block text-initial mb-2 text-color"
          >{{ $t("message.siteNameAr") }}</label
        >
        <input
          type="text"
          v-model="siteNameArabic"
          class="form-control"
          id="siteNameAr"
          aria-describedby="emailHelp"
          :placeholder="$t('message.siteNameAr')"
        />
        <div
          v-if="siteNameArabic == '' && v$.siteNameArabic.$error"
          class="feedback-error"
        >
          {{ $t("message.siteNameAr") }} {{ $t("message.rquired") }}
        </div>
        <div
          v-if="siteNameArabic.length < 8 && siteNameArabic !== ''"
          class="feedback-error"
        >
          {{ $t("message.shortName") }}
        </div>
        <div v-if="siteNameArabic.length > 12" class="feedback-error">
          {{ $t("message.longName") }}
        </div>
      </div>
      <div class="form-group input-width mb-3">
        <label
          for="siteNameEn "
          class="w-100 d-block text-initial mb-2 text-color"
          >{{ $t("message.siteNameEn") }}</label
        >
        <input
          type="text"
          v-model="siteNameEnglish"
          class="form-control"
          id="siteNameEn"
          aria-describedby="emailHelp"
          :placeholder="$t('message.siteNameEn')"
        />
        <div
          v-if="siteNameEnglish == '' && v$.siteNameEnglish.$error"
          class="feedback-error"
        >
          {{ $t("message.siteNameEn") }} {{ $t("message.rquired") }}
        </div>
        <div
          v-if="siteNameEnglish.length < 8 && siteNameEnglish !== ''"
          class="feedback-error"
        >
          {{ $t("message.shortName") }}
        </div>
        <div v-if="siteNameEnglish.length > 12" class="feedback-error">
          {{ $t("message.longName") }}
        </div>
      </div>
      <div class="form-group input-width mb-3">
        <label
          for="siteLogo"
          class="w-100 d-block text-initial mb-2 text-color"
          >{{ $t("message.siteLogo") }}</label
        >
        <input
          type="url"
          v-model="siteLogo"
          class="form-control"
          id="siteLogo"
          aria-describedby="emailHelp"
          :placeholder="$t('message.siteLogoLink')"
        />
        <div v-if="siteLogo == '' && v$.siteLogo.$error" class="feedback-error">
          {{ $t("message.siteLogo") }} {{ $t("message.rquired") }}
        </div>
      </div>
      <div class="form-group input-width mb-3">
        <label
          for="siteIcon"
          class="w-100 d-block text-initial mb-2 text-color"
          >{{ $t("message.siteIcon") }}</label
        >
        <input
          type="url"
          v-model="siteIcon"
          class="form-control"
          id="siteIcon"
          aria-describedby="emailHelp"
          :placeholder="$t('message.siteIconLink')"
        />
        <div v-if="siteIcon == '' && v$.siteIcon.$error" class="feedback-error">
          {{ $t("message.siteIcon") }} {{ $t("message.rquired") }}
        </div>
        <div v-if="v$.siteIcon.$error" class="feedback-error">
          {{ $t("message.invalidUrl") }}
        </div>
      </div>
      <div class="form-group input-width mb-3">
        <label
          class="w-100 d-block text-initial mb-2 text-color"
          for="siteDescriptionAr"
          >{{ $t("message.siteDescriptionAr") }}</label
        >
        <textarea
          v-model="siteDescriptionArabic"
          class="form-control"
          id="siteDescriptionAr"
          rows="3"
          :placeholder="$t('message.siteDescriptionAr')"
        ></textarea>
        <div
          v-if="siteDescriptionArabic == '' && v$.siteDescriptionArabic.$error"
          class="feedback-error"
        >
          {{ $t("message.siteDescriptionAr") }} {{ $t("message.rquired") }}
        </div>
        <div
          v-if="
            siteDescriptionArabic !== '' && siteDescriptionArabic.length < 100
          "
          class="feedback-error"
        >
          {{ $t("message.shortDescription") }}
        </div>
        <div v-if="siteDescriptionArabic.length > 10000" class="feedback-error">
          {{ $t("message.longDescription") }}
        </div>
      </div>
      <div class="form-group input-width mb-3">
        <label
          class="w-100 d-block text-initial mb-2 text-color"
          for="siteDescriptionEn"
          >{{ $t("message.siteDescriptionEn") }}</label
        >
        <textarea
          v-model="siteDescriptionEnglish"
          class="form-control"
          id="siteDescriptionEn"
          rows="3"
          :placeholder="$t('message.siteDescriptionEn')"
        ></textarea>
        <div
          v-if="
            siteDescriptionEnglish == '' && v$.siteDescriptionEnglish.$error
          "
          class="feedback-error"
        >
          {{ $t("message.siteDescriptionEn") }} {{ $t("message.rquired") }}
        </div>
        <div
          v-if="
            siteDescriptionEnglish !== '' && siteDescriptionEnglish.length < 100
          "
          class="feedback-error"
        >
          {{ $t("message.shortDescription") }}
        </div>
        <div
          v-if="siteDescriptionEnglish.length > 10000"
          class="feedback-error"
        >
          {{ $t("message.longDescription") }}
        </div>
      </div>
      <div class="form-group input-width mb-3">
        <label
          for="securityQuestion "
          class="w-100 d-block text-initial mb-2 text-color"
          >{{ $t("message.siteStatus") }}</label
        >
        <select
          v-model="siteStatus"
          id="securityQuestion"
          class="form-select select-language"
        >
          <option>{{ $t("message.open") }}</option>
          <option>{{ $t("message.Closed") }}</option>
        </select>
        <div
          v-if="siteStatus == '' && v$.siteStatus.$error"
          class="feedback-error"
        >
          {{ $t("message.siteStatus") }} {{ $t("message.rquired") }}
        </div>
      </div>
      <button @click="editSiteData()" class="btn btn-primary mt-4 signIn-btn">
        {{ $t("message.editNow") }}
      </button>
    </form>
  </div>
</template>
<script>
import useValidate from "@vuelidate/core";
import { required, url, minLength, maxLength } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  name: "SettingsView",
  setup: () => ({ v$: useValidate() }),
  data() {
    return {
      siteNameEnglish: "",
      siteNameArabic: "",
      siteDescriptionEnglish: "",
      siteDescriptionArabic: "",
      siteLogo: "",
      siteIcon: "",
      siteStatus: "",
    };
  },
  validations() {
    return {
      siteNameEnglish: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(12),
      },
      siteNameArabic: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(12),
      },
      siteDescriptionEnglish: {
        required,
        minLength: minLength(100),
        maxLength: maxLength(10000),
      },
      siteDescriptionArabic: {
        required,
        minLength: minLength(100),
        maxLength: maxLength(10000),
      },
      siteLogo: { required, url },
      siteIcon: { required, url },
      siteStatus: { required },
    };
  },

  mounted() {
    setTimeout(() => {
      this.collectDataFromVuex();
    }, 50);
  },
  methods: {
    collectDataFromVuex() {
    this.siteNameEnglish =  this.$store.state.allSiteData.SiteNameEnglish
    this.siteNameArabic =  this.$store.state.allSiteData.SiteNameArabic
    this.siteDescriptionEnglish =  this.$store.state.allSiteData.SiteDescriptionEnglish
    this.siteDescriptionArabic =  this.$store.state.allSiteData.SiteDescriptionArabic
    this.siteLogo =  this.$store.state.allSiteData.SiteLogo
    this.siteIcon =  this.$store.state.allSiteData.SiteIcon
    this.siteStatus =  this.$store.state.allSiteData.SiteStatus
    },
    editSiteDataInStore() {
      this.$store.commit("editSiteData", {
        englishName: this.siteNameEnglish,
        arabicName: this.siteNameArabic,
        siteLogo: this.siteLogo,
        siteIcon: this.siteIcon,
      });
    },
    editSiteData() {
      this.v$.$validate();
      if (!this.v$.$error) {
        axios
          .put(`SiteSettings/1`, {
            SiteNameEnglish: this.siteNameEnglish,
            SiteNameArabic: this.siteNameArabic,
            SiteDescriptionEnglish: this.siteDescriptionEnglish,
            SiteDescriptionArabic: this.siteDescriptionArabic,
            SiteLogo: this.siteLogo,
            SiteIcon: this.siteIcon,
            SiteStatus: this.siteStatus,
          })
          .then(() => {
            this.$toast.success(this.$store.state.successMessage);
            this.editSiteDataInStore();
          })
          .catch(() => {
            this.$toast.error(this.$store.state.ErrorMessage);
          });
      }
    },
  },
};
</script>
