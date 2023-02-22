<template>
  <div class="view-select" ref="viewSelect">
    <i class="fa-solid fa-binoculars"></i>

    <div class="dropdown-views">
      <option @click="() => sendViewOption('all')" value="all">All</option>
      <option @click="() => sendViewOption('completed')" value="completed">
        Completed
      </option>
      <option @click="() => sendViewOption('pending')" value="pending">
        Pending
      </option>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeMount } from "vue";

const viewSelect = ref();

const showOnScroll = () => {
  if (window.scrollY > 250) {
    viewSelect.value.classList.add("show-view");
  } else {
    viewSelect.value.classList.remove("show-view");
  }
};
onMounted(() => {
  window.addEventListener("scroll", showOnScroll);
});
onBeforeMount(() => {
  window.removeEventListener("scroll", showOnScroll);
});

//EMIT TO SEND DISPLAY VALUES TO FATHER
const emit = defineEmits(["viewTaskOption", "emitInfo"]);
const selectView = ref([]);

const sendViewOption = (viewValue) => {
  emit("viewTaskOption", viewValue);
};
</script>

<style scoped>
.view-select {
  position: fixed;
  /* width: 3rem;
  height: 3rem; */
  left: 1rem;
  top: 4rem;
  cursor: pointer;
  user-select: none;
  z-index: 5;
  border-radius: 50%;
  background-color: var(--colorBrokenWhite);
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  color: var(--colorLightGrey);
  padding: 1rem;
  opacity: 0.9;
  transition: 0.3s;
  display: none;
}
.show-view {
  display: inline-block;
}
.view-select:hover {
  width: 10rem;
  height: 15rem;
  border-radius: 3rem;
  color: var(--colorGreen);
  background-color: var(--colorBrokenWhite);
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  opacity: 0.9;
}
.fa-binoculars {
  font-size: 2.5rem;
}
.view-select:hover .fa-binoculars {
  display: none;
}
/* Dropdown Content (Hidden by Default) */
.dropdown-views {
  display: none;
  cursor: pointer;
}
/* Links inside the dropdown */
.dropdown-views option {
  color: var(--colorLightGrey);
  padding: 1.5rem 0.5rem;
  text-decoration: none;
  /* display: block; */
  text-align: center;
  font-size: 1.3rem;
}
/* Change color of dropdown links on hover */
.dropdown-views option:hover {
  color: var(--colorGreen);
}
/* Show the dropdown menu on hover */
.view-select:hover .dropdown-views {
  display: block;
}
</style>
