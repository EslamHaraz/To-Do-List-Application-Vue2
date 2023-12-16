<template>
  <div class="parent p-4">
    <h4 class="text-color text-initial border-bottom p-2 pb-3">
      {{ $t("message.ContactInformation") }}
    </h4>
    <div class="box-parent">
      <div class="box border-bottom">
        <div class="w-500 d-Flex p-3">
          <h6 class="text-color">{{ $t("message.email") }}</h6>
          <p class="main-color m-0">{{ this.$store.state.employeeData.Email }}</p>
        </div>
      </div>
      <div class="box border-bottom">
        <div class="w-500 d-Flex p-3">
          <h6 class="text-color">{{ $t("message.phoneNumber") }}</h6>
          <p class="main-color m-0">{{ this.$store.state.employeeData.Phone }}</p>
        </div>
      </div>
    </div>
    <h4 class="text-color text-initial border-bottom p-2 pb-3 mt-3">
      {{ $t("message.PersonalSetting") }}
    </h4>
    <div class="box-parent">
      <div class="box border-bottom">
        <div class="w-500 d-Flex p-3">
          <h6 class="text-color">{{ $t("message.name") }}</h6>
          <p class="main-color m-0">{{ this.$store.state.employeeData.Name }}</p>
        </div>
      </div>
      <div class="box border-bottom">
        <div class="w-500 d-Flex p-3">
          <h6 class="text-color">{{ $t("message.type") }}</h6>
          <p class="main-color m-0">{{ this.$store.state.employeeData.Type }}</p>
        </div>
        <div class="w-500 d-Flex p-3">
          <h6 class="text-color">{{ $t("message.photo") }}</h6>
          <img :src="this.$store.state.employeeData.Photo" class="small-img img-fluid" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AboutEmployeeComponent",
};
</script>
<style scoped>
.border-bottom {
  border-bottom: 1px solid #7d7d7d85;
}
.w-500 {
  max-width: 500px;
}
</style>
