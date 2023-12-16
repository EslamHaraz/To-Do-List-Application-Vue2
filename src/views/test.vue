<template>
  <div class="home">
    <h1>Hover Photo</h1>
    <button @click="myFunction_set()" class="btn btn-dark">change dark</button>
    <button @click="active = !active" class="btn btn-dark ms-3">
      Open Photo
    </button>
    <div
      class="box-message m-auto d-flex align-items-center"
      :class="{ active: active }"
    >
      <img src="@/assets/port.jpg" />
      <div class="content">
        <h1>Eslam Haraz</h1>
        <h2>I'm A Front End Developer</h2>
      </div>
      <li class="w-100 ps-3 pe-3 mb-3">
        <router-link :to="{}" class="d-flex li-link align-items-center">
          <FontAwesome :icon="['fas', 'user']" class="text-color link-icon" />
          <h6 class="mb-0 link-name ms-2 me-2">My Account</h6>
        </router-link>
      </li>
      <li class="w-100 ps-3 pe-3">
        <router-link :to="{}" class="d-flex li-link align-items-center">
          <FontAwesome
            :icon="['fas', 'right-from-bracket']"
            class="text-color link-icon"
          />
          <h6 class="mb-0 link-name ms-2 me-2">Log Out</h6>
        </router-link>
      </li>
    </div>
  </div>
</template>

<script>
var root = document.querySelector(":root");
let mode = window.localStorage.getItem("mode");

// @ is an alias to /src
export default {
  name: "HomeView",
  data() {
    return { mode, root, color: "", active: false };
  },
  computed: {},
  mounted() {
    root.setAttribute("data-theme-mode", mode);
  },
  methods: {
    myFunction_set() {
      if (root.getAttribute("data-theme-mode") == "dark") {
        root.setAttribute("data-theme-mode", "light");
      } else {
        root.setAttribute("data-theme-mode", "dark");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.box-message {
  background-color: var(--main-color);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 20rem;
  border-bottom-left-radius: 40px;
  border-top-left-radius: 10px;
  box-shadow: 0px 1px 10px 4px #e3e3e3;
  transition: 0.2s;
  overflow: hidden;
  &:hover {
    width: 60rem;
  }
  &.active {
    width: 60rem;
  }
  img {
    width: 400px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 40px;
  }
  & .content {
    text-align: center;
    width: 100%;
    h1 {
      font-size: 30px;
      color: var(--font-color);
    }
    h2 {
      text-transform: capitalize;
      color: var(--font-color);
    }
  }
}
</style>
