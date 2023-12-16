<template>
  <div class="parent">
    <div v-if="language == 'ar'" v-html="pageContentAr" class="text-color"></div>
    <div v-else v-html="pageContentEn" class="text-color"></div>
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "pageView",
  data() {
    return {
      pageId: this.$route.params.pageId,
      pageData: "",
      pageContentAr: "",
      pageContentEn: "",
    };
  },
  computed: {
    ...mapState({
      language: (state) => state.language,
    }),
  },
  mounted() {
    this.getPageData();
  },
  methods: {
    getPageData() {
      axios.get(`Pages/${this.pageId}`).then((response) => {
        this.pageData = response.data;
        this.pageContentAr = response.data.ArabicContent;
        this.pageContentEn = response.data.EnglishContent;
        console.log(this.pageContentAr);
        console.log(this.pageData);
      });
    },
  },
};
</script>
<style scoped>
.parent {
  height: 100%;
  padding: 20px;
  background-color: var(--header-color);
}
</style>
