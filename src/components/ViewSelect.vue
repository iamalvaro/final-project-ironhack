<template>
  <div class="view-switch">
    <label class="switch">
      <input
        @click="activateViewSelector"
        type="checkbox"
        class="slider-input"
      />
      <span class="slider"></span>
    </label>
    <p class="switch-text">view selector</p>
  </div>
  <div v-if="selectorToggle">
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
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeMount } from "vue";

//Logic to activate view selector through switch

const selectorToggle = ref(false);
const activateViewSelector = () => {
  selectorToggle.value = !selectorToggle.value;
};

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
/* VIEW SWITCH  */
.view-switch {
  margin: 1rem 1rem;
  position: absolute;
  display: flex;
  align-items: center;
  align-content: center;
  gap: 0.5rem;
}
.switch-text {
  margin: 0 0;
  color: var(--colorGreen);
  display: none;
  font-size: 0.9rem;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
}
.view-switch:hover .switch-text {
  display: inline;
}

/* Hide default HTML checkbox */
.switch .slider-input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  height: 2rem;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--colorLightGrey);
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 50%;
}

.slider-input:checked + .slider {
  background-color: var(--colorGreen);
}

.slider-input:focus + .slider {
  box-shadow: 0 0 1px var(--colorGreen);
}

.slider-input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* VIEW SELECTOR */
.view-select {
  position: fixed;
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
