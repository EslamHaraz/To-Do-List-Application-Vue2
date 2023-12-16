<template>
  <div class="parent">
    <div class="container">
      <div
        class="box-employees d-flex justify-content-between align-items-center box-static"
      >
        <div class="content">
          <h5 class="text-color header">{{ $t(`message.${$props.staticOne}`) }}</h5>
          <h5 class="text-color number">{{ $props.staticOneLength }}</h5>
        </div>
        <div class="icon">
          <FontAwesome :icon="['fas', iconOne]" class="link-icon link-color" />
        </div>
      </div>
      <div
        class="box-mangers d-flex justify-content-between align-items-center box-static"
      >
        <div class="content">
          <h5 class="text-color header">{{ $t(`message.${$props.staticTwo}`) }}</h5>
          <h5 class="text-color number">{{ $props.staticTwoLength }}</h5>
        </div>
        <div class="icon">
          <FontAwesome :icon="['fas', iconTwo]" class="link-icon link-color" />
        </div>
      </div>
      <div
        class="box-taskes d-flex justify-content-between align-items-center box-static"
      >
        <div class="content">
          <h5 class="text-color header">{{ $t(`message.${staticThree}`) }}</h5>
          <h5 class="text-color number">{{ $props.staticThreeLength }}</h5>
        </div>
        <div class="icon">
          <FontAwesome
            :icon="['fas', iconThree]"
            class="link-icon link-color"
            :spin="iconThree == 'arrows-rotate'"
          />
        </div>
      </div>
      <div
        class="box-comments d-flex justify-content-between align-items-center box-static"
      >
        <div class="content">
          <h5 class="text-color header">{{ $t(`message.${$props.staticFour}`) }}</h5>
          <h5 class="text-color number">10</h5>
        </div>
        <div class="icon">
          <FontAwesome :icon="['fas', iconFour]" class="link-icon link-color" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "StatisticsCompoenent",
  components: {},
  props: [
    "staticOne",
    "staticOneLength",
    "iconOne",
    "staticTwo",
    "staticTwoLength",
    "iconTwo",
    "staticThree",
    "staticThreeLength",
    "iconThree",
    "staticFour",
    "iconFour",
  ],
};
</script>
<style scoped lang="scss">
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 10px;
}

.box-static {
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  height: 110px;
}
.box-static .content {
  padding: 10px;
  h5:last-of-type {
    font-weight: bold;
    font-size: 25px;
  }
  h5 {
    color: white;
  }
}
.box-employees {
  background-color: var(--bink-color);
  .icon {
    background-color: #f57b9d;
  }
}
.box-mangers {
  background-color: var(--blue-color);
  .icon {
    background-color: #66c4e8;
  }
}
.box-taskes {
  background-color: var(--Purple-color);
  .icon {
    background-color: #9591c4;
  }
}
.box-comments {
  background-color: var(--green-color);
  .icon {
    background-color: #6cd0d2;
  }
}
.icon svg {
  font-size: 35px;
  color: white;
}
.icon {
  height: 100%;
  padding: 10px;
  background-color: #6cd0d2;
  opacity: 0.7;
  display: flex;
  align-items: center;
  width: 100px;
  justify-content: center;
}
</style>
