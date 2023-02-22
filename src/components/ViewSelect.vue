<template>
  <!-- <div class="view-select">
    <select
      class="select-options"
      v-model="selectView"
      id="task-priority"
      @click="sendViewOption"
    >
      <option class="options hide" selected>View:</option>
      <option class="options" value="all">All</option>
      <option class="options" value="pending">Pending</option>
      <option class="options" value="completed">Completed</option>

      <p @click="() => sendViewOption2('all')">All</p>
    </select>
  </div> -->

  <div class="view-select" ref="viewSelect">
    <div class="header-content">
      <i class="fa-solid fa-binoculars"></i>
    </div>
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

/* const sendViewOption2 = (valor) => {
  //console.log(selectView.value);
  //console.log("clickes");
  emit("viewTaskOption", valor);
}; */
</script>

<style scoped>
.view-select {
  position: fixed;
  left: 1.2rem;
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
  transition: 0.15s;
  display: none;
}
.show-view {
  display: inline-block;
}
.view-select:hover {
  border-radius: 3rem;
  color: var(--colorGreen);
  background-color: var(--colorBrokenWhite);
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  opacity: 0.9;
}
.header-content {
  font-size: 2.5rem;
}
.view-select:hover .header-content {
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
